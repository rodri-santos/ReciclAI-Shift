from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets

from tutorial.quickstart.serializers import GroupSerializer, UserSerializer


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

# Carregar modelo e processador uma única vez
model_name = "prithivMLmods/Trash-Net"
model = SiglipForImageClassification.from_pretrained(model_name)
processor = AutoImageProcessor.from_pretrained(model_name)

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

        predictions = {labels[i]: round(probs[i], 3) for i in range(len(probs))}
        return Response(predictions)