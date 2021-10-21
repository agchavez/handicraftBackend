FROM node:14

WORKDIR /src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

COPY .env ./dist/

EXPOSE 8080

CMD node ./dist/src/app.js