from django.db import models
from django.contrib.auth.models import User
from django_google_maps import fields as map_fields
from django.contrib.auth.models import Group

# create the "Can view profile" group if it doesn't exist
can_view_profile_group, created = Group.objects.get_or_create(name="Can view profile")


class MapSetting(models.Model):
    zoom = models.IntegerField()
    center_lat = models.DecimalField(max_digits=9, decimal_places=6)
    center_lng = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return f"Zoom: {self.zoom}, Center: ({self.center_lat}, {self.center_lng})"



class MapSettings(models.Model):
    zoom = models.IntegerField()
    center_lat = models.DecimalField(max_digits=9, decimal_places=6)
    center_lng = models.DecimalField(max_digits=9, decimal_places=6)
    map_type_choices = [
        ('roadmap', 'Roadmap'),
        ('satellite', 'Satellite'),
        ('hybrid', 'Hybrid'),
        ('terrain', 'Terrain')
    ]
    map_type = models.CharField(max_length=20, choices=map_type_choices)

    def __str__(self):
        return f"Latitude: {self.center_lat}, Longitude: {self.center_lng}, Zoom: {self.zoom}, Map Type: {self.map_type}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.URLField(blank=True)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=10)
    home_address = map_fields.AddressField(max_length=200)
    location = map_fields.GeoLocationField(max_length=100)
    
    def __str__(self):
        return f"{self.user.username}'s profile"

    