/*
AllISParser解析器
李海林
*/
import ComponentsParser from "./componentParser";

class AllISParser extends ComponentsParser {
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["allIS", "图片展示框"];
        this.componentBaseOption = {
            float:"center",
            height: "auto",
            width: "auto",
        };
        this.template = {
            type: "sr-all-is", // 组件名称
            data: {
                imgList: [],
                option: {
                    column: 1, // 列数
                    row: 1,
                    rs:false,
                    cs:false,
                    space: "10px",
                    imgWidth: "auto",
                    imgHeight:"auto",
                },
            },
        }; // 标题段落配置
    }

    judge() {
        // 重写
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            this.default = true;
            return true;
        } else {
            return false;
        }
    }

    analyse() {
        this.template.data.option = Object.assign(this.template.data.option, this.baseOption); // 合并baseOption
        let styleList = [];
        let divideIndex = this.dataList.indexOf("-");
        if (divideIndex === -1) {
            // 格式错误
            return {
                type: "error",
                msg: "allIS格式错误",
                content: this.content,
            };
        }
        for (let i = 0; i < divideIndex; i++) {
            styleList.push(this.dataList[i]);
        }
        let imgList = this.dataList.slice(divideIndex + 1);
        if (styleList.length !== 0) {
            styleList.forEach((styleELe) => {
                if (styleELe.indexOf("=") === -1) {
                    // 不是样式设置
                    if (
                        styleELe === "none" ||
                        styleELe === "left" ||
                        styleELe === "right" ||
                        styleELe === "center"
                    ) {
                        // 对齐设置
                        this.template.data.option.align = styleELe;
                    } else {
                        return {
                            type: "error",
                            msg: "allIS格式错误",
                            content: this.content,
                        };
                    }
                }
                let key = styleELe.split("=")[0];
                let value = styleELe.split("=")[styleELe.split("=").length - 1];
                switch (key) {
                    case "height":
                        this.template.data.option.height=value;
                        break;
                    case "width":
                        this.template.data.option.width=value;
                        break;
                    case "IW":
                    case "imgWidth":
                        this.template.data.option.imgWidth= value;
                        break;
                    case "IH":
                    case "imgHeight":
                        this.template.data.option.imgHeight= value;
                        break;
                    case "imgPosition":
                    case "IP":
                        this.template.data.option.float=value;
                        break;
                    case "class":
                        this.template.data.option.classList =
                            this.template.data.option.classList.concat(
                                value.split(";")
                            );
                        break;
                    case "style":
                        this.template.data.option.styleList =
                            this.template.data.option.styleList.concat(
                                value.split(";")
                            );
                        break;
                    case "column":
                        this.template.data.option.column = parseInt(value);
                        this.template.data.option.row = Math.ceil(imgList.length/this.template.data.option.column);
                        break;
                    case "row":
                        this.template.data.option.row = parseInt(value);
                        this.template.data.option.column = Math.ceil(imgList.length/this.template.data.option.row);
                        break;
                    case "space":
                        this.template.data.option.space = value;
                        break;
                    case "RS":
                        this.template.data.option.rs=value.replace(/\+/g, " ");
                        break;
                    case "CS":
                        this.template.data.option.cs=value.replace(/\+/g, " ");
                        break;
                    default:
                        break;
                }
            });
        }
        if (imgList.length !== 0) {
            this.template.data.imgList = imgList;
        }
        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default AllISParser;
