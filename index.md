---
layout: page
title: Hello World!
tagline: Supporting Doin
---
{% include JB/setup %}

<div id="home">
  <ul class="posts">
    {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>

  <h1>old blog</h1>
  <ul class="posts">
    <li><span>year 2008</span> &raquo; <a href="http://311500.blog.163.com/blog">javablog's blog</a></li>
    <li><span>year 2011</span> &raquo; <a href="http://blog.csdn.net/yczz/article/category/354754/1">163's blog</a></li>
  </ul>
 </div>

