FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-progress \
    --optimize-autoloader \
    --no-scripts

FROM php:8.4-fpm

# Argumentos de construcción
ARG user=www
ARG uid=1000

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libsqlite3-dev \
    zip \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo pdo_pgsql pgsql pdo_sqlite mbstring exif pcntl bcmath gd

# Crear usuario del sistema
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar dependencias de Composer
COPY --from=vendor /app/vendor /var/www/html/vendor

# Copiar los archivos del proyecto
COPY . /var/www/html

# Copiar script entrypoint
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Dar permisos completos al directorio de trabajo
RUN chown -R $user:$user /var/www/html
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto 8000
EXPOSE 8000

# Usar el entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
