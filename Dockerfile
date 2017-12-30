
# http://os.51cto.com/art/201507/487057_all.htm
# https://segmentfault.com/a/1190000008945039

#docker 
# http://blog.csdn.net/weixin_36806758/article/details/53318261

#docker compose
# https://www.cnblogs.com/neptunemoon/p/6512121.html

# 使用DaoCloud的Ubuntu镜像
FROM daocloud.io/library/ubuntu:14.04

# 设置镜像作者
MAINTAINER Fundebug <help@fundebug.com>

# 设置时区
RUN sudo sh -c "echo 'Asia/Shanghai' > /etc/timezone" && \
    sudo dpkg-reconfigure -f noninteractive tzdata

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
RUN sudo apt-get update && sudo apt-get install -y wget

# 安装python环境
# 安装pip依赖：setuptools
RUN sudo apt-get install -y python python-dev python-distribute python-pip

# 使用淘宝镜像安装Node.js v8.9.3
RUN wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-v8.9.3-linux-x64.tar.gz && \
    rm node-v8.9.3-linux-x64.tar.gz 

WORKDIR /app

# 安装npm模块
ADD package.json /app/package.json

# 使用淘宝的npm镜像
RUN npm install --production -d --registry=https://registry.npm.taobao.org

# 添加源代码
ADD . /app

RUN pip install -r exploit/jexboss/requires.txt

# 运行app.js
CMD ["node", "/app/_main.js"]