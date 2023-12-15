class BoldParser {
    constructor(option, content) {
        this.option = option;
        this.content = content;
    }
    replaceDoubleTilde(inputText) {
        const replacedText = inputText.replace(/!([^~]+)!/g, "<bold>$1</bold>");

        return replacedText;
    }
    analyse() {
        this.content = this.replaceDoubleTilde(this.content);
        return this.content;
    }
}

export default BoldParser;
