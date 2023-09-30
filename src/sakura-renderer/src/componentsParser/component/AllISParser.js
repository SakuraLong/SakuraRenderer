/*
AllISParser解析器
李海林
*/
import ComponentsParser from "./componentParser";

class AllISParser extends ComponentsParser{
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["allIS", "图片展示框"];
        this.template = {
            type: "sr-all-is", // 组件名称
            data: {},
        }; // 标题段落配置
    }
    judge(){
        // 重写
        return false;
    }
    analyse() {}
}

export default AllISParser;