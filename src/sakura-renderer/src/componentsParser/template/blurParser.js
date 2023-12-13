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
        // console.log("analyseTemplate:", content);
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
                    break;
                case "title":
                case "注释":
                    title = value;
                    break;
                case "size":
                case "范围":
                    size = value;
                    break;
            }
        };
        this.dataList.forEach((data, index) => {
            let key = data.split("=")[0];
            let value = data.split("=")[data.split("=").length - 1];
            switch (index) {
                case 1:
                    if (key === value) text = value;
                    else switchKeyValue(key, value);
                    break;
                case 2:
                    if (key === value) title = value;
                    else switchKeyValue(key, value);
                    break;
                case 3:
                    if (key === value) size = value;
                    else switchKeyValue(key, value);
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
