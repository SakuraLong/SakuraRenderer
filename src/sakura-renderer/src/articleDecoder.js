/**
 * 文档拆分器
 * 将配置项和文章主体
 */
import utils from "../utils";
import GrammerParser from "./componentsParser/grammar/grammarParser"; // 语法解析器
import TemplateParser from "./componentsParser/template/templateParser"; // 模板解析器
import ModuleParser from "./componentsParser/module/moduleParser"; // 模块解析器

class ArticleDecoder {
    constructor(article) {
        this.article = article;
        this.splitStr = "\n|-\n"; // 通过这个字符串划分
        this.option = ""; // 配置项区域
        this.body = ""; // 文章区域
        this.componentsList = []; // 组件列表
        this.ignore = ["sr-ignore", "sr-i", "ignore"];
        this.ignoreReplaceList = []; // ignore替换列表
        this.code = ["sr-code", "sr-c", "code"];
        this.codeReplaceList = []; // code替换列表
        this.poem = ["sr-poem", "sr-p", "poem"];
        this.poemReplaceList = []; // poem替换列表
    }
    decode() {
        let t = this.article.split(this.splitStr);
        if (t.length > 2) {
            // 大于2，把之后的拼起来
            this.option = t[0];
            this.body = t[1];
            for (let i = 2; i < t.length; i++) {
                this.body += this.splitStr + t[i];
            }
        } else if (t.length < 2) {
            // 小于2，没有option
            this.body = t[0];
        } else {
            this.option = t[0];
            this.body = t[1];
        }
        this.body = this.body.trim();
        let body = this.body;
        this.ignore.forEach((ignoreStr) => {
            body = utils.replaceNonGreed(
                "<" + ignoreStr + ">",
                "</" + ignoreStr + ">",
                body,
                (data) => {
                    return this.ignoreReplace(data);
                },
                true
            ).content;
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
            while (temp !== body) {
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
            while (temp !== body) {
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
        let componentStart = false;
        let startBegin = -1; // {下标
        let startEnd = -1; // }下标
        for (let i = 0; i < body.length; i++) {
            if (
                body[i] === "{" &&
                i < body.length - 1 &&
                body[i + 1] === "|" &&
                !componentStart
            ) {
                componentStart = true;
                if (startBegin !== -1) {
                    // 再添加end + 1 ~ i - 1的内容
                    let temp = body.slice(startEnd + 1, i).trim();
                    temp = temp.split("\n\n"); // 划分细节
                    temp.forEach((data) => {
                        let t = data.trim();
                        if (t === "") return;
                        this.componentsList.push(t);
                    });
                }
                startBegin = i;
            }
            if (
                body[i] === "}" &&
                i > 0 &&
                body[i - 1] === "|" &&
                componentStart
            ) {
                componentStart = false;
                if (startBegin !== -1) {
                    // 先添加begin ~ end
                    this.componentsList.push(body.slice(startBegin, i + 1));
                }
                startEnd = i;
            }
            if (i === length - 1) {
                let temp = body
                    .slice(
                        startBegin === -1 ? 0 : startBegin,
                        startEnd === -1 ? i + 1 : startEnd
                    )
                    .trim();
                temp = temp.split("\n\n");
                temp.forEach((data) => {
                    let t = data.trim();
                    if (t === "") return;
                    this.componentsList.push(t);
                });
            }
        }
        return {
            option: this.option,
            body: this.body,
            componentsList: [],
            ignoreReplaceList: this.ignoreReplaceList,
            codeReplaceList: this.codeReplaceList,
            poemReplaceList: this.poemReplaceList,
        };
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
        content = new GrammerParser(
            this.option,
            content,
            this.rendererData
        ).analyse(); // 调用语法解析器解析
        content = new TemplateParser(
            this.option,
            content,
            this.rendererData
        ).analyse(); // 调用模板解析器解析
        content = new ModuleParser(
            this.option,
            content,
            this.rendererData
        ).analyse(); // 调用模块解析器解析
        let replaceStr = this.replace(data, "poem");
        this.poemReplaceList.push({
            key: replaceStr,
            value: "<pre>" + content + "</pre>",
        });
        return replaceStr;
    }
}

export default ArticleDecoder;
