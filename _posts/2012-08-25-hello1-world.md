---
layout: post
title: github.jeckII.markdown玩博客
tags: [markdown]
---
# {{ page.title }}          
> {{ page.date | date_to_string }}

###　安装配置BLOG
> 我从这里开始[github Pages和JekyII入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
> 很多JekyII的网站，直接下源码学习[传送门](https://github.com/mojombo/jekyll/wiki/Sites)



### 高亮代码

> 我把xieyu.github.com上的pygments样式替换了syntax里的默认样式`super+shift+L`  
> 扒了pre，code样式文件  
> 用法上的不一样从  

	```php
	codeing	~
	```

> 现在不用安装，就是稍麻烦点

	{|% highlight php %|}
	codeing~
	{|% highlight %|}

> 测试高亮

{% highlight php %}
<?php
//asdadasdasd
echo "hello";
?>
{% endhighlight %}  