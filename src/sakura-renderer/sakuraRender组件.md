# 组件

## 公共option

| option/组件 | width | height | maxWidth | minWidth | maxHeight | minHeight | float | clear | color | fontSize | fontFamily | classList | styleList | id |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| title | √ | √ | √ | √ | √ | √ | × | √ | √ | √ | √ | √ | √ | √ |
| para | √ | √ | √ | √ | √ | √ | × | √ | √ | √ | √ | √ | √ | √ |
| table | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ |
| list | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ |
| AllIS | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ |
| AlbumIS | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ |
| carouselIS | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ | √ |
| clear | × | × | × | × | × | × | √ | √ | × | × | × | × | × | √ |

## 公共option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值（不同组件、不同情况默认值都不一定一样，这里写的是类里面的默认值） | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| width | 组件宽度 | width/w | css允许的宽度设置 | auto | width=200px<br>w=200px
| height | 组件高度 | height/h | css允许的高度设置 | auto | height=200px<br>h=200px
| maxWidth | 组件最大宽度 | maxWidth/maxW | css允许的宽度设置 | none | maxWidth=200px<br>maxW=200px
| minWidth | 组件最小宽度 | minWidth/minW | css允许的宽度设置 | none | minWidth=200px<br>minW=200px
| maxHeight | 组件最大高度 | maxHeight/maxH | css允许的宽度设置 | none | maxHeight=200px<br>maxH=200px
| minHeight | 组件最小高度 | minHeight/minH | css允许的宽度设置 | none |  minHeight=200px<br>minH=200px
| float | 浮动情况 | 在非clear组件中可以直接写，通用：key=float/f | none/center/left/right | none | float=none<br>f=none<br>none
| clear | 清除浮动情况 | 在clear组件中可以直接写，通用：key=clear/c | none/both/left/right | none | clear=none<br>c=none<br>none
| color | 文字颜色 | color/c | css允许的颜色设置/DEFAULT | DEFAULT | color=black<br>c=black
| fontSize | 文字大小 | fontSize/FS | css允许的文字大小设置/DEFAULT | DEFAULT | fontSize=24px<br>FS=24px
| fontFamily | 字体 | fontFamily/FF | css允许的字体设置/DEFAULT | DEFAULT | fontFamily=宋体<br>FF=宋体
| classList | 组件自定义css类名 | class | 自定义类名，两个类之间通过;区分 | 空数组 | class=class1;class2
| styleList | 组件自定义css样式 | style | 自定义css样式，两个样式之间通过;区分 | 空数组 | style=font-size:24px;color:black

## title标题组件

### title组件option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 | 是否支持?style |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| textAlign | 标题文字显示位置 | textAlign/TA | left/l<br>center/c | left | textAlign=left<br>TA=left | 是 |
| borderPosition | 边框的位置 | borderPosition/BP | left/l<br>bottom/b<br>none/n | left | borderPosition=left<br>BP=left | 是 |
| hoverAnimation | 是否有浮动动画 | 可以直接写或key=hoverAnimation/HA | true/false | false | hoverAnimation=true<br>HA=true<br>HA | 是 |
| hasLink | 是否存在页面内跳转链接按钮 | hasLink/HL | true/false | true | hasLink=true<br>HL=true | 是 |
| type | 组件是h几标题 | 可以直接写或key=type | h1~h6 | h1 | type=h1<br>h1 | 否 |

## para段落组件

### para段落组件option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| type | 段落的类型 | 可以直接写或key=type | default/d<br>warning/w<br>success/s<br>info/i<br>tip/t<br>custom/c | default | type=default<br>default |
| title | 段落在类型不是default时的标题 | title | 标题名字 | type对应名字的英文大写（type=warning时title默认为WARNING） | title=段落标题 |
| lineHeight | 段落的行高 | lineHeight/LH | css允许的行高设置 | 1 | lineHeight=1<br>LH=1 |
| borderColor | 段落边框的颜色 | borderColor/BC | css允许的颜色设置/DEFAULT | DEFAULT |borderColor=black/BC=black |
| backgroundColor | 段落背景色 | backgroundColor/BGC | css允许的颜色设置/DEFAULT | DEFAULT | backgroundColor=white/BGC=white |
| border | 段落边框 | border | css允许的边框设置/DEFAULT | DEFAULT | border=1px solid black |

## table表格组件

+ 内部比外部大时需要显示滚动条

### table表格组件option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| name | 表格的名字 | name | 表格名字 | 空 | name=表格名字 |
| fold | 是否折叠 | 直接填或key=fold | true/false | false | fold=true<br>fold |
| hover | 浮动样式情况 | 除none以外可以直接写或key=hover | row<br>node<br>none | row | hover=row<br>row |
| border | 边框情况 | 除none以外可以直接写或key=border | border<br>bottom<br>none | border | border=border<br>border |
| tdWidth | 单元格宽度 | tdWidth/TW | css支持的宽度设置 | auto | tdWidth=100px<br>TW=100px |
| tdHeight | 单元格高度 | tdHeight/TH | css支持的高度设置 | auto | tdHeight=100px<br>TH=100px |

## list列表组件

+ 内部比外部大时需要显示滚动条

### list列表组件option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| name | 列表的名字 | name | 列表名字 | 空 | name=列表名字 |
| fold | 是否折叠 | 直接填或key=fold | true/false | false | fold=true<br>fold |
| mode | 列表序号模式 | 直接填或key=mode；可以为有序和无序分别设置，可以设置两个，通过;分割，前者设置有序，后者设置无序 | 见详细mode | default | mode=default<br>default |
| template | 列表序号显示模板 | template/t | 详细见template | DEFAULT | template=* <br>t=* |

#### list列表组件mode大小比较

default < number = solid = hollow = square < template < none

#### list列表组件mode

| mode可选值 | 含义 | 显示 |
|:---:|:---:|:---:|
| default | 有序列表为单一数字、无序列表顺序为实心点、空心点、正方形 | 1./2./3. |
| number | 这个仅支持全部都是有序列表，如果内部出现无序列表则按照default，有序列表的多级列表会显示原先的列表序号 1.1.2这样 | 1./2./1.1./1.2. |
| solid | 有序列表样式同default，无序列表样式全部是实心点 |
| hollow | 有序列表样式同default，无序列表样式全部是空心点 |
| square | 有序列表样式同default，无序列表样式全部是正方形 |
| template | 有序列表样式通过配置项设置，没设置则同default，无序列表样式通过配置项设置，没设置同default |
| none | 不会显示任何的序号样式 |

| 有意义的mode合并可选值 | 含义 |
|:---:|:---:|
| template;solid/hollow/square | 有序列表按照模板来，无序列表按照相关设置来 |
| default/number/template;none | 有序列表按照相关设置来，无序列表不显示序号 |
| none;solid/hollow/square/template | 有序列表没有序号，无序列表按照相关设置来 |

#### list列表组件template

+ *代表替换字符

| template设置（样例） | 显示效果 |
|:---:|:---:|
| template=*. | 1./2./1.1./1.2. |
| template=*: | 1:/2:/1.1:/1.2: |
| template=a* | a1/a2/a1.1/a2.2 |
| template=a* | a1/a2/a1.1/a2.2 |

## 图片显示器组件

+ 地址后面用空格分割可以设置图片的名字和标题

```txt
{|图片显示器名字
|-
| img1.jpg name=图片的名字;title=图片的标题
| img2.png
| img3.jpg
| img4.jpeg
|}
```

### 图片显示器组件通用option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| baseUrl | 地址前缀（会在组件内部覆盖文章配置的baseUrl） | baseUrl/BU | 正确的地址前缀 | 空 | baseUrl=https://img.moegirl.org.cn/common/thumb/ |
| imgWidth | 图片宽度 | imgWidth/IW | css支持的宽度设置/i:第i张图片宽度;n-m:第n-m张图片宽度 | auto |
| imgHeight | 图片高度 | imgHeight/IH | css支持的高度设置/i:第i张图片高度;n-m:第n-m张图片高度 | auto |
| imgMaxWidth | 图片的最大宽度 | imgMaxWidth/IMW | 同imgWidth（改成最大宽度） | auto |
| imgMaxHeight | 图片的最大高度 | imgMaxHeight/IMH | 同imgHeight（改成最大高度） | auto |
| imgPosition | 图片显示的位置 | imgPosition/IP | center/c<br>left/l<br>right/r<br>top/t<br>bottom<br>leftTop/LT<br>leftBottom/LB<br>rightTop/RT<br>rightBottom/RB;i:第i张图片显示的位置;n-m:第n-m张图片显示的位置 | center | imgPosition=center<br>IP=c | left相当于图片靠左，但垂直上面是居中的,right/top/bottom也是这样<br>albumImageShower不存在设置某一张图片的显示，设置的就是展示图片的效果 |

## allImageShower全部图片显示器组件

+ 内部比外部大时需要显示滚动条

### allImageShower全部图片显示器组件option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| direction | 图片的排列方向 | 直接写或key=direction/d | row/column/auto | auto | direction=auto<br>d=auto<br>auto |
| rows | 行数、行高（行高设置%在组件高度给定才有效果） | rows/RS | auto/数字/第一行高度+第二行高度+...+第n行高度 | auto | rows=3<br>RS=100px+200px+300px |
| columns | 列数、列宽 | columns/CS | auto/数字/第一行宽度+第二行宽度+...+第n行宽度 | auto | columns=3<br>CS=100px+200px+30% |

## albumImageShower相册图片显示器组件

+ 内部比外部大时不需要显示滚动条

### albumImageShower相册图片显示器组件option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| name | 相册名字 | 直接写（名字不能是left、center等有直接意义的）/name/n | 相册名字 | 空 | name=相册名字 |
| index | 显示第几张图片（l代表总数，l代表最后一张，l-1代表倒数第二张） | index/i | 1~相册图片总数/l-n/l | 1 | index=1<br>i=l-2 |

## carouselImageShower走马灯图片展示框组件

+ 内部比外部大时不需要显示滚动条

### carouselImageShower走马灯图片展示框组件option的设置方法

| option | 含义 | key值（key=value）| 可选值 | 默认值 | 示例 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| loop | 是否循环 | 直接写代表循环或者key=loop | true/false | true | loop=true<br>loop |
| interval | 切换的时间 | key=interval/i;直接写代表有切换动画、图片切换时长默认2000ms，设置切换时长需要写interval=2000，不需要写单位，不需要动画写interval=false | 切换时长（ms）/false | false | interval<br>interval=2000<br>i=false |
