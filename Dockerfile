# Build stage
FROM node:18 AS build

WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY ./package.json /app
COPY ./package-lock.json /app
COPY ./public /app/public
COPY ./src /app/src
COPY ./tailwind.config.js /app/tailwind.config.js

# Install dependencies
RUN yarn install && yarn build

 EXPOSE 3000

 CMD [ "npm" , "start"]