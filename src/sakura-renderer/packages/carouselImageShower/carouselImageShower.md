
# CarouselImageShower

## 介绍

## api

### attributes

* **height**

  * **type:String**
  * **default:auto**
  * **意义：组件的高度**
  * **例如："height=500px"，代表高度为500px，如果字符串不是"auto"，则会把该字符串设置为组件的css属性height高度，组件内部高度超过该高度时，会在内部显示滚动条**
  * **备注：若不设置则为auto**
* **width**

  * **type:String**
  * **default:auto**
  * **意义：组件的宽度**
  * **例如："width=500px"，代表宽度为500px，如果字符串不是"auto"，则会把该字符串设置为组件的css属性width宽度，组件内部高度超过该宽度时，会在内部显示滚动条**
  * **备注：若不设置则为auto**
* **left\center\right**

  * **type:String**
  * **default: center**
  * **意义：组件的浮动定位**
  * **例如："left"，代表left浮动定位，相当于在组件样式中添加float的属性为left；center和right同理**
  * **备注：若不设置则默认为center**
* **play**

  * **type:String**
  * **default: play:3000**
  * **意义：组件的自动播放**
  * **例如："play:3000"，代表组件自动播放，图片切换间隔为3000ms**
  * **备注：时间间隔的单位为毫秒（ms）**
