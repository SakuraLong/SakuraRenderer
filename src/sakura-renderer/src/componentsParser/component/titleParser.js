/*
标题解析器
*/

import ComponentsParser from "./componentParser";

class TitleParser extends ComponentsParser {
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["title", "标题"];
        this.template = {
            type: "sr-title", // 组件名称
            data: {
                // 标题数据
                type: "h1", // 标题类型
                content: "标题", // 标题内容
                id: "title_id1", // 标题id
                option: {
                    // 标题配置项
                    textAlign: "left", // 文字排版
                    borderPosition: "left", // 边框位置
                    hoverAnimation: false, // hover动画
                    hasLink: true, // 有无页面内跳转链接
                    classList:[], // 类名列表
                    styleList:[], // 样式列表
                },
            },
        }; // 标题默认配置
    }
    judge() {
        // 重写
        console.log(this.dataList[0]);
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
        let titleType = 0;
        let title = "";
        let style = null;
        let styleList = [];
        if (!this.default) {
            let t1 = component.split("?style");
            title = t1[0];
            style = t1.length === 1 ? null : t1[t1.length - 1];
            let t2 = title.split(" ");
            let typeA = t2[0];
            if (t2.length < 2) {
                // 格式错误
                return {
                    type: "error",
                    msg: "title格式错误",
                    content: this.content,
                };
            }
            title = t2[1];
            for (let i = 2; i < t2.length; i++) title += " " + t2[i];
            titleType = typeA.length > 6 ? 6 : typeA.length;
            this.template.data.type = "h" + titleType.toString();
            this.template.data.content = title;
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
                this.template.data.content += this.dataList[i];
            }
        }
        if (styleList.length!==0) {
            styleList.forEach((styleELe) => {
                let key = styleELe.split("=")[0];
                let value = styleELe.split("=")[styleELe.split("=").length - 1];
                switch(key){
                    case "ta":
                        if(["left", "center"].indexOf(value) !== -1){
                            this.template.data.option.textAlign = value;
                        }
                        break;
                    case "bp":
                        if(["left", "l", "bottom", "b", "n", "none"].indexOf(value) !== -1){
                            this.template.data.option.borderPosition = value;
                        }
                        break;
                    case "ha":
                        if(["true", "false"].indexOf(value) !== -1){
                            console.log(["true", "false"].indexOf(value));
                            this.template.data.option.hoverAnimation = eval(value);
                        }else if(key === value){
                            this.template.data.option.hoverAnimation = true;
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
                        console.log(value);
                        this.template.data.option.styleList = this.template.data.option.styleList.concat(value.split(";"));
                        break;
                    case "type":
                        this.template.data.type = value;
                        break;
                    default:
                        break;
                }
            });
        }
        this.template.data.id = this.template.data.content;
        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default TitleParser;
