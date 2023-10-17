---
title: 博客中如何使用emoji表情，更能表达你的情绪！
tags: ['hexo魔改','网站','博客']
recommend: true
abbrlink: 13d26899
date: 2023-10-08 23:34:14
categories: 'hexo魔改'
cover: 'http://image.wazicode.top/blog/202310122342257.png'
---

# 博客中如何使用emoji表情，更能表达你的情绪！

>**博客转载于苏苏博客：https://luckysusu.top/post/hexo_emoji.html**

哈喽，这里是苏苏吖~在Hexo搭建博客完成后，就可以开始写文章啦，不过，如果想要在文章中使用各种各样的emoji表情，就需要一点别的插件啦。因为Hexo默认的markdown渲染引擎已经不再支持将Github emoji渲染到静态的html中。下面介绍怎么解决。

## 1、安装插件

首先，在博客目录打开终端，输入下列命令：

```shell
$ npm un hexo-renderer-marked --save
$ npm i hexo-renderer-markdown-it --save
$ npm install markdown-it-emoji --save
```

先卸载掉原来的[hexo-renderer-marked](https://github.com/hexojs/hexo-renderer-marked)，然后下载新的插件[hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it)和[markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)

>  `hexo-renderer-markdown-it` 的速度比Hexo原装插件要快很多很多，而且功能也更加丰富

## 2、配置

插件安装完成后，在Hexo博客的站点配置文件`_config.yml` 添加一下内容：

>  ❗ 不是在主题的`_config_butterfly.yml`，是在`_config.yml` ！！千万别搞错了。

```yaml
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-footnote
    - markdown-it-sup
    - markdown-it-sub
    - markdown-it-abbr
    - markdown-it-emoji
  anchors:
    level: 2
    collisionSuffix: 'v'
    permalink: false
    permalinkClass: header-anchor
    permalinkSymbol: ¶
```

 可选参数:

| 参数                      | 参数值        | 解释                                               |
| ------------------------- | ------------- | -------------------------------------------------- |
| `preset`                  | ‘default’     | 指定预设的 Markdown 渲染配置，使用默认的渲染配置。 |
| `render.html`             | true          | 将输出渲染为 HTML 标签。                           |
| `render.xhtmlOut`         | false         | 将输出渲染为 XHTML 标签。                          |
| `render.langPrefix`       | ‘language-’   | 在代码块中，给语言名称添加的 CSS 类前缀。          |
| `render.breaks`           | true          | 将换行符转换为 `<br>` 标签。                       |
| `render.linkify`          | true          | 将文本中的链接自动转换为 `<a>` 标签。              |
| `render.typographer`      | true          | 启用一些常见的排版替换，比如智能引号等。           |
| `render.quotes`           | ‘“”‘’’        | 指定使用的引号样式为中文的双引号和单引号。         |
| `enable_rules`            | 无            | 没有启用任何渲染规则。                             |
| `disable_rules`           | 无            | 没有禁用任何渲染规则。                             |
| `plugins`                 | 无            | 没有配置插件的相关选项。                           |
| `anchors.level`           | 2             | 标题的级别，标题级别为 2 及以上的标题会生成锚点。  |
| `anchors.collisionSuffix` | ‘’            | 在生成锚点时，遇到冲突时添加的后缀。               |
| `anchors.permalink`       | false         | 不为每个标题生成固定链接。                         |
| `anchors.permalinkClass`  | header-anchor | 固定链接的 CSS 类名。                              |
| `anchors.permalinkSide`   | ‘left’        | 固定链接的位置在标题左侧。                         |
| `anchors.permalinkSymbol` | ‘¶’           | 固定链接的符号。                                   |
| `anchors.case`            | 0             | 生成锚点链接的大小写保持原样。                     |
| `anchors.separator`       | ‘-’           | 生成锚点链接时使用的分隔符。                       |
| `images.lazyload`         | false         | 禁用懒加载图片。                                   |
| `images.prepend_root`     | false         | 在图片路径前不添加根路径。                         |
| `images.post_asset`       | false         | 图片路径不作为 asset。                             |
| `inline`                  | false         | 不渲染为行内 Markdown。                            |

## 3、使用方法

在配置完成以后，在写作时，直接输入对应的emoji编码就可以使用了。下面是一些收集的编码合集：

| 😐 `:neutral_face:`                 | 😄 `:smile:`                        | 😆 `:laughing:`         |
| :--------------------------------- | :--------------------------------- | :--------------------- |
| 😊 `:blush:`                        | 😃 `:smiley:`                       | ☺️ `:relaxed:`          |
| 😏 `:smirk:`                        | 😍 `:heart_eyes:`                   | 😘 `:kissing_heart:`    |
| 😚 `:kissing_closed_eyes:`          | 😳 `:flushed:`                      | 😌 `:relieved:`         |
| 😆 `:satisfied:`                    | 😁 `:grin:`                         | 😉 `:wink:`             |
| 😜 `:stuck_out_tongue_winking_eye:` | 😝 `:stuck_out_tongue_closed_eyes:` | 😀 `:grinning:`         |
| 😗 `:kissing:`                      | 😙 `:kissing_smiling_eyes:`         | 😛 `:stuck_out_tongue:` |
| 😴 `:sleeping:`                     | 😟 `:worried:`                      | 😦 `:frowning:`         |
| 😧 `:anguished:`                    | 😮 `:open_mouth:`                   | 😬 `:grimacing:`        |

更多示例可以查看 https://luckysusu.top/post/hexo_emoji.html