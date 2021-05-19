#!/usr/bin/env bash

uwsgi \
    --http 0.0.0.0:8000 \
    --chdir /app \
    --wsgi-file wsgi.py \
    --master \
    --processes 2 \
    --threads 2
