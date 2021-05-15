# Third Party Stuff
from rest_framework.routers import DefaultRouter

# Agenda Stuff
from apps.base.api.routers import SingletonRouter
from apps.core.api import (
    ActivityTypeViewSet,
    ActivityViewSet,
    CustomerViewSet,
)
from apps.users.auth.api import AuthViewSet

default_router = DefaultRouter(trailing_slash=False)
singleton_router = SingletonRouter(trailing_slash=False)

# Register all the django rest framework viewsets below.
default_router.register("auth", AuthViewSet, basename="auth")
default_router.register("activities", ActivityViewSet, basename="activities")
default_router.register("activity-types", ActivityTypeViewSet, basename="activity-types")
default_router.register("customers", CustomerViewSet, basename="customers")

# Combine urls from both default and singleton routers and expose as
# 'urlpatterns' which django can pick up from this module.
urlpatterns = default_router.urls + singleton_router.urls
