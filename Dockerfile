FROM node:12

WORKDIR /usr/src/bigbang-challenge/

COPY package*.json ./

RUN npm install --quiet

COPY . .
