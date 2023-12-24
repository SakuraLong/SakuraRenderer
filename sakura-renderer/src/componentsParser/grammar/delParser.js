class DelParser {
    constructor(option, content) {
        this.option = option;
        this.content = content;
    }
    replaceDoubleTilde(inputText) {
        const replacedText = inputText.replace(/~~([^~]+)~~/g, "<del>$1</del>");

        return replacedText;
    }
    analyse() {
        this.content = this.replaceDoubleTilde(this.content);
        return this.content;
    }
}

export default DelParser;
