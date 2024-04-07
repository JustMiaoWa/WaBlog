---
title: 学会一项新技能 给我的红米手机刷ROOT、安装面具magisk
tags:
  - 玩机
  - 刷机技巧
  - Redmi 手机
  - ROOT权限
recommend: true
categories: 生活
cover: 'https://image.wazicode.top/blog/202404050024226.png'
abbrlink: 8b2ae35c
date: 2024-04-04 20:59:54
---

# 红米Note 12 5G刷ROOT记录

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子
>
> 前端技术(摸鱼)交流QQ群：374984174

## 1、前言

平时用手机都是随便玩玩，最近想到作为程序员怎么也得去外面的世界看看，但是我刚安装Google服务试了一试，就发现打开软件闪退，然后我开始在网上找了一堆便携式安装谷歌三件套的软件，有华谷套件，一键服务等等，但是最后装好之后，我打开软件还是闪退，没有一点鸟用，所以我在网上搜索资料，我发现手机ROOT之后，应该能有所改变。

## 2、步骤

### 2.1 先BootLoader解锁

解锁Bootloader会清除手机数据，有重要数据请备份再操作！！！

**开启开发者模式**

手机打开系统的参数，点击版本号5-7次就处于开发者模式了。

**绑定账号解锁**

找到手机设置，选择更多设置----开发者模式----设备解锁状态----绑定账号和设备

还要注意必须插SIM卡，而且还必须打开流量，不能用WIFI

![image-20240404225853631](https://image.wazicode.top/blog/202404042258783.png)

**下载小米解锁工具**

[官网网址](https://www.miui.com/unlock/index.html)

解锁bl还需要官方软件解锁，下载好之后，登录小米账号

![image-20240404231728197](https://image.wazicode.top/blog/202404042317317.png)





将**手机重启到fastboot模式（就是关机键+音量减键（必须同时））**,然后将手机连接数据线到电脑上，点击解锁

![image-20240404231909975](https://image.wazicode.top/blog/202404042319048.png)



### 2.2 修补boot.img 

先来说说什么是boot，你可以理解为是整个系统的映像文件，就像虚拟机使用的linux的iso文件一样，厂商在手机出厂设置的时候，都会有系统默认的boot.img，但是默认的映像文件的权限是被阉割的，并不是root权限的，所以我们要修补boot，把他修补为最高权限，也就是root

先去官网下载跟你系统一样的固件（系统包）,也可以说是ROM包。

[小米ROM包地址](https://xiaomirom.com/)

注意：一定要找到跟你系统版本一致的ROM包，版本要全部一致，包括版本后面的字母

### 2.3 手机下载Magisk面具软件

下载Magisk软件，你可以理解这是一个可以帮助你把官方boot文件转换成root权限的boot文件的软件，当然它也可以获取root权限

我们这个2.3的步骤是为了把官方的boot文件转换成root的boot文件

[地址](https://magiskcn.com/magisk-download)

下载安装好之后，把你在电脑下的官方boot.img文件传到手机Download文件夹下，然后用Magisk修补

![image-20240404234043560](https://image.wazicode.top/blog/202404042340678.png)

修补完成之后，他会生成一个新的img文件，这个文件就是root权限好的boot.img，只不过名字不叫boot，应该是magisk_.....的文件

### 2.4 电脑安装adb fastboot

[地址](https://mrzzoxo.lanzoub.com/b02plghuh)

手机连接数据线电脑，把刚刚生成的magisk.img文件复制到adb fastboot文件夹下面

![image-20240404235848697](https://image.wazicode.top/blog/202404042358804.png)

重启手机，同样进入fastboot模式，**就是关机键+音量减键（必须同时）**

运行这个“打开CMD命令行.bat”文件，双击就行

运行以下代码

```shell
fastboot flash boot 面具文件
例如 fastboot flash boot magisk_patched-20250_Q88s2.img
```

出现以下代码就表示成功刷入了

```shell
Sending 'boot' (131072 KB) OKAY [ 3.311s]
Writing 'boot' OKAY [ 0.441s]
Finished. Total time: 3.794s
```

### 2.5 重启手机

重启手机（开有震动基本没问题了）耐心等手机开机。（显示Magisk的版本，就是刷好了的）

![](https://image.wazicode.top/blog/202404050001036.png)



### **温馨提示**

如果刷模块不兼容或者其他骚操作导致不能开机，可以把我们前面提取的**boot.img**通过**fastboot**刷回去，恢复原系统，一般都能正常开机！

**boot.img**保留一份在电脑，避免出问题了可以自救下！还原boot指令

```text
fastboot flash boot boot.img
```

后期系统更新，直接下载全量完整包升级，然后重复上面的步骤就可以继续愉快的使用**Magisk**了！

