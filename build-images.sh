
docker build --rm -f apps/node/Dockerfile -t gastrodia/node:v8.9.3 apps/node
docker build --rm -f apps/jdk/Dockerfile -t gastrodia/jdk:1.8.0_151 apps/jdk