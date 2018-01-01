
docker build --rm -f apps/node/Dockerfile -t gastrodia/node:latest apps/node
docker build --rm -f apps/jdk/Dockerfile -t gastrodia/jdk:latest apps/jdk
docker build --rm -f apps/jboss/as-6.1.0/Dockerfile -t gastrodia/jboss:as-6.1.0 apps/jboss/as-6.1.0