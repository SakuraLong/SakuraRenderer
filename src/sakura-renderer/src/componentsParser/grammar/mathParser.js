import utils from "../../../utils";
import MarkdownIt from "../../../sr_node_modules/markdown-it";
import markdownItKatex from "../../../sr_node_modules/markdown-it-katex";
class MathParser {
    constructor(option, content) {
        this.option = option;
        this.content = content;
        this.tempDivId = "sa-article-temp";
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
        // console.log(content);
        this.content = content;
    }
    getMathHTML(mathStr) {
        // console.log(mathStr);
        const md = new MarkdownIt().use(markdownItKatex);
        const html = md.renderInline(mathStr);
        // console.log(html);
        return html;
    }
}

export default MathParser;
