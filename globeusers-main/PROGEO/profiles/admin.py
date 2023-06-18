from django.contrib import admin
from django.contrib.admin.models import LogEntry
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.forms import TextInput, Textarea
from django.db import models
from django_google_maps import widgets as map_widgets
from django_google_maps import fields as map_fields
from django.conf import settings
from .models import Profile


class UserAccessProfileMixin:
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(user=request.user)

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        fieldsets = super().get_fieldsets(request, obj)
        if not request.user.is_superuser:
            # remove the 'username' field if the user is not a superuser
            for fieldset in fieldsets:
                fieldset[1]['fields'] = [f for f in fieldset[1]['fields'] if f != 'username']
        return fieldsets


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False


class UserAdmin(UserAccessProfileMixin, BaseUserAdmin):
    inlines = (ProfileInline, )

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(id=request.user.id)


class ProfileAdmin(UserAccessProfileMixin, admin.ModelAdmin):
    formfield_overrides = {
        map_fields.AddressField: {'widget': map_widgets.GoogleMapsAddressWidget(attrs={'data-map-type': 'roadmap'})},
        models.CharField: {'widget': TextInput(attrs={'size':'20'})},
        models.TextField: {'widget': Textarea(attrs={'rows':4, 'cols':40})}
    }

    class Media:
        js = (
            'https://maps.googleapis.com/maps/api/js?key={}&libraries=places'.format(settings.GOOGLE_MAPS_API_KEY),
            'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/geocomplete/1.7.0/jquery.geocomplete.min.js',
            'https://cdn.jsdelivr.net/npm/@mapbox/mapbox-gl-geocoder@4.7.0/dist/mapbox-gl-geocoder.min.js'
        )


class LogEntryAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user', 'action_time']
    list_filter = ['user', 'content_type', 'action_flag']
    search_fields = ['object_repr', 'change_message', 'user__username']


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(LogEntry, LogEntryAdmin)
