import Template from "./template";

class idParser extends Template{
    constructor(option, content, rendererData) {
        super(option, content, rendererData);
        this.name = ["id"]; // 这个模板的名字
    }
    judge() {
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            return true;
        } else {
            return false;
        }
    }
    analyseTemplate(content) {
        // console.log("analyseTemplate:", content);
        this.dataListInit(content); // 对dataList初始化，必须要写
        if (!this.judge()) return content; // 判断是不是这个模板
        // 以下是处理idParser模板
        let text = ""; // 文本内容
        let id = ""; // id

        const switchKeyValue = (key, value) => {
            switch (key) {
                case "content":
                case "内容":
                    text = value;
                    break;
                case "ID":
                    id = value;
                    break;
            }
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
                    else id = data;
                    break;
            }
        });
        let idItem = "<span id='" + id + "'>" + text + "</span>";
        return idItem; // 返回被替换的内容
    }
}

export default idParser;