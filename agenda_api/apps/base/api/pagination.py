# Third Party Stuff
from rest_framework.pagination import LimitOffsetPagination as DrfLimitOffsetPagination


class LimitOffsetPagination(DrfLimitOffsetPagination):

    # Client can control the offset using this query parameter.
    offset_query_param = "offset"

    # Client can control the page size using this query parameter.
    # Default is 'None'. Set to eg 'page_size' to enable usage.
    limit_query_param = "per_page"

    # Set to an integer to limit the maximum page size the client may request.
    # Only relevant if 'page_size_query_param' has also been set.
    max_limit = 1000
