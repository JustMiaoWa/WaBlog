---
title: Acrylic主题魔改之导航栏圆角变直角
tags:
  - Acrylic主题魔改
recommend: true
categories: Acrylic主题魔改
cover: 'https://image.wazicode.top/blog/202306302328254.png'
abbrlink: 69c368c5
date: 2023-06-30 23:21:07
---

# Acrylic主题魔改之导航栏圆角变直角

> 博主所使用Hexo版本：6.3.0，Acrylic主题版本：1.1.2，版本不同可能会有不同，注意你的版本

## 修改完之后的效果是这样的

![image-20230630232828164](https://image.wazicode.top/blog/202306302328254.png)

修改完之后的效果是这样的，可以看到由原来的圆角修改成了直角

## 1、首先修改文字大小

原来的文字会相对较小一些，先把文字修改粗一些

找到主题文件夹下的source/css/main.css的2538行的*#nav* *.site-page*

将原来的font-size：0.78em改成0.88em，其他不用变

```css
#nav .site-page {
  position: relative;
  padding-bottom: 0.3rem;
  text-shadow: rgba(0, 0, 0, 0.3) 0.05rem 0.05rem 0.1rem;
  font-size: 0.88em;
  cursor: pointer;
}
```

## 2、修改一级触摸时的圆角为直角

找到主题文件夹下的source/css/main.css的4994行的*#menus*>div*.menus_items*>div>a

将border-radius注释即可

```css
#menus>div.menus_items>div>a {
  letter-spacing: 0.3rem;
  padding-left: 0.7rem;
  font-weight: bold;
  padding-top: 0;
  padding-bottom: 0;
  height: 35px;
  line-height: 35px;
  /* border-radius: 40px; */
}
```

## 3、修改二级触摸时的圆角为直角

找到主题文件夹下的source/css/main.css的5005行的*#nav* *.menus_items* *.menus_item* *.menus_item_child* li a

将border-radius注释即可

```css
#nav .menus_items .menus_item .menus_item_child li a {
  letter-spacing: 0rem;
  display: flex;
  align-items: center;
  /* border-radius: 100px; */
  padding: 0.3rem 0.8rem;
  width: 100%;
  color: var(--heo-fontcolor) !important;
  text-shadow: none !important;
}
```

