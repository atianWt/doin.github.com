# android技术
---
# 环境搭建

## 环境安装包

- [Mac安装包.下载地址](http://yunpan.alibaba-inc.com/share/link/KGNhIiFyN)
- [Windows安装.下载地址](http://yunpan.taobao.com/s/XLZXNwsNLm)

## Mac参考环境配置
```
JAVA7_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/contents/home/
JAVA8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_51.jdk/contents/home/
export JAVA8_HOME
export JAVA7_HOME

JAVA_HOME=$JAVA7_HOME
export JAVA_HOME
PATH=$PATH:$JAVA_HOME/bin

MAVEN_HOME=/Users/XXX/build/apache-maven-3.0.5
PATH=$PATH:$MAVEN_HOME/bin

export MAVEN_HOME
export PATH

ANT_HOME=/Users/XXX/build/apache-ant-1.9.2
PATH=$PATH:$ANT_HOME/bin

export ANT_HOME

ANDROID_HOME=/Users/XXX/build/android-sdk-macosx

export ANDROID_HOME

export ANDROID_NDK_HOME=/Users/wengxindan/Android/android-ndk-r8d

ADB_HOME=/Users/XXX/build/android-sdk-macosx/platform-tools
PATH=$PATH:$ADB_HOME
export PATH
```

## Windows参考配置
```
ANDROID_HOME = C:\AndroidAlipay\android\sdk
JAVA_HOME    = C:\Program Files (x86)\Java\jdk1.6.0_43
MAVEN_HOME   = C:\apache-maven-3.0.5

在Path中添加maven、jdk及jre路径如下C:\apache-maven-3.0.5\bin;C:\Program Files (x86)\Java\jdk1.6.0\bin;C:\Program Files (x86)\Java\jdk1.6.0_43\jre\bin;

在DOS命令中 mvn -version 验证maven安装是否成功，java -version验证jdk是否安装成功
```
