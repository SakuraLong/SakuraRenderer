/*
列表解析器
边俣
*/
import ComponentsParser from "./componentParser";

class ListParser extends ComponentsParser{
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["list", "列表"];
        this.template = {
            type: "sr-list", // 组件名称
            data: {},
        }; // 标题段落配置
    }
    judge(){
        // 重写
        return false;
    }
    analyse() {}
}

export default ListParser;