---
title: Acrylic主题魔改之欢迎动画
tags:
  - Acrylic主题魔改
recommend: true
categories: Acrylic主题魔改
cover: 'https://miaowa-blog.oss-cn-chengdu.aliyuncs.com/blog/202307160328006.png'
abbrlink: 9705fd7b
date: 2023-07-16 03:27:37
---

# Acrylic主题魔改之欢迎动画

> 博主所使用Hexo版本：6.3.0，Acrylic主题版本：1.1.2，版本不同可能会有不同，注意你的版本

> 此魔改灵感来自于 "小孙同学"  blog.sunguoqi.com

## 1、思路步骤

- 实现动画元素
- js实现延迟消失，并只在根页面显示

### 1、实现动画元素

这个比较简单，就是一个盒子，里面一些文字，再加一些进入动画

```html
<!-- 弹出框 -->
<div class="hello_box" id="isHello">
    <div class="title">
        <p>哇子</p>
    </div>
    <hr class="middle_solid"/>
    <div class="content">
        <p>祝你天天开心🎉🎉</p>
        <p>
            <i class="icon fas fa-arrow-circle-right"></i>
        </p>
    </div>
</div>
```

```css
	@media screen and (max-width: 1300px) {
        .hello_box {
            display: none !important;
        }
    }
    .hello_box {
        min-width: 300px;
        z-index: 1;
        position: fixed;
        top: 65px;
        left: 50px;
        transition: 0.3s;
        transform-origin: left bottom;
        box-shadow: var(--heo-shadow-border);
        background-color: var(--heo-maskbgdeep);
        border-radius: 12px;
        border: var(--style-border);
        padding: 8px 16px;
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei";
        animation: barrageIn 0.6s cubic-bezier(0.42, 0, 0.3, 1.11);
    }
    .hide_box {
        opacity: 0;
        animation: barrageOut 0.6s cubic-bezier(0.42, 0, 0.3, 1.11);
        z-index: -1;
    }
    .hello_box p {
        margin: 0;
        padding: 0;
    }
    .hello_box .middle_solid{
        margin: 0;
        padding: 0;
        border-top: var(--style-border);
        border-bottom: none;
    }
    .hello_box .title {
        font-size: 12px;
        font-weight: bold;
    }
    .hello_box .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
    }
    .hello_box .content .icon {
        margin-right: 5px;
        cursor: pointer;
    }
    .hello_box .content .icon:hover {
        color: var(--heo-theme);
    }

    @keyframes barrageIn{
        0% {
            transform: translateX(-50px);
            opacity: 0;
        }

        100% {
            transform: translateX(0px);
            opacity: 1;
        }
    }

    @keyframes barrageOut{
        0% {
            transform: translateX(0px);
            opacity: 1;
        }

        100% {
            transform: translateX(-50px);
            opacity: 0;
        }
    }
```

### 2、js控制动画

js控制动画的目的在于，设置一个定时器，在一定时间后，将这个元素移除，我的思路是在定时器中，往这个元素添加class属性，而class属性会将这个元素动画隐藏，ok，思路理清，代码开始

```js
// 获取元素
var isHelloBox = document.getElementById('isHello');
const isHello = function(){
    if (window.location.pathname === '/') {
        isHelloBox.style.display = 'block';
    } else {
        isHelloBox.style.display = 'none';
        isHelloBox.classList.remove('hide_box')
    }
}
const addClassToIsHelloBox = function(){
    const computedStyle = window.getComputedStyle(isHelloBox)
    if(computedStyle.display === "block"){
        isHelloBox.classList.add('hide_box')
    }else{
        isHelloBox.classList.remove('hide_box')
    }
}
// 延迟时间给定
const delayTime = 5000;
let timerId;
document.addEventListener('pjax:complete',function(){
    clearTimeout(timerId);
    isHello();
    timerId = setTimeout(addClassToIsHelloBox,delayTime);
});
window.addEventListener('load',function(){
    isHello();
    setTimeout(addClassToIsHelloBox,delayTime);
})
```

