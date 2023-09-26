/*
段落解析器
李海林
*/

import ComponentsParser from "./componentParser";

class ParaParser extends ComponentsParser{
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["para", "段落"];
        this.template = {
            type: "sr-paragraph", // 组件名称
            data: {
                content: "段落段落", // 段落内容
                title: "", // 段落类型不是default时，可能会有标题
                option: {
                    // 段落配置项
                    linHeight: "1", // 行高
                    paraType: "default", // 段落类型
                    classList:[], // 类名列表
                    styleList:[], // 样式列表
                },
            },
        }; // 标题段落配置
    }
    judge(){
        // 重写
        return false;
    }
    analyse() {}
}

export default ParaParser;