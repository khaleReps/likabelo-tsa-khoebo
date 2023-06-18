from django.shortcuts import render
from django.views.generic import DetailView
from django.views.generic.edit import UpdateView
from user.models import CustomUser

class UserProfileView(DetailView):
    model = CustomUser
    template_name = 'user_profile.html'
    context_object_name = 'user'



class EditUserProfileView(UpdateView):
    model = CustomUser
    template_name = 'edit_user_profile.html'
    fields = ['username', 'email', 'home_address', 'phone_number', 'address', 'location', 'groups', 'user_permissions']

