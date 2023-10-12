/*
CISParser解析器
孙锦瑞
*/
import ComponentsParser from "./componentParser";

class CISParser extends ComponentsParser {
    constructor(component, option) {
        super(component, option);
        this.name = ["carouselIS", "走马灯图片展示框"];
        this.template = {
            type: "sr-carousel-is", // 组件名称
            data: {
                imgList: [],
                option: {
                    width: 0,
                    height: 0,
                    align: "center",
                    play: false,
                    playtime: 3000,
                    classList: [], // 类名列表
                    styleList: [], // 样式列表
                },
            },
        }; // 标题段落配置
    }
    judge() {
        // 重写
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            return true;
        } else {
            return false;
        }
    }
    analyse() {
        let styleList = [];
        let divideIndex = this.dataList.indexOf("-");
        if (divideIndex === -1) {
            // 格式错误
            return {
                type: "error",
                msg: "carouselIS格式错误",
                content: this.content,
            };
        }
        for (let i = 0; i < divideIndex; i++) {
            styleList.push(this.dataList[i]);
        }
        for (let i = divideIndex + 1; i < this.dataList.length; i++) {
            this.template.data.imgList.push(this.dataList[i]);
        }
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
                            msg: "carouselIS格式错误",
                            content: this.content,
                        };
                    }
                }
                let key = styleELe.split("=")[0];
                let value = styleELe.split("=")[styleELe.split("=").length - 1];
                switch (key) {
                    case "play":
                        this.template.data.option.play = true;
                        this.template.data.option.playtime = value;
                        break;
                    case "width":
                        this.template.data.option.styleList =
                            this.template.data.option.styleList.concat(
                                "width:" + value.split(";")
                            );
                        break;
                    case "height":
                        this.template.data.option.styleList =
                            this.template.data.option.styleList.concat(
                                "height:" + value.split(";")
                            );
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
                    default:
                        break;
                }
            });
        }
        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default CISParser;
