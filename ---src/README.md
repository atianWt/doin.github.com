## 本地调试
- `tnpm start` 直接打开浏览器本地调试

## 更新发布
- tnpm start之后已经编译好, 直接push到master分支及可
- 访问 http://doin.github.io

## 文档生成说明

- 最多支持二级目录，以**docs**的下一层开始计算
- **docs**目录下面是一级子目录
- 一级子目录必须包含**meta.md**，该文件包含目录相关信息
- 二级子目录如果需要独立为一组菜单，必须包含**meta.md**
- **meta.md**参考如下
  ````
  ---
  title: Tests/posts
  order: -1
  ---
  这里是描述，暂时不提取
  ````


## markdown 撰写文档参考

### 标题（`#`、`##`）使用规范:

- 按顺序使用，不要跳级使用；
- 一级标题 `#` 只出现一次，用于文档的总标题；  
- 不要在标题前面加上 `1.`、`一.` 之类的序号，序号会通过 CSS 添加。

````
---
title: Hello world!
publishDate: 2016-05-05
tags:
  - test
desc: The first article which is posted by BiSheng.

---

Hello world!

```js
(function () {
  console.log('Hello world!');
})();
```
