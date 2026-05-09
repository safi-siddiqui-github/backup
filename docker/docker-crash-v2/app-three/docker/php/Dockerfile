FROM php:8.1-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql

# Allow super user - for composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# Obtain the composer inside our container not in its own con
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Due to context ./docker/php,
# Dockerfile refers to ./docker/php/app, for ./app file 
# changed context = .
# changed dockerfile = docker/php/Dockerfile
# so that docler bulds from current foler

# COPY composer.json and lock files instead of all files 
# This is to take advantage of docker cache
# so if composer.josn file changes then composer will install
COPY ./app/composer.* ./

# install
RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

# Copy app files
COPY ./app/ ./

# Workdirectory by defualt is /var/www/html
# check using docker exec --it 

RUN composer dump-autoload --optimize

RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html
