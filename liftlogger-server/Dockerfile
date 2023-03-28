FROM node:lts-alpine3.17

WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./

RUN npm install
RUN npm install -g nodemon ts-node
COPY . ./

RUN npx prisma generate

EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start:dev"]
