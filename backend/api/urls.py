# backend/urls.py
from django.contrib import admin
from django.urls import path, include

from .views import TrashClassificationView, recycling_map_view, SuggestionView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('classify/', TrashClassificationView.as_view(), name='classify-trash'),
    path('recycling/', recycling_map_view, name='recycling'),
    path('api/suggestions/', SuggestionView.as_view(), name='suggestion-api'),
]
