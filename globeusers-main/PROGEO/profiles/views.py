from django.shortcuts import render, redirect
from .models import Profile
from .forms import ProfileForm
from django.contrib.auth.decorators import login_required, user_passes_test
from .decorators import profile_owner_required
from django.shortcuts import render
from .models import MapSetting
from .models import Profile
from django.contrib.auth.forms import UserCreationForm
from .forms import CustomUserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth import authenticate, login

def is_profile_owner(user):
    return user.profile == Profile.objects.get(user=user)

profile_owner_required = user_passes_test(is_profile_owner)

@login_required
@profile_owner_required
def profile_view(request):
    profile = Profile.objects.get(user=request.user)
    form = ProfileForm(instance=profile)
    context = {'profile': profile, 'form': form}
    return render(request, 'profiles/profile.html', context)

@login_required
@profile_owner_required
def edit_profile_view(request):
    profile = Profile.objects.get(user=request.user)
    form = ProfileForm(request.POST or None, instance=profile)
    if form.is_valid():
        form.save()
        return redirect('profile')
    context = {'form': form}
    return render(request, 'profiles/edit_profile.html', context)


@login_required
@profile_owner_required
def mapsetting(request):
    map_setting = MapSetting.objects.first()  # assumes there's only one MapSetting object
    profile = Profile.objects.get(user=request.user)

    def default():
        map_setting.center_lat = 0
        map_setting.center_lng = 0
        map_setting.zoom = 5
        map_setting.maptype = ROADMAP
        map_setting.save()
    
    # function LoadMap() {
    #     var mapOptions = {
    #         center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
    #         zoom: 5,
    #         mapTypeId: google.maps.MapTypeId.ROADMAP
    #     }
    #     var map = new google.maps.Map(document.getElementById("map"), mapOptions);

   
    if request.method == 'POST':
        # process form data and update map_setting
        map_setting.center_lat = request.POST['center_lat']
        map_setting.center_lng = request.POST['center_lng']
        map_setting.zoom = request.POST['zoom']
        map_setting.save()
        
    context = {
        'profile': profile,
        'map_setting': map_setting,
        
    }
    
    return render(request, 'profiles/mapsetting.html', context)




def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('map')  
            
            profile = Profile.objects.create(
                user=user,
                first_name=form.cleaned_data['first_name'],
                last_name=form.cleaned_data['last_name'],
                profile_data=form.cleaned_data['profile_data']
            )
            return redirect('map')
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})


class RegisterView(CreateView):
    template_name = 'admin/register.html'
    form_class = UserCreationForm