FROM node:18.16.0

WORKDIR /app

COPY package.json .

RUN npm i 

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

