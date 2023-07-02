---
title: Acrylic主题魔改之网页地址栏动画
tags:
  - Acrylic主题魔改
recommend: true
categories: Acrylic主题魔改
abbrlink: 6d88ee6
date: 2023-07-01 17:02:28
cover: https://miaowa-blog.oss-cn-chengdu.aliyuncs.com/blog/202307012127336.gif
---

# Acrylic主题魔改之网页地址栏动画

> 博主所使用Hexo版本：6.3.0，Acrylic主题版本：1.1.2，版本不同可能会有不同，注意你的版本

效果：**使用这个后，浏览器左上角的历史回退功能将失效，如影响功能。 请斟酌使用**

![202371212543](https://miaowa-blog.oss-cn-chengdu.aliyuncs.com/blog/202307012127336.gif)

## 1、增加js文件

找到主题文件夹，也就是themes/Acrylic。再深入里面的source/js，在js文件夹下新建一个urlAnimate.js。文件名随意，但是等会引入的时候必须对应文件名

urlAnimate.js的内容：

```js
window.onload = function (){
    let loop1 = function() {
        var e = ['🏻', '🏼', '🏽', '🏾', '🏿'];
        var s = '',
            i, m;

        for (i = 0; i < 10; i ++) {
            m = Math.floor(e.length * ((Math.sin((Date.now()/100) + i)+1)/2));
            s += '👶' + e[m];
        }

        location.hash = s;

        setTimeout(loop1, 50);
    }
    
    var f = ['🌑', '🌘', '🌗', '🌖', '🌝', '🌔', '🌓', '🌒'],
        d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        m = 0;
    let loop2 = function() {
        
        var s = '', x = 0;

        if (!m) {
            while (d[x] == 4) {
                x ++;
            }

            if (x >= d.length) m = 1;
            else {
                d[x] ++;
            }
        }
        else {
            while (d[x] == 0) {
                x ++;
            }

            if (x >= d.length) m = 0;
            else {
                d[x] ++;

                if (d[x] == 8) d[x] = 0;
            }
        }

        d.forEach(function (n) {
            s += f[n];
        });

        location.hash = s;

        setTimeout(loop2, 50);
    }
    
    let loop3 = function() {
        var i, n, s = '';

        for (i = 0; i < 10; i++) {
            n = Math.floor(Math.sin((Date.now()/200) + (i/2)) * 4) + 4;

            s += String.fromCharCode(0x2581 + n);
        }

        window.location.hash = s;

        setTimeout(loop3, 50);
    }

    let myArray = [loop1, loop2, loop3];
    let randomIndex = Math.floor(Math.random() * myArray.length);
    myArray[randomIndex]();

}
```

## 2、引入js文件

找到文件themes/Acrylic/layout/partial/head.ejs，在最后一个link标签后加入以下代码：

```html
<%- js('/js/urlAnimate.js') %>
```

## 3、使用后发现bug

**使用这个后，浏览器左上角的历史回退功能将失效，如影响功能。 请斟酌使用**