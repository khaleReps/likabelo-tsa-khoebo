from django import forms
from .models import Profile
from django_google_maps.widgets import GoogleMapsAddressWidget
from django.conf import settings
from .models import Profile
from django.contrib.auth import authenticate, login
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User, Group, Permission
from django_google_maps.widgets import GoogleMapsAddressWidget
from googlemaps import Client


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('profile_picture', 'date_of_birth', 'phone_number', 'home_address', 'location')
        widgets = {'home_address': GoogleMapsAddressWidget}

    class Media:
        js = (
            'https://maps.googleapis.com/maps/api/js?key={}&libraries=places'.format(settings.GOOGLE_MAPS_API_KEY),
            'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/geocomplete/1.7.0/jquery.geocomplete.min.js',
            'static/js/positionscript.js',

        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['home_address'].widget.attrs.update({'class': 'geocomplete'})
        self.fields['location'].widget = forms.HiddenInput()


class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, help_text='Required.')
    last_name = forms.CharField(max_length=30, required=True, help_text='Required.')
    profile_picture = forms.URLField(required=False)
    date_of_birth = forms.DateField(required=False)
    phone_number = forms.CharField(max_length=10, required=False)
    home_address = forms.CharField(max_length=200, required=False, widget=GoogleMapsAddressWidget())
    location = forms.CharField(max_length=100, required=False, widget=forms.HiddenInput())

    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('first_name', 'last_name')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        if commit:
            user.save()

        group = Group.objects.get(name='can view profile group')
        user.groups.add(group)

        permissions = Permission.objects.filter(codename__in=['view_profile'])
        user.user_permissions.set(permissions)

        user.is_staff = True

        profile = Profile.objects.create(
            user=user,
            profile_picture=self.cleaned_data['profile_picture'],
            date_of_birth=self.cleaned_data['date_of_birth'],
            phone_number=self.cleaned_data['phone_number'],
            home_address=self.cleaned_data['home_address'],
            location=self.cleaned_data['location'],
        )

        if commit:
            # Get the latitude and longitude of the home address
            client = Client(key='<your-google-maps-api-key>')
            geocode_result = client.geocode(profile.home_address)
            if geocode_result:
                location = geocode_result[0]['geometry']['location']
                profile.location = '{},{}'.format(location['lat'], location['lng'])
                profile.save()
            
            user.save()
            profile.save()

        raw_password = self.cleaned_data.get('password1')
        user = authenticate(username=user.username, password=raw_password)
        login(self.request, user)

        return user
