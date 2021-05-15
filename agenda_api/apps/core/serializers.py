# Third Party Stuff
from rest_framework import serializers

# Agenda Stuff
from apps.core import models
from apps.users.serializers import UserGetAllSerializer


# Customer
# ------------------------------------------------------------------------------
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = (
            "id",
            "name",
            "created_at",
            "modified_at",
        )


class CustomerGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = (
            "id",
            "name",
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
