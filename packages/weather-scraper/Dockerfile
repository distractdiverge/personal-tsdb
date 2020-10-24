# FROM NODE:15 as build
# TODO: Multi-stage build w/ TSC
#

FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only-production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "./src/index.js"]