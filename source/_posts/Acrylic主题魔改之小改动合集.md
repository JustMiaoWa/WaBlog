---
title: Acrylic主题魔改之小改动合集
tags:
  - Acrylic主题魔改
recommend: false
categories: Acrylic主题魔改
cover: 'https://miaowa-blog.oss-cn-chengdu.aliyuncs.com/blog/202307132305802.png'
abbrlink: 73dd555b
date: 2023-07-13 22:51:04
---

# Acrylic主题魔改之小改动合集

## 1、网页默认暗黑模式

main.js文件下：直接将模式写死成dark

```js
// const nowMode =
//   cachedMode && (cachedMode === 'dark' || cachedMode === 'light')
//     ? cachedMode === 'dark' && isLightMode ? 'light'
//     : cachedMode === 'light' && isDarkMode ? 'dark'
//     : cachedMode
//     : isDarkMode ? 'dark'
//     : 'light';
const nowMode = 'dark';
```

## 2、修改暗黑模式下的默认主题色

修改var.css中的[*data-theme*=dark] 的相关样式

```css
--heo-theme: #3e9f50;
--heo-theme-op-deep: #1323dddd;
```

