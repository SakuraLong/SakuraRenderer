/*
CISParser解析器
孙锦瑞
*/
import ComponentsParser from "./componentParser";

class CISParser extends ComponentsParser{
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["carouselIS", "走马灯图片展示框"];
        this.template = {
            type: "sr-carousel-is", // 组件名称
            data: {},
        }; // 标题段落配置
    }
    judge(){
        // 重写
        return false;
    }
    analyse() {}
}

export default CISParser;