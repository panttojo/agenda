# Third Party Stuff
from django.test import TestCase

# Agenda Stuff
from apps.core.models import Customer
from apps.users.models import User


class CustomerModelTestCase(TestCase):
    def test_create_customer(self):
        seller = User.objects.create_user(username="seller_1")
        c = Customer.objects.create(name="Test", seller=seller)

        assert c.name == "Test"
        assert c.seller == seller
        assert str(c) == str(c.name)
