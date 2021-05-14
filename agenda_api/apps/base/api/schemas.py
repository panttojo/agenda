# Third Party Stuff
from rest_framework import permissions
from rest_framework.schemas import get_schema_view
from rest_framework_swagger.views import get_swagger_view

schema_view = get_schema_view(
    title="Agenda API",
    description="API para la gestoria de una agenda",
    public=True,
    permission_classes=(permissions.AllowAny,),
)

swagger_schema_view = get_swagger_view(title="Agenda API Playground")
