/*
sakuraRenderer
*/
import ArticleDecoder from "./src/articleDecoder";
import ComponentsDecoder from "./src/componentsParser/componentsDecoder";


class SakuraRenderer{
    constructor(){
        this.article = ""; // 文章
        this.option = null; // 配置项

        this.option = ""; // 文章配置项
        this.body = ""; // 主体
    }
    /**
     * 设置文章内容
     * 会检查格式
     * 不会进行渲染
     * @param {String} article 
     */
    setArticle(article){
        this.article = article;
        return true;
    }
    /**
     * 设置文章配置项
     * 会检查格式
     * 不会进行渲染
     * @param {String} option 
     * @returns 设置是否成功
     */
    setOption(option){
        this.option = option;
        return true;
    }
    /**
     * 进行文章渲染
     * @returns 渲染是否成功
     */
    render(){
        if(this.article === "") return false;
        console.log("开始渲染");
        this.article = this.article.trim(); // 去首尾换行空格
        let articleDecoder = new ArticleDecoder(this.article);
        let t = articleDecoder.decode(); // 拆分结构
        this.option = t.option;
        this.body = t.body;

        console.log("option:", this.option);
        console.log("body:", this.body);

        let option = {};

        let componentsDecoder = new ComponentsDecoder(option, this.body);
        let componentsList = componentsDecoder.decode();

        return componentsList;
    }
}

export default SakuraRenderer;