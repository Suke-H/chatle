#!/bin/sh

# Honoサーバーをバックグラウンドで起動
cd /app/backend
node dist/index.js &

# Nginxをフォアグラウンドで起動
nginx -g 'daemon off;'
