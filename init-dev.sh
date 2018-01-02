apt install docker.io docker-compose wget -y
wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-v8.9.3-linux-x64.tar.gz && \
    rm node-v8.9.3-linux-x64.tar.gz 
cp daemon.json /etc/docker/daemon.json; 
service docker restart;
#npm run dev-server & npm run dev-client;