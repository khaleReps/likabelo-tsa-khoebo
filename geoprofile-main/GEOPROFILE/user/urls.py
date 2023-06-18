from django.urls import path
from user import views

urlpatterns = [
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('profile/edit/', views.EditUserProfileView.as_view(), name='edit_user_profile'),
]
