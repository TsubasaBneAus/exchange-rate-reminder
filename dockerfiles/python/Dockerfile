FROM python:3.11

ARG TZ

WORKDIR /python

RUN apt-get update
RUN apt-get install -y tzdata cron
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY python-cron .
RUN crontab python-cron

CMD [ "cron", "-f" ]