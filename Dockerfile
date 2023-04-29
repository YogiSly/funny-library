FROM node:18.14-alpine

WORKDIR /app

ARG NODE_ENV=production

COPY ./src /app/

RUN yarn install

COPY . .

CMD ["npm", "run", "server"]