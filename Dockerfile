FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY src ./src
COPY migrations ./migrations
COPY tsconfig.json ./
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations ./migrations

CMD ["node", "./dist/index.js"]