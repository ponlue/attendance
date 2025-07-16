#!/bin/bash

set -e

echo "🔧 Fixing permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

echo "📦 Installing composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader

if [ ! -f /var/www/.env ]; then
  echo "⚠️  No .env file found. Skipping APP_KEY generation..."
else
  echo "🔑 Generating APP_KEY..."
  php artisan key:generate --force
fi

echo "🧼 Clearing config/cache..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

#echo "🧩 Running migrations..."
#php artisan migrate --force

echo "🚀 Starting PHP-FPM..."
exec php-fpm
