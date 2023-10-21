/*
列表解析器
边俣
*/
import ComponentsParser from "./componentParser";
function getLevelAndType(item) {
    const level = item.match(/^(\*+|\++|-+)/)?.[0].length || 0;
    if (level !== 0) {
        if (item.match(/^(\*+|\++|-+)/)?.[0].endsWith("+")) {
            return [level, true];
        } else if (item.match(/^(\*+|\++|-+)/)?.[0].endsWith("*")) {
            return [level, false];
        } else {
            return [0, true];
        }
    } else {
        return [0, true];
    }
}
function createMenu(data) {
    let menu = [];
    let stack = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let template = data[i];
        let level = getLevelAndType(template)[0];
        if (level === 0) continue;
        let text = template.replace(/^(\*+|\++|-+)\s*/, "");
        console.log(text, getLevelAndType(template));
        let item = {
            text: text,
            order_judge: getLevelAndType(template)[1],
            level:level,
            children: [],
        };
        while (stack.length >= level) {
            stack.pop();
        }
        if (stack.length === 0) {
            menu.push(item);
        } else {
            stack[stack.length - 1].children.push(item);
        }
        stack.push(item);
    }
    return menu;
}
class ListParser extends ComponentsParser {
    constructor(component, option) {
        super(component, option);
        this.default = false; // 是否是组件模板（是否是{||}包裹）
        this.name = ["list", "列表"];
        this.template = {
            type: "sr-list", // 组件名称
            data: {
                listData: [],
                content: [],
                option: {
                    // 列表配置项
                    name: "", // 列表名字
                    fold: false, // 是否折叠
                    mode: "default", //列表序号模式
                    mode_both: true, //是否同时设置序号模式，如果分别设置为false
                    ordered_mode: "default", //有序列表序号模式
                    unordered_mode: "default", //无序列表序号模式
                    template: "DEFAULT",
                },
            },
        }; // 标题段落配置
    }
    judge() {
        // 重写
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     *
     * @param {Object} ignoreReplaceList ignore的key-value
     * @param {Object} codeReplaceList code的key-value
     * @param {Object} poemReplaceList poem的key-value
     */
    analyse(
        ignoreReplaceList = [],
        codeReplaceList = [],
        poemReplaceList = []
    ) {
        this.template.data.option = Object.assign(
            this.template.data.option,
            this.baseOption
        ); // 合并baseOption
        let optionList = []; // 配置项列表
        let divideIndex = this.dataList.indexOf("-");
        if (divideIndex === -1) {
            // 格式错误
            return {
                type: "error",
                msg: "list格式错误",
                content: this.content,
            };
        }
        for (let i = 1; i < divideIndex; i++) {
            optionList.push(this.dataList[i]);
        }
        for (let i = divideIndex + 1; i < this.dataList.length; i++) {
            this.template.data.content.push(this.dataList[i]);
        }
        this.template.data.listData = createMenu(this.template.data.content);
        if (optionList.length !== 0) {
            optionList.forEach((optionELe) => {
                let key = optionELe.split("=")[0];
                let value =
                    optionELe.split("=")[optionELe.split("=").length - 1];
                switch (key) {
                    case "name":
                        this.template.data.option.name = value;
                        break;
                    case "fold":
                        if (["true", "false"].indexOf(value) !== -1) {
                            this.template.data.option.fold = eval(value);
                        } else if (key === value) {
                            this.template.data.option.fold = true;
                        }
                        break;
                    case "mode":
                        if (
                            [
                                "default",
                                "number",
                                "solid",
                                "hollow",
                                "square",
                                "template",
                                "none",
                            ].indexOf(value) !== -1
                        ) {
                            this.template.data.option.mode = value;
                        }
                        break;
                    case "default":
                        if (key === value) {
                            this.template.data.option.mode = key;
                        }
                        break;
                    case "number":
                        if (key === value) {
                            this.template.data.option.mode = key;
                        }
                        break;
                    case "solid":
                        if (key === value) {
                            this.template.data.option.mode = key;
                        }
                        break;
                    case "hollow":
                        if (key === value) {
                            this.template.data.option.mode = key;
                        }
                        break;
                    case "square":
                        if (key === value) {
                            this.template.data.option.mode = key;
                        }
                        break;
                    case "template":
                        if (key === value) {
                            this.template.data.option.mode = key;
                        }
                        break;
                    case "none":
                        if (key === value) {
                            this.template.data.option.mode = key;
                        }
                        break;
                    default:
                        if (
                            key.includes(";") &&
                            key.trim().split(";").length === 2
                        ) {
                            //考虑mode设置两个的情况
                            let str1 = key.trim().split(";")[0];
                            let str2 = key.trim().split(";")[1];
                            if (
                                [
                                    "default",
                                    "number",
                                    "template",
                                    "none",
                                ].indexOf(str1) !== -1 &&
                                [
                                    "default",
                                    "solid",
                                    "hollow",
                                    "square",
                                    "none",
                                ].indexOf(str2) !== -1
                            ) {
                                this.template.data.option.ordered_mode = str1;
                                this.template.data.option.unordered_mode = str2;
                                this.template.data.option.mode_both = false;
                            }
                            console.log(
                                this.template.data.option.ordered_mode,
                                this.template.data.option.unordered_mode
                            );
                        }
                        break;
                }
            });
        }
        
        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default ListParser;
