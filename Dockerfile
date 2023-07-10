FROM node:latest

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 4200

CMD npm run start
