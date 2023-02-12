#!/bin/bash
set -e

# Remove any existing cron jobs
crontab -r || true

# Add new cron job for nginx-ssl service
cat > /etc/cron.d/nginx-ssl <<EOF
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# Renew SSL certificates twice a day
0 */12 * * * root /scripts/certbot.sh

# Reload nginx configuration every 36 hours
0 */36 * * * root /scripts/nginx-reload.sh
EOF

# Apply the new cron jobs
crontab /etc/cron.d/nginx-ssl

# Start the cron daemon
crond -f -l 8
