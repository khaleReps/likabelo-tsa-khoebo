from django.shortcuts import get_object_or_404
from .models import Profile
from django.shortcuts import render, redirect

def profile_owner_required(view_func):
    def wrapper(request, *args, **kwargs):
        profile = get_object_or_404(Profile, user=request.user)
        if not profile == kwargs['profile']:
            return redirect('home')
        return view_func(request, *args, **kwargs)
    return wrapper

