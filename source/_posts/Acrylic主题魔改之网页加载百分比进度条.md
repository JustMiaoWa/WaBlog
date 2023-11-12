---
title: Acrylic主题魔改之网页加载百分比进度条
tags:
  - Acrylic主题魔改
recommend: false
categories: Acrylic主题魔改
cover: 'https://image.wazicode.top/blog/202307081755779.gif'
abbrlink: e31eac05
date: 2023-07-08 17:53:32
---

# Acrylic主题魔改之网页加载百分比进度条

> 博主所使用Hexo版本：6.3.0，Acrylic主题版本：1.1.2，版本不同可能会有不同，注意你的版本

最后实现效果：

![](https://image.wazicode.top/blog/202307081755779.gif)

## 1、获取百分比进度条原理

在默认的Acrylic主题中，网页加载是没有百分比进度条的，但是在加载网页的顶部有个进度条，在查看源码之后，发现整个网页是用的pace.js实现，具体可以百度查看pace.js使用方法，在Pace.js中，可以监听网页加载的百分比，必须在Pace.js加载之后：

```js
Pace.on('progress', function(progress) {
    // 当加载进度改变时执行的操作
    // 这里的progress参数表示加载的百分比进度
    console.log(progress);    
});
```

## 2、修改源码

找到主题目录下的layout/partial/loading.ejs，把原来的代码全部替换成下方代码，你可以提前备份一份原来的loading.ejs代码

```ejs
<div id="loading-box" onclick="preloader.endLoading();" class style="zoom: 1;">
    <div class="loading-bg">
        <div class="img_box">
            <img src="<%= theme.site.icon %>" />
        </div>
        <div class="progress_box">
            <p>100%</p>
        </div>
    </div>
</div>
<script>
     
    const preloader = {
        endLoading: () => {
            document.getElementById('loading-box').classList.add("loaded")
        },
        initLoading: () => {
            document.getElementById('loading-box').classList.remove("loaded")
        },
        removePaceDone: () => {
            document.getElementById('body').classList = 'pace-done'
        }
    }
    var progressBox = document.querySelector('.progress_box');
    var progressText = progressBox.querySelector('p');
    Pace.on('progress', function(progress) {
    // 当加载进度改变时执行的操作
    // 这里的progress参数表示加载的百分比进度
        // console.log(progress);
        progressText.textContent = Math.round(progress) + '%'
    });
    window.addEventListener('load',()=> { preloader.endLoading() })
    document.addEventListener('pjax:send', () => { preloader.initLoading() })
    document.addEventListener('pjax:complete', () => { preloader.endLoading() })
</script>
<style>
    #loading-box {
        -webkit-user-select: none;
    }

    #loading-box .loading-bg {
        width: 100vw;
        height: 100vh;
        position: fixed;
        background: var(--heo-background);
        z-index: 1999;
        opacity: 1;
        transition: 0.2s;
        pointer-events: all;
        animation: showLoading 0.3s 0s backwards;
    }

    #loading-box.loaded .loading-bg {
        pointer-events: none;
        transition: 0.2s;
        animation: hideLoading 0.3s 0s forwards;
    }

    .loading-bg .img_box {
        position: absolute;
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .loading-bg .img_box::before {
        content: '';
        -webkit-transition: 1s;
        -moz-transition: 1s;
        -o-transition: 1s;
        -ms-transition: 1s;
        transition: 1s;
        width: 20px;
        height: 20px;
        background: var(--heo-green);
        position: absolute;
        border-radius: 50%;
        border: 5px solid var(--heo-background);
        bottom: 0px;
        right: 2px;
        z-index: 2;
    }

    .img_box>img {
        width: 100%;
        height: 100%;
        border: 2px solid var(--heo-reverse);
        border-radius: 50%;
        animation-duration: 0.2s;
        animation-name: loadingAction;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    
    .loading-bg .progress_box{
        position: relative;
        background-color: var(--heo-background);
        width: 80px;
        height: 40px;
        border-radius: 0px;
        top: 60%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        animation-duration: 0.2s;
        animation-name: loadingAction;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    .loading-bg .progress_box>p {
        z-index: 2;
        color: var(--heo-reverse);

        animation-duration: 0.2s;
        animation-name: loadingAction;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    .loading-bg .progress_box::before{
        content: "";
        position: absolute;
        width: 150px;
        height: 80%;
        background-color: var(--heo-reverse);
        animation: rotate 2s linear infinite;
    }
    .loading-bg .progress_box::after{
        content: "";
        position: absolute;
        background-color: var(--heo-background);
        inset: 1px;
        border-radius: 0px;
    }

    @media screen and (max-width: 768px) {
        .loading-bg .img_box {
            width: 70px;
            height: 70px;
        }

        .loading-bg .img_box::before {
            width: 15px;
            height: 15px;
            border: 3px solid var(--heo-background);
            bottom: 0px;
            right: 3px;
        }
    }

    @keyframes loadingAction {
        from {
            opacity: 1;
        }

        to {
            opacity: 0.6;
        }
    }

    @keyframes hideLoading {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes showLoading {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
            opacity: 1;
        }

        to {
            transform: rotate(360deg);
            opacity: 0.6;
        }
    }



</style>
```

