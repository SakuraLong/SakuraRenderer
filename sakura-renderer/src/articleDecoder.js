/**
 * 文档拆分器
 * 将配置项和文章主体
 */
import utils from "../utils";
import GrammarParser from "./componentsParser/grammar/grammarParser"; // 语法解析器
import TemplateParser from "./componentsParser/template/templateParser"; // 模板解析器
import ModuleParser from "./componentsParser/module/moduleParser"; // 模块解析器

class ArticleDecoder {
    constructor(article, userData = {}) {
        this.article = article;
        this.splitStr = "\n-\n"; // 通过这个字符串划分
        this.option = ""; // 配置项区域
        this.body = ""; // 文章区域
        this.componentsList = []; // 组件列表
        this.ignore = ["sr-ignore", "sr-i", "ignore"];
        this.ignoreReplaceList = []; // ignore替换列表
        this.code = ["sr-code", "sr-c", "code"];
        this.codeReplaceList = []; // code替换列表
        this.poem = ["sr-poem", "sr-p", "poem"];
        this.poemReplaceList = []; // poem替换列表
        this.html = ["sr-html", "sr-h", "html"];
        this.htmlReplaceList = []; // poem替换列表

        this.replaceTemplate = this.replaceTMG(TemplateParser);
        this.replaceModule = this.replaceTMG(ModuleParser);
        this.replaceGrammar = this.replaceTMG(GrammarParser); // 不能在这里替换

        this.replaceIgnore = this.replaceICPH(this.ignore, (data) => {return this.ignoreReplace(data);});
        this.replaceCode = this.replaceICPH(this.code, (data) => {return this.codeReplace(data);});
        this.replacePoem = this.replaceICPH(this.poem, (data) => {return this.poemReplace(data);});
        this.replaceHtml = this.replaceICPH(this.html, (data) => {return this.htmlReplace(data);});

        this.rendererData = {
            ref: {
                amount: 0, // 参考的数量
                refList: [], // 底部ref的渲染列表
            },
            template: {
                templateList: []
            },
            module: {
                moduleList: []
            },
            symbol: {
                symbolList: [], // 处理如:{{heimu|123{{heimu123|345}}456}} 无法匹配外面heimu的问题
            },
            func: {
                replaceTemplate: this.replaceTemplate,
                replaceModule: this.replaceModule,
                replaceGrammar: this.replaceGrammar,
                replaceHtml: this.replaceHtml
            },
            userData: userData
        };
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
        // ignore -> html -> code -> template -> module -> poem
        body = this.replaceIgnore(body);
        body = this.replaceHtml(body);
        body = this.replaceCode(body);
        body = this.replaceTemplate(body);
        body = this.replaceModule(body);
        body = this.replacePoem(body);
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
                // 再添加end + 1 ~ i - 1的内容
                let temp = body.slice(startEnd + 1, i).trim();
                temp = temp.split("\n\n"); // 划分细节
                temp.forEach((data) => {
                    let t = data.trim();
                    if (t === "") return;
                    this.componentsList.push(t);
                });
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
            if (i === body.length - 1) {
                let temp = body
                    .slice(
                        startEnd === -1 ? 0 : startEnd + 1,
                        i + 1
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
        this.rendererData.ignoreReplaceList = this.ignoreReplaceList;
        this.rendererData.codeReplaceList = this.codeReplaceList;
        this.rendererData.poemReplaceList = this.poemReplaceList;
        this.rendererData.htmlReplaceList = this.htmlReplaceList;
        return {
            option: this.option,
            body: this.body,
            componentsList: this.componentsList,
            rendererData: this.rendererData,
        };
    }
    replace(data, type) {
        let now = new Date().getTime().toString();
        let replaceStr =
            now + type + Math.floor(Math.random() * 1000000).toString();
        let a = 0;
        while (data.content.indexOf(replaceStr) !== -1 && a++ < 100) {
            replaceStr += type + Math.floor(Math.random() * 1000000).toString();
        }
        return replaceStr;
    }

    replaceICPH(list, func) {
        const rLIst = list;
        const rFunc = func;
        return function(content) {
            let tContent = content;
            rLIst.forEach((str) => {
                let temp = utils.replaceNonGreed(
                    "<" + str + ">",
                    "</" + str + ">",
                    tContent,
                    (data) => {
                        return rFunc(data);
                    }
                ).content;
                while (temp !== tContent) {
                    tContent = temp;
                    temp = utils.replaceNonGreed(
                        "<" + str + ">",
                        "</" + str + ">",
                        tContent,
                        (data) => {
                            return rFunc(data);
                        }
                    ).content;
                }
            });
            return tContent;
        };
    }

    replaceTMG(Parser) {
        const self = this;
        return function(content) {
            content = new Parser(
                self.option,
                content,
                self.rendererData
            ).analyse();
            return content;
        };
    }

    ignoreReplace(data) {
        let content = data.replace;
        content = content.slice(
            data.stringBegin.length,
            -data.stringEnd.length
        ); // 去掉头尾标记符
        let replaceStr = this.replace(data, "ignore");
        const span = document.createElement("span");
        span.textContent = content;
        this.ignoreReplaceList.push({ key: replaceStr, value: span.outerHTML });
        return replaceStr;
    }
    htmlReplace(data) {
        let content = data.replace;
        content = content.slice(
            data.stringBegin.length,
            -data.stringEnd.length
        ); // 去掉头尾标记符
        let replaceStr = this.replace(data, "html");
        this.htmlReplaceList.push({ key: replaceStr, value: content });
        return replaceStr;
    }
    codeReplace(data) {
        let content = data.replace;
        content = content.slice(
            data.stringBegin.length,
            -data.stringEnd.length
        ); // 去掉头尾标记符
        const lang = [];
        let span = false;
        if(content[0] === "#") {
            content = content.slice(1);
            // 设置语言
            let d = content.indexOf("#");
            let t = content.slice(0, d);
            lang.push(t);
            content = content.slice(d + 1);
        }
        if(content[0] === "#") {
            content = content.slice(1);
            span = true;
        }
        let replaceStr = this.replace(data, "code");
        let value = span === true ? "<span class='sr-code-span'>" + window.SARE.hljs.highlightAuto(content, lang.length === 0 ? null : lang).value + "</span>" : "<pre class='sr-code'>" + window.SARE.hljs.highlightAuto(content, lang.length === 0 ? null : lang).value + "</pre>";
        this.codeReplaceList.push({ key: replaceStr, value: value});
        return replaceStr;
    }
    poemReplace(data) {
        let content = data.replace;
        content = content.slice(
            data.stringBegin.length,
            -data.stringEnd.length
        ); // 去掉头尾标记符
        let replaceStr = this.replace(data, "poem");
        this.poemReplaceList.push({
            key: replaceStr,
            value: "<pre>" + content + "</pre>",
        });
        return replaceStr;
    }
}

export default ArticleDecoder;
