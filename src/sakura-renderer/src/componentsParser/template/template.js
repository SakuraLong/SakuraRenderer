import utils from "../../../utils";

class Template {
    constructor(option, content, rendererData) {
        this.option = option;
        this.content = content;
        this.rendererData = rendererData;
        this.strLeft = "{{";
        this.strRight = "}}";
        this.dataList = []; // 存放模板的参数
    }
    analyse() {
        return utils.replaceGreed(
            this.strLeft,
            this.strRight,
            this.content,
            (data) => {
                return this.analyseTemplate(data.replace);
            }
        ).content;
    }
    analyseTemplate(content){
        this.dataListInit(content);
        return content;
    }
    dataListInit(content){
        let tContent =content;
        tContent = tContent.slice(2, -2);
        tContent = tContent.replace(/\n/g, ""); // 去掉所有换行符
        this.dataList = tContent.split("|");
        for (let i = 0; i < this.dataList.length; i++) {
            this.dataList[i] = this.dataList[i].trim();
        }
    }
}

export default Template;
