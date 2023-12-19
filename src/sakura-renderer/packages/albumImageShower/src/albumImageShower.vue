<template>
    <div class="sr-album-is" ref="srAlbum" :style="styleStr">
        <div class="sr-album--preview--div" ref="srAlbum_preview">
            <img
                :src="loadedPhotos[currentIndex].src"
                @click="showModal"
                class="sr-album--preview--img"
                ref="srAlbum_preview_img"
            /> 
        </div>

        <div class="sr-album--controls">
            <span class="sr-album--controls--left">{{ name }}</span>
            <span class="sr-album--controls--right"
                >({{ loadedPhotos.length }}张)</span
            >
        </div>
        <div class="sr-album-decorate"></div>
        <sr-image-shower
            v-if="modalVisible"
            :imgList="loadedPhotos"
            :initialIndex="currentIndex"
            @exit="hideModal"
        ></sr-image-shower>
    </div>
</template>

<script>
export default {
    name: "sr-album-is",
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            name: "",
            styleStr: "",
            loadedPhotos: [], // 存储照片地址的数组
            currentIndex: 0, // 当前展示的照片索引
            modalVisible: false, // 控制大图展示的模态框可见性
        };
    },
    methods: {
        showModal() {
            this.modalVisible = true;
        },
        hideModal() {
            this.modalVisible = false;
        },
    },
    mounted() {
        this.$refs.srAlbum.style.clear = this.data.option.clear;
        this.$refs.srAlbum.style.color = this.data.option.color;
        this.$refs.srAlbum.style.maxHeight = this.data.option.maxHeight;
        this.$refs.srAlbum.style.maxWidth = this.data.option.maxWidth;
        this.$refs.srAlbum.style.minHeight = this.data.option.minHeight;
        this.$refs.srAlbum.style.minWidth = this.data.option.minWidth;
        this.$refs.srAlbum.style.height = this.data.option.height;
        this.$refs.srAlbum.style.width = this.data.option.width;
        this.$refs.srAlbum.style.maxWidth = "max-content";
        if (this.data.option.float === "center") {
            this.$refs.srAlbum.classList.add("sr-album--align--center");
        } else if (this.data.option.float === "left") {
            this.$refs.srAlbum.classList.add("sr-album--align--left");
        } else if (this.data.option.float === "right") {
            this.$refs.srAlbum.classList.add("sr-album--align--right");
        } //
        else {
            this.$refs.srAlbum.classList.add("sr-album--align--none");
        }
        console.log("sss",this.data.option.fit);
        this.$refs.srAlbum_preview_img.style.object_fit = this.data.option.fit;
        this.$refs.srAlbum_preview_img.style.width = this.data.option.imgWidth;
        this.$refs.srAlbum_preview_img.style.height =
            this.data.option.imgHeight;
        if (this.data.option.width !== "auto") {
            this.$refs.srAlbum.style.width = this.data.option.width;
            this.$refs.srAlbum.style.maxWidth = "none";
        }
        if (
            this.data.option.width !== "auto" &&
            this.$refs.srAlbum_preview_img.style.width === "auto"
            // 外部设置了宽度但是内部没有设置
        ) {
            this.$refs.srAlbum_preview_img.style.width = this.data.option.width;
        }
        if (
            this.data.option.width !== "auto" &&
            this.data.option.height !== "auto"
            // 外部同时修改宽高
        ) {
            if (this.data.option.imgWidth !== "auto")
            //如果内部img设置了宽度，就用内部的
                this.$refs.srAlbum_preview_img.style.width =
                    this.data.option.imgWidth;
            else {
                //否则用外部的
                this.$refs.srAlbum_preview_img.style.width =
                    this.data.option.width;
            }
        }
        this.$refs.srAlbum.style.height = this.data.option.height;
        this.data.option.classList.forEach((className) => {
            this.$refs.srAlbum.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName) => {
            this.styleStr += styleName + ";";
        });
    },
    created() {
        this.loadedPhotos = this.data.imgList;
        this.name = this.data.option.name;
        this.currentIndex = this.data.option.index;
    },
};
</script>

<style scoped></style>
