# sakuraRenderer

## 注意

1. 本项目必须要安装element plus并且全局挂载（包括css）

## 样式顺序

articleGroup < articleContainer < option < articleConfig < elementClass < elementStyle < style

## 规范

1. 组件的name须以sr开头，单词全小写，单词之间通过-分割
2. css类名字按照BEM规范，须以sa开头，css样式不用写在vue下，写在配套的css文件里面
3. 组件用到的颜色变量在css文件开始的地方进行变量定义，颜色变量按照--sa-color+组件识别名字+颜色的位置
4. 被articleContainer直接调用的组件有且只有data一个props，类型是Object

## 渲染流程
1. 文档加载
    1. 预处理（暂无）
2. 划分区间
    1. 拆分配置项、文章主体
3. 配置项初始化
    1. 拆分配置项
    2. 合并同类配置项
    3. 与默认配置项合并
4. 拆分主体结构
    1. 拆分成组件（大体）
5. 处理每一个主体架构
    1. 确定不需要渲染的区域
        1. 将其从文章里面用特殊句子替换
    2. 确定代码区域
        1. 将其从文章里面用特殊句子替换
    3. 处理模板语法
    4. 将代码区域插回文章
    5. 对文章代码区域进行渲染
    6. 将不需要渲染的区域插回文章
6. 合并主体架构成为符合要求的渲染数组
7. 加入到布局管理器中（文章承载器）
8. 使用vue的component进行循环渲染

## 组件（大体）

1. 标题 title
2. 段落 paragraph
3. 目录 catalogue
    1. 左右上下侧目录
    2. 浮动目录
4. 表格 table
5. 列表 list
6. 图片显示器 imageShower
    1. 全部图片显示器 allImageShower
    2. 走马灯图片显示器 carouselImageShower
    3. 相册图片显示器 albumImageShower

注意：
1. 以上组件都不能相互嵌套（暂时）
2. 以上组件两辆之间必须要两个换行符

## 语法
**注意，此部分和md有语法冲突，按照源代码为准！！**
1. ~~包围 ~~删除线~~
2. **包围 **加粗**
3. 4个- 分割线
4. *包围 *斜体*
5. __包围 __下划线__
6. ~*包围 ~*粗斜体*~

+ 删除线、加粗、下划线更加详细的设定需要在模板中编写

