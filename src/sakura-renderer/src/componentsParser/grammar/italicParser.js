class ItalicParser {
    constructor(option, content) {
        this.option = option;
        this.content = content;
    }
    replaceDoubleTilde(inputText) {
        const replacedText = inputText.replace(/\*([^~]+)\*/g, "<i>$1</i>");

        return replacedText;
    }
    analyse() {
        this.content = this.replaceDoubleTilde(this.content);
        return this.content;
    }
}

export default ItalicParser;
