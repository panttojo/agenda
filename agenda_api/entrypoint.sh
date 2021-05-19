#!/bin/bash
set -eu
set -o pipefail

python /app/manage.py migrate --noinput
python /app/manage.py loaddata fixtures/activity_types.json
python /app/manage.py collectstatic --noinput
python /app/manage.py compilemessages --l es

exec "$@"
