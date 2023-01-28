FROM node:16.19.0
WORKDIR /app
COPY /package*.json ./
RUN npm install

COPY next.config.js ./next.config.js
COPY next-i18next.config.js /next.con
COPY pages ./pages
COPY public ./public
COPY styles ./styles

CMD [ "npm", "run", "dev" ]
