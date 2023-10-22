import Catalogue from "./src/catalogue";

/* istanbul ignore next */
Catalogue.install = function (Vue) {
    Vue.component(Catalogue.name, Catalogue);
};

export default Catalogue;
