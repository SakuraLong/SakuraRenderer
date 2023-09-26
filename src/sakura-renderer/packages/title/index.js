import Title from "./src/title";

/* istanbul ignore next */
Title.install = function (Vue) {
    Vue.component(Title.name, Title);
};

export default Title;
