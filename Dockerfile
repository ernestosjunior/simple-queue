FROM node:latest

RUN mkdir app
WORKDIR /app

COPY package*.json ./

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        bzip2 \
        libfontconfig \
        curl

RUN npm install --prod

RUN echo "America/Sao_Paulo" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

COPY . .

EXPOSE 3000

CMD ["/bin/bash","/app/entrypoint.sh"]