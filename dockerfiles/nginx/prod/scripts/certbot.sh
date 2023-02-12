#!/bin/bash
set -e

# Remove any existing cron jobs
crontab -r || true

# Add new cron job for certbot service
cat > /etc/cron.d/certbot <<EOF
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# Renew SSL certificates twice a day
0 */12 * * * root /scripts/certbot.sh
EOF

# Apply the new cron jobs
crontab /etc/cron.d/certbot

# Start the cron daemon
crond -f -l 8
