# backend/urls.py
from django.contrib import admin
from django.urls import path, include

from .views import TrashClassificationView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Certifique-se de que a URL está sendo incluída corretamente
    path('classify/', TrashClassificationView.as_view(), name='classify-trash'),
]
