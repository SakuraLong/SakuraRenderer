class Template {
    constructor(content) {
        this.content = content;
        this.str_left = "{{";
        this.str_right = "}}";
    }
    decode() {}
    /**
     * 默认值解码，有意义的|-只出现一次
     * @param {String} content 解码的参数
     * @returns
     */
    decodeDefault(content) {
        content = content.trim(); // 去掉空格和换行符
        let l = content.indexOf(this.str_left) === 0 ? this.str_left.length : 0;
        let r = content.lastIndexOf(this.str_right) === content.length - this.str_right.length ? -this.str_right.length : content.length;
        let use_content = content.slice(l, r); // 去掉两侧的{{}}（如果有）
        // 对use_content根据|进行分割
        // 此时的use_content按照理论内部是不会有模板的
        let use_list = use_content.split("|");
        use_list.forEach((element, index)=>{
            use_list[index].trim(); // 去掉行首行尾换行符和空格
            use_list[index].replace("\n", ""); // 去掉行内的换行符
        });
        console.log(use_list);
        return {};
    }
    /**
     * 表格解码
     * @param {String} content
     * @returns
     */
    decodeTable(content) {
        return {};
    }
}


export default Template;