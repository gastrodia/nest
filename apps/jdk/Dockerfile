
# http://os.51cto.com/art/201507/487057_all.htm
# https://segmentfault.com/a/1190000008945039

#docker 
# http://blog.csdn.net/weixin_36806758/article/details/53318261

#docker compose
# https://www.cnblogs.com/neptunemoon/p/6512121.html


FROM gastrodia/node:v8.9.3 

# 设置镜像作者
MAINTAINER gastrodia <gastrodia@outlook.com>



# ENV DEBIAN_FRONTEND noninteractive

# Install JDK 8 
RUN wget --output-document=/jdk-8.tar.gz \
         --no-check-certificate \
         --no-cookies \
         --header "Cookie: oraclelicense=accept-securebackup-cookie" \
         http://download.oracle.com/otn-pub/java/jdk/8u151-b12/e758a0de34e24606bca991d704f6dcbf/jdk-8u151-linux-x64.tar.gz
RUN mkdir -p /usr/lib/jvm 
RUN tar --gunzip --extract --verbose --file /jdk-8.tar.gz --directory /usr/lib/jvm 
RUN rm -f /jdk-8.tar.gz && 
RUN chown -R root:root /usr/lib/jvm

# set the environment variables 
ENV JDK_HOME /usr/lib/jvm/jdk1.8.0_101
ENV JAVA_HOME /usr/lib/jvm/jdk1.8.0_101
ENV PATH $PATH:$JAVA_HOME/bin

# used to set common JVM tunings
ENV JVM_HEAP_MIN 128m
ENV JVM_HEAP_MAX 512m
ENV JVM_METASPACE 512m
ENV JVM_CMS_OCCUPANCY 70
ENV JVM_GC_LOG_PATH /var/logs
ENV JVM_GC_LOG_FILE_COUNT 10
ENV JVM_GC_LOG_FILE_SIZE 100M
ENV JVM_DNS_TTL 30
ENV JVM_JMX_HOST 127.0.0.1
ENV JVM_JMX_PORT 9898
ENV JVM_JMX_RMI_PORT 9999

# Force Docker to use UTF-8 encodings
ENV LANG C.UTF-8

# export meta-data about this container
LABEL org.kurron.java.vendor="Oracle"  org.kurron.java.version="1.8.0_101"


