from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets

from tutorial.quickstart.serializers import GroupSerializer, UserSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Suggestion
from .serializers import SuggestionSerializer

class SuggestionView(APIView):
    def post(self, request, *args, **kwargs):
        # Pega a mensagem diretamente dos dados da requisição
        message = request.data.get('message', None)
        
        if not message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Cria a sugestão sem o campo user
        suggestion = Suggestion.objects.create(message=message)
        
        serializer = SuggestionSerializer(suggestion)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from transformers import AutoImageProcessor, SiglipForImageClassification
from PIL import Image
import torch
import pandas as pd
import plotly.express as px
from django.shortcuts import render
from django.http import JsonResponse

# Carregar modelo e processador uma única vez
model_name = "prithivMLmods/Trash-Net"
model = SiglipForImageClassification.from_pretrained(model_name)
processor = AutoImageProcessor.from_pretrained(model_name)

bin_mapping = {
    "cardboard": "Contentor Azul (papel/cartão)",
    "paper": "Contentor Azul (papel/cartão)",
    "glass": "Contentor Verde (vidro)",
    "metal": "Contentor Amarelo (embalagens)",
    "plastic": "Contentor Amarelo (embalagens)",
    "trash": "Contentor Cinzento (lixo indiferenciado)"
}

# Dicionário de rótulos
labels = {
    0: "cardboard",
    1: "glass",
    2: "metal",
    3: "paper",
    4: "plastic",
    5: "trash"
}

class TrashClassificationView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'error': 'No image provided'}, status=400)

        image = Image.open(image_file).convert("RGB")
        inputs = processor(images=image, return_tensors="pt")

        with torch.no_grad():
            outputs = model(**inputs)
            probs = torch.nn.functional.softmax(outputs.logits, dim=1).squeeze().tolist()

        # Gera as previsões com percentagens
        predictions = {labels[i]: round(probs[i], 3) for i in range(len(probs))}

        # Descobre a classe com maior probabilidade
        predicted_label = labels[torch.argmax(outputs.logits).item()]

        # Mapeia a classe ao contentor
        bin_mapping = {
            "cardboard": "Contentor Azul",
            "paper": "Contentor Azul",
            "glass": "Contentor Verde",
            "metal": "Contentor Amarelo",
            "plastic": "Contentor Amarelo",
            "trash": "Contentor Normal (lixo indiferenciado)"
        }

        contentor = bin_mapping.get(predicted_label, "Desconhecido")

        return Response({
            "classificacao": predictions,
            "classe_mais_provavel": predicted_label,
            "contentor": contentor
        })
    
import plotly.express as px
import pandas as pd
import numpy as np
from django.http import JsonResponse

def recycling_map_view(request):
    df = pd.read_csv('data/df.csv')  # Use '/' ao invés de '\'

    # Preparando os dados para o gráfico
    fig = px.choropleth(
        df,
        locations="Country",
        locationmode="country names",
        color="Value",
        hover_name="Country",
        animation_frame="Year",
        color_continuous_scale="YlGn",
        range_color=(df["Value"].min(), df["Value"].max()),
    )

    fig.update_geos(
        scope="europe",
        center={"lat": 55, "lon": 15},
        domain=dict(y=[0.15, 1])
    )

    fig.update_layout(
        title=dict(
            text='Taxa de Reciclagem de Resíduos Municipais na Europa',
            x=0.5,
            font=dict(family='Arial Black', size=16, color='black')
        ),
        height=500,
        width=600,
        margin=dict(t=50, b=30),
        plot_bgcolor='whitesmoke',
        font=dict(size=10),
        coloraxis_colorbar=dict(
            len=0.8,
            thickness=20,
            y=0.6,
            title='Taxa'
        ),
        sliders=[{'y': 0.4}],
    )

    # Extraindo os dados do gráfico
    graph_data = fig.to_dict()

    # Convertendo objetos não serializáveis (como np.ndarray) em listas
    def convert_to_serializable(data):
        if isinstance(data, dict):
            return {key: convert_to_serializable(value) for key, value in data.items()}
        elif isinstance(data, list):
            return [convert_to_serializable(item) for item in data]
        elif isinstance(data, np.ndarray):
            return data.tolist()  # Converte numpy.ndarray em lista
        else:
            return data

    # Converter os dados para um formato serializável em JSON
    graph_data = fig.to_dict()
    graph_data_serializable = convert_to_serializable(graph_data)

    # Retornar os dados como JSON
    return JsonResponse({'graph_data': graph_data_serializable})
