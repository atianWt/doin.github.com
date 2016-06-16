### @芝麻无线技术文档使用教程
1. 下载源代码 `git clone git@gitlab.alibaba-inc.com:hansheng.sl/zmwifi.git`
2. 切换到远程demo分支 `git checkout -b demo`
3. 下载远程分支代码 `git pull origin demo`
3. 进入src目录编写对应目录的markdown文件.
4. 开启本地服务, 可视化编写文档. `gitbook serve ./src`
5. 编写完成后编译生成HTML文件 `gitbook build ./src ./zmwifi` 源文件 目标文件
6. 提交所有代码 `git pull / git add . / git commit -m 'update' / git push`
7. 刷新访问地址: `http://hansheng.alidemo.cn/zmwifi/`
8. 如遇到5分钟内没有刷新, 请@韩升,让其到 https://alidemo.cn/ 地址对'芝麻无线文档'的地址进行解绑再绑定操作.

> 后续域名申请下来, 访问地址有变我会同步到文档

### gitbook安装常用命令
1. 安装 `tnpm install -g gitbook-cli`  tnpm请参考前端环境安装教程
2. 编译成html文件到指定目录 `gitbook build ./src ./zmwifi` 源文件 目标文件
3. 初始化目录 `gitbook init`

### gitbook学习教程
- 总结:http://gitlab.alipay-inc.com/zm/notes/issues/90

### @常用地址
- GIT地址:http://gitlab.alibaba-inc.com/hansheng.sl/zmwifi
- 访问地址:http://hansheng.alidemo.cn/zmwifi/

