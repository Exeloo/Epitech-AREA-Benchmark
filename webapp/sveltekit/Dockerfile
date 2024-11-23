FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

RUN npm run build
RUN npm prune --production

FROM node:18-alpine
WORKDIR /app
# Copiez les fichiers générés dans l'image finale
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
# Lancez l'application avec Node.js
CMD ["node", "build/index.js"]
