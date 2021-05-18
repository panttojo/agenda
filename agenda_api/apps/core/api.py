# Agenda Stuff
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


class CustomerViewSet(MultipleSerializerMixin, CustomModelViewSet):
    permission_classes = (CRUDModelPermissions,)
    serializer_class = serializers.CustomerSerializer
    serializer_classes = {
        "get_all": serializers.CustomerGetAllSerializer,
        "list": serializers.CustomerListSerializer,
        "retrieve": serializers.CustomerListSerializer,
    }

    def get_queryset(self):
        user = self.request.user
        customers = Customer.objects.all()

        if not user.is_superuser:
            customers = customers.filter(user=user)

        return customers


class ActivityTypeViewSet(MultipleSerializerMixin, CustomModelViewSet):
    queryset = ActivityType.objects.all()
    permission_classes = (CRUDModelPermissions,)
    serializer_class = serializers.ActivityTypeSerializer
    serializer_classes = {
        "get_all": serializers.ActivityTypeGetAllSerializer,
    }


class ActivityViewSet(MultipleSerializerMixin, CustomModelViewSet):
    serializer_class = serializers.ActivitySerializer
    permission_classes = (CRUDModelPermissions,)
    serializer_classes = {
        "get_all": serializers.ActivityGetAllSerializer
    }

    def get_queryset(self):
        queryset = Activity.objects.owner(seller=self.request.user).prefetch_related("type", "customer", "seller")
        return queryset
