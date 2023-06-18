from django.conf import settings
from django.shortcuts import render

def map_view(request):
    context = {
        'google_maps_key': settings.GOOGLE_MAPS_API_KEY
    }
    return render(request, 'map/map.html', context)
