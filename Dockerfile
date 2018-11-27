//Dockerfile
FROM node:8.13.0

# use changes to package.json to force Docker not to use the cache# when we change our application's nodejs dependencies:ADD package.json /tmp/package.jsonRUN cd /tmp && yarn installRUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# From here we load our application's code in, therefore the previous docker# "layer" thats been cached will be used if possibleWORKDIR /usr/src/appADD . /usr/src/app

RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./src

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
