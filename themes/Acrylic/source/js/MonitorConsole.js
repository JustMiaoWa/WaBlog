// 消除控制台打印
var HoldLog = console.log;
console.log = function() {}
;
let now1 = new Date();
queueMicrotask(()=>{
    utils.snackbarShow(GLOBALCONFIG.lang.theme.dark, false, 2000)
    const Log = function() {
        HoldLog.apply(console, arguments);
    };
    //在恢复前输出日志
    const grt = new Date("2023-05-12 00:00:00");
    //此处修改你的建站时间或者网站上线时间
    now1.setTime(now1.getTime() + 250);
    const days = (now1 - grt) / 1000 / 60 / 60 / 24;
    const dnum = Math.floor(days);
    const ascll = [`博客主题Acrylic-Next!`, ``, `

    █████╗  ██████╗██████╗ ██╗   ██╗██╗     ██╗ ██████╗
    ██╔══██╗██╔════╝██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝
    ███████║██║     ██████╔╝ ╚████╔╝ ██║     ██║██║     
    ██╔══██║██║     ██╔══██╗  ╚██╔╝  ██║     ██║██║     
    ██║  ██║╚██████╗██║  ██║   ██║   ███████╗██║╚██████╗
    ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝ ╚═════╝

`, "已上线", dnum, "天", "©2023 By Acrylic-Next V1.1.2", ];
    const ascll2 = [`NCC2-036`, `调用前置摄像头拍照成功，识别为【小笨蛋】.`, `Photo captured: `, `🤪`];

    setTimeout(Log.bind(console, `\n%c ${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c ${ascll[3]}%c ${ascll[4]}%c ${ascll[5]}\n\n%c ${ascll[6]}\n`, "color:#3b70fc", "", "color:#3b70fc", "color:#3b70fc", "", "color:#3b70fc", ""));
    setTimeout(Log.bind(console, `%c ${ascll2[0]} %c ${ascll2[1]} %c \n ${ascll2[2]} %c\n ${ascll2[3]}\n`, "color:white; background-color:#4fd953", "", "", 'background:url("https://npm.elemecdn.com/anzhiyu-blog@1.1.6/img/post/common/tinggge.gif") no-repeat;font-size:450%'));

    setTimeout(Log.bind(console, "%c WELCOME %c 你好，小笨蛋.", "color:white; background-color:#4f90d9", ""));

    setTimeout(console.warn.bind(console, "%c ⚡ Powered by Acrylic-Next %c 你正在访问 哇子 的博客.", "color:white; background-color:#f0ad4e", ""));

    setTimeout(Log.bind(console, "%c W23-12 %c 你已打开控制台.", "color:white; background-color:#4f90d9", ""));

    setTimeout(console.warn.bind(console, "%c S013-782 %c 你现在正处于监控中.", "color:white; background-color:#d9534f", ""));
}
);