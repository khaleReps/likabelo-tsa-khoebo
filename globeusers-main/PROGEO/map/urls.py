from django.urls import path
from map import views

urlpatterns = [
    path('', views.map_view, name='map'),
    
]
