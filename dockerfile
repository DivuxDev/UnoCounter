# 1. Construir la app de Vue
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Ejecutar servidor Node + json-server
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=build /app/dist ./dist
COPY db.json ./
COPY server.js ./

EXPOSE 8080
CMD ["node", "server.js"]
