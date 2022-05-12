FROM php:7.4-apache

RUN apt-get update && apt-get install -y iputils-ping

COPY ./app /var/www/html
COPY ./flag.txt /

RUN chmod 0555 /var/www/html

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
