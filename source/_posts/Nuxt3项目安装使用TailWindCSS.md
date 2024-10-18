---
title: Nuxt3项目安装使用TailWindCSS
tags:
  - 前端开发
  - 独立开发
  - Nuxt3
recommend: false
categories: 前端开发
cover: 'https://image.wazicode.top/blog/202409281852736.png'
abbrlink: daea4797
date: 2024-10-13 22:38:51
---

# Nuxt3项目安装使用TailWindCSS

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子
>
> IT技术(摸鱼)交流QQ群：374984174



> 效果演示：[https:www.soulmategzh.com]()

## 安装 @nuxtjs/tailwindcss 依赖到你的项目

```shell
# 方式1：nuxi
npx nuxi@latest module add tailwindcss
 
# 方式2：yarn 
yarn add -D @nuxtjs/tailwindcss
 
# 方式3：npm
npm install -D @nuxtjs/tailwindcss
 
# 方式4：pnpm
pnpm i -D @nuxtjs/tailwindcss
```

## nuxt.config配置

```js
# nuxt3
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss']
})
```

## 使用

在html元素上添加class类即可，例如：

```vue
<template>
  <div class="textcolor mt-[30px]">
    hhhhh
  </div>
</template>
```

具体使用tailwindcss，查看官网：[https://tailwind.nodejs.cn/](https://tailwind.nodejs.cn/)



