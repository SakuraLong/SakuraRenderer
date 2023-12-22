import Template from "./template";

class rubyParser extends Template {
    constructor(option, content, rendererData) {
        super(option, content, rendererData);
        this.name = ["注解", "ruby"]; // 这个模板的名字
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

        let text = ""; // 文本内容
        let explain = ""; //解释

        const switchKeyValue = (key, value) => {
            switch (key) {
                case "content":
                case "内容":
                    text = value;
                    return true;
                case "explain":
                case "注释":
                    explain = value;
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
                    else explain = data;
                    break;
            }
        });

        let hideItem =
            "<ruby>"+
            text+"<rt>"+explain+"</rt>"+
            "</ruby>";

        return hideItem; // 返回被替换的内容
    }
}

export default rubyParser;
