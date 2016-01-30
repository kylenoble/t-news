FROM node:0.12

MAINTAINER Kyle Noble <kyle.nobl@gmail.com>

EXPOSE 8000

COPY . /data
WORKDIR /data
RUN npm install

CMD ["npm","start"]
