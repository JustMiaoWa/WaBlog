---
title: 前端页面性能优化之tff字体包压缩
tags:
  - 性能优化
  - tff字体压缩
  - 独立开发
  - soumate公众号
recommend: true
categories: 前端开发
cover: 'https://image.wazicode.top/blog/202409161300118.png'
abbrlink: ac1d9467
date: 2024-09-16 11:35:03
---

# 前端页面性能优化之tff字体包压缩

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子
>
> IT技术(摸鱼)交流QQ群：374984174

> 效果演示：[https:www.soulmategzh.com]()

## 背景

在前端开发中，我们通常使用到需要的字体文件引入到项目中，像这样

```
@font-face {
    font-family: 'Alibaba PuHuiTi';
    src: url('./AlibabaPuHuiTi-3-65-Medium.ttf');
}
```

但是有些时候字体包文件很大，导致页面在第一次进入时，字体刚开始还是默认字体，会等个2-3秒后，才会应用你想要的字体，页面看上去字体就像被闪了一下，体验非常不好，今天教大家如何压缩字体文件。

## 开始

### 1、font-spider

font-spider是一个中文字体压缩器，

##### 原理:

1.爬行本地 html 文档，分析所有 css 语句
 2.记录@font-face语句声明的字体，并且记录使用该字体的 css 选择器
 3.通过 css 选择器的规则查找当前 html 文档的节点，记录节点上的文本
 4.找到字体文件并删除没被使用的字符
 5.编码成跨平台使用的字体格式

简而言之：就是爬出你项目中所使用的文字保留起来，删除没被使用到的文字，并重新打包一个tff文件。

### 2、新建文件夹

新建一个文件夹，cd到新建的文件夹，执行以下命令

```shell
npm init -y
```

```shell
npm install font-spider -g

或者
yarn add font-spider -g
```

然后建一个fonts文件夹用于存放字体文件，在写一个fonts.css

```css
@font-face {
    font-family: 'Alibaba PuHuiTi';
    src: url('./AlibabaPuHuiTi-3-65-Medium.ttf');
}
```

再写一个index.html，引入刚刚的fonts.css，并且在div中写入你想引入的全部字

**注意 div中的内容就是我们要抽出为字体！！！**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./font/fonts.css">
</head>
<body>
    <div id="app" style="font-family: 'Alibaba PuHuiTi';">
        Soulmate: 寻找那个真正懂你的朋友，在Soulmate，我结识了新朋友，分享我的日常生活，开始答题

，介绍操作指南，公众号，扫描关注公众号，点击右下角菜单【参与答题】参与答题测验，寻找心意相通的朋友，

邮箱绑定，无需注册手机号，无需账号登录，帮你省去一大步流程，但需要绑定邮箱和手机号，参与答题，题目由后台随机抽取，可能每人遇到题目不一致，作答过程中，上一题一旦确认，不可回退，微信社区，作答完成后，结果将会通知到你绑定的邮箱，如果通过测验，客服将添加你的微信，拉入微信社区，社区，微信社群，体验，扫码开始，愿你的真诚也能遇见真诚，公众号，首页，介绍，社区，体验，公众号，CopyRight 哇子，“我学着不去担心的太远”，“不计划太多反而能勇敢冒险”，点击跳转QQ内测群，蜀ICP备2023022177号，1234567890
    </div>
</body>
</html>
```

**font-spider的原理是扫描你所用的全部字，然后从你的字体包中抽离出你想要的字，除去你没有用到的字，然后重新压缩成tff。所以这种方式的优点就是字体包变小了，但是只会抽离你上面代码用到的字，应用场景只能用于一些固定不变的静态页面，比如官网**。

### 3、使用font-spider压缩字体

```shell
font-spider ./index.html
```

可以看到我们字体包从8M压缩到了58k

![image-20240916125243748](https://image.wazicode.top/blog/202409161252863.png)

然后去找你的项目中的字体文件就变小了，可以复制到其他项目引用！！！

