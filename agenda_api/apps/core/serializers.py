# Third Party Stuff
from rest_framework import serializers

# Agenda Stuff
from apps.core import models
from apps.users.serializers import UserGetAllSerializer


# Customer
# ------------------------------------------------------------------------------
class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.UUIDField(required=False)

    class Meta:
        model = models.Customer
        fields = (
            "id",
            "name",
            "user",
            "created_at",
            "modified_at",
        )

    def create(self, validated_data):
        user = self.context["request"].user

        if user.is_superuser and validated_data.get("user", False):
            user = validated_data.get("user")

        payload = {**validated_data, "user": user}
        return super(CustomerSerializer, self).create(payload)


class CustomerGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = (
            "id",
            "name",
        )


class CustomerListSerializer(serializers.ModelSerializer):
    user = UserGetAllSerializer()

    class Meta:
        model = models.Customer
        fields = (
            "id",
            "name",
            "user",
        )


# ActivityType
# ------------------------------------------------------------------------------
class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ActivityType
        fields = (
            "id",
            "name",
            "value",
            "created_at",
            "modified_at",
        )


class ActivityTypeGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ActivityType
        fields = (
            "id",
            "name",
        )


# Activity
# ------------------------------------------------------------------------------
class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Activity
        fields = (
            "id",
            "schedule_at",
            "notes",
            "status",
            "type",
            "customer",
            "seller",
            "created_at",
            "modified_at",
        )


class ActivityGetAllSerializer(serializers.ModelSerializer):
    customer = CustomerGetAllSerializer()
    type = ActivityTypeSerializer()

    class Meta:
        model = models.Activity
        fields = (
            "id",
            "schedule_at",
            "customer",
            "type",
        )


class ActivityRetrieveSerializer(serializers.ModelSerializer):
    customer = CustomerGetAllSerializer()
    seller = UserGetAllSerializer()
    type = ActivityTypeSerializer()

    class Meta:
        model = models.Activity
        fields = (
            "id",
            "schedule_at",
            "customer",
            "seller",
            "type",
            "notes",
            "status"
        )
