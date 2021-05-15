# Third Party Stuff
from django.contrib import admin

# Agenda Stuff
from apps.core import models


@admin.register(models.ActivityType)
class ActivityTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "value", "created_at", "modified_at")
    search_fields = ("=name",)


@admin.register(models.Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("id", "seller", "customer", "schedule_at", "type", "status")
    list_filter = ("status", "type",)


class ActivityInline(admin.TabularInline):
    model = models.Activity


@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at", "modified_at")
    search_fields = ("=name",)
    inlines = (ActivityInline,)
