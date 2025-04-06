FROM node:20-alpine

WORKDIR /app 

COPY package*.json /app/

RUN npm install --only=production --legacy-peer-deps

COPY dist /app/dist

EXPOSE 8080 

CMD ["node", "dist/apps/api/main.js"]