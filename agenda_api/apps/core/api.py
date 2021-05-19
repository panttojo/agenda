# Standard Library
import logging

# Third Party Stuff
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import (
    filters,
    viewsets,
)

# Agenda Stuff
from apps.base import response
from apps.base.api.mixins import (
    CustomModelViewSet,
    MultipleSerializerMixin,
)
from apps.base.api.permissions import CRUDModelPermissions
from apps.core import serializers
from apps.core.models import (
    Activity,
    ActivityType,
    Customer,
)

logger = logging.getLogger(__name__)


class CustomerViewSet(MultipleSerializerMixin, CustomModelViewSet):
    permission_classes = (CRUDModelPermissions,)
    serializer_class = serializers.CustomerSerializer
    filterset_fields = ("seller",)
    serializer_classes = {
        "get_all": serializers.CustomerGetAllSerializer,
        "list": serializers.CustomerListSerializer,
        "retrieve": serializers.CustomerListSerializer,
    }

    def get_queryset(self):
        seller = self.request.user
        queryset = Customer.objects.all()

        if not seller.is_superuser:
            queryset = queryset.filter(seller=seller)

        return queryset


class ActivityTypeViewSet(MultipleSerializerMixin, CustomModelViewSet):
    queryset = ActivityType.objects.all()
    permission_classes = (CRUDModelPermissions,)
    serializer_class = serializers.ActivityTypeSerializer
    serializer_classes = {
        "get_all": serializers.ActivityTypeGetAllSerializer,
    }


class ActivityViewSet(MultipleSerializerMixin, viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter,)
    serializer_class = serializers.ActivitySerializer
    permission_classes = (CRUDModelPermissions,)
    filter_fields = {
        "type": ["exact"],
        "schedule_at": ["gte", "lte"],
        "finish_at": ["gte", "lte"],
    }
    serializer_classes = {
        "get_all": serializers.ActivityGetAllSerializer,
        "list": serializers.ActivityRetrieveSerializer,
        "retrieve": serializers.ActivityRetrieveSerializer,
    }

    def get_queryset(self):
        seller = self.request.user
        queryset = Activity.objects.all().prefetch_related("type", "customer", "seller")

        if not seller.is_superuser:
            queryset = queryset.filter(seller=seller, status=Activity.ACTIVE)

        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.status = Activity.CANCELED
            instance.save()
        except Exception as exc:
            logger.error(exc)

        return response.NoContent()
