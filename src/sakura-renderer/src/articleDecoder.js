/**
 * 文档拆分器
 * 将配置项和文章主体
 */

class ArticleDecoder {
    constructor(article) {
        this.article = article;
        this.splitStr = "\n|-\n"; // 通过这个字符串划分
        this.option = ""; // 配置项区域
        this.body = ""; // 文章区域
    }
    decode() {
        let t = this.article.split(this.splitStr);
        if (t.length > 2) {
            // 大于2，把之后的拼起来
            this.option = t[0];
            this.body = t[1];
            for (let i = 2; i < t.length; i++) {
                this.body += this.splitStr + t[i];
            }
        } else if (t.length < 2) {
            // 小于2，没有option
            this.body = t[0];
        } else {
            this.option = t[0];
            this.body = t[1];
        }
        return {
            option: this.option,
            body: this.body,
        };
    }
}

export default ArticleDecoder;
