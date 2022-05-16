FROM node:17-alpine

RUN apk update && apk --no-cache add curl

WORKDIR /app

COPY . .

RUN npm install

CMD ["node", "app.js"]
