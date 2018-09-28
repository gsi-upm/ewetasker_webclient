FROM node:10.11.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN yarn 

RUN yarn build

RUN yarn global add serve

CMD serve -s build