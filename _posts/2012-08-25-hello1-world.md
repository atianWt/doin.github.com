---
layout: post
title: github.jeckII.markdown�沩��
tags: [markdown]
---
# {{ page.title }}          
> {{ page.date | date_to_string }}

###����װ����BLOG
> �Ҵ����￪ʼ[github Pages��JekyII����](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
> �ܶ�JekyII����վ��ֱ����Դ��ѧϰ[������](https://github.com/mojombo/jekyll/wiki/Sites)

### һЩ����
-��ҳ����ת
	{% highlight html %}
	<!-- Ϊ�˷���ҳ�ڿ�����ת���ɽ��������ݵ�ê�㡣���� -->
	<span id="jekyll-and-github"></span>
	<!-- ʹ�á�-->
	[��ȥ����](#jekyll-and-github)
	http://doin.github.com/#jekyll-and-github
	{% highlight %}

- ʹ��ȫ��·������
	> ��`_config.yml`�ж���һ������`img_url: http://doin.github.com/images`�ı���  
	>>��ʹ�ã�`![git�����ṹ]({{ site.img_url }}/2012-06-27-git-transport.png)`  
	> ��`_config.yml`�ж���һ������`css_url: http://doin.github.com/css`�ı���  
	>>��ʹ�ã�`<style src={{site.css_url}} />`  

- �������ģ��`_includes/JB`
	+ ��һЩ�ظ���ģ��/JS�Զ�����`_includes�ļ�����`
	+ (ʹ��)`{% include JB/disqus_comments %}`

- ʹ��[disqus](http://www.disqus.com/)��������

### ��������

> �Ұ�xieyu.github.com�ϵ�pygments��ʽ�滻��syntax���Ĭ����ʽ`super+shift+L`  
> ����pre��code��ʽ�ļ�  
> �÷��ϵĲ�һ����  

	```php
	codeing	~
	```

> ���ڲ��ð�װ���������鷳��

	{|% highlight php %|}
	codeing~
	{|% highlight %|}

> ���Ը���

{% highlight php %}
<?php
//asdadasdasd
echo "hello";
?>
{% endhighlight %}  