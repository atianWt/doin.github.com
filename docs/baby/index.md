---
title: 孩子成长
order: 0
public: true
---

# 原始社会
### 需求描述
    * 解决朋友之间资源共享,资源利用最大化.
    * 以朋友这间物物交换的信任为入口,最后实现同城的SNS化交易.

### 功能模块
    * LBS查看身边朋友闲置物品.
    * 发布物品/需求给朋友,查看朋友的物品/需求.
    * 后期模块(朋友圈子).

### 项目成员
    韩升,马卿,洞灵

### 项目时间
     12月10日启动.
     .12月底截止.

### build 2012-12-10
    1. 项目讨论,达成共识.
    2. 项目交互图讨论设计完成80%.
    3. 本周项目分工
        * 马卿: 数据库建表以及数据接口.
        * 韩升: LBS地图DEMO实现.
        * 洞灵: 根据交互图,设计界面.(界面以单色块,清爽为主.)
        * 时间紧,任务多,还是以坚持为主吧.GO~

__Google Maps API key 申请__
 1. 使用Google帐号登入APIs Console （https://code.google.com/apis/console）功能权限打开,点API access可以看到了.

    Key for browser apps (with referers)
    API key:
    AIzaSyDInY-OQJ8RuIA8vcY9ie8TtYvUJfBUQkM
    Referers:
    http://127.0.0.1
    Activated on:   Dec 10, 2012 9:55 PM
    Activated by:    doin0719@gmail.com � you
    Generate new key...
    Edit allowed referers...
    Delete key...
    Key for browser apps (with referers)
    API key:
    AIzaSyCaNEZrKHqcY0cWV6RkBYbF_8ipj63RiRw
    Referers:
    Any referer allowed
    Activated on:   Dec 10, 2012 9:52 PM
    Activated by:    doin0719@gmail.com � you
参考网站:
[Google Maps API 申请方式变更](http://www.godeyes.cn/html/2012/02/23/google_earth_12863.html)

__下载 Google Maps API for Flash SDK__
参考网站:
[用 Flex 开发 Google Map 应用程序](http://www.ibm.com/developerworks/cn/web/wa-lo-flexgoogle/)
[Google Maps API 中的标注编程](http://www.cnblogs.com/zhych/archive/2009/06/25/1511281.html)
[Google Maps API（Flash 版）开发人员指南](https://developers.google.com/maps/documentation/flash/intro?hl=zh-cn)

### build 2012-12-13
    1. 决定使用百度地图 FLASH SDK
    2. 使用FLASH+HTML的形式开发,一方面加大灵活性,一方面减轻我这边的压力.
    3. 数据库表建立.
    4. HTML和FLASH间的通信使用开源桥接"StageWebViewBridge"
        * 使用loadUrl();
        * 加入StageWebViewBridge.js
        * 发布情况下才可以调用成功.
参考网站[StageWEBViewBridge](http://code.google.com/p/stagewebviewbridge/source/browse/trunk/StageWebViewBridge/?r=120)

