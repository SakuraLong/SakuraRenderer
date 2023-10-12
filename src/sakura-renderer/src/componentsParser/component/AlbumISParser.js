/*
AlbumISParser解析器
边俣
*/
import ComponentsParser from "./componentParser";
class AlbumISParser extends ComponentsParser {
    constructor(component, option) {
        super(component, option);
        this.name = ["albumIS", "相册图片展示框"];
        this.template = {
            type: "sr-album-is", // 组件名称
            data: {
                title:"相册",
                content: [],
                option: {
                    // 标题配置项
                    showImageWidth: "auto", // 外展示图片的宽度
                    showImageHeight: "auto", // 外展示图片的高度
                    width: "auto", // 外容器宽度
                    height: "auto", // 外容器高度
                    align: "center", //外容器对齐方式
                    classList: [], // 类名列表
                    styleList: [], // 样式列表
                },
            },
        }; // 标题段落配置
    }
    extractWidthAndHeight(input) {
        const regex = /^(\d+)x(\d+)px$/;
        const match = input.match(regex);
        if (match && match.length === 3) {
            const width = parseFloat(match[1]);
            const height = parseFloat(match[2]);
            this.template.data.option.showImageWidth = width.toString() + "px";
            this.template.data.option.showImageHeight = "x" + height + "px";
            console.log("Width:", width);
            console.log("Height:", height);
        } else {
            console.log("格式不正确");
        }
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
        let styleList = [];
        let divideIndex = this.dataList.indexOf("-");
        if (divideIndex === -1) {
            // 格式错误
            return {
                type: "error",
                msg: "AlbumISParser格式错误",
                content: this.content,
            };
        }
        for (let i = 1; i < divideIndex; i++) {
            styleList.push(this.dataList[i]);
        }
        for (let i = divideIndex + 1; i < this.dataList.length; i++) {
            this.template.data.content.push(this.dataList[i]);
        }
        console.log(this.template.data.content);
        if (styleList.length !== 0) {
            styleList.forEach((styleELe) => {
                let key = styleELe.split("=")[0];
                let value = styleELe.split("=")[styleELe.split("=").length - 1];
                switch (key) {
                    case "title":
                        this.template.data.title = value;
                        break;
                    case "imgW":
                        this.template.data.option.showImageWidth = value;
                        break;
                    case "imgH":
                        this.template.data.option.showImageHeight = value;
                        break;
                    case "imgS":
                        this.extractWidthAndHeight(value);
                        break;
                    case "width":
                        this.template.data.option.width = value;
                        break;
                    case "height":
                        this.template.data.option.height = value;
                        break;
                    case "align":
                        if (
                            ["none", "left", "right", "center"].indexOf(
                                value
                            ) !== -1
                        ) {
                            this.template.data.option.align = value;
                        }
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

export default AlbumISParser;
