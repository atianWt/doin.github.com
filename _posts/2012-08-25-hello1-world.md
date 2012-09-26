---
layout: post
title: github+markdown玩博客
tags: [markdown, asp]
---
# {{ page.title }}          
> {{ page.date | date_to_string }}

## 高亮代码

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


	adafafafafasd
	asdfadsf

	adsfasdfadsfsaf
	asdfasdf
	asdfasfasdfasdfsadfasdf


