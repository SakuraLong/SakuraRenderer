import CarouselIS from "./src/carouselImageShower";

/* istanbul ignore next */
CarouselIS.install = function (Vue) {
    Vue.component(CarouselIS.name, CarouselIS);
};

export default CarouselIS;
