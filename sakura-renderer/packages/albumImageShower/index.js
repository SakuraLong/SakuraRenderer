import AlbumIS from "./src/albumImageShower";

/* istanbul ignore next */
AlbumIS.install = function (Vue) {
    Vue.component(AlbumIS.name, AlbumIS);
};

export default AlbumIS;
