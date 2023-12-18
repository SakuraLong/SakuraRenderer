// 孙锦瑞
import Template from "./template";

class DelParser extends Template {
    constructor(option, content, rendererData) {
        super(option, content, rendererData);
        this.name = ["del", "删除线"]; // 这个模板的名字
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
        // 以下是处理DelParser模板
        let text = ""; // 文本内容
        let color = "#303133"; // 颜色
        let size = "1"; // 粗细

        const switchKeyValue = (key, value) => {
            switch (key) {
                case "content":
                case "内容":
                    text = value;
                    break;
                case "color":
                case "颜色":
                    color = value;
                    break;
                case "size":
                case "粗细":
                    size = value;
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
                    else color = data;
                    break;
                case 3:
                    if (switchKeyValue(key, value)) break;
                    else size = data;
                    break;
            }
        });

        let delItem =
            "<del style='" +
            "text-decoration: line-through " +
            size +
            "px " +
            color +
            ";'>" +
            text +
            "</del>";

        return delItem; // 返回被替换的内容
    }
}

export default DelParser;
