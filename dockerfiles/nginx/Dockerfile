FROM nginx:latest
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]