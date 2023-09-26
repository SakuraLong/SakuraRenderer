/*
表格解析器
龙文
*/
import ComponentsParser from "./componentParser";

class TableParser extends ComponentsParser{
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["table", "表格"];
        this.template = {
            type: "sr-table", // 组件名称
            data: {},
        }; // 标题段落配置
    }
    judge(){
        // 重写
        return false;
    }
    analyse() {}
}

export default TableParser;