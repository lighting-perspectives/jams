FROM node:10

LABEL maintainer="Guillaume Limberger <glim.dev@gmail.com>"

# Create app directory
WORKDIR /usr/src/app

RUN yarn global add pm2 sequelize-cli

# At the end, set the user to use when running this image
USER node

EXPOSE 3000

CMD [ "npm", "start" ]