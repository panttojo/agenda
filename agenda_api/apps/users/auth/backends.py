# Standard Library
import re

# Third Party Stuff
from rest_framework.authentication import BaseAuthentication

# Agenda Stuff
from apps.users.auth import tokens


class UserTokenAuthentication(BaseAuthentication):
    """Self-contained stateles authentication implementation that work similar to OAuth2.

    It uses json web tokens (https://github.com/jpadilla/pyjwt) for trust
    data stored in the token.
    """

    auth_rx = re.compile(r"^Bearer (.+)$")

    def authenticate(self, request):
        if "HTTP_AUTHORIZATION" not in request.META:
            return None

        token_rx_match = self.auth_rx.search(request.META["HTTP_AUTHORIZATION"])
        if not token_rx_match:
            return None

        token = token_rx_match.group(1)
        user = tokens.get_user_for_token(token, "authentication")

        return (user, token)

    def authenticate_header(self, request):
        return 'Bearer realm="api"'
