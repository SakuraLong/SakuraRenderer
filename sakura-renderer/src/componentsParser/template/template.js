import utils from "../../../utils";

class Template {
    constructor(option, content, rendererData, parserData) {
        this.option = option;
        this.content = content;
        this.rendererData = rendererData;
        this.parserData = parserData;
        this.strLeft = "{{";
        this.strRight = "}}";
        this.dataList = []; // 存放模板的参数
    }
    analyse() {
        let replace = "";
        let isThisTemplate = 0; // 没有匹配到{{}}
        const content =  utils.replaceGreed(
            this.strLeft,
            this.strRight,
            this.content,
            (data) => {
                const after = this.analyseTemplate(data.replace);
                replace = data.replace;
                if(data.replace !== after) {
                    isThisTemplate = 2; // 匹配到{{}}而且是这个模板
                    const replaceStr = this.replace(this.rendererData.template.templateList, "template");
                    this.rendererData.template.templateList.push({
                        key: replaceStr,
                        value: after
                    });
                    return replaceStr;
                }else{
                    isThisTemplate = 1; // 匹配到{{}}但不是这个模板
                    if(this.parserData.canNotMatch === this.rendererData.templateParser.length - 1) {
                        // 全部都匹配到了，但是没有一个符合，替换 {{ 符号 }}
                        const replaceStrLeftSymbol = this.replace(this.rendererData.symbol.symbolList, "symbol");
                        const replaceStrRightSymbol = this.replace(this.rendererData.symbol.symbolList, "symbol");
                        this.rendererData.symbol.symbolList.push({
                            key: replaceStrLeftSymbol,
                            value: this.strLeft
                        });
                        this.rendererData.symbol.symbolList.push({
                            key: replaceStrRightSymbol,
                            value: this.strRight
                        });
                        let t = after.replace(this.strLeft, replaceStrLeftSymbol);
                        t = t.replace(this.strRight, replaceStrRightSymbol);
                        return t;
                    }
                    return after
                }
            }
        ).content;

        return {
            content: content,
            isThisTemplate: isThisTemplate,
            replace: replace
        };
    }
    replace(list, type) {
        let now = new Date().getTime().toString();
        let replaceStr =
            now + type + Math.floor(Math.random() * 1000000).toString();
        let a = 0;
        while (list.indexOf(replaceStr) !== -1 && a++ < 100) {
            replaceStr += type + Math.floor(Math.random() * 1000000).toString();
        }
        return replaceStr;
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
