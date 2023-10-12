/*
组件拆分器
拆分大组件：标题、段落、表格、列表、图片显示器
*/
import utils from "../../utils";
import TitleParser from "./component/titleParser";
import ParaParser from "./component/paraParser";
import AlbumISParser from "./component/AlbumISParser";
import AllISParser from "./component/AllISParser";
import CISParser from "./component/CISParser";
import ListParser from "./component/listParser";
import TableParser from "./component/tableParser";
import GrammerParser from "./grammar/grammarParser"; // 语法解析器
import TemplateParser from "./template/templateParser"; // 模板解析器
import ModuleParser from "./module/moduleParser"; // 模块解析器

class ComponentsDecoder {
    constructor(option, body) {
        this.option = option;
        this.body = body;
        this.ignore = ["sr-ignore", "sr-i", "ignore"];
        this.ignoreReplaceList = []; // ignore替换列表
        this.code = ["sr-code", "sr-c", "code"];
        this.codeReplaceList = []; // code替换列表
        this.poem = ["sr-poem", "sr-p", "poem"];
        this.poemReplaceList = []; // poem替换列表
        this.parsers = [
            TitleParser,
            ParaParser,
            AlbumISParser,
            AllISParser,
            CISParser,
            ListParser,
            TableParser,
        ]; // parsers

        this.componentsList = []; // components列表
    }
    decode() {
        // 选择需要忽略的区域
        let body = this.body;
        this.ignore.forEach((ignoreStr) => {
            let temp = utils.replaceNonGreed(
                "<" + ignoreStr + ">",
                "</" + ignoreStr + ">",
                body,
                (data) => {
                    return this.ignoreReplace(data);
                }
            ).content;
            while(temp !== body){
                body = temp;
                temp = utils.replaceNonGreed(
                    "<" + ignoreStr + ">",
                    "</" + ignoreStr + ">",
                    body,
                    (data) => {
                        return this.ignoreReplace(data);
                    }
                ).content;
            }
        });
        // 选择代码区域
        this.code.forEach((codeStr) => {
            let temp = utils.replaceNonGreed(
                "<" + codeStr + ">",
                "</" + codeStr + ">",
                body,
                (data) => {
                    return this.codeReplace(data);
                }
            ).content;
            while(temp !== body){
                body = temp;
                temp = utils.replaceNonGreed(
                    "<" + codeStr + ">",
                    "</" + codeStr + ">",
                    body,
                    (data) => {
                        return this.codeReplace(data);
                    }
                ).content;
            }
        });
        // 选择poem区域
        this.poem.forEach((poemStr) => {
            let temp = utils.replaceNonGreed(
                "<" + poemStr + ">",
                "</" + poemStr + ">",
                body,
                (data) => {
                    return this.poemReplace(data);
                }
            ).content;
            while(temp !== body){
                body = temp;
                temp = utils.replaceNonGreed(
                    "<" + poemStr + ">",
                    "</" + poemStr + ">",
                    body,
                    (data) => {
                        return this.poemReplace(data);
                    }
                ).content;
            }
        });
        // 存在不需要处理的\n区域已经选择完毕
        // 用双换行分割
        this.componentsList = body.split("\n\n");
        console.log("组件列表");
        // console.log(this.componentsList);
        // 此处进行模板和模块和语法解析器解析
        for (let i = 0; i < this.componentsList.length; i++) {
            this.componentsList[i] = new GrammerParser(
                this.option,
                this.componentsList[i]
            ).analyse(); // 调用语法解析器解析
            this.componentsList[i] = new TemplateParser(
                this.option,
                this.componentsList[i]
            ).analyse(); // 调用模板解析器解析
            this.componentsList[i] = new ModuleParser(
                this.option,
                this.componentsList[i]
            ).analyse(); // 调用模块解析器解析
        }
        this.componentsList = this.listDecode(); // 组件拆分
        // 每个组件的内容进行语法、模板、模块解析
        // 将忽略的区域插回组件
        return this.componentsList;
    }
    insert() {
        // 将被移除的字符串替换回去
    }
    replace(data, type) {
        let now = new Date().getTime().toString();
        let replaceStr =
            now + type + Math.floor(Math.random() * 1000000).toString();
        let a = 0;
        while (data.content.indexOf(replaceStr) !== -1 && a++ < 100) {
            console.log(data.content.indexOf(replaceStr));
            replaceStr += type + Math.floor(Math.random() * 1000000).toString();
        }
        return replaceStr;
    }
    ignoreReplace(data) {
        let content = data.replace;
        content = content.slice(
            data.stringBegin.length,
            -data.stringEnd.length
        ); // 去掉头尾标记符
        let replaceStr = this.replace(data, "ignore");
        this.ignoreReplaceList.push({ key: replaceStr, value: content });
        return replaceStr;
    }
    codeReplace(data) {
        let content = data.replace;
        content = content.slice(
            data.stringBegin.length,
            -data.stringEnd.length
        ); // 去掉头尾标记符
        let replaceStr = this.replace(data, "code");
        this.ignoreReplaceList.push({ key: replaceStr, value: content });
        return replaceStr;
    }
    poemReplace(data) {
        let content = data.replace;
        content = content.slice(
            data.stringBegin.length,
            -data.stringEnd.length
        ); // 去掉头尾标记符
        content = new GrammerParser(this.option, content).analyse(); // 调用语法解析器解析
        content = new TemplateParser(this.option, content).analyse(); // 调用模板解析器解析
        content = new ModuleParser(this.option, content).analyse(); // 调用模块解析器解析
        let replaceStr = this.replace(data, "poem");
        console.log(content);
        this.poemReplaceList.push({ key: replaceStr, value: "<pre>" + content + "</pre>" });
        return replaceStr;
    }
    /**
     * 处理组件列表
     */
    listDecode() {
        let componentsList = this.componentsList;
        let templateList = [];
        console.log(this.ignoreReplaceList);
        console.log(this.poemReplaceList);
        for (let i = 0; i < componentsList.length; i++) {
            for (let j = 0; j < this.parsers.length; j++) {
                let t = new this.parsers[j](componentsList[i], this.option);
                if (!t.judge()) continue;
                let template = t.analyse(
                    this.ignoreReplaceList,
                    this.codeReplaceList,
                    this.poemReplaceList
                );
                if (template.type === "success") {
                    templateList.push(template.content);
                }
                // console.log(template);
            }
        }
        return templateList;
    }
}

export default ComponentsDecoder;
