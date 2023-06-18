from django.db import models
from django_google_maps import fields as map_fields
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    home_address = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = map_fields.AddressField(max_length=200)
    location = map_fields.GeoLocationField(max_length=100)
    groups = models.ManyToManyField(
        'auth.Group', 
        related_name='customuser_set', 
        blank=True, 
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', 
        related_name='customuser_set', 
        blank=True, 
        verbose_name='user permissions'
    )
