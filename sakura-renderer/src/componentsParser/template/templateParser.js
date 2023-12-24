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
import IdParser from "./idParser";
import GithubParser from "./githubParser";


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
            IdParser,
            GithubParser
        ];
        this.rendererData.templateParser = {
            length: this.parsers.length
        };
    }
    analyse() {
        let h = 0;
        let hasChange = false;
        while (h < 10000) {
            h++; // 防止出现死循环
            hasChange = false;
            let canNotMatch = 0;
            let replace = "";
            for(let i = 0; i < this.parsers.length; i++) {
                let result = new this.parsers[i](
                    this.option,
                    this.content,
                    this.rendererData,
                    {
                        canNotMatch: canNotMatch
                    }
                ).analyse();
                let content = result.content;
                if (content !== this.content) hasChange = true;
                this.content = content;
                replace = result.replace;
                if(result.isThisTemplate === 2) break;
                else if(result.isThisTemplate === 1) canNotMatch++;
            }
            if(!hasChange) break;
        }
        return this.content;
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

}

export default TemplateParser;
