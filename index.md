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
    <li><span>year 2008</span> &raquo; <a href="http://www.taobao.com">javablog's blog</a></li>
    <li><span>year 2011</span> &raquo; <a href="http://www.taobao.com">163's blog</a></li>
  </ul>
 </div>

