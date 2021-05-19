# Third Party Stuff
from django.test import TestCase

# Agenda Stuff
from apps.core.models import ActivityType


class ActivityTypeModelTestCase(TestCase):
    def test_create_activity_type(self):
        a = ActivityType.objects.create(name="Visita", value=30)

        assert a.name == "Visita"
        assert a.value == 30
        assert str(a) == "{} | {} min".format(a.name, a.value)
