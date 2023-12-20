// 孙锦瑞
import Template from "./template";

class BlurParser extends Template {
    constructor(option, content, rendererData) {
        super(option, content, rendererData);
        this.name = ["blur", "模糊"]; // 这个模板的名字
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
        // 以下是处理BlurParser模板
        let text = ""; // 文本内容
        let title = ""; // 标题
        let size = "2"; // 模糊程度

        const switchKeyValue = (key, value) => {
            switch (key) {
                case "content":
                case "内容":
                    text = value;
                    return true;
                case "title":
                case "注释":
                    title = value;
                    return true;
                case "size":
                case "范围":
                    size = value;
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
                    else title = data;
                    break;
                case 3:
                    if (switchKeyValue(key, value)) break;
                    else size = data;
                    break;
            }
        });
        let blurItem =
            "<span title='" +
            title +
            "' class='sa-sr-blur-item' style='filter: blur(" +
            size +
            "px);'>" +
            text +
            "</span>";

        return blurItem; // 返回被替换的内容
    }
}

export default BlurParser;
