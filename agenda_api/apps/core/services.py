# Standard Library
from datetime import timedelta

# Third Party Stuff
from django.db import models

# Agenda Stuff
from apps.core.models import Activity


def validate_activity(instance, seller, data):
    activities = seller.activities.all()

    if instance:
        activities = activities.exclude(id=instance.id)

    start_at = data["schedule_at"]
    end_at = data["schedule_at"] + timedelta(minutes=data["type"].value) - timedelta(milliseconds=1)

    intervals = [start_at, end_at]
    filters = (
        models.Q(schedule_at__range=intervals)
        | models.Q(finish_at__range=intervals)
    )

    some_activity = activities.filter(filters, status=Activity.ACTIVE).exists()

    return not some_activity
