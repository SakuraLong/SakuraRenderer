import Template from "./template";

class RefParser extends Template {
    constructor(option, content, rendererData, parserData) {
        super(option, content, rendererData, parserData);
        this.name = ["ref", "参考"]; // 这个模板的名字
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
        let textContent = "";
        let href = "";
        let refText = "";
        const switchKeyValue = (key, value) => {
            switch(key){
                case "content":
                case "内容":
                    textContent = value;
                    return true;
                case "href":
                case "地址":
                    href = value;
                    return true;
                case "refText":
                case "参考内容":
                    refText = value;
                    return true;
            }
            return false;
        };
        this.dataList.forEach((data, index) => {
            let key = data.split("=")[0];
            let value = data.split("=")[data.split("=").length - 1];
            switch (index) {
                case 1:
                    if(switchKeyValue(key, value)) break;
                    else href = data;
                    break;
                case 2:
                    if(switchKeyValue(key, value)) break;
                    else refText = data;
                    break;
                case 3:
                    if(switchKeyValue(key, value)) break;
                    else textContent = data; // 这个变量没有用
                    break;
            }
        });
        let itemIndex = (++this.rendererData.ref.amount).toString();
        let itemId = "sr-ref-item-" + itemIndex;
        let nodeId = "sr-ref-node-" + itemIndex;

        let refItem = "<sr-ref-item node-id=" + nodeId + 
        " id=" + itemId + 
        " item-index=" + itemIndex + 
        " item-content=" + textContent + 
        " ></sr-ref-item>";

        let refNode = "<sr-ref-node item-id=" + itemId + 
        " id=" + nodeId + 
        " item-index=" + itemIndex + 
        " node-content=" + refText + 
        ">" + href + "</sr-ref-node>";

        this.rendererData.ref.refList.push(refNode);

        return refItem; // 返回被替换的内容
    }
}

export default RefParser;
