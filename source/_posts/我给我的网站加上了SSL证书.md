---
title: 我给我的网站加上了SSL证书
tags:
  - 网站
  - 域名
recommend: true
categories: 网站
cover: 'https://image.wazicode.top/blog/202311121404263.png'
abbrlink: e4c7a376
date: 2023-11-12 01:46:01
---

# 我给我的网站加上了SSL证书

> 经常看别人的网站都是https开头，而我自己的网站确实http开头，于是我去了解了ssl及https，给我的网站也加上了ssl证书。

## 什么是SSL

所谓的“SSL”即为“SSL协议”，它是一种安全传输协议，是SecureSocketLayer的缩写，即安全套接层协议。最初由Netscape企业发展而来，目前已经成为互联网上用来鉴别网站和网页浏览者的身份，以及在浏览器使用者及网页服务器之间进行加密通讯的全球化标准协议。



![image-20231112141709729](https://image.wazicode.top/blog/202311121417807.png)



## SSL的作用是什么？

### 1、信息安全

在网站中，加上SSL证书，网站链接会变成https，相对于http来说就是加密的传输。

http在网络传输中，相当于是明文传输，数据没有加密。而如果安装了SSL证书，网站数据在网站传输时就会进行加密，将信息发送到指定的服务器，任何第三方都无法读取信息。

### 2、有利用SEO优化

我们企业网站建设时无时不刻都在注意优化问题，是否部署SSL证书也影响着网站的排名。

百度站长和谷歌搜索引擎的官方平台发布公告明确说明部署了SSL证书，拥有HTTPS协议的站点会有更好的排名。

因为对于搜索引擎来讲，他们也想把安全的优质信息推送给用户。如果你的网站连安全都说不上，那么搜索引擎也是不会推荐的。



添加了SSL证书，网站在访问时会在前面有一个锁的标志，而没有添加SSL证书的网站会出现“不安全”的字样

![image-20231112143014823](https://image.wazicode.top/blog/202311121430865.png)

## SSL证书分类

SSL数字证书类型可分为两大类，一类按照验证方式可分为3种SSL证书：DV域名验证型SSL证书、OV企业验证型SSL证书、EV扩展验证型SSL证书；另一类按照域名数量可分为：单域名SSL证书、多域名SSL证书、通配符证书。

**一、验证方式类**

DV SSL证书（域名验证型）：只需验证域名所有权，无需人工验证申请单位真实身份，几分钟就可颁发的SSL证书。适用于个人或者小型网站。



OV SSL证书（企业验证型）：需要验证域名所有权以及企业身份信息，证明申请单位是一个合法存在的真实实体，一般在1~5个工作日颁发。适用于企业型用户申请。



EV SSL证书（扩展验证型）：除了需要验证域名所有权以及企业身份信息之外，还需要提交一下扩展型验证，比如：邓白氏等，通常CA机构还会进行电话回访，一般在2~7个工作日颁发证书。，适用于在线交易网站、企业型网站。



**DV、OV、EV SSL证书的区别：**

　　DV与OV证书的主要区别就是：DV型证书不包含企业名称信息；而OV型证书包含企业名称信息，而且OV比DV价格贵，安全等级高。

　　OV和EV证书的主要区别就是：浏览器对EV证书更加“信任”，当浏览器访问到EV证书时，可以在地址栏显示出公司名称，并将地址栏变成绿色。



**二、域名数量类**

单域名SSL证书：只保护一个域名（包括带www和不带www）的SSL证书，可以是顶级域名可以是二级域名，例如：wazicode.top或者www.wazicode.top



通配符证书：只能保护一个域名以及该域名的所有下一级域名，不限制域名数量；例如：http://wazideo.top及它的所有子域，没有数量限制。



多域名SSL证书：可以同时保护多个域名，不限制域名类型；例如：http://wazicode.top及它的子域、[http://abc.com](https://link.zhihu.com/?target=http%3A//abc.com)及它的子域等，最多可保护2~150个域名。

　　

单域名、多域名、通配符SSL证书的区别就比较明显，唯一难以区分的就是多域名SSL证书和通配符证书，而它们之间的区别就是多域名SSL证书可以保护不同的主域或者子域，一张证书最多保护2~150个，适合顶级域名多的用户申请；通配符证书只能保护一个域名，以及该域名的所有下一级域名，不限制下一级域名数量，适合子域数量多的用户申请。



## 我的选择

由于我的网站是博客类型，且是个人网站，所以我选择的是**DV的SSL证书且是通配符证书**，这样我的二级域名就不用重新申请证书了。



有很多这样的免费机构证书 比如 **lets encrypt**，我用的是joyssl，我选的是DV 通配符版本

![image-20231112150814536](https://image.wazicode.top/blog/202311121508646.png)



根据网站的指引（域名添加CNAME解析，证明域名是你的）之后，你的证书就可以下载下来了，里面包含安装教程和证书文件，你需要将你的证书文件上传到服务器中。

并且nginx配置ssl

```yml
# 以下属性中以 ssl 开头的属性代表与证书配置有关，其他属性请根据自己的需要进行配置。
server {
    listen 443;
    server_name localhost; # localhost 修改为您证书绑定的域名。
    ssl on; #设置为 on 启用 SSL 功能。
    root html;
    index index.html index.htm;
    ssl_certificate cert/domain name.pem; #将 domain name.pem 替换成您证书的文件名。
    ssl_certificate_key cert/domain name.key; #将domain name.key替换成您证书的密钥文件名。
    ssl_session_timeout 5m;
    ssl_ciphers
    ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC
    4; #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #使用该协议进行配置。
    ssl_prefer_server_ciphers on;
}
```

安装上去我发现不行，百度搜了一下，原来这个ssl on；过时了

将配置文件ssl on；去掉。然后在listen 443 ssl;

### http强制转换https

在配置好之后，我发现原来的http还是能访问，于是我研究怎么http强制转换成https

在网上搜到nginx配置301重定向还有什么497状态码，但是我配上都不行！

所以我采用**利用 meta 的刷新作用**，就是nginx监听80端口去访问新的html，这个html中meta自动刷新到https上

```conf
server {
    listen       80;
    server_name  your_domain;

    access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

```html
<html>
  <meta http-equiv="refresh" content="0;url=your_https_url">
</html>
```

解释：

- `your_domain`：你的域名
- `your_https_url`：你想要强转的 https URL

最后我的网站也成功加上https了

