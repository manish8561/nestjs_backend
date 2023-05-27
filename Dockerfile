FROM node:18.16.0

ARG DEFAULT_PORT=3000

WORKDIR /app

COPY package.json .

RUN npm i 

COPY . .

RUN npm run build

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

CMD ["npm", "run", "start:dev"]

