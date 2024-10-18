---
title: Nuxt3项目中引入全局CSS包括CSS变量的多种姿势
tags:
  - 前端开发
  - 独立开发
  - Nuxt3
recommend: true
categories: 前端开发
cover: 'https://image.wazicode.top/blog/202409281852736.png'
abbrlink: 2301a15b
date: 2024-10-13 15:35:36
---

# Nuxt3项目中引入全局CSS包括CSS变量的多种姿势

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子
>
> IT技术(摸鱼)交流QQ群：374984174



> 效果演示：[https:www.soulmategzh.com]()



css文件存在两种，一种是外部css（别人写的），一种是内部css（自己写的css）

先讲外部css，比较简单

## 外部css

在nuxt的配置文件中配置就好了，类似这样：

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
  }
})
```

## 内部css

内部css一般我们会写在public目录，或者assets目录下，两个目录对应不同的情况

> 区别：
>
> public目录不会被nuxt项目编译，一般只能写css文件
>
> assets目录会被nuxt项目编译，除了css文件，也可以写sass、scss、less这种预编译css文件

### public目录

在public目录下的css，直接在配置文件中引入就可以了

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/public/css/fonts.css'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
})
```

### assets目录

写在assets目录下的css，一般都是scss、sass、less，至于在nuxt中如何安装scss、sass、less，可以看我别的文章

有好几种方式

第一种：跟普通的css一样，在nuxt配置文件中配置

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/vars.less'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
})
```

第二种：直接在app.vue中引入css文件

```vue
<script>
// 使用静态导入以实现服务器端兼容性
import '@/assets/css/first.less'

// 注意：动态导入不兼容服务器端
import('@/assets/css/first.less')
</script>

<style>
@import url("@/assets/css/second.scss");
</style>
```

第三种：也是在nuxt配置文件中配置(这种方式可以注册全局css变量)

nuxt2的写法 : styleResources

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  modules: ['@nuxtjs/style-resources'],
  styleResources:{
    less: ['@/assets/css/variables.less'] // 自动注入到每个组件中
  }
})
```

nuxt3的写法：vite.css.preprocessorOptions.less.additionalData

```js
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite:{
    css:{
      preprocessorOptions:{
        less:{
           additionalData: '@import "./assets/css/vars.less";',
        }
      }
    }
  },
  modules: ['@nuxtjs/style-resources'],
  css: ['@/public/css/fonts.css'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: true,
})
```

