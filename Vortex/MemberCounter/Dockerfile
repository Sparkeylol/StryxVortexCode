FROM node:15.5.0-alpine3.10

RUN mkdir /opt/bot

COPY . /opt/bot
WORKDIR /opt/bot

COPY . /opt/bot

RUN yarn

CMD ["node", "/opt/bot/script.js"]
