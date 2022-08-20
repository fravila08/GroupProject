from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser, AppliedJobs, Interview, Forum

admin.site.register(AppUser, UserAdmin)
admin.site.register(AppliedJobs)
admin.site.register(Interview)
admin.site.register(Forum)
