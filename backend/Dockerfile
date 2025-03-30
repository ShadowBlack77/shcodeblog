FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install --only=production --legacy-peer-deps

COPY dist /app/dist
COPY frontend-dist /app/frontend-dist
COPY config/shcode-blog-firebase-adminsdk-fbsvc-c3dcd90665.json /app/config/
COPY .env /app/.env

EXPOSE 8080

CMD ["node", "dist/main.js"]
