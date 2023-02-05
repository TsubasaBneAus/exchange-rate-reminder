FROM python:3.9-alpine

ARG TZ

RUN pip install --upgrade pip

WORKDIR /app

COPY requirements.txt .
COPY send_email.py .
RUN pip install -r requirements.txt

RUN apk add --no-cache tzdata
ENV TZ=$TZ

RUN echo "* * * * * python -u /app/send_email.py >> /var/log/cron.log 2>&1" > /etc/crontabs/root

CMD ["crond", "-f"]