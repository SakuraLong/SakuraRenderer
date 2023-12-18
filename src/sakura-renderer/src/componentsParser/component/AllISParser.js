/*
AllISParser解析器
*/
import ImageShowerParser from "./imageShowerParser";

class AllISParser extends ImageShowerParser {
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["allIS", "图片展示框"];
        this.componentBaseOption = {
            float:"center",
            height: "auto",
            width: "auto",
            imgWidth: "auto",
            imgHeight: "auto",
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
                    direction:"auto",
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
        this.getImgListData(); // 获取数据
        this.template.data.option = Object.assign(
            this.template.data.option,
            this.baseOption
        ); // 合并baseOption
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
                    case "column":
                        this.template.data.option.column = parseInt(value);
                        this.template.data.option.row = Math.ceil(imgList.length/this.template.data.option.column);
                        break;
                    case "row":
                        this.template.data.option.row = parseInt(value);
                        this.template.data.option.column = Math.ceil(imgList.length/this.template.data.option.row);
                        break;
                    case "direction":
                        this.template.data.option.direction=value;
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
        this.template.data.imgList = this.imageListData;
        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default AllISParser;
