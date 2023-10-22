import Paragraph from "./src/paragraph";

/* istanbul ignore next */
Paragraph.install = function (Vue) {
    Vue.component(Paragraph.name, Paragraph);
};

export default Paragraph;
