/*
模块解析器
*/
import QuoteParser from "./quoteParser";
import RefParser from "./refParser";
import DelParser from "./delParser";
import UndParser from "./undParser";
import HideParser from "./hideParser";
import BlurParser from "./blurParser";
import TextParser from "./textParser";
import BoldParser from "./boldParser";
import AParser from "./aParser";
import RubyParser from "./rubyParser";


class TemplateParser {
    constructor(option, content, rendererData) {
        this.option = option;
        this.content = content;
        this.rendererData = rendererData;
        this.parsers = [
            QuoteParser,
            RefParser,
            DelParser,
            BoldParser,
            UndParser,
            HideParser,
            BlurParser,
            TextParser,
            AParser,
            RubyParser,
        ];
    }
    analyse() {
        let finish = [];
        this.parsers.forEach((element) => {
            finish.push(false);
        });
        let h = 0;
        let hasChange = false;
        while (!this.isFinish(finish) && h < 100000) {
            h++; // 防止出现死循环
            hasChange = false;
            finish.forEach((element, index) => {
                if (!element) {
                    let content = new this.parsers[index](
                        this.option,
                        this.content,
                        this.rendererData
                    ).analyse();
                    if (content !== this.content) hasChange = true;
                    this.content = content;
                }
            });
            if(!hasChange) break;
        }
        return this.content;
    }
    isFinish(finish) {
        for (let i = 0; i < finish.length; i++) {
            if (!finish[i]) return false;
        }
        return true;
    }
}

export default TemplateParser;
