---
title: Nuxt3项目没有index文件，如何全局引入js文件
tags:
  - Nuxt项目
  - 独立开发
recommend: false
categories: 前端开发
cover: 'https://image.wazicode.top/blog/202409281852736.png'
abbrlink: 35bc24bd
date: 2024-10-13 15:20:56
---

# Nuxt3项目如何全局引入js文件

1、如果是你自己写的js文件，可以写在plugins文件夹中，然后在配置文件引入（plugins配置）。

2、如果是外部的js文件，你可以直接在配置文件中引入（head配置）



找到根目录下的nuxt.config.ts[配置文件](https://so.csdn.net/so/search?q=配置文件&spm=1001.2101.3001.7020)；然后如下图所示，在defineNuxtConfig配置对象下app选项节点下

```js
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: '',
      meta: [],
      link:[],
      script: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" }, {
          src:"https://api.map.baidu.com/api?v=1.0&type=webgl&ak=ZNkgnHSRut2tWZD1XC85PEdpg3UFZTbQ"
        }
      ]
    },
  },
  plugins: [
    { src: '~/plugins/jquery.js' }, 
  ],
})
```

