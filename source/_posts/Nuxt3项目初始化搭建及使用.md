---
title: Nuxt3项目初始化搭建及使用
tags: ['前端开发','独立开发','Nuxt3']
recommend: true
abbrlink: f5daab
date: 2024-09-28 18:44:11
categories: '前端开发'
cover: https://image.wazicode.top/blog/202409281852736.png
---

# Nuxt3项目初始化搭建及使用

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子
>
> IT技术(摸鱼)交流QQ群：374984174



> 效果演示：[https:www.soulmategzh.com]()



## Nuxt3介绍

Nuxt3 是一个基于 Vue 3 的服务器端渲染（SSR）框架，它继承了 Nuxt.js 的核心概念，并利用 Vue 3 的最新特性，如组合式
API（Composition API）和`<script setup>`语法，来提供更加现代化的开发体验。Nuxt3 旨在简化 Vue 应用程序的开发流程，同时提供最佳的性能和开发体验。



**简单来说，就是Vue项目是单纯的spa项目，不利于搜索引擎收录，而Nuxt可以配置ssr，能更好的被搜索引擎收录**



nuxt中文文档地址：[https://nuxt.com.cn/](https://nuxt.com.cn/)

## Nuxt3开始

首先要确定自己的node版本，必须18版本或者以上

使用node -v查看版本

```shell
node -v
```

官网写的是执行以下命令（如果你有魔法的话）

```shell
npx nuxi@latest init <project-name>
```

不会魔法的话，可以试试看怎么用vpn，也可以google搜索nuxt3初始化失败，或者可以关注我的公众号，

回复"nuxt3初始化"

![](https://image.wazicode.top/blog/202402032143432.jpg)

项目拉取下来后，执行npm i，安装依赖

```shell
npm i
```

启动项目，可以用浏览器输入http://localhost:3000

```shell
npm run dev
```

## Nuxt3目录结构分析

```
nuxt3-starter
--/.nuxt #nuxt项目默认生成文件夹，你不应该碰里面的任何文件，因为整个目录将在运行nuxt dev时重新创建
--/.output #Nuxt在为生产构建应用程序时创建.output目录，使用此目录将Nuxt应用程序部署到生产环境。
--/assets #静态资源文件夹
--/components #放置所有Vue组件的地方，然后可以在您的页面或其他组件中导入这些组件。Nuxt会自动注册该文件夹下的所有组件。
--/middleware # 路由中间件框架
--/layouts # 布局目录
--/plugins #插件
--/pages # 基于文件的路由
--/public # 不会参与打包，与vue项目的public类似直接挂在服务器的根目录
--/server #服务api
--nuxt.config.ts # Nuxt 配置文件，可以理解成vue.config.js 文件名必须是nuxt.config 后缀名可以是.js,.ts或.mjs
--tsconfig.json # ts配置
--app.vue # Nuxt 3 应用程序中的主组件 入口组件
--README.md # 搭建 Nuxt 3脚手架之后的阅读文档
--package.json # 项目包的配置文件和项目的启动调式命令配置
```

## 约定路由

nuxt3会自动整合vue-router，并且映射`pages/`目录到应用的routes配置中。就像上一讲演示的`index.vue`和`detail.vue`，它们在最终生成的路由配置表中大概是下面这样：

```json
[
  {
    path: '/',
    component: '~/pages/index.vue',
    name: 'index',
  },
  {
    path: '/detail',
    component: '~/pages/detail.vue',
    name: 'detail',
  }
]
```

所以直接在pages目录下创建vue组件，就可以有路由了

### 动态路由

如果我们在文件名或者文件夹名称里面包含了`方括号`，它们将被转换为`动态路由`参数。

```shell
-| pages/
---| users-[group]/
-----| [id].vue
```

上面案例我们可以在组件`[id].vue`中访问`group`、`id`这两个参数:

```vue
<template>
  {{ $route.params.group }}
  {{ $route.params.id }}
</template>
```

通过 `/users-admins/123` 导航即可:  【NuxtLink 是nuxt3的内部组件】

```vue
<NuxtLink to="/users-admins/123">管理员123</NuxtLink>
```

## 约定组件

我们把Vue组件放在`components/`目录，这些组件可以被用在页面和其他组件中，以往我们使用这些组件需要导入并注册它们，但Nuxt会自动导入`components/`目录中的任意组件。比如：

```diff
| components/
--| TheHeader.vue
--| TheFooter.vue
```

### 组件名称约定

没有嵌套的组件会以文件名直接导入，但如果存在嵌套关系哪？例如下面的路径：

```diff
| components/
--| base/
----| foo/
------| Button.vue
```

那么**组件名称将会基于路径和文件名连起来**，比如上面的`base/foo/Button.vue`注册名称将会是`BaseFooButton`，将来用起来会像下面这样：

```vue
<BaseFooButton />
```

### 组件懒加载

如果在组件名前面加上Lazy前缀，则可以按需懒加载该组件，可用于优化打包尺寸。

比如，下面的用法：

```vue
<template>
  <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">显示列表</button>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  const show = ref(false)
</script>
```

