# Third Party Stuff
from django.contrib.auth import (
    authenticate,
    get_user_model,
)
from django.utils.translation import gettext_lazy as _

# Agenda Stuff
from apps.base import exceptions as exc


def get_and_authenticate_user(username, password):
    user = authenticate(username=username, password=password)
    if user is None:
        raise exc.WrongArguments(_("Invalid username/password. Please try again!"))

    return user


def create_user_account(username, password, email="", first_name="", last_name=""):
    user = get_user_model().objects.create_user(
        username=username, email=email, password=password, first_name=first_name, last_name=last_name
    )
    return user


def get_user_by_username(username: str):
    return get_user_model().objects.filter(username__iexact=username).first()
