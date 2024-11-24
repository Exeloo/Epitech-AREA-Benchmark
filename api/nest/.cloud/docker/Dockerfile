# build

FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile

# production

FROM node:22-alpine as production

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY ./dist ./dist

# required to run migrations :(
COPY package.json ./
COPY tsconfig.json ./
COPY ./src ./src
COPY ./public ./public
COPY ./views ./views

CMD ["/bin/sh", "-c", "yarn migration:up;node dist/main"]
