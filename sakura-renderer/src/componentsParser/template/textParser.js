// 孙锦瑞
import Template from "./template";

class TextParser extends Template {
    constructor(option, content, rendererData, parserData) {
        super(option, content, rendererData, parserData);
        this.name = ["文本", "text"]; // 这个模板的名字
    }
    judge() {
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            return true;
        } else {
            return false;
        }
    }
    analyseTemplate(content) {
        this.dataListInit(content); // 对dataList初始化，必须要写
        if (!this.judge()) return content; // 判断是不是这个模板

        let style = ""; // 用于存储生成的样式
        let text = ""; // 文本内容

        const switchKeyValue = (key, value) => {
            switch (key) {
                case "content":
                case "内容":
                    text = value;
                    return true;
                case "color":
                case "颜色":
                    style += `color: ${value};`;
                    return true;
                case "size":
                case "大小":
                    style += `font-size: ${value};`;
                    return true;
                case "height":
                case "行高":
                    style += `line-height: ${value};`;
                    return true;
                case "weight":
                case "粗细":
                    style += `font-weight: ${value};`;
                    return true;
                case "bgcolor":
                case "背景色":
                    style += `background-color: ${value};`;
                    return true;
                case "italic":
                case "斜体":
                    if (value === "true" || value === "false") {
                        style += `font-style: ${
                            value === "true" ? "italic" : "normal"
                        };`;
                    }
                    return true;
                case "font":
                case "字体":
                    style += `font-family: ${value};`;
                    return true;
            }
            return false;
        };

        this.dataList.forEach((data, index) => {
            const key = data.split("=")[0];
            const left = data.indexOf("=");
            const value = data.slice(left + 1, data.length);
            switch (index) {
                case 1:
                    if (switchKeyValue(key, value)) break;
                    else text = data;
                    break;
                case 2:
                    if (switchKeyValue(key, value)) break;
                    else style += `color: ${value};`;
                    break;
                case 3:
                    if (switchKeyValue(key, value)) break;
                    else style += `font-size: ${value};`;
                    break;
                case 4:
                    if (switchKeyValue(key, value)) break;
                    else style += `line-height: ${value};`;
                    break;
                case 5:
                    if (switchKeyValue(key, value)) break;
                    else style += `font-weight: ${value};`;
                    break;
                case 6:
                    if (switchKeyValue(key, value)) break;
                    else style += `background-color: ${value};`;
                    break;
                case 7:
                    if (switchKeyValue(key, value)) break;
                    else {
                        if (value === "true" || value === "false") {
                            style += `font-style: ${
                                value === "true" ? "italic" : "normal"
                            };`;
                        }
                    }
                    break;
                case 8:
                    if (switchKeyValue(key, value)) break;
                    else style += `font-family: ${value};`;
                    break;
                default:
                    if (switchKeyValue(key, value)) break;
                    else text = data;
                    break;
            }
        });

        let textItem = `<span style="${style}">${text}</span>`;

        return textItem;
    }
}

export default TextParser;
