from django.urls import path
from profiles import views as auth_views
from django.contrib.auth import views as auth_views
from profiles import views
from .views import RegisterView
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('admin/login/', auth_views.LoginView.as_view(template_name='admin/login.html'), name='admin_login'),
    path('admin/profiles/profile/', views.profile_view, name='admin_profile'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', views.profile_view, name='profile'),
    path('accounts/profile/', views.profile_view, name='user_profile'),
    path('settings/', views.mapsetting, name='settings'),
    path('edit-profile/', views.edit_profile_view, name='edit_profile'),
    path('register/', views.register, name='register'),
]
