---
title: Vmware中Centos7如何固定ip，开机自动启动
tags:
  - Linux
  - 运维
  - 服务器
  - Centos
  - 学习笔记
recommend: true
categories: Linux运维
cover: 'https://image.wazicode.top/blog/202402280002472.png'
abbrlink: c3f34510
date: 2024-02-27 22:36:59
---

# Vmware中Centos7如何固定ip，开机自动启动

新的一年又开始了，祝大家新的一年越来越好！

最近想着进修下Linux的基础，恰好我有个闲置的笔记本，就准备用这个闲置的笔记本用虚拟机装一个Centos系统来作为练手的内网服务器吧！刚好有些需求，其一：默认Vmware安装的Centos系统会在每次开机时重新分配IP，如何固定住Centos的IP呢？其二：每次笔记本开机都要手动去启动虚拟机，能不能设置开机自启虚拟机呢？

回答：当然可以！

<img src="https://image.wazicode.top/blog/202402282205663.png" alt="image-20240228220554603" style="zoom:50%;" />

## 固定IP

首先要固定IP，得先搞清楚Vmware的网络模式，分为3种：

- 桥接模式
- NAT模式
- 主机模式

**桥接模式**：

在桥接模式下，VMWare虚拟出来的操作系统就像是<mark>局域网中的一台独立的主机（主机和虚拟机处于对等地位）</mark>，它可以访问网内任何一台机器，在桥接模式下，我们往往需要为虚拟主机配置ＩＰ地址、子网掩码等（注意虚拟主机的ｉｐ地址要和主机ｉｐ地址在同一网段）

**NAT模式**：

使用NAT模式虚拟系统可把物理主机作为路由器访问互联网，NAT模式也是VMware创建虚拟机的默认网络连接模式。<mark>使用NAT模式网络连接时，VMware会在主机上建立单独的专用网络，用以在主机和虚拟机之间相互通信</mark>。虚拟机向外部网络发送的请求数据'包裹'，都会交由NAT网络适配器加上'特殊标记'并以主机的名义转发出去，外部网络返回的响应数据'包裹'，也是先由主机接收，然后交由NAT网络适配器根据'特殊标记'进行识别并转发给对应的虚拟机，因此，虚拟机在外部网络中不必具有自己的IP地址。<mark>从外部网络来看，虚拟机和主机在共享一个IP地址，默认情况下，外部网络终端也无法访问到虚拟机。此外，在一台主机上只允许有一个NAT模式的虚拟网络。因此，同一台主机上的多个采用NAT模式网络连接的虚拟机也是可以相互访问的。</mark>

**主机模式**：

主机模式下，真实环境和虚拟环境是隔离开的；在这种模式下，所有的虚拟系统是可以相互通信的，但虚拟系统和真实的网络是被隔开。
在主机模式下，物理机无法与虚拟机建立通信！只能虚拟机与虚拟机之间互相通信！



因为我们要固定IP，所以最好是选择桥接模式：

![image-20240228220847493](https://image.wazicode.top/blog/202402282208546.png)

其次，为了固定虚拟机中的IP，我们先查看本地window机器的IP相关信息，win+r输入cmd，调出命令行窗口，输入下面的shell

```shell
ipconfig /all
```

会得到下面相关信息

![image-20240228221148699](https://image.wazicode.top/blog/202402282211761.png)

接下来去Linux机器中，切换到以下目录

```shell
cd /etc/sysconfig/network-scripts
```

编辑目录下的ifcfg-ens33 这个文件

```shell
vim ./ifcfg-ens33
```

![image-20240228222333617](https://image.wazicode.top/blog/202402282223682.png)

```
ONBOOT=yes #修改为yes
IPADDR=192.168.0.200 #固定的IP地址
NETMASK=255.255.255.0	# 子网掩码 与 宿主机一致
GATEWAY=192.168.0.1	# 默认网关  与宿主机一致
DNS1=192.168.0.1	# dns地址 与宿主机一致
```

最后重启 network

```shell
service network restart
```

你的IP地址就固定了，不信可以重启linux主机 然后在试试看ip地址是否变化

## 开机自启

在高版本的Vmware中，好像是17以上，有自动配置开机自启的设置，但是我是Vmware15的版本，所以就要自己写脚本咯！

1、新建一个脚本 vm-start.bat

```shell
chcp 65001
D:\linux\application\Vmware\vmrun.exe -T ws start "D:\linux\application\Centos7\CentOS 7 64 位.vmx" nogui
```

解释：

chcp 65001: 指的是解决中文乱码

vmrun.exe 是虚拟机的启动exe文件，在vmware饿的安装目录下可找到

start 后面是虚拟机的缓存文件

nogui：指的是不启动可视化界面

2、把这个脚本加入开机自动启动项目中

win+r 输入：

```shell
shell:startup
```

弹出脚本自启的文件夹，把刚写的脚本文件放进去