FROM node

RUN cd /
RUN mkdir data
RUN mkdir /data/bacc_egg_service
COPY ./ /data/bacc_egg_service
CMD cd /data/bacc_egg_service
CMD ls
CMD npm i --production --registry=https://registry.npm.taobao.org
CMD which node
CMD which npm
CMD npm install
CMD ls
CMD npm run start
EXPOSE 7002
