FROM python:3.8

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       gettext jq \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["/app/run.sh"]
