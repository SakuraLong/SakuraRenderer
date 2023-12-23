import Template from "./template";

class aParser extends Template {
    constructor(option, content, rendererData) {
        super(option, content, rendererData);
        this.name = ["超链接", "a"]; // 这个模板的名字
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
        let href = ""; // 文本内容
        let text = ""; // 文本内容
        let title = "点击访问示例网站"; // 提示

        const switchKeyValue = (key, value) => {
            switch (key) {
                case "href":
                case "链接":
                    href=value;
                    return true;
                case "content":
                case "内容":
                    text = value;
                    return true;
                case "title":
                case "提示":
                    title = value;
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
                    else href = data;
                    break;
                case 2:
                    if (switchKeyValue(key, value)) break;
                    else text = data;
                    break;
                case 3:
                    if (switchKeyValue(key, value)) break;
                    else title = data;
                    break;
            }
        });

        let aItem =
            "<a href="+href+
            " class='sa-sr-ahref-item' title='"+title+"'target='_blank'>"+text+
            "</a>";
        return aItem; // 返回被替换的内容
    }
}

export default aParser;
