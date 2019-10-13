FROM node

RUN cd /
RUN mkdir data
RUN mkdir /data/bacc_egg_service
COPY ./ /data/bacc_egg_service
EXPOSE 7002
