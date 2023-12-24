import ArticleContainer from "./src/articleContainer";

/* istanbul ignore next */
ArticleContainer.install = function (Vue) {
    Vue.component(ArticleContainer.name, ArticleContainer);
};

export default ArticleContainer;
