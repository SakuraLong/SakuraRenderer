const test_article_data_list = [
    {
        type: "sr-title",
        data: {
            type: "h1",
            content: "标题",
            id: "title_id1",
            option: {
                textAlign: "left",
                borderPosition: "left",
                hoverAnimation: false,
                hasLink: true,
            },
        },
    },
    {
        type: "sr-title",
        data: {
            type: "h2",
            content: "标题标题标题",
            id: "title_id2",
            option: {
                textAlign: "center",
                borderPosition: "bottom",
                hoverAnimation: true,
                hasLink: false,
            },
        },
    },
    {
        type: "sr-title",
        data: {
            type: "h3",
            content: "标题33333333333",
            id: "title_id3",
            option: {
                textAlign: "left",
                borderPosition: "none",
                hoverAnimation: true,
                hasLink: true,
            },
        },
    },
];

const article = `
配置项
配置项
|-
= 这个渲染文本在src/assets/testArticleData.js的article变量中

= 一级标题

== 二级标题

=== 数学公式：$x+y=\\Delta$

==== 四级标题

===== 五级标题

====== 六级标题

======= 七级标题？当'='超过6个时，都会按照6级标题

{|段落
|-
| 段落里面也可以设置数学公式：$x+y=\\Delta$
| 段落里面可以换行
|}

{|段落
|-
| 更换段落必须要新写段落组件
| 段落里面可以换行
|}

= 标题也可以设置配置

== 这是一个有动画的标题 ?style ha

== 这是一个文字居中而且有动画的标题 ?style ha|ta=c

== 这是一个文字居中、边框在下而且有动画的标题 ?style ha|ta=c|bp=b

== 这是一个文字居中、边框在下而且有动画但没有超链接的标题 ?style ha|ta=c|bp=b|hl=false

{|标题|type=h1
|class=class1;class2
|ta=c|bp=bottom|ha
|class=class3;class4
|style=color:red;line-height:2
|-
|当然你也可以通过更加详细的设置配置标题
|}

= 接下来介绍表格

== 这是一个简单的表格

{|table|class=class1|
|width=600px|float=center
|border=border
|hover=node
|-
|+ 节次/周次|星期一|星期二|星期三|星期四|星期五
|-
|第一节|||||
|-
|第二节||||编译原理 r=2|操作系统 r=3
|-
|第三节|经济学原理 r=2||软件工程 r=2
|-
|第四节||
|-
|第五节||||计算机组成原理实验 r=2|
|-
|第六节||||
|-
|第七节|习近平新时代中国特色社会主义理论 r=2|并行与分布式程序设计 r=2|人工智能导论 r=2||操作系统实验 r=2
|-
|第八节|
|-
|第九节|计算机网络 r=2||python语言程序设计 r=2||
|-
|第十节|||
|-
|第十一节|计算机网络实验 r=3|并行与分布式程序设计实验 r=3|python语言设计实验 r=2|编译原理实验 r=3|
|-
|第十二节|
|-
|第十三节||
|-
|第十四节|||||
|}

== 你也可以用一些技巧画出不一样的表格

{|table|border=border|hover=node
|nw=70px|nh=70px|width=210px
|name=展示不一样的表格
|float=center
|-
| 123 d| 123 d| 123 d| 123 d
|-
| 123 d| 用一些技巧 c=2/r=1/t | 你还可以 c=1/r=2/t
|-
| 123 d| 这样 c=1/r=2/t | 不一样的表格 c=1/r=1/t
|-
| 123 d| 画出 c=2/r=1/t
|}


{|albumIS
|class=class1;class2
|width=200px
|imgW=100px
|imgH=x200px
|-
|https://img.moegirl.org.cn/common/thumb/b/b4/16bitsensation_al_KV.jpg/420px-16bitsensation_al_KV.jpg
|https://lupic.cdn.bcebos.com/20220107/3086034705_23_600_261.jpg
|https://lupic.cdn.bcebos.com/20191203/3016196694_23.jpg
|}
=======
== 你也可以折叠表格，也可以设置最大高度来产生滚动条（当设置float=center，宽度不会产生滚动条）

{|table|class=class1|fold
|width=600px|float=center
|border=border
|hover=node
|maxHeight=300px
|-
|+ 节次/周次|星期一|星期二|星期三|星期四|星期五
|-
|第一节|||||
|-
|第二节||||编译原理 r=2|操作系统 r=3
|-
|第三节|经济学原理 r=2||软件工程 r=2
|-
|第四节||
|-
|第五节||||计算机组成原理实验 r=2|
|-
|第六节||||
|-
|第七节|习近平新时代中国特色社会主义理论 r=2|并行与分布式程序设计 r=2|人工智能导论 r=2||操作系统实验 r=2
|-
|第八节|
|-
|第九节|计算机网络 r=2||python语言程序设计 r=2||
|-
|第十节|||
|-
|第十一节|计算机网络实验 r=3|并行与分布式程序设计实验 r=3|python语言设计实验 r=2|编译原理实验 r=3|
|-
|第十二节|
|-
|第十三节||
|-
|第十四节|||||
|}

{|table|class=class1|fold
|width=300px
|border=border
|hover=node
|maxHeight=300px
|-
|+ 节次/周次|星期一|星期二|星期三|星期四|星期五
|-
|第一节|||||
|-
|第二节||||编译原理 r=2|操作系统 r=3
|-
|第三节|经济学原理 r=2||软件工程 r=2
|-
|第四节||
|-
|第五节||||计算机组成原理实验 r=2|
|-
|第六节||||
|-
|第七节|习近平新时代中国特色社会主义理论 r=2|并行与分布式程序设计 r=2|人工智能导论 r=2||操作系统实验 r=2
|-
|第八节|
|-
|第九节|计算机网络 r=2||python语言程序设计 r=2||
|-
|第十节|||
|-
|第十一节|计算机网络实验 r=3|并行与分布式程序设计实验 r=3|python语言设计实验 r=2|编译原理实验 r=3|
|-
|第十二节|
|-
|第十三节||
|-
|第十四节|||||
|}

= 为了界面美观，可以设置浮动

{|table|border=border|hover=node
|float=right
|nw=80px|nh=80px
|-
| 123 d| 123 d| 123 d| 123 d
|-
| 123 d| 滨海新区<br><span style='font-size:40px;word-break:keep-all'>19℃</span><br>22/12℃<br>阴 空气良 r=3/c=3
|-
| 123 d
|-
| 123 d
|-
| 123 d|布拉万<br>台风
|20℃<br>体感温度
|68%<br>湿度
|}

{|para
|-
| &nbsp&nbsp&nbsp&nbsp段落第一句话，这不会换行。段落第一句话，这不会换行。段落第一句话，这不会换行。
段落第一句话，这不会换行。段落第一句话，这不会换行。
| &nbsp&nbsp&nbsp&nbsp段落第二句话，这部分与上面一句相比，已经换行了。段落第二句话，这部分与上面一句相比，已经换行了。
段落第二句话，这部分与上面一句相比，已经换行了。
|}

== 我们还提供图片展示器

{|carouselIS
| width=500px|height=300px
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png
|}

=== 当然你也可以布局

{|carouselIS
| width=500px|height=300px|right|play=3000
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png
|}

{|table
|maxWidth=500px
|name=展示不一样的表格
|float=right|clear=both
|-
|+ |第1期|第2期|第3期
|-
|原作 t|镰池和马＋冬川基 c=3
|-
|角色设计 t|灰村清孝 c=3
|-
|监督 t|长井龙雪 c=3
|-
|系列构成 t|水上清资 c=2|安川正吾
|-
|助监督 t| sr-none c=2|堀口和树
|-
|动画角色设计 t|田中雄一 c=3
|-
|动画次要角色设计 t||冷水由纪绘|萩原弘光、吉田优子
|-
|机械设计 t|常木志伸|明贵美加（17~24话）|
|-
|动作监督 t||椛岛洋介|青木健一郎（22话）
|-
|道具设计 t|阿部望|常木志伸、高濑健一|
|-
|构图监修 t|樱美胜志（1话）||樱美胜志
|-
|美术监督 t|黑田友范 c=2|泉健太郎
|-
|色彩设计 t|安藤智美 c=3
|-
|摄影监督 t|福世晋吾 c=3
|-
|编辑 t|西山茂（REAL-T） c=3
|-
|音响监督 t|明田川仁 c=3
|-
|音乐 t|I've Sound/井内舞子 c=2|井内舞子
|-
|音乐制作人 t|西村润|小岛刚|土肥范子
|-
|企画 t|川村明广<br>
铃木一智、阿部伦久<br>
三上康博、太布尚弘
|林裕之、川村明广<br>
铃木一智、阿部伦久<br>
土桥哲也、太布尚弘
|青柳昌行、川村明广<br>
田岛宏行、西角浩一<br>
国枝信吾、宫田知行<br>
山崎明日香
|-
|制片 t|平、松仓友二<br>
梅泽淳
|濑浩平、上田耕行<br>
松仓友二、梅泽淳
|濑浩平、广野启<br>
松仓友二
|-
|制作人 t|中山信宏、峰健司<br>
三木一马<br>
藤田敏、金庭こず惠	
|中山信宏、峰健司<br>
三木一马、服部健太郎<br>
藤田敏、金庭こず惠
|三木一马、浅田成宽<br>
志治雄一郎、服部健太郎<br>
中仓岳大、金庭こず惠<br>
阿部伦久、𥐟谷德知
|-
|动画制作人 t|柏田真一郎|铃木薰 c=2
|-
|制作担当 t|中川二郎|冈田耕二|佐佐木雄人
|-
|动画制作 t|J.C.STAFF c=3
|-
|制作委员会 t|PROJECT-RAILGUN|PROJECT-RAILGUN S|PROJECT-RAILGUN T
|}

{|para|style=font-size:20px;width:100%
|class=class1;class2
|type=warning
|border=none
|-
| 第1期TV动画《某科学的超电磁炮》于2009年10月2日播出，全24话。第1~12话为原作的“幻想御手（Level Upper）”篇。之后为根据原作者镰池和马的意见所制作的原创小故事，包括第15~16话的“武装无能力者集团（Skill Out）”篇与第20~24话的“乱杂开放（Poltergeist）”篇。
2010年7月27日的视觉书附赠DVD中收录了5分钟新制作的动画短篇（第1期#13'）。
| 第2期TV动画《某科学的超电磁炮S》于2013年4月12日播出，全24话。标题中的“S”指的是“妹妹们（Sisters）”[3]，同时也指第18-24话的原创篇章“革命未明（Silent Party）”和第2期的英文“Second Season”[4]。
2014年3月27日的视觉书附赠Blu-ray中收录了6分钟新制作的动画短篇（第2期特典）。
| 第3期TV动画《某科学的超电磁炮T》于2020年1月10日播出，全25话。第1~15话为原作的“大霸星祭”篇，第16~25话为原作的“天赋梦路（Dream Ranker）”篇。碟片版第25话为导演剪辑版，新增约两分钟内容。
在漫画中上条当麻有更为充足的戏份，不过动画化时监督长井龙雪从构成角度考虑删减了部分上条当麻的剧情。
|}

{|carouselIS
|width=500px
|height=300px
|cycle
|play=2000
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png
|}

== asdasd

{|para|style=font-size:20px;width:100%
|class=class1;class2
|type=warning
|border=none
|-
| 段落第一句话，这不会换行。段落第一句话，这不会换行。段落第一句话，这不会换行。
段落第一句话，这不会换行。段落第一句话，这不会换行。
| 段落第二句话，这部分与上面一句相比，已经换行了。段落第二句话，这部分与上面一句相比，已经换行了。
段落第二句话，这部分与上面一句相比，已经换行了。
|}

{|albumIS
| width=500px|height=300px|right|play=3000
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png
|}

`;

export default {
    test_article_data_list,
    article,
};
