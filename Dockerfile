FROM node:14-alpine AS BUILD

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:14-alpine

WORKDIR /app

COPY --from=BUILD /app/dist ./dist
COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/config ./config
COPY --from=BUILD /app/package.json ./package.json

EXPOSE 4000

CMD [ "npm", "start" ]
