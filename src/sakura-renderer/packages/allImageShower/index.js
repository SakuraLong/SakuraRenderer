import AllIS from "./src/allImageShower";

/* istanbul ignore next */
AllIS.install = function (Vue) {
    Vue.component(AllIS.name, AllIS);
};

export default AllIS;
