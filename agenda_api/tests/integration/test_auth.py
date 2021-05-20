# Standard Library
import json

# Third Party Stuff
import pytest
from django.urls import reverse

# Agenda Stuff
from apps.users.services import create_user_account

pytestmark = pytest.mark.django_db


def test_user_login(client):
    url = reverse("auth-login")
    u = create_user_account(username="testr", password="test")

    credentials = {"username": u.username, "password": "test"}
    response = client.json.post(url, json.dumps(credentials))
    assert response.status_code == 200
    expected_keys = ["id", "username", "is_superuser", "email", "first_name", "last_name", "auth_token"]
    assert set(expected_keys).issubset(response.data.keys())
