---
title: 教你如何使用npm创建uniappVue3版本的项目，并安装基础框架库
tags: ['前端开发','uniapp','Vue3']
recommend: true
abbrlink: 115f5507
date: 2024-11-17 22:51:05
categories: '前端开发'
cover: https://image.wazicode.top/blog/202411212148245.png
---

# 教你如何使用npm创建uniappVue3版本的项目，并安装基础框架库Scss、Unocss、Tailwindcss

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子
>
> 互联网技术(摸鱼)交流QQ群：374984174

最近涉及到uniapp开发，在了解到可以使用hbuildx和vscode两种方式开发后，我选择后者，今天来记录下过程，方便后期复盘

也可以查看官网地址：[https://uniapp.dcloud.net.cn/quickstart-cli.html](https://uniapp.dcloud.net.cn/quickstart-cli.html)

**我这里是vue3版本，所以node要求18+版本，确认自己版本在18及以上**（以下也是基于vue3版本的）

## 全局安装 vue-cli

```shell
npm install -g @vue/cli
```

## 创建uni-app

使用vue2正式版

```shell
vue create -p dcloudio/uni-preset-vue my-project
```

使用Vue3/Vite版

```shell
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
```

如果出现报错，访问不到github，可以下载下面的压缩包

[https://gitee.com/dcloud/uni-preset-vue/repository/archive/vite.zip](https://gitee.com/dcloud/uni-preset-vue/repository/archive/vite.zip)

## 安装依赖

进入到刚刚创建好的项目

```shell
npm i
```

等待安装完成后，你就可以运行并编写代码了

## 引入SCSS、SCSS-LOADER

```shell
npm i sass sass-loader --save-dev
```

建议将版本锁定在以下版本

```js
"sass": "^1.63.2",
"sass-loader": "^10.4.1",
```

## 引入UNOCSS

官方插件教程地址：[https://github.com/MellowCo/unocss-preset-weapp/tree/main/examples/uniapp_vue3](https://github.com/MellowCo/unocss-preset-weapp/tree/main/examples/uniapp_vue3)

```shell
npm i unocss unocss-preset-weapp -D
```

- unocss 0.59.* 之后版本 vite.config.ts

```js
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig(async ()=>{
  const UnoCss = await import('unocss/vite').then(i => i.default)

  return {
    plugins: [
      uni(),
  
      // https://github.com/unocss/unocss
      UnoCss(),
    ],
  }
})
```

- unocss 0.59.* 之前版本 vite.config.ts

```js
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // https://github.com/antfu/unocss
    Unocss(),
  ],
})
```

写一个配置文件unocss.config.ts

```typescript
import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify(),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      'center': 'flex justify-center items-center',
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ]
}
```

- main.ts

```js
import 'uno.css'
```

### unocss官网：

[https://unocss.dev/](https://unocss.dev/)

unocss常用类名：[https://typeofnan.github.io/vuepress-blog/article/technology/front-end/css/UnoCSS.html](https://typeofnan.github.io/vuepress-blog/article/technology/front-end/css/UnoCSS.html)

## 引入tailwindcss

与unocss其中二选一，如果你安装了unocss了就不要安装tailwindcss了

### 1、安装依赖

```shell
npm install -D tailwindcss postcss autoprefixer
```

### 2、初始化tainwind配置文件

```shell
npx tailwindcss init -p
```

### 3、在 tailwind.config.js 中写入

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4、 在App.vue中添加

```vue
<style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
</style>
```

### 5、在vite.config.js中修改

```js
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
      ],
    },
  },
  plugins: [uni()],
});
```

### 6、小程序适配

```shell
npm i @uni-helper/vite-plugin-uni-tailwind
```

```js
// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';
import uni from "@dcloudio/vite-plugin-uni";
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
      ],
    },
  },
  plugins: [uni(), uniTailwind()],
});
```

### 7、rem to rpx,由于tailwind默认是rem单位，需要转到rpx

```shell
npm i tailwindcss-rem2px-preset -D
```

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [
    require('tailwindcss-rem2px-preset').createPreset({
      // 32 意味着 1rem = 32rpx
      fontSize: 32,
      // 转化的单位,可以变成 px / rpx
      unit: 'rpx'
    })
  ],
}
```

### 8、使用注意

在使用过程中，我发现text-[32rpx]，涉及到rpx单位时，它会识别成颜色，因为颜色也是text开头，所以最好这样text-[length:48rpx]

### tailwind官网

官网：https://tailwind.nodejs.cn/docs/installation