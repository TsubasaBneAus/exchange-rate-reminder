#!/bin/sh

cd /home/ec2-user/exchange-rate-reminder
docker-compose -f docker-compose.prod-server.yml run --rm certbot renew
docker-compose -f docker-compose.prod-server.yml exec nginx nginx -s reload