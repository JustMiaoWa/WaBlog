---
title: Nuxt3项目安装less
tags:
  - 前端开发
  - 独立开发
  - Nuxt3
recommend: true
categories: 前端开发
cover: 'https://image.wazicode.top/blog/202409281852736.png'
abbrlink: e26e9f83
date: 2024-10-13 16:13:57
---

# Nuxt3项目安装less

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子
>
> IT技术(摸鱼)交流QQ群：374984174



> 效果演示：[https:www.soulmategzh.com]()



### 1、安装less依赖

```shell
npm install less less-loader --save-dev
```

### 2、安装style-resources

```shell
npm install @nuxtjs/style-resources --save-dev
```

### 3、配置nuxt.config.js，添加modules : @nuxtjs/style-resources模块

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '哇子个人主页' },
        { name: 'keywords', content: '哇子，个人主页，开源个人主页，哇子个人介绍，哇子项目介绍' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin:'anonymous'},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500&display=swap'},
      ],
      // script: [
      //   { src: 'https://hm.baidu.com/hm.js?71e652ef791d0f53633eb82de7980807'}
      // ]
    },
  },
  modules: ['@nuxtjs/style-resources'],
})
```

### 4、使用

然后你就可以使用less了

style lang="less" scoped

```vue
<template>
<div class="my">my
<div class="myy">111</div>
</div>
</template>
<script>
export default {
created () {

},
methods: {

}

}
</script>
<style lang="less" scoped>
.my {
.myy {
background-color: red;
width: 150px;
height: 150px;
}
}
</style>
```

