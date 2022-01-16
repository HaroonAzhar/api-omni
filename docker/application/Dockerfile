FROM node:12.17.0-alpine3.11
# Create Directory for the Container
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN yarn install
# TypeScript
RUN yarn build
# Start
CMD [ "yarn", "serve" ]
EXPOSE 7001
