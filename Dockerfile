FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE URL:postgres://monse:1234@db:5432/integradora02?scheme-public
RUN npx prisma generate
RUN npx prisma migrate

RUN npa run build

EXPOSE 3005

CMD ["sh", "-c", "npx prisma migrate deploy && npm start", "npm", "start"]