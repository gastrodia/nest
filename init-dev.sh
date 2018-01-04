


sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88
 sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update 
sudo apt-get install docker-ce

sudo apt install docker-compose wget -y
sudo cp daemon.json /etc/docker/daemon.json; 
sudo service docker restart;
# wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.gz && \
#     tar -C /usr/local --strip-components 1 -xzf node-v8.9.3-linux-x64.tar.gz && \
#     rm node-v8.9.3-linux-x64.tar.gz 
#npm run dev-server & npm run dev-client;
