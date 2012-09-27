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

### 一些技巧
-　页内跳转
	{% highlight html %}
	<!-- 为了方便页内快速跳转，可建立空内容的锚点。比如 -->
	<span id="jekyll-and-github"></span>
	<!-- 使用　-->
	[回去看看](#jekyll-and-github)
	http://doin.github.com/#jekyll-and-github
	{% highlight %}

- 使用全局路径定义
	> 在`_config.yml`中定义一个形如`img_url: http://doin.github.com/images`的变量  
	>>（使用）`![git代码库结构]({{ site.img_url }}/2012-06-27-git-transport.png)`  
	> 在`_config.yml`中定义一个形如`css_url: http://doin.github.com/css`的变量  
	>>（使用）`<style src={{site.css_url}} />`  

- 定义代码模板`_includes/JB`
	+ 把一些重复的模块/JS自定义在`_includes文件夹下`
	+ (使用)`{% include JB/disqus_comments %}`

- 使用[disqus](http://www.disqus.com/)构建评论

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