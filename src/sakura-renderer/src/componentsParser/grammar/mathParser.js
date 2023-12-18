// 弃用

import utils from "../../../utils";
import MarkdownIt from "../../../sr_node_modules/markdown-it";
import markdownItKatex from "../../../sr_node_modules/markdown-it-katex";
class MathParser {
    constructor(option, content) {
        this.option = option;
        this.content = content;
        // this.tempDivId = "sa-article-temp"; math可能要用
    }
    analyse() {
        this.OLMathParser();
        this.ILMathParser();
        return this.content;
    }
    OLMathParser() {
        // 行间数学公式解析
        this.math("$$");
    }
    ILMathParser() {
        // 行内数学公式解析
        this.math("$");
    }
    math(type) {
        let content = this.content;
        let res = utils.replaceNonGreed(type, type, content, (data) => {
            return this.getMathHTML(data.replace);
        });
        while (res.replace) {
            content = res.content;
            res = utils.replaceNonGreed(type, type, content, (data) => {
                return this.getMathHTML(data.replace);
            });
        }
        this.content = content;
    }
    getMathHTML(mathStr) {
        const md = new MarkdownIt().use(markdownItKatex);
        const html = md.renderInline(mathStr);
        return html;
    }
}

export default MathParser;