## 模板
+ 模板都是被{{}}括起来
+ 模板基础语法：{{模板名字|参数1|参数3=red}}
    + 模板名字是确定不可变的，如果填写不存在的模板名字会将去掉{{}}的代码放到界面上
    + 参数之间通过|分割
    + 模板的参数可能会有不同名字，在文档中用#分割
    + 不加=则参数按照顺序填写
    + 加上=则参数按照=进行赋值
    + 参数是可以选填的，详细会在各各模板介绍
    + 模板的对外显示内容（会有说明）里面的内容可以嵌套其他部分模板（会有说明）
    + 模板内部内容允许换行
    + 后设置的参数会覆盖前面设置的参数
    + 假定现有模板：{{测试#test|句子#content|颜色#color|大小#size}}，且参数：大小#size默认值是20px，则以下写法效果完全相同：
        + {{测试|测试的句子|red|20px}}
        + {{测试|颜色=red|句子=测试的句子|20px}}
        + {{测试|测试的句子|3=20px|2=red}}
        + {{test|color=red|size=20px|content=测试的句子}}
        + {{测试|color=red|content=测试的句子}}
        + {{测试|color=blue|content=测试的句子|color=red}}
1. {{黑幕#heimu#hide|内容#content|注释#title}}
2. {{模糊#blur|内容#content|注释#title|范围#size}}
3. {{文本#font|内容#content|颜色#color|大小#size|行高#height|字体#fontfamily|粗细#weight|背景色#bgcolor|斜体#italic|位置#align}}
4. {{删除线#del|内容#content|颜色#color|粗细#size}}
5. {{下划线#und|内容#content|颜色#color|粗细#size}}
6. {{注解#ruby|内容#content|解释#explain}}
7. {{超链接#a|链接#href|内容#content|提示#title}}
8. {{id|内容#content|ID}}
9. {{func|内容#content|click|mousein|mouseout|doubleclick}}
10. {{显示框#box|内容#content|框内内容#boxcontent|图片#src}}
11. {{引用#ref|内容#content|来源#from}}

## 标签
+ 真实标签代表会在h5注册为自定义标签，通过h5渲染
+ 虚假标签不是自定义标签，只是进行标记

1. sr-box/sr-b 行内鼠标浮动显示框
    + 真实标签
2. sr-ref/sr-r 行内引用标签文档区域
    + 虚假标签
3. sr-code/sr-c 行内代码区域标签
    + 真实标签
4. sr-poem/sr-p 保留换行符区域标签
    + 真实标签
5. sr-ignore/sr-i 不对文本进行渲染
    + 虚假标签

## 行内图像

+ 行内图像是被\[\[]]括起来的
+ 模块基础语法（格式）：\[\[img:文件路径|title=标题|选项]]
    + 参数之间通过|分割
    + 模块的参数可能会有不同名字，在文档中用#分割
    + 标题必须要以title进行赋值

+ 参数
    + 支持的文件格式与html的img组件支持的格式相同
    + 标题可以包含模板
        + 标题默认值为：图片路径
    + 选项可选值：
        + 格式
        + 尺寸
            + 宽度px，例如：200px
            + x高度px，例如：x100px
            + 宽度x高度px
            + **默认值：300px**
        + 水平对齐
            + inline，行内元素
            + none，块状元素
            + left，块状元素，float:left
            + right，块状元素，float:right
            + center，块状元素，居中对齐
            + **默认值：inline**
        + 链接
            + link=链接，点击之后进行页面跳转
            + **默认值：link=，就是空值**
        + 替代文本
            + alt=替代文本
            + **默认值：alt显示title**

## 行内音乐（不重要，之后写）

+ 行内音乐是被\[\[]]括起来的
+ 模块基础语法（格式）：\[\[music:文件路径|title=标题|选项]]
    + 参数之间通过|分割
    + 模块的参数可能会有不同名字，在文档中用#分割
    + 标题必须要以title进行赋值


## 组件（详细）

+ 部分组件后跟参数，参数填写方式与模板相同

### 标题

1. 格式：
    + = 第一标题 ?style ta=center|bp=l|bc=red|bs=1px|ha=true
    + 前后至少有一个换行符
    + 通过=数量来判断是第几标题
    + 后跟?style可以设置样式
    + 如果希望标题有?style可以设置为<span>?</span>style，（见md源码）
2. 参数（?style后的）
    1. 顺序：ta|bp|bc|ha
    2. 意义：
        1. ta:text-align
            + 会将此值赋给标题css的text-align属性
            + 默认值：left
        2. bp:border-position
            + 不会在标题上直接添加边框
            + 可选值：
                + l：左侧边框
                + r：右侧边框
                + t：顶部边框
                + b：底部边框
                + n：没有边框
            + 默认值：l
        3. bc:border-color
            + 边框颜色
        4. bw:border-size
            + 边框的粗细
        5. ha:hover-animation
            + 是否存在鼠标浮动动画，动画效果是边框从无到有
            + 此值只要存在即认为有动画，也就是说ha等同于ha=true
            + 可选值：
                + true：有动画
                + false：没动画
            + 默认值：false
## 段落
1. 格式：
    + 通过两个换行符来进行区分

## 表格
1. 格式：
    ```txt
    {|table#表格|fold|style=font-size:20px;width:100%
    |class=class1;class2
    |-
    |+ 标题 c=8/t
    |-
    | 这会占用四个格子 c=2/r=2/t 
    | 早上 c=2/t | 下午 c=2/t | 晚上 c=2/t
    |-
    | [[img:test.jpg|width=100px]]
    | {{font|学习|red}}
    | 睡觉 
    | 打游戏 | 看番 | 睡觉 
    |}
    ```
2. 第一行后面填写的区域是代表表格的设置
    + fold代表表格是否可以折叠
    + style会直接赋给表格
3. 第一个|-出现之后才是表格信息区域
4. 关键字c：代表单元格横向占多少格子
5. 关键字r：代表单元格竖向占多少个格子
6. 关键字t：代表单元格是否是标题
7. 第一个|-出现之后的第一行如果带上+说明是thead

## 列表
1. 格式：
    ```txt
    {|list#列表|
    |class=class1;class2
    |-
    |+有序列表1
    |+有序列表2
    |++有序列表2.1
    |++有序列表2.2
    |+有序列表3
    |*无序列表
    |**无序列表
    |*+
    |}
    ```

## 图片显示器
1. 格式：
    + 规则
    ```txt
    {|图片显示器名字
    | 参数列表
    |-
    | 图片地址列表
    | 图片地址列表
    |}
    ```
2. 共有参数
    + 尺寸
        + 宽度px，例如：200px，每一张图片的宽度
        + x高度px，例如：x100px，每一张图片的高度
        + 宽度x高度px，例如：200x100px，每一张图片的宽高
        + 图片下标?尺寸，例如：1?200px，代表：第一张图片宽度是200px
        + **上述参数不同组件默认值略有不同，详细参考下分的组件**
        + width=容器宽度/w=容器宽度
            + **默认值：100%**
        + height=容器宽度/h=容器高度
            + **默认值：空（自适应），此处填写%单位数值无效**
    + 水平对齐
        + none，块状元素
        + left，块状元素，float:left
        + right，块状元素，float:right
            + **设置float时，width可能会发生改变**
        + center，块状元素，居中对齐
        + **默认值：center**
    + 样式
        + style=css语句，不可换行，每条语句之间通过;分割（会直接赋值给最外层组件的style
        + class=类名，不可换行，每个类之间通过;分割
    1. allImageShower
    类似于9宫格那样的图片展示器，（当然并不是九宫格
    ```txt
    {|allIS#图片展示框
    | width=500px
    |-
    | img1.jpg
    | img2.png
    | img3.jpg
    | img4.jpeg
    |}
    ```
    2. carouselImageShower
    ```txt
    {|carouselIS#走马灯图片展示框
    | width=500px
    |-
    | img1.jpg
    | img2.png
    | img3.jpg
    | img4.jpeg
    |}
    ```
    3. albumImageShower
    ```txt
    {|albumIS#相册图片展示框
    | width=500px
    |-
    | img1.jpg
    | img2.png
    | img3.jpg
    | img4.jpeg
    |}
    ```