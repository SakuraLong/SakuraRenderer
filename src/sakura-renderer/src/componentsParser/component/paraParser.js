/*
段落解析器
李海林
*/

import ComponentsParser from "./componentParser"; // 组件解析器（各个具体组件解析器的父类）
import GrammerParser from "../grammar/grammarParser"; // 语法解析器
import TemplateParser from "../template/templateParser"; // 模板解析器
import ModuleParser from "../module/moduleParser"; // 模块解析器


class ParaParser extends ComponentsParser{
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["para", "段落"];
        this.template = {
            type: "sr-paragraph", // 组件名称
            data: {
                content: "", // 段落内容
                title: "", // 段落类型不是default时，可能会有标题
                option: {
                    // 段落配置项
                    lineHeight: NaN, // 行高
                    type: "default", // 段落类型
                    bc:"rgba(0, 0, 0, 0)", // 如果paraType是default，则是整个段落的边框色，如果paraType是custom，则是左边框色，其余的此值无效
                    bgc:"rgba(0, 0, 0, 0)", // 如果paraType是default或者paraType是custom，则是整个段落的背景色，其余的此值无效
                    classList:[], // 类名列表
                    styleList:[], // 样式列表
                    border:"-",
                    tips:"DEFAULT",
                    model:true,
                },
            },
        }; // 标题段落配置
    }
    judge(){
        // console.log("组件内容：",this.component);
        console.log(this.dataList);
        // 重写
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            this.default = true;
            return true;
        } else if (this.component[0] !== "=" && this.component[0] !== "{" ) {
            console.log("组件内容：",this.component);
            this.template.model=false;
            return true;
        } else {
            return false;
        }
    }
    analyse() {
        let styleList = [];
        console.log(this);
        if(this.template.model===false){
            this.template.data.content += this.component+"<br>";
            return {
                type: "success",
                msg: "",
                content: this.template,
            };
        }
        let divideIndex = this.dataList.indexOf("-");
        if(divideIndex === -1){
            // 格式错误
            return {
                type: "error",
                msg: "para格式错误",
                content: this.content,
            };
        }
        for(let i=0;i<divideIndex;i++){
            styleList.push(this.dataList[i]);
        }
        for(let i=divideIndex+1;i<this.dataList.length;i++){
            this.template.data.content += this.dataList[i]+"<br>";
        }
        console.log("看这里",styleList);
        if (styleList.length!==0) {
            styleList.forEach((styleELe) => {
                let key = styleELe.split("=")[0];
                let value = styleELe.split("=")[styleELe.split("=").length - 1];
                switch(key){
                    case "bc":
                        this.template.data.option.bc = value;
                        break;
                    case "bgc":
                        this.template.data.option.bgc = value;
                        break;
                    case "border":
                        this.template.data.option.border = value;
                        break;
                    case "type":
                        if(["default", "success","warning","tip","info"].indexOf(value.toLowerCase()) !== -1){
                            console.log(["default", "success","warning","tip","info"].indexOf(value));
                            this.template.data.option.type = value;
                            this.template.data.option.tips=this.template.data.option.type.toUpperCase();
                        }else if(key === value){
                            this.template.data.option.type = "default";
                        }
                        break;
                    case "class":
                        this.template.data.option.classList = this.template.data.option.classList.concat(value.split(";"));
                        break;
                    case "style":
                        this.template.data.option.styleList = this.template.data.option.styleList.concat(value.split(";"));
                        break;
                    case "lh":
                        this.template.data.option.lineHeight=value;
                        break;
                    case "title":
                        this.template.data.title=value;
                        break;
                    case "tips":
                        if(this.template.data.option.type!=="default"){
                            this.template.data.option.tips=value;
                        }
                        else{
                            this.template.data.option.tips=this.template.data.option.type.toUpperCase();
                        }
                        break;
                    default:
                        break;
                }
            });
        }
        this.template.data.id = this.template.data.content;
        this.template.data.content = new GrammerParser(this.option, this.template.data.content).analyse(); // 调用语法解析器解析
        this.template.data.content = new TemplateParser(this.option, this.template.data.content).analyse(); // 调用模板解析器解析
        this.template.data.content = new ModuleParser(this.option, this.template.data.content).analyse(); // 调用模块解析器解析
        console.log("最终存储",this.template);
        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default ParaParser;