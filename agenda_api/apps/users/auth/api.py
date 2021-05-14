# Third Party Stuff
from django.contrib.auth import logout
from django.utils.translation import gettext_lazy as _
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

# Agenda Stuff
from apps.base import response
from apps.base.api.mixins import MultipleSerializerMixin
from apps.users import services as user_services
from apps.users.auth import serializers


class AuthViewSet(MultipleSerializerMixin, viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_classes = {
        "login": serializers.LoginSerializer,
        "logout": serializers.EmptySerializer,
    }

    @action(methods=["POST"], detail=False)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = user_services.get_and_authenticate_user(**serializer.validated_data)
        data = serializers.AuthUserSerializer(user).data
        return response.Ok(data)

    @action(methods=["POST"], detail=False)
    def logout(self, request):
        """
        Calls Django logout method; Does not work for UserTokenAuth.
        """
        logout(request)
        return response.Ok({"success": _("Successfully logged out.")})
