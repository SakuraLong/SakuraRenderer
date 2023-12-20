const testData = `
= 此界面用于测试与负责验收

文档位于src/assets/testData.js中的testData

= 标题测试

= 一级标题

== 二级标题，有浮动动画 ?style HA

=== 三级标题，无链接 ?style HL=false

==== 四级标题，居中 ?style TA=c|BP=b

===== 五级标题

====== 六级标题

======= 等于号超过六个时显示六级标题

{|标题|h2
|class=class1;class2
|TA=c|BP=bottom|HA
|class=class3;class4
|style=color:red;line-height:2
|clear=right
|-
|当然你也可以通过更加详细的设置配置标题
|}

= 段落测试

这是一个最普通的段落，\\n不能换行

{|para|type=success
|-
|这是一个success段落
|}

{|para|type=warning
|-
|这是一个warning段落
|}

{|para|type=info
|-
|这是一个info段落
|}

{|para|type=tip
|-
|这是一个tip段落
|}

== 测试ignore、poem标签

此处会有语法<sr-i><span><</span>sr-i>{{heimu|忽略}}<span><</span>/sr-i></sr-i>：<sr-i>{{heimu|忽略}}</sr-i><br>
此处会有语法<sr-i><span><</span>poem>星期一\n星期二\n星期三<span><</span>/poem></sr-i>:<poem>星期一\n星期二\n星期三</poem>

== 测试模板

{{quote|1|1}}1{{quote|1|1}}

= 测试列表

{|list|
|-
|*无序列表1
|*无序列表2
|}

{|list|number
|-
|+有序列表1
|+有序列表2
|++有序列表2.1
|}

== 序号有格式的列表

{|list|template=第*季|template
|-
|+第一季
|+第二季
|+第三季
|}

== 可以折叠的列表

{|list|number|fold
|-
|+有序列表1
|+有序列表2
|++有序列表2.1
|}

= 表格测试

{|table|class=class1|
|width=600px|float=center
|border=border
|hover=node
|name=课程表
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

== 可以折叠的表格

{|table|class=class1|
|width=600px|float=center
|fold
|border=border
|hover=node
|name=课程表
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

== 隐藏部分单元格

{|table|border=border|hover=node
|TW=70px|TH=70px|width=210px
|name=隐藏校准单元格
|float=center
|-
| 123 d| 123 d| 123 d| 123 d
|-
| 123 d| 隐藏校准单元格 c=2/r=1/t | 隐藏校准单元格 c=1/r=2/t
|-
| 123 d| 隐藏校准单元格 c=1/r=2/t | 隐藏校准单元格 c=1/r=1/t
|-
| 123 d| 隐藏校准单元格 c=2/r=1/t
|}

{|table|border=border|hover=node
|TW=70px|TH=70px|width=280px
|name=不隐藏校准单元格
|float=center
|-
| 校准单元格 | 校准单元格 | 校准单元格 | 校准单元格
|-
| 校准单元格 | 不隐藏校准单元格 c=2/r=1/t | 不隐藏校准单元格 c=1/r=2/t
|-
| 校准单元格 | 不隐藏校准单元格 c=1/r=2/t | 不隐藏校准单元格 c=1/r=1/t
|-
| 校准单元格 | 不隐藏校准单元格 c=2/r=1/t
|}

= 全部图片展示器

{|allIS
|IP=center
|width=500px
|space=1%
|row=3
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

= 走马灯图片展示器

{|carouselIS
|loop
|interval=2000
|center
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg 第一张图片
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg 第二张图片
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg 第三张图片
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg 第四张图片
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png 第五张图片
|}

= 相册图片展示器

{|albumIS
|align=center
|imgW=200px
|-
| https://img.moegirl.org.cn/common/thumb/6/6f/Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg/450px-Toaru_Kagaku_no_Railgun_T_Anime_KV2.jpg 测试测试
| https://img.moegirl.org.cn/common/thumb/e/e5/Misaka_-_BD2.jpg/375px-Misaka_-_BD2.jpg
| https://img.moegirl.org.cn/common/thumb/4/4d/Uiharu_Kazari.jpg/375px-Uiharu_Kazari.jpg
| https://img.moegirl.org.cn/common/thumb/9/97/Saten_Ruiko.jpg/375px-Saten_Ruiko.jpg
| https://img.moegirl.org.cn/common/thumb/a/a1/36012599_p0.png/375px-36012599_p0.png
|}
`;

export default {
    testData,
};
