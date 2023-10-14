import Clear from "./src/clear";

/* istanbul ignore next */
Clear.install = function (Vue) {
    Vue.component(Clear.name, Clear);
};

export default Clear;
