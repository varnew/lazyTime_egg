FROM node

RUN cd /
RUN mkdir data
RUN mkdir /data/bacc_egg_service
COPY ./ /data/bacc_egg_service
WORKDIR /data/bacc_egg_service
RUN npm i
#CMD ls
#CMD npm i --production --registry=https://registry.npm.taobao.org
#CMD which node
#CMD which npm
#CMD npm install
#CMD ls
#CMD npm run start
EXPOSE 7002
CMD ["npm run start"]
