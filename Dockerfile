# Stage 1: フロントエンドビルド
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Stage 2: バックエンドビルド
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ .
RUN npm run build

# Stage 3: 本番環境
FROM nginx:alpine
WORKDIR /app

# フロントエンドの静的ファイルをコピー
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# バックエンドのビルド済みファイルとnode_modulesをコピー
COPY --from=backend-builder /app/backend/dist /app/backend/dist
COPY --from=backend-builder /app/backend/node_modules /app/backend/node_modules
COPY --from=backend-builder /app/backend/package.json /app/backend/package.json

# Nginx設定
COPY default.conf /etc/nginx/conf.d/default.conf

# Node.jsランタイムをインストール
RUN apk add --no-cache nodejs

# 起動スクリプト
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]
