/*
sakuraRenderer
*/
import ArticleDecoder from "./src/articleDecoder";
import ComponentsDecoder from "./src/componentsParser/componentsDecoder";

class SakuraRenderer {
    constructor(renderElement = null, edit = false, isVue = false) {
        this.renderElement = renderElement; // 渲染加载的元素
        this.edit = edit; // 是否处于编辑模式
        this.isVue = isVue;
        this.articleGroup = []; // 文章列表
        this.articleGroupIndex = 0; // 当前显示的文章
        this.article = ""; // 文章
        this.optionFromSet = null; // 设置的配置项
        this.articleData = {
            body: "", // 主体字符串
            option: "", // 配置项字符串
            componentsList: [], // 组件列表
            optionData: {}, // 配置项对象
        }; // 文章数据
        this.body = ""; // 主体
        this.option = ""; // 文章配置项
    }
    /**
     * 设置文章内容
     * 会检查格式
     * 不会进行渲染
     * @param {String} article
     */
    setArticle(article) {
        console.log("设置文章", typeof article);
        if (typeof article !== "string") return false;
        console.log("设置文章");
        this.article = article;
        if (this.edit) {
            // 编辑模式需要根据这个输入返回对应的html
        }
        return true;
    }
    /**
     * 设置文章配置项
     * 会检查格式
     * 不会进行渲染
     * @param {String} option
     * @returns 设置是否成功
     */
    setOption(option) {
        if (typeof option !== "object") return false;
        this.optionFromSet = option;
        return true;
    }
    /**
     * 设置文章组
     * 会检查格式
     * 不会进行渲染
     * @param {Array} articleGroup 文章列表
     * @param {Number} index 当前显示第几篇
     * @returns 是否设置成功
     */
    setArticleGroup(articleGroup, index = 0) {
        if (typeof articleGroup !== "object" || index < 0) return false;
        this.articleGroup = articleGroup;
        this.articleGroupIndex =
            index >= articleGroup.length ? articleGroup.length : index;
        return true;
    }
    /**
     * 进行文章渲染
     * @returns 渲染是否成功
     */
    async render() {
        if (this.articleGroup.length > 0)
            this.article = this.articleGroup[this.articleGroupIndex];
        if (this.article === "") return false;
        let renderArticle = this.article;
        renderArticle = renderArticle.trim(); // 去首尾换行空格
        let articleDecoder = new ArticleDecoder(renderArticle);
        let decodeRes = articleDecoder.decode(); // 拆分结构
        this.articleData.option = decodeRes.option;
        this.articleData.body = decodeRes.body;
        // 配置项处理
        let option = {};
        // console.log(articleDecoder.componentsList);

        let componentsDecoder = new ComponentsDecoder(
            option,
            this.articleData.body,
            articleDecoder.componentsList,
            {
                ignoreReplaceList: articleDecoder.ignoreReplaceList,
                codeReplaceList: articleDecoder.codeReplaceList,
                poemReplaceList: articleDecoder.poemReplaceList,
            }
        );
        let componentsList = componentsDecoder.decode();
        return componentsList;
    }
}

export default SakuraRenderer;