## 2、开始修改

1、在主题文件夹下，Acrylic/layout下，新增pop.ejs文件，文件内容如下：

```html
<!-- 弹出框 -->
<div class="hello_box" id="isHello">
    <div class="title">
        <p>哇子</p>
    </div>
    <hr class="middle_solid"/>
    <div class="content">
        <p>祝你天天开心🎉🎉</p>
        <p>
            <i class="icon fas fa-arrow-circle-right"></i>
        </p>
    </div>
</div>
<script>
    // 获取元素
    var isHelloBox = document.getElementById('isHello');
    const isHello = function(){
        if (window.location.pathname === '/') {
            isHelloBox.style.display = 'block';
            isHelloBox.classList.remove('hide_box')
        } else {
            isHelloBox.style.display = 'none';
            isHelloBox.classList.remove('hide_box')
        }
    }
    // 创建一个 MutationObserver 实例
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            // 检查 class 变化
            if (mutation.type === "attributes" && mutation.attributeName === "class") {
                const isClassPresent = isHelloBox.classList.contains("hide_box");
                if (isClassPresent) {
                    // 在元素具有目标 class 时执行的操作
                    setTimeout(function(){
                        isHelloBox.style.display = 'none';
                    },700)
                }
            }
        }
    });
    // 配置观察选项
    const config = { attributes: true };

    // 开始观察目标元素的变化
    observer.observe(isHelloBox, config);

    const addClassToIsHelloBox = function(){
        const computedStyle = window.getComputedStyle(isHelloBox)
        if(computedStyle.display === "block"){
            isHelloBox.classList.add('hide_box')
        }else{
            isHelloBox.classList.remove('hide_box')
        }
    }
    // 延迟时间给定
    const delayTime = 5000;
    let timerId;
    document.addEventListener('pjax:complete',function(){
        clearTimeout(timerId);
        isHello();
        timerId = setTimeout(addClassToIsHelloBox,delayTime);
    });
    window.addEventListener('load',function(){
        isHello();
        setTimeout(addClassToIsHelloBox,delayTime);
    })
    
</script>
<style>
    @media screen and (max-width: 1300px) {
        .hello_box {
            display: none !important;
        }
    }
    .hello_box {
        min-width: 300px;
        z-index: 1;
        position: fixed;
        top: 65px;
        left: 50px;
        transition: 0.3s;
        transform-origin: left bottom;
        box-shadow: var(--heo-shadow-border);
        background-color: var(--heo-maskbgdeep);
        border-radius: 12px;
        border: var(--style-border);
        padding: 8px 16px;
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei";
        animation: barrageIn 0.6s cubic-bezier(0.42, 0, 0.3, 1.11);
    }
    .hide_box {
        opacity: 0;
        animation: barrageOut 0.6s cubic-bezier(0.42, 0, 0.3, 1.11);
        z-index: -1;
    }
    .hello_box p {
        margin: 0;
        padding: 0;
    }
    .hello_box .middle_solid{
        margin: 0;
        padding: 0;
        border-top: var(--style-border);
        border-bottom: none;
    }
    .hello_box .title {
        font-size: 12px;
        font-weight: bold;
    }
    .hello_box .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
    }
    .hello_box .content .icon {
        margin-right: 5px;
        cursor: pointer;
    }
    .hello_box .content .icon:hover {
        color: var(--heo-theme);
    }

    @keyframes barrageIn{
        0% {
            transform: translateX(-50px);
            opacity: 0;
        }

        100% {
            transform: translateX(0px);
            opacity: 1;
        }
    }

    @keyframes barrageOut{
        0% {
            transform: translateX(0px);
            opacity: 1;
        }

        100% {
            transform: translateX(-50px);
            opacity: 0;
        }
    }

</style>
```

2、引入这个文件

在Acrylic/layout/layout.ejs中，body体中增加一行代码:

```js
<%- partial('pop.ejs'), {cache: true} %>
```

