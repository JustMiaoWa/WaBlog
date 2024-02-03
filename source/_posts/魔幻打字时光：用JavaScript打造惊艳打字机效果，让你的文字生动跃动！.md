---
title: 魔幻打字时光：用JavaScript打造惊艳打字机效果，让你的文字生动跃动！
tags:
  - 前端开发
  - JavaScript
  - 打字机效果
  - 前端笔记
  - 知识分享
recommend: false
categories: 前端开发
abbrlink: 44b82ec5
date: 2024-02-03 21:58:56
cover: https://image.wazicode.top/blog/202402032230044.png
---

# 魔幻打字时光：用JavaScript打造惊艳打字机效果，让你的文字生动跃动！

先准备一个Html的模版：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            background-color: black;
            color: white;
        }
        #switch-box {
            color: #0cc4fb;
        }
    </style>
</head>
<body>
    我要成为
    
    <span id="switch-box"></span>
    
    高手
</body>
</html>
```

在switch-box中实现打字效果，得利用js，首先定义一个字符串数组，用于在打字机中切换文字，然后定义一个函数将数组中的字放到内容中，每次切换后索引+1，然后循环调用这个函数,当索引大于数组长度的时候，把索引重新归0

```javascript
<script>
	const stringArray = ['C++','Go','Java','Js','PHP']
    let switch_box = document.getElementById('switch-box')
    // 定义数组索引
    let index = 0
    let delay = 500
    let changeText = () => {
        switch_box.textContent = stringArray[index]
        index ++
        if(index >= stringArray.length){
            index = 0
        }
        setTimeout(changeText,delay)
    }
    changeText()
</script>
```

这其实已经能实现切换了，只是没有打字效果，我们再利用js，用于显示一个个字符的显示，利用substring切割字符，每次字符数量+1，当切割全部的时候，就该执行删除了，所以应该定义一个删除的标志，在删除完之后，就应该切换到下一个字符了。

下面是完整代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            background-color: black;
            color: white;
        }
        #switch-box {
            color: #0cc4fb;
        }
    </style>
</head>
<body>
    我要成为
    
    <span id="switch-box"></span>
    
    高手
    <script>
        const stringArray = ['C++','Go','Java','Js','PHP']
        let switch_box = document.getElementById('switch-box')
        // 定义数组索引
        let index = 0
        let delay = 0
        let charIndex = 0
        // 删除标志
        let isDelete = false
        let defaultDelay = 300
        let waitDalay = 1000

        let changeText = () => {
            switch_box.textContent = stringArray[index].substring(0,charIndex);
            if(!isDelete){
                delay = defaultDelay
                charIndex ++ 
                if(charIndex > stringArray[index].length){
                    // 当charIndex已经大于字符的长度的时候，表示应该执行删除动画了
                    isDelete = true    
                    delay = waitDalay
                }
            }else{
                delay = defaultDelay
                charIndex --
                if(charIndex < 1){
                    isDelete = false
                    index ++
                    if(index >= stringArray.length){
                        index = 0
                    }
                }
            }
            setTimeout(changeText,delay)
        }
        
        changeText()
    </script>
</body>
</html>
```

最后补充下文字后的光标闪烁效果

```css
/*打字样式光标*/
#switch-box::after {
    content: "I";
    font-size: 18px;
    display: inline-block;
    vertical-align: top;
    font-weight: lighter;
    animation: flicker .5s infinite;
}

/*光标闪烁动画*/
@keyframes flicker {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
```

