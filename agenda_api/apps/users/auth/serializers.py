# Third Party Stuff
from rest_framework import serializers

# Agenda Stuff
from apps.users.auth import tokens
from apps.users.serializers import UserSerializer


class EmptySerializer(serializers.Serializer):
    pass


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=120, required=True)
    password = serializers.CharField(required=True)


class AuthUserSerializer(UserSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ["auth_token"]

    def get_auth_token(self, obj):
        return tokens.get_token_for_user(obj, "authentication")
