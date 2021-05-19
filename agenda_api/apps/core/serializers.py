# Third Party Stuff
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

# Agenda Stuff
from apps.core import models
from apps.core.services import validate_activity
from apps.users.serializers import UserGetAllSerializer


# Customer
# ------------------------------------------------------------------------------
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = (
            "id",
            "name",
            "seller",
            "created_at",
            "modified_at",
        )

    def create(self, validated_data):
        seller = self.context["request"].user

        if seller.is_superuser and validated_data.get("seller", False):
            seller = validated_data.get("seller")

        payload = {**validated_data, "seller": seller}
        return super(CustomerSerializer, self).create(payload)


class CustomerGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = (
            "id",
            "name",
        )


class CustomerListSerializer(serializers.ModelSerializer):
    seller = UserGetAllSerializer()

    class Meta:
        model = models.Customer
        fields = (
            "id",
            "name",
            "seller",
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
            "description",
            "created_at",
            "modified_at",
        )


class ActivityTypeGetAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ActivityType
        fields = (
            "id",
            "name",
            "value",
            "description",
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
            "status_label",
            "type",
            "customer",
            "seller",
            "created_at",
            "modified_at",
        )

    def validate(self, data):
        seller = self.context["request"].user

        if seller.is_superuser and data.get("seller", False):
            seller = data.get("seller")

        is_valid = validate_activity(self.instance, seller, data)

        if not is_valid:
            raise serializers.ValidationError(_("There is currently an activity scheduled for this date."))

        return data

    def create(self, validated_data):
        seller = self.context["request"].user

        if seller.is_superuser and validated_data.get("seller", False):
            seller = validated_data.get("seller")

        payload = {**validated_data, "seller": seller}
        return super(ActivitySerializer, self).create(payload)


class ActivityGetAllSerializer(serializers.ModelSerializer):
    customer = CustomerGetAllSerializer()
    type = ActivityTypeGetAllSerializer()

    class Meta:
        model = models.Activity
        fields = (
            "id",
            "schedule_at",
            "finish_at",
            "status",
            "customer",
            "type",
        )


class ActivityRetrieveSerializer(serializers.ModelSerializer):
    customer = CustomerGetAllSerializer()
    seller = UserGetAllSerializer()
    type = ActivityTypeGetAllSerializer()

    class Meta:
        model = models.Activity
        fields = (
            "id",
            "schedule_at",
            "customer",
            "seller",
            "type",
            "notes",
            "status",
            "status_label",
        )
