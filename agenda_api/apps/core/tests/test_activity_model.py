# Standard Library
from datetime import (
    datetime,
    timedelta,
)

# Third Party Stuff
from django.test import TestCase

# Agenda Stuff
from apps.core.models import (
    Activity,
    ActivityType,
    Customer,
)
from apps.users.models import User


class ActivityModelTestCase(TestCase):
    def test_create_activity(self):
        now = datetime.utcnow()
        a_t = ActivityType.objects.create(name="G", value=30)
        s = User.objects.create_user(username="V")
        c = Customer.objects.create(name="C", seller=s)
        a = Activity.objects.create(
            schedule_at=now,
            notes="Testing notes",
            type=a_t,
            customer=c,
            seller=s,
        )

        assert a.schedule_at == now
        assert a.notes == "Testing notes"
        assert a.status == Activity.ACTIVE
        assert a.type == a_t
        assert a.customer == c
        assert a.seller == s

    def test_create_activity_without_defaults(self):
        now = datetime.utcnow()
        a_t = ActivityType.objects.create(name="G", value=30)
        s = User.objects.create_user(username="V")
        c = Customer.objects.create(name="C", seller=s)
        a = Activity.objects.create(
            schedule_at=now,
            type=a_t,
            customer=c,
            seller=s,
        )

        assert a.schedule_at == now
        assert a.notes == ""
        assert a.status == Activity.ACTIVE
        assert a.type == a_t
        assert a.customer == c
        assert a.seller == s

    def test_schedule_and_finish(self):
        a_t = ActivityType.objects.create(name="G", value=30)

        now = datetime.utcnow()
        finish_at = now + timedelta(minutes=a_t.value) - timedelta(milliseconds=1)

        s = User.objects.create_user(username="V")
        c = Customer.objects.create(name="C", seller=s)
        a = Activity.objects.create(
            schedule_at=now,
            type=a_t,
            customer=c,
            seller=s,
        )

        assert a.schedule_at == now
        assert a.finish_at == finish_at
        assert a.notes == ""
        assert a.status == Activity.ACTIVE
        assert a.type == a_t
        assert a.customer == c
        assert a.seller == s
