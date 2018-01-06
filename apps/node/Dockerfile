
# http://os.51cto.com/art/201507/487057_all.htm
# https://segmentfault.com/a/1190000008945039

#docker 
# http://blog.csdn.net/weixin_36806758/article/details/53318261

#docker compose
# https://www.cnblogs.com/neptunemoon/p/6512121.html


FROM ubuntu:16.04

# 设置镜像作者
MAINTAINER gastrodia <gastrodia@outlook.com>



# 使用阿里云的Ubuntu镜像
RUN echo '\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n'\
> /etc/apt/sources.list

# 安装 wget
RUN apt-get update && apt-get install -y wget tzdata

# 设置时区
RUN  sh -c "echo 'Asia/Shanghai' > /etc/timezone" && \
     dpkg-reconfigure -f noninteractive tzdata


# 使用淘宝镜像安装Node.js v8.9.3
RUN wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-v8.9.3-linux-x64.tar.gz && \
    rm node-v8.9.3-linux-x64.tar.gz 

RUN npm install -g nodemon --registry=https://registry.npm.taobao.org

