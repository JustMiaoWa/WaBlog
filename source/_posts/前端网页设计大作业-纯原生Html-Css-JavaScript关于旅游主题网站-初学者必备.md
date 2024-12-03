---
title: 前端网页设计大作业,纯原生语言Html、CSS、JS实现关于旅游主题网站
tags: ['前端开发','HTML','CSS']
recommend: true
abbrlink: de99f2eb
date: 2024-12-01 18:00:57
categories: '前端开发'
cover: https://image.wazicode.top/blog/202412020104331.png
---

# 前端网页设计期末大作业|纯原生Html+Css+JavaScript关于旅游主题网站|初学者必备

> 如果您觉得这篇文章有帮助的话！给个点赞和评论支持下吧，感谢~
>
> 作者：哇子



Hello，大家好，我是哇子！前几天帮一位同学做了一个关于网页设计的期末大作业，给大家演示下，我们本地启动liveserver，访问5500端口，大致分为首页、关于页、注册登录页，注册登录页就是包括注册和登录两个表单，表单之间有个动画切换效果，关于页就是关于站长的一些信息，首页呢，最上方是一个轮播图，下面依次就是一些图文展示，包括小红书链接、bilibili视频播放等，网站支持响应式，也就是说在移动端同样是适配的，最后需要源码的同学可以评论或者私信我

整体效果如下：

![](https://image.wazicode.top/blog/202412020038125.png)

下面展示部分源码：

轮播图源码：

```html
<!--轮播图源码-->
<div class="swiper-img">
    <div style="width: 100%;height: 100%;background-color: aqua;">
    	<img src="./images/swiper1.png" style="width: 100%;height: 100%;object-fit: cover;"/>
    </div>
    <div style="width: 100%;height: 100%;background-color: rgb(158, 221, 11);">
    	<img src="./images/swiper2.png" style="width: 100%;height: 100%;object-fit: cover;"/>
    </div>
    <div style="width: 100%;height: 100%;background-color: rgb(194, 18, 179);">
    	<img src="./images/swiper3.png" style="width: 100%;height: 100%;object-fit: cover;"/>
    </div>
    <div style="width: 100%;height: 100%;background-color: blue;">
    	<img src="./images/swiper4.png" style="width: 100%;height: 100%;object-fit: cover;"/>
    </div>
</div>
<style>
        .swiper-img {
            display: flex;
            width: 400%;
            height: 100%;
            transition: transform 0.5s ease-in-out;
        }
        .swiper-btns {
            position: absolute;
            bottom: 10%;
            left: 50%;
            width: 415px;
            height: 50px;
            border-radius: 59px;
            background: rgba(255, 255, 255, .7);
            backdrop-filter: blur(6px);
            transform: translateX(-50%);
            display: flex;
            /* gap: 6px; */
            z-index: 9;
            padding: 2px;
        }
        .swiper-btns>.btn-box{
            flex: 1;
            height: 100%;
            border-radius: 25px;
            position: relative;
            z-index: 99;
            color: aliceblue;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            gap: 6px;
            font-size: 16px;
        }
        .swiper-btns>.btn-box>svg{
            font-size: 24px;
        }
        .swiper-btns>.btn-box.active{
            color: #329DEF;
        }
        .swiper-btns>.btn-bg{
            position: absolute;
            z-index: 10;
            background-color: #ffffff; /* 背景块颜色 */
            border-radius: 25px;
            height: calc(100% - 4px);
            transition: all 0.3s ease-in-out;
            left: 2px;
            width: calc(100% / 4); /* 根据按钮数量计算宽度 */
        }
</style>
<script>
	let currentIndex = 0;
    const slides = $('.swiper-img>div');
    const totalSlides = slides.length;

    // console.log(slides,totalSlides)

    function showSlide(index) {
        const swiperboxWidth = $('.swiper-box').width()
        currentIndex = (index + totalSlides) % totalSlides
        const offset = -currentIndex * swiperboxWidth
        $('.swiper-img').css('transform', `translateX(${offset}px)`);
        // $('.indicator').removeClass('active').eq(index).addClass('active');
        // 图标变化
        const btnBoxes = document.querySelectorAll(".btn-box");
        const btnBg = document.querySelector(".btn-bg");
        const btnBoxesWidth = btnBoxes[0].getBoundingClientRect().width

        // 移除所有按钮的激活状态
        btnBoxes.forEach(box => box.classList.remove("active"));
        // console.log(index,currentIndex)
        btnBoxes[currentIndex].classList.add("active");
        btnBg.style.left = `${currentIndex * btnBoxesWidth + 2}px`
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex + 1);
    }


    // Auto-play
    let timer = setInterval(nextSlide, 3000);
</script>
```

登录注册源码：

```html
<div class="all-box">
        <div class="margin-box">
            <div class="fm-box">
                <img src="./images/loginfm.png" style="width: 100%;height: 100%;object-fit: contain;"/>
            </div>
            <div class="rl-box">
                <div class="change-btn">
                    <span class="login active" id="login">登录</span>
                    <span class="registe" id="registe">注册</span>
                </div>
                <div class="relo-box">
                    <div class="inner-box">
                        <div class="login-box" id="login-box">
                            <input type="text" placeholder="请输入账号" class="login-zh"/>
                            <input type="password" placeholder="请输入密码" class="login-mm"/>
                            <div class="login-btn">登录</div>
                            <div class="file-agree">登录即视为同意服务协议</div>
                        </div>
                        <div class="regist-box  active" id="regist-box">
                            <input type="text" placeholder="请输入注册账号" class="login-zh"/>
                            <input type="password" placeholder="请输入注册密码" class="login-mm"/>
                            <div class="login-btn">注册</div>
                            <div class="file-agree">注册即视为同意服务协议</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
<script>
	$(document).ready(function() {
            $('#login').on('click', function() {
                $(this).addClass('active');
                $('#registe').removeClass('active');
                
                $('#regist-box').addClass('active');
                $('#login-box').removeClass('active');
                $('.inner-box').css('transform', 'translateX(0)');
            });

            $('#registe').on('click', function() {
                $(this).addClass('active');
                $('#login').removeClass('active');
                $('#login-box').addClass('active');
                $('#regist-box').removeClass('active');
                $('.inner-box').css('transform', 'translateX(-50%)');
            });
        });
</script>
```

