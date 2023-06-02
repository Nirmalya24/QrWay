FROM node:alpine3.17

ENV PORT 8080
EXPOSE 8080

WORKDIR /usr/app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend/ .

RUN npm run clean

RUN npm run build

CMD ["node", "AppServer.js"]