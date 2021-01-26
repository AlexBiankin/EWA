FROM node:14.15.1-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
