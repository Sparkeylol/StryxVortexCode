FROM node:15.5.0-alpine3.10

RUN mkdir /opt/bot

COPY . /opt/bot
WORKDIR /opt/bot

COPY . /opt/bot

# Install make
RUN apk update \
&& apk add --virtual build-dependencies \
build-base \
gcc \
wget \
git 

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN npm ci --only=production

CMD ["node", "/opt/bot/bot.js"]
