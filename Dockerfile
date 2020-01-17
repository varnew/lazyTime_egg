FROM node

RUN cd /
RUN mkdir data
RUN mkdir /data/bacc_egg_service
COPY ./ /data/bacc_egg_service
RUN cd /data/bacc_egg_service
RUN npm run start
EXPOSE 7002
