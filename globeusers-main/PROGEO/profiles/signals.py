from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User, Group
from .models import Profile
from django.contrib.auth.models import Group

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        # create a new profile for the user
        profile = Profile.objects.create(user=instance)
        
        # add the user to the "Can view profile" group
        can_view_profile_group = Group.objects.get(name="Can view profile")
        can_view_profile_group.user_set.add(instance)
        instance.groups.add(can_view_profile_group)
        
        # set the user as active
        instance.is_active = True
        instance.save()
        
        # set the user as staff
        instance.is_staff = True
        instance.save()

