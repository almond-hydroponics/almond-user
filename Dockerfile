## 1. BUILD STAGE
FROM node:16-alpine as build
# set labels
LABEL maintainer="Francis Masha" MAINTAINER="Francis Masha <francismasha96@gmail.com>"
LABEL application="almond-user"
# set variables
ENV APP_HOME=/home/node/app
RUN mkdir -p $APP_HOME && chown -R node:node $APP_HOME
WORKDIR $APP_HOME
# Set non-root user and folder
USER node
# Copy source code (and all other relevant files)
COPY --chown=node:node . ./
RUN yarn install --immutable \
  && yarn build

## 2. RUNTIME STAGE
FROM node:16-alpine
ENV APP_HOME=/home/node/app
RUN mkdir -p $APP_HOME && chown -R node:node $APP_HOME
RUN apk add --no-cache libpq
ADD https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/v0.3.2/grpc_health_probe-linux-amd64 /bin/grpc_health_probe
RUN chmod +x /bin/grpc_health_probe
# Set non-root user and expose port 3000
USER node
WORKDIR $APP_HOME
COPY --chown=node:node --from=build $APP_HOME/dist ./dist
EXPOSE 50051

CMD ["node", "main.js"]
