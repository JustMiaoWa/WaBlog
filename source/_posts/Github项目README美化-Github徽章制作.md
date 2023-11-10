---
title: Github项目README美化 | Github徽章制作
tags:
  - Github
recommend: true
categories: 'Github'
cover: http://image.wazicode.top/blog/202311100038497.png
abbrlink: 2e49af46
date: 2023-11-10 00:01:51
---

# Github项目README美化 | Github徽章制作

## 1、前言

平时逛Github开源项目的时候，经常看到README文件会有各式各样的小徽章，哈哈，你是不是也想在自己的项目上添加Github小徽章。让我们来看看别人的项目徽章。

## Vue

![image-20231110213707222](http://image.wazicode.top/blog/202311102137295.png)

## React

![image-20231110213924728](http://image.wazicode.top/blog/202311102139790.png)





无疑，这样的Github徽章能合理的优化README的美化，能够更加地吸引别人眼球，可能就增加了star数啦。

 

## 2、徽章制作

这种徽章一般都是网站生成的，下面有一些提供在线生成徽章的网站

- https://shields.io/
- https://badgen.net/
- https://forthebadge.com/
- https://badge.fury.io/
- https://github.com/boennemann/badges



我一般用第一个网站，也就是https://shields.io/，支持静态、动态徽章。

打开网站后，点击**get start** 开始制作属于自己的徽章。我一般直接选择**Static Badge**



![image-20231110215511755](http://image.wazicode.top/blog/202311102155903.png)

示例：填入以下参数点击生成按钮得到如下徽章

<div align="center"><img alt="Static Badge" src="https://img.shields.io/badge/v1.0.0-white?label=%E5%93%87%E5%AD%90&labelColor=%2325c2a0&color=white"></div>

![image-20231110215900970](http://image.wazicode.top/blog/202311102159100.png)



## 3、引入

生成之后网站提供了很多方式，有URL，MD，HTML，具体就看你自己如何使用了，我一般会在markdown中，嵌入HTML，因为markdown是兼容Html的，一个div class=center 包裹住Github徽章。如果对你有帮助的话，欢迎评论交流。

