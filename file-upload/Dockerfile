FROM php:7.4-apache

RUN apt-get update

COPY ./app /var/www/html
COPY ./flag.txt /

RUN chmod 0555 /var/www/html

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
