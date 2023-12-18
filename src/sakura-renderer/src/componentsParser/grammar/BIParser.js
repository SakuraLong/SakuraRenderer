//边俣
class BIParser {
    constructor(option, content) {
        this.option = option;
        this.content = content;
    }
    replaceDoubleTilde(inputText) {
        const replacedText = inputText.replace(/~\*(.*?)\*~/g, "<strong><i>$1</i></strong>");

        return replacedText;
    }
    analyse() {
        this.content = this.replaceDoubleTilde(this.content);
        return this.content;
    }
}

export default BIParser;
