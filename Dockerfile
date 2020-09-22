FROM node:12

WORKDIR /usr/src/bigbang-challenge/

COPY ./package.json /usr/src/bigbang-challenge/
COPY ./package-lock.json /usr/src/bigbang-challenge/

RUN npm install

COPY . .

EXPOSE 5050

CMD npm run dev