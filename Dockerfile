FROM node:latest

RUN mkdir app
WORKDIR /app

RUN npm i -g pm2

COPY package*.json ./
COPY pm2.json ./

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        bzip2 \
        libfontconfig \
        curl

RUN npm install

RUN echo "America/Sao_Paulo" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

COPY . .

EXPOSE 3000

CMD ["pm2-runtime","start", "pm2.json"]