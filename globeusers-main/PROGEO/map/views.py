from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from profiles.models import Profile
import json

@login_required
def map_view(request):
    profiles = Profile.objects.all()
    profile = Profile.objects.get(user=request.user)
    markers = []
    
    

    for human in profiles:
        markers.append({
            "title": f"{human.user.username}'s location",
            "lat": human.location.lat,
            "lng": human.location.lon,
            "description": human.home_address,
            "username": human.user.username,
            "profile_picture": human.profile_picture
        })

    context = {
        'profile': profile,
        'google_maps_key': settings.GOOGLE_MAPS_API_KEY,
        'markers': json.dumps(markers)
    }

    return render(request, 'map/map.html', context)


