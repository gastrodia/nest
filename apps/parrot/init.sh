

#http://wiki.ubuntu.org.cn/IBus
sudo apt-get install ibus ibus-clutter ibus-gtk ibus-gtk3 ibus-qt4

#https://www.jianshu.com/p/4bd2d9b1af41
sudo apt-get install fonts-wqy-microhei

#http://blog.csdn.net/love254443233/article/details/17082691
unzip larabiefont.zip
cp -R  larabiefont /usr/share/fonts
sudo mkfontscale
sudo mkfontdir
fc-cache