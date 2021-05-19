FROM nginx:1.19.10-alpine

RUN apk add --update --no-cache \
    nodejs --repository="http://dl-cdn.alpinelinux.org/alpine/v3.11/main/" \
    npm

WORKDIR /app

ENV NODE_ENV=production

ENV REACT_APP_URL_SCHEMA="http"
ENV REACT_APP_DOMAIN="localhost:8000"
ENV REACT_APP_BASE_API_V1="/api"
ENV REACT_APP_LOCAL_STORAGE_USER="authUser"
ENV REACT_APP_SITE_NAME="Administración de Agenda"

COPY . .
COPY default.conf /etc/nginx/conf.d/

RUN npm install --quiet && npm run build

EXPOSE 80
