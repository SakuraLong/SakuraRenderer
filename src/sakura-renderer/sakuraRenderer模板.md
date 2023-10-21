

## 黑幕

文字区域背景颜色同文字颜色，以此实现类似于遮盖的效果，字体颜色只能是--sa-color-primary-text，鼠标移动到上面之后移除将背景颜色改为0，移出之后恢复，两者都需要动画！transition就能做。title直接给span设置就行。

### 黑幕配置

{{黑幕#heimu#hide|内容#content|注释#title}}

### 黑幕option设置

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| content | 黑幕的文字内容 | index=1/key=内容/content | 需要显示的内容 | 空 | |
| title | 黑幕的title | index=2/key=注释/title | 标题内容 | 空 | |

## 模糊

文字区域出现blur模糊效果，鼠标效果同黑幕。

### 模糊配置

{{模糊#blur|内容#content|注释#title|范围#size}}

### 模糊option设置

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| content | 模糊的文字内容 | index=1/key=内容/content | 需要显示的内容 | 空 | |
| title | 黑幕的title | index=2/key=注释/title | 标题内容 | 空 | |
| size | 模糊的范围 | index=3/key=范围/size | css允许设置的模糊范围（单位px） | 2 | |

## 文本

给文本加css效果

### 文本配置

{{文本#font|内容#content|颜色#color|大小#size|行高#height|字体#fontfamily|粗细#weight|背景色#bgcolor|斜体#italic|字体#family}}

### 文本option设置

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| content | 文字内容 | index=1/key=内容/content | 需要显示的内容 | 空 | |
| color | 文本颜色 | index=2/key=颜色/color | css允许设置的字体颜色 | #303133 | |
| size | 文本大小 | index=3/key=大小/size | css允许设置的字体大小（没有单位，直接赋值） | 16px | |
| height | 文本行高 | index=4/key=行高/height | css允许设置的行高（没有单位，直接赋值） | 1 | |
| weight | 文本粗细 | index=5/key=粗细/weight | css允许设置的粗细（没有单位，直接赋值） | normal | |
| bgcolor | 文本背景颜色 | index=6/key=背景色/bgcolor | css允许设置的颜色 | #00000000 | |
| italic | 文本是否是斜体 | index=7/key=斜体#italic | true/false | false | italic=false/（当index=7时）false/（任意位置，存在italic，代表italic=true） |
| family | 字体 | index=8/key=字体/family | css允许设置的字体 | inherit | |

## 删除线

给文本加删除线效果

### 删除线配置

{{删除线#del|内容#content|颜色#color|粗细#size}}

### 删除线option设置

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| content | 文字内容 | index=1/key=内容/content | 需要显示的内容 | 空 | |
| color | 删除线颜色 | index=2/key=颜色/color | css允许的颜色 | #303133 | |
| size | 删除线粗细 | index=3/key=粗细/size | css允许的粗细设置（单位px） | 1 | |

## 下划线

给文本加下划线效果

### 下划线配置

{{下划线#und|内容#content|颜色#color|粗细#size}}

### 下划线option设置

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| content | 文字内容 | index=1/key=内容/content | 需要显示的内容 | 空 | |
| color | 下划线颜色 | index=2/key=颜色/color | css允许的颜色 | #303133 | |
| size | 下划线粗细 | index=3/key=粗细/size | css允许的粗细设置（单位px） | 1 | |

## 注解

给文本加注解效果（去查一下ruby标签）

### 注解配置

{{注解#ruby|内容#content|解释#explain}}

### 注解option设置

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| content | 文字内容 | index=1/key=内容/content | 需要显示的内容 | 空 | |
| explain | 文本注解 | index=2/key=解释/explain | 需要显示的内容 | 空 | |

## 超链接

加入a标签

### 超链接配置

{{超链接#a|链接#href|内容#content|提示#title}}

### 超链接option设置

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| href | 地址 | index=1/key=链接#href | 地址 | 空 | |
| content | 文字内容 | index=2/key=内容/content | 需要显示的内容 | 空 | |
| title | 标签title | index=3/key=提示/title | 需要显示的内容 | 空 | |

## id

{{id|内容#content|ID}}

### id配置

{{超链接#a|链接#href|内容#content|提示#title}}

### id option设置

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| content | 文字内容 | index=1/key=内容/content | 需要显示的内容 | 空 | |
| ID | ID | index=2/key=ID | 需要显示的内容 | 文本内容 | |
