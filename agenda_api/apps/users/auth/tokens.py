# Third Party Stuff
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

# Agenda Stuff
from apps.base import exceptions as exc


def get_token_for_user(user, scope: str) -> str:
    data = {"user_%s_id" % (scope): str(user.id)}
    return jwt.encode(data, settings.SECRET_KEY)


def get_user_for_token(token: str, scope: str):
    try:
        data = jwt.decode(token, settings.SECRET_KEY)
    except jwt.DecodeError:
        raise exc.NotAuthenticated(_("Invalid token"))

    model_cls = get_user_model()

    try:
        user = model_cls.objects.get(pk=data["user_%s_id" % (scope)])
    except (model_cls.DoesNotExist, KeyError):
        raise exc.NotAuthenticated(_("Invalid token"))
    else:
        return user
