apt-get install apt-transport-https 
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9 
bash -c "echo deb https://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list" 
apt-get update 
apt-get install lxc-docker
apt install docker-compose wget -y
cp daemon.json /etc/docker/daemon.json; 
service docker restart;
# wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.gz && \
#     tar -C /usr/local --strip-components 1 -xzf node-v8.9.3-linux-x64.tar.gz && \
#     rm node-v8.9.3-linux-x64.tar.gz 
#npm run dev-server & npm run dev-client;
