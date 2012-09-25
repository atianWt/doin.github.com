---
layout: post
title: github+markdown玩博客
tags: [markdown, asp]
---
# {{ page.title }}          
> {{ page.date | date_to_string }}

* aaaaaaaa
* bbbbbbbb

1. aadfsf`ctrl + j`dafasd

> 1111111111
> 22222222222
>> 3333333333333

## 高亮代码

> 我把xieyu.github.com上的pygments样式替换了syntax里的默认样式   
> 扒了pre，code样式文件   
> 用法上的不一样从     

	```php
	codeing	~
	```
	
> 现在不用安装，就是稍麻烦点

	{|% highlight php %|}
	codeing~
	{|% highlight %|}

{% highlight php %}
<?php
//asdadasdasd
echo "hello";
?>
{% endhighlight %}  

{% highlight html %}
<div>
aaadfadfsfsafsa
echo "hello";
</div>
{% endhighlight %}  

- ccccccccccc
- ddddddddddd
