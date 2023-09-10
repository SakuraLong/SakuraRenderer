# articleContainer
## 介绍

## api
### attributes
+ height
    + type:String
    + default:auto
    + 意义：组件的高度
    + 可选值：
        + auto：根据组件内容改变高度，理论上不会在此组件内部显示滚动条
        + 字符串：例如："500px"，代表高度为500px，如果字符串不是"auto"，则会把该字符串设置为组件的css属性的height高度，组件内部高度超过该高度时，会在内部显示滚动条
    + 限制：
        + 无
    + 备注：
        + 无