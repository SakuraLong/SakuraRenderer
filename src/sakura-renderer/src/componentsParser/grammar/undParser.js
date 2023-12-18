class undParser {
    constructor(option, content) {
        this.option = option;
        this.content = content;
    }
    replaceDoubleTilde(inputText) {
        const replacedText = inputText.replace(/__(.*?)__/g, "<u>$1</u>");

        return replacedText;
    }
    analyse() {
        this.content = this.replaceDoubleTilde(this.content);
        return this.content;
    }
}

export default undParser;
