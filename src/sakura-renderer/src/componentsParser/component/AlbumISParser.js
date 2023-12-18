/*
AlbumISParser解析器
边俣
*/
// import ComponentsParser from "./componentParser";
import ImageShowerParser from "./imageShowerParser";
class AlbumISParser extends ImageShowerParser {
    constructor(component, option) {
        super(component, option);
        this.name = ["albumIS", "相册图片展示框"];
        this.template = {
            type: "sr-album-is", // 组件名称
            data: {
                name: "相册",
                imgList: [],
                option: {
                    index: 0,
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
            this.template.data.option.imgWidth = width.toString() + "px";
            this.template.data.option.imgHeight = "x" + height + "px";
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
                msg: "AlbumISParser格式错误",
                content: this.content,
            };
        }
        for (let i = 1; i < divideIndex; i++) {
            styleList.push(this.dataList[i]);
        }
        this.template.data.imgList = this.imageListData;
        if (styleList.length !== 0) {
            styleList.forEach((styleELe) => {
                let temp = styleELe.trim();
                let key = temp.split("=")[0].trim();
                let value = temp.split("=")[temp.split("=").length - 1].trim();
                switch (key) {
                    case "name":
                        this.template.data.name = value;
                        break;
                    case "index":
                        if(Number.isInteger(Number(value))){
                            this.template.data.option.index = parseInt(value);
                        }
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
