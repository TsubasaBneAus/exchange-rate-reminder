# The base image is python:3.11-alpine
FROM python:3.11-alpine

# The time zone that is passed in as an argument
ARG TZ

# Upgrade the pip package manager
RUN pip install --upgrade pip

# Copy scripts to the working directory
WORKDIR /app
COPY src-db ./src-db
COPY src-email ./src-email

# Install the required packages listed in requirements.txt
# and set the file permission for each main.py
WORKDIR /app/src-db
RUN pip install -r requirements.txt
WORKDIR /app/src-email
RUN pip install -r requirements.txt

# Add the tzdata package for timezone support
WORKDIR /app
RUN apk add --no-cache tzdata

# Set the time zone
ENV TZ=$TZ

# Set up cron jobs to run the python scripts
RUN echo "* * * * * python /app/src-db/main.py >> /var/log/cron.log 2>&1" \
    > /etc/crontabs/root
RUN echo "* * * * * python /app/src-email/main.py >> /var/log/cron.log 2>&1" \
    >> /etc/crontabs/root

# RUN echo "59 5,11,17,23 * * * python /app/src-db/main.py >> /var/log/cron.log 2>&1" \
#     > /etc/crontabs/root
# RUN echo "0 6,18 * * * python /app/src-email/main.py >> /var/log/cron.log 2>&1" \
#     >> /etc/crontabs/root

# Start the cron daemon
CMD ["crond", "-f"]