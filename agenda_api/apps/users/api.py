# Agenda Stuff
from apps.base.api.mixins import (
    CustomModelViewSet,
    MultipleSerializerMixin,
)
from apps.base.api.permissions import CRUDModelPermissions
from apps.users import serializers
from apps.users.models import User


class UserViewSet(MultipleSerializerMixin, CustomModelViewSet):
    queryset = User.objects.filter(is_superuser=False)
    permission_classes = (CRUDModelPermissions,)
    serializer_class = serializers.UserSerializer
    serializer_classes = {
        "get_all": serializers.UserGetAllSerializer,
        "create": serializers.UserCreateSerializer,
        "partial_update": serializers.UserCreateSerializer,
    }
