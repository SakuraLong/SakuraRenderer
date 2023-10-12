import ImageShower from "./src/imageShower";

/* istanbul ignore next */
ImageShower.install = function (Vue) {
    Vue.component(ImageShower.name, ImageShower);
};

export default ImageShower;
