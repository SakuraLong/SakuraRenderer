/*
组件解析器
*/

class ComponentsParser {
    constructor(component, option) {
        this.component = component.trim();
        this.option = option;
        this.type = ""; // 类型
        this.dataList = []; // 数据列表
        this.baseOption = {
            float: "none", // 浮动情况
            clear: "none", // clear情况
            maxWidth: "100%", // 最大宽度
            maxHeight: "none", // 最大高度
            minWidth: "none", // 最小宽度
            minHeight: "none", // 最小高度
            width: "auto", // 宽度
            height: "auto", // 高度
            color: "DEFAULT", // 文字颜色 vue要判断，如果是DEFAULT的话不进行修改！！
            fontSize: "DEFAULT", // 文字大小 同上
            fontFamily: "DEFAULT", // 字体 同上
            classList: [], // 类名列表
            styleList: [], // 样式列表
            id: "", // 组件id
        }; // 基础基本上通用的配置项
        // 在vue里面挑选你需要的使用，不一定每个都有用
        // 如果需要修改默认值可以在子类的constructor里面修改（看得清楚

        this.init();
    }
    judge() {
        // 需要重写，返回true/false代表是不是这个组件
        return false;
    }
    analyse() {
        // 需要重写，返回解析的数据
        return {};
    }
    analyseBaseOption() {
        let divideIndex = this.dataList.indexOf("-");
        for(let i = 1; i < divideIndex; i++) {
            let data = this.dataList[i];
            let key = data.split("=")[0];
            let value = data.split("=")[data.split("=").length - 1];
            switch(key){
                case "left":
                case "right":
                case "both":
                case "none":
                case "center":
                    if(key === value) this.baseOption.float = key; // 需要注意，这个case在clear组件中通用的，所以会case both
                    break;
                case "float":
                case "f":
                    if (["none", "center", "left", "right"].indexOf(value) !== -1) {
                        this.baseOption.float = ["center", "left", "right", "none"].find((ele)=>{return ele === value;});
                    }
                    break;
                case "clear":
                    if (["none", "both", "left", "right"].indexOf(value) !== -1) {
                        this.baseOption.clear = ["center", "both", "right", "none"].find((ele)=>{return ele === value;});
                    }
                    break;
                case "c":
                    // c有可能是clear，也可以是color
                    if (["none", "both", "left", "right"].indexOf(value) !== -1) {
                        this.baseOption.clear = ["center", "both", "right", "none"].find((ele)=>{return ele === value;});
                    }else{
                        this.baseOption.color = value;
                    }
                    break;
                case "width":
                case "w":
                    this.baseOption.width = value;
                    break;
                case "height":
                case "h":
                    this.baseOption.height = value;
                    break;
                case "maxWidth":
                case "maxW":
                    this.baseOption.maxWidth = value;
                    break;
                case "maxHeight":
                case "maxH":
                    this.baseOption.maxHeight = value;
                    break;
                case "minWidth":
                case "minW":
                    this.baseOption.minWidth = value;
                    break;
                case "minHeight":
                case "minH":
                    this.baseOption.minHeight = value;
                    break;
                case "fontSize":
                case "FS":
                    this.baseOption.fontSize = value;
                    break;
                case "fontFamily":
                case "FF":
                    this.baseOption.fontFamily = value;
                    break;
                case "class":
                    if (value)
                        this.baseOption.classList.concat(
                            value.split(";")
                        );
                    break;
                case "style":
                    if (value)
                        this.baseOption.styleList.concat(
                            value.split(";")
                        );
                    break;
                case "id":
                    this.baseOption.id = value;
                    break;
            }
        }
    }
    init() {
        // 初始化，如果不是{||}不影响，因为不是{||}格式不会调用dataList
        let component = this.component;
        component = component.slice(2, -2); // 去掉{||}
        component = component.replace(/\n/g, ""); // 去掉所有换行符
        let dataList = component.split("|"); // 分割数据
        for (let i = 0; i < dataList.length; i++) {
            dataList[i] = dataList[i].trim();
        }
        this.dataList = dataList;
    }
    replace(ignoreReplaceList, codeReplaceList, poemReplaceList, content) {
        codeReplaceList.forEach((codeData) => {
            content = content.replace(codeData.key, codeData.value);
        });
        poemReplaceList.forEach((poemData) => {
            content = content.replace(poemData.key, poemData.value);
        });
        ignoreReplaceList.forEach((ignoreData) => {
            content = content.replace(ignoreData.key, ignoreData.value);
        });
        return content;
    }
}

export default ComponentsParser;
