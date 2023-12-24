import Icon from "./src/icon";
import ArrowLeft from "./src/arrowLeft";
import ArrowRight from "./src/arrowRight";
import Exit from "./src/exit";
import FullScreen from "./src/fullScreen";

/* istanbul ignore next */
Icon.install = function (Vue) {
    Vue.component(Icon.name, Icon);
};

ArrowLeft.install = function (Vue) {
    Vue.component(ArrowLeft.name, ArrowLeft);
};

ArrowRight.install = function (Vue) {
    Vue.component(ArrowRight.name, ArrowRight);
};

Exit.install = function (Vue) {
    Vue.component(Exit.name, Exit);
};

FullScreen.install = function (Vue) {
    Vue.component(FullScreen.name, FullScreen);
};

export default {
    Icon,
    ArrowLeft,
    ArrowRight,
    Exit,
    FullScreen,
};
