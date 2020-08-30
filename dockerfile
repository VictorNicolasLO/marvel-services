FROM node:10-alpine
ARG package
RUN npm install -g npm
RUN npm install -g typescript

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --pure-lockfile --no-cache

WORKDIR /usr/src/app/packages/${package}

RUN yarn build

EXPOSE 3200

CMD ["npm", "run", "start:prod"]
