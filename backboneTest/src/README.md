美丽范H5页面开发指南

本项目基于百度FIS作为前端自动化构建工具
=====================================

## 安装fis-pure
npm install -g fis-pure
    查看是否安装成功 pure-v

# 开发阶段
#-wL 表示监视文件改变,自动进行发布,并自动刷新浏览器
pure release -d remote -wL  


# 发布生产站(性能优化),采用增量式发布
pure release -d remote -opm

内置的规范包括：
1. 扔在 ``modules`` 目录下的js、css、less、coffee文件都是模块化文件，会自动包装define，自己就不要写了。
2. CSS加载规则,当css文件与模块同名,则自动加载该CSS。
3. 扔在 ``lib`` 目录下的文件不被认为是模块化的，请直接在页面上使用script或link标签引用。

==========================

app/common/common 为常量定义以及测试数据