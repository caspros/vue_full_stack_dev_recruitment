FROM node:18-alpine as base

COPY ./ /srv/app/

WORKDIR /srv/app

COPY .env.staging .env

RUN npm install
RUN npm run build-run

RUN chown -R node /srv/app
EXPOSE 3000/tcp

USER node
ENTRYPOINT ["npm", "run", "dev-run"]
