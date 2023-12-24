/*
语法解析器
*/
import MathParser from "./mathParser"; //
import DelParser from "./delParser"; // ~~ ~~
import ItalicParser from "./italicParser"; // * *
import BoldParser from "./boldParser"; // ** **
import BIParser from "./BIParser"; // ~* *~
import UndParser from "./undParser"; // __ __

class GrammarParser {
    constructor(option, content) {
        this.option = option;
        this.content = content;
        this.parsers = [
            // MathParser,
            DelParser, // ~~ ~~
            BoldParser, // ** **
            BIParser, // ~* *~
            ItalicParser, // * *
            UndParser,  // __ __
        ];
    }
    analyse() {
        let finish = [];
        this.parsers.forEach((element) => {
            finish.push(false);
        });
        let hasChange = false;
        while (!this.isFinish(finish)) {
            hasChange = false;
            finish.forEach((element, index) => {
                if (!element) {
                    let content = new this.parsers[index](
                        this.option,
                        this.content
                    ).analyse();
                    if (content !== this.content) hasChange = true;
                    this.content = content;
                }
            });
            if (!hasChange) break;
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

export default GrammarParser;
