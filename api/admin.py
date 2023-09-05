from django.contrib import admin
from .models import NewUser
from django.contrib.auth.admin import UserAdmin
from django.apps import apps
# Register your models here.

class UserAdminConfig(UserAdmin):
    ordering=('-created',)
    search_fields=('email','agency_name','branch','agency_name')
    list_filter=('email','agency_name','branch')
    list_display   =('email','agency_name','is_staff','is_admin','branch','agency_name','id')

    add_fieldsets=(
        ("None",{'fields':('email','agency_name','branch','parent_user',)}),
        ('Permissions',{'fields':('is_staff','is_admin','is_active')}),
        
    )



admin.site.register(NewUser,UserAdminConfig)
all_models=apps.get_models()

for model in all_models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass    
