FROM node:14.16.0-alpine3.10

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY . /app/src

# check files list
RUN ls -a

RUN yarn install --prefer-offline --frozen-lockfile --verbose
RUN npm install -g typescript

RUN npx prisma generate --schema="/app/src/prisma/schema.prisma"

RUN npm run build

CMD [ "node", "./dist/index.js" ]