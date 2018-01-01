
# http://os.51cto.com/art/201507/487057_all.htm
# https://segmentfault.com/a/1190000008945039

#docker 
# http://blog.csdn.net/weixin_36806758/article/details/53318261

#docker compose
# https://www.cnblogs.com/neptunemoon/p/6512121.html

# 使用DaoCloud的Ubuntu镜像
FROM ./apps/node




# 安装python环境
# 安装pip依赖：setuptools
RUN sudo apt-get install -y python python-dev python-distribute python-pip


WORKDIR /container

# 安装npm模块
ADD package.json /container/package.json

# 使用淘宝的npm镜像
RUN npm install --production -d --registry=https://registry.npm.taobao.org

RUN npm install -g nodemon --registry=https://registry.npm.taobao.org

WORKDIR /container/app
# add exploit
ADD exploit /container/app/exploit
RUN pip install -r exploit/jexboss/requires.txt

# 添加源代码
ADD . /container/app

# 运行app.js
CMD ["node", "main.js"]