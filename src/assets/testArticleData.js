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
{|para
|-
|{{quote|这是不错的文档渲染器|项目组}}
|{{quote|这是不错的文档渲染器|项目组}}
|}

{|para
|-
|{{del|content=这是被删除的文本|color=red|size=2px}}
|}

{|para
|-
|{{und|content=这是被下划线的文本|color=#120132|size=5px}}
|}

{|para|type=success
|-
|<span onclick='test(event)'>test</span>{{ref|refText=百度百科}}
|}

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

== 这是一个有动画的标题 ?style HA

== 这是一个文字居中而且有动画的标题 ?style HA|TA=c

== 这是一个文字居中、边框在下而且有动画的标题 ?style HA|textAlign=c|BP=b

== 这是一个文字居中、边框在下而且有动画但没有超链接的标题 ?style HA|TA=c|BP=b|HL=false


{|标题|h2
|class=class1;class2
|TA=c|BP=bottom|HA
|class=class3;class4
|style=color:red;line-height:2
|clear=both
|-
|当然你也可以通过更加详细的设置配置标题
|}

{|list|
|fold
|template=第*章;1
|float=right
|t
|-
|+害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞害羞羞
|++欧尼酱
|++只因
|+有序：你干嘛
|++欧尼酱
|+++只因
|+有序：你干嘛
|++欧尼酱欧尼酱
|++欧尼酱
|++stack
|++ascd
|* yi
|** er
|* yi
|** er
|}

{|title|
|clear=both
|-
|接下来介绍表格
|}

== 这是一个简单的表格

{|table|class=class1|
|width=600px|float=center
|border=border
|hover=node
|style=color:red
|name=课程表
|-
|+ 节次/周次|星期一|星期二|星期三|星期四|星期五
|-
| {{quote|这是不错的文档渲染器|项目组}} c=6
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
|TW=70px|TH=70px|width=210px
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

== 你也可以折叠表格，也可以设置最大高度来产生滚动条（当设置float=center，宽度不会产生滚动条）

==== aassasasaassasa

{|table|class=class1|fold
|width=600px|float=center
|border=border
|hover=node
|name=课程表
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
|TW=80px|TH=80px
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
|left
|-
| https://img2.baidu.com/it/u=4023601634,1253627961&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500
| https://img1.baidu.com/it/u=692986918,1036130994&fm=253&fmt=auto&app=138&f=JPEG?w=888&h=500
| https://img1.baidu.com/it/u=2421558318,922867107&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667
| https://img2.baidu.com/it/u=3505369468,1344692084&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667
| https://img1.baidu.com/it/u=1697803941,1711840958&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641
|}

=== 当然你也可以布局

{|carouselIS
| center|interval=3000
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

{|para|style=font-size:20px;width:100%
|class=class1;class2
|type=success
|border=none
|-
| 第1期TV动画《某科学的超电磁炮》于2009年10月2日播出，全24话。第1~12话为原作的“幻想御手（Level Upper）”篇。之后为根据原作者镰池和马的意见所制作的原创小故事，包括第15~16话的“武装无能力者集团（Skill Out）”篇与第20~24话的“乱杂开放（Poltergeist）”篇。
2010年7月27日的视觉书附赠DVD中收录了5分钟新制作的动画短篇（第1期#13'）。
| 第2期TV动画《某科学的超电磁炮S》于2013年4月12日播出，全24话。标题中的“S”指的是“妹妹们（Sisters）”[3]，同时也指第18-24话的原创篇章“革命未明（Silent Party）”和第2期的英文“Second Season”[4]。
2014年3月27日的视觉书附赠Blu-ray中收录了6分钟新制作的动画短篇（第2期特典）。
| 第3期TV动画《某科学的超电磁炮T》于2020年1月10日播出，全25话。第1~15话为原作的“大霸星祭”篇，第16~25话为原作的“天赋梦路（Dream Ranker）”篇。碟片版第25话为导演剪辑版，新增约两分钟内容。
在漫画中上条当麻有更为充足的戏份，不过动画化时监督长井龙雪从构成角度考虑删减了部分上条当麻的剧情。
|}

{|para|style=font-size:20px;width:100%
|class=class1;class2
|type=tip
|tips=我可去你的
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
|loop
|interval=2000
|none
|width=300px
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png
|}

{|albumIS
|float=center
|imgWidth=200px
|imgHeight=300px
|height =20px
|index =2
|name = 微软微软
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg 测试测试
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png
|}

{|allIS
|IP=center
|space=1%
|height=100px
|column=5
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
|}


== asdasd

{|para|style=font-size:20px;width:100%
|type=info
|tips=测试一下
|-
| 段落第一句话，这不会换行。段落第一句话，这不会换行。段落第一句话，这不会换行。
段落第一句话，这不会换行。段落第一句话，这不会换行。
| 段落第二句话，这部分与上面一句相比，已经换行了。段落第二句话，这部分与上面一句相比，已经换行了。
段落第二句话，这部分与上面一句相比，已经换行了。
| <ignore>忽略忽略</ignore>
| <ignore>忽略忽略1231212</ignore>
| <poem>哈哈哈
哈哈哈
哈哈哈哈哈</poem>
|}

{|carouselIS
|loop
|interval
|center
|-
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-mountain-scenery-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/camping-on-top-of-the-mountain-during-sunset-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
| https://i0.wp.com/picjumbo.com/wp-content/uploads/golden-hour-in-old-park-romantic-fall-nature-with-old-bridge-free-photo.jpg?w=2210&quality=70
|}
{|para|style=font-size:20px;width:100%;display:block
|class=class1;class2
|type=warning
|border=none
|-
| <poem>哈哈哈
哈哈哈
哈哈哈哈哈</poem>
|}

= 上面是demo，下面开始介绍使用方法

{|para
|-
|&nbsp&nbsp&nbsp&nbsp本渲染器需要掌握的知识大体上分为：组件<sr-i>{|组件名字|配置……|}</sr-i>、模板<sr-i>{{模板名字|配置……}}</sr-i>、模板<sr-i>[[模块名字|配置……]]</sr-i>、
语法、渲染器内嵌标签、配置项、外层的vue组件。
|&nbsp&nbsp&nbsp&nbsp组件分为：标题、段落、表格、列表、全部图片显示器、相册图片显示器、走马灯图片显示器
|&nbsp&nbsp&nbsp&nbsp模板体量较大，这里不进行介绍
|&nbsp&nbsp&nbsp&nbsp模块分为：行内图片模块、行内音乐模块
|下面先介绍组件
|}

== 组件

=== 标题组件

{|para
|-
|&nbsp&nbsp&nbsp&nbsp标题组件是较为常用的组件，组件有两种可以选择的语法
|<poem>第一种是
= 一级标题
== 二级标题
=== 三级标题
==== 四级标题
===== 五级标题
====== 六级标题
======= 还是六级标题</poem>
<poem>第二种是
{|title|type=h1
|-
|一级标题
|}
</poem>
|当然标题也包含一些配置项
|}

{|para|type=tip|
|-
|标题建议不要跨级书写
|}

{|table|width=100%
|-
|+ title配置项 c=6
|-
| 名称 t| 含义 t|可选值 t| 可选值效果 t|是否支持?style t| 默认值 t
|-
|ta r=2/t | text align标题文字显示位置 r=2 | left,l | 标题文字靠左 | 是 r=2| left r=2
|- 
|center,c| 标题文字居中
|-
| bp r=3/t | border position边框的位置 r=3| left,l|边框在左侧|是 r=3| left r=3
|-
| bottom,b|边框在底部
|-
| none,n|没有边框
|-
|ha r=2/t | hover animation是否有浮动动画 r=2 | true | 有 | 是 r=2| false r=2
|- 
|false| 没有
|-
|hl r=2/t | has link是否存在页面内跳转链接按钮 r=2 | true | 存在 | 是 r=2| true r=2
|- 
|false| 不存在
|-
|class t | 组件的类列表 | 类名1;类名2;类名3 | 给h组件添加此类 | 否 | 空
|-
|style t | 组件的css样式列表 | 样式1:值1;样式2:值2 | 给h组件添加此样式 | 否 | 空
|-
|type t | 组件是h几标题 | h1~h6 | 确定的h几标题 | 否 | h1
|}

`;

const articleForTemplate = `
配置项
|-

{|para
|-
|{{quote|这是不错的文档渲染器|项目组}}
|}
`;

export default {
    test_article_data_list,
    article,
    articleForTemplate,
};
