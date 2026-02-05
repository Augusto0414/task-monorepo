#!/bin/sh
set -e

# Crear .env basado en variables de entorno
cat > /var/www/html/.env << EOF
APP_NAME=${APP_NAME:-Laravel}
APP_ENV=${APP_ENV:-local}
APP_KEY=${APP_KEY:-base64:W9EUpabjrSEcCGyaQpJnq/vehP9DhuvbxIrUXZvPBT0=}
APP_DEBUG=${APP_DEBUG:-true}
APP_URL=${APP_URL:-http://localhost:8000}
JWT_SECRET=${JWT_SECRET:-your-secret-key}
DB_CONNECTION=${DB_CONNECTION:-pgsql}
DB_HOST=${DB_HOST:-postgres}
DB_PORT=${DB_PORT:-5432}
DB_DATABASE=${DB_DATABASE:-coredb}
DB_USERNAME=${DB_USERNAME:-appuser}
DB_PASSWORD=${DB_PASSWORD:-apppass}
SESSION_DRIVER=${SESSION_DRIVER:-database}
QUEUE_CONNECTION=${QUEUE_CONNECTION:-database}
CACHE_STORE=${CACHE_STORE:-file}
BROADCAST_CONNECTION=${BROADCAST_CONNECTION:-reverb}
REVERB_APP_ID=${REVERB_APP_ID:-602324}
REVERB_APP_KEY=${REVERB_APP_KEY:-local}
REVERB_APP_SECRET=${REVERB_APP_SECRET:-local}
REVERB_HOST=${REVERB_HOST:-0.0.0.0}
REVERB_PORT=${REVERB_PORT:-8081}
REVERB_SCHEME=${REVERB_SCHEME:-http}
REVERB_SERVER_PORT=${REVERB_SERVER_PORT:-8081}
EOF

# Limpiar caches de bootstrap para evitar providers obsoletos
rm -f /var/www/html/bootstrap/cache/*.php

php artisan package:discover --ansi

if [ "${APP_ROLE}" = "reverb" ]; then
	php artisan reverb:start
	exit 0
fi

# Ejecutar migraciones
php artisan migrate --force

# Ejecutar seeders
php artisan db:seed --force

# Iniciar servidor
php artisan serve --host=0.0.0.0 --port=8000
