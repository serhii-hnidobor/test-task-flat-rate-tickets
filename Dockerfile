FROM node:lts-alpine

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser\
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    chromium

WORKDIR /app

COPY ./dist ./dist

EXPOSE 3000

CMD ["node", "./dist/index.js"]
