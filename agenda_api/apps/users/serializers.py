# Third Party Stuff
from django.contrib.auth import password_validation
from rest_framework import serializers

# Agenda Stuff
from apps.users import services as user_services
from apps.users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "full_name", "email", "is_superuser"]


class UserGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "full_name"]


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
        )

    def validate_password(self, value):
        password_validation.validate_password(value, self.instance)
        return value

    def create(self, validated_data):
        instance = user_services.create_user_account(**validated_data)
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop("password", False)
        instance = super(UserCreateSerializer, self).update(instance, validated_data)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
