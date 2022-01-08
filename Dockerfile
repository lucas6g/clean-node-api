FROM node:14
WORKDIR /usr/src/clean-node-api
COPY ./package.json ./
RUN npm install --only=prod
COPY ./build ./build
EXPOSE 3333
CMD npm start
