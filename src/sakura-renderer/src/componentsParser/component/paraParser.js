/*
段落解析器
李海林
*/

import ComponentsParser from "./componentParser";
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
                content: "段落段落", // 段落内容
                title: "", // 段落类型不是default时，可能会有标题
                option: {
                    // 段落配置项
                    linHeight: "1", // 行高
                    paraType: "default", // 段落类型
                    bc:"rgba(0, 0, 0, 0)", // 如果paraType是default，则是整个段落的边框色，如果paraType是custom，则是左边框色，其余的此值无效
                    bgc:"rgba(0, 0, 0, 0)", // 如果paraType是default或者paraType是custom，则是整个段落的背景色，其余的此值无效
                    classList:[], // 类名列表
                    styleList:[], // 样式列表
                    border:"-",
                    tips:"DEFAULT",
                },
            },
        }; // 标题段落配置
    }
    judge(){
        // 重写
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            this.default = true;
            return true;
        } else if (this.component[0] === "=") {
            return true;
        } else {
            return false;
        }
    }
    analyse() {
        let component = this.component;
        let paraType = "default";
        let para = "";
        let style = null;
        let styleList = [];
        console.log(this);
        if (!this.default) {
            let p1 = component.split("?style");
            para = p1[0];
            style = p1.length === 1 ? null : p1[p1.length - 1];
            let p2 = para.split(" ");
            let typeA = p2[0];
            if (p2.length < 2) {
                // 格式错误
                return {
                    type: "error",
                    msg: "para格式错误",
                    content: this.content,
                };
            }
            para = p2[1];
            for (let i = 2; i < p2.length; i++) para += " " + p2[i];
            paraType = typeA.length > 6 ? 6 : typeA.length;
            this.template.data.type = "p" + paraType.toString();
            this.template.data.content = para;
            if(style){
                style = style.trim();
                styleList = style.split("|");
            }
        } else {
            let divideIndex = this.dataList.indexOf("-");
            if(divideIndex === -1){
                // 格式错误
                return {
                    type: "error",
                    msg: "title格式错误",
                    content: this.content,
                };
            }
            for(let i=0;i<divideIndex;i++){
                styleList.push(this.dataList[i]);
            }
            for(let i=divideIndex+1;i<this.dataList.length;i++){
                this.template.data.content += this.dataList[i]+"<br>";
            }
        }
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
                        if(["default", "success","warning","tip","info"].indexOf(value) !== -1){
                            console.log(["default", "success","warning","tip","info"].indexOf(value));
                            this.template.data.option.type = value;
                            this.template.data.option.tips=this.template.data.option.type.toUpperCase();
                        }else if(key === value){
                            this.template.data.option.type = "default";
                        }
                        break;
                    case "hl":
                        if(["true", "false"].indexOf(value) !== -1){
                            this.template.data.option.hasLink = eval(value);
                        }else if(key === value){
                            this.template.data.option.hasLink = true;
                        }
                        break;
                    case "class":
                        this.template.data.option.classList = this.template.data.option.classList.concat(value.split(";"));
                        break;
                    case "style":
                        this.template.data.option.styleList = this.template.data.option.styleList.concat(value.split(";"));
                        break;
                    case "lh":
                        this.template.data.option.linHeight=value;
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
        console.log(this.template);
        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default ParaParser;