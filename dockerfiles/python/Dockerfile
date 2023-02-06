# The base image is python:3.9-alpine
FROM python:3.11-alpine

# The time zone is passed in as an argument
ARG TZ

# Upgrade the pip package manager
RUN pip install --upgrade pip

# Set the working directory
WORKDIR /app

# Copy scripts to the working directory
COPY . .

# Install the required packages listed in requirements.txt
RUN pip install -r requirements.txt

# Add the tzdata package for timezone support
RUN apk add --no-cache tzdata

# Set the time zone
ENV TZ=$TZ

# Set up a cron job to run the send_email.py script every 6am and 6pm
RUN echo "* * * * * python /app/send_email.py >> /var/log/cron.log 2>&1" > /etc/crontabs/root
# RUN echo "0 6,18 * * * python /app/send_email.py >> /var/log/cron.log 2>&1" > /etc/crontabs/root

# Start the cron daemon as the default command when the container starts
CMD ["crond", "-f"]