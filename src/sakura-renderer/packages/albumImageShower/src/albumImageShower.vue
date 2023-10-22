<template>
    <div class="sr-album-is" ref="srAlbum" :style="styleStr">
        <div class="sr-album-info">
            {{ title }}
        </div>
        <div class="sr-album--preview--div" ref="srAlbum_preview">
            <img
                :src="loadedPhotos[currentIndex]"
                @click="showModal"
                class="sr-album--preview--img"
                ref="srAlbum_preview_img"
            />
        </div>
        <div class="sr-album--controls">共{{ loadedPhotos.length }}张图片</div>
        <!-- <div class="modal" v-if="modalVisible" @click="hideModal">
            <img :src="loadedPhotos[currentIndex]" @click.stop />
        </div> -->
        <sr-image-shower v-if="modalVisible" :imgList="loadedPhotos" :initialIndex="currentIndex" @exit="hideModal"></sr-image-shower>
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
            title: "",
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
        previousPhoto() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },
        nextPhoto() {
            if (this.currentIndex < this.loadedPhotos.length - 1) {
                this.currentIndex++;
            }
        },
    },
    mounted() {
        this.$refs.srAlbum.style.maxWidth = "max-content"; 
        console.log(this.data.option);
        if (this.data.option.align === "center") {
            this.$refs.srAlbum.classList.add("sr-album--align--center");
        } else if (this.data.option.align === "left") {
            this.$refs.srAlbum.classList.add("sr-album--align--left");
        } else if (this.data.option.align === "right") {
            this.$refs.srAlbum.classList.add("sr-album--align--right");
        } //
        else {
            this.$refs.srAlbum.classList.add("sr-album--align--none");
        }
        this.$refs.srAlbum_preview_img.style.width =
            this.data.option.showImageWidth;
        this.$refs.srAlbum_preview_img.style.height =
            this.data.option.showImageHeight.slice(1);
        if (this.data.option.width !== "auto") {
            this.$refs.srAlbum.style.width = this.data.option.width;
            this.$refs.srAlbum.style.maxWidth = "none"; 
        }
        if(this.data.option.width !== "auto" && this.$refs.srAlbum_preview_img.style.width === "auto"){
            this.$refs.srAlbum_preview_img.style.width = this.data.option.width;
        }
        if(this.data.option.width !== "auto" && this.data.option.height !== "auto"){
            if(this.data.option.showImageWidth !== "auto")
                this.$refs.srAlbum_preview_img.style.width = this.data.option.showImageWidth;
            else{
                this.$refs.srAlbum_preview_img.style.width = this.data.option.width;
            }
        }
        if(this.$refs.srAlbum_preview_img.style.width !== "auto" && this.data.option.showImageHeight !== "auto"){
            this.$refs.srAlbum_preview_img.style.width = "auto";
        }
        console.log(this.$refs.srAlbum.style.maxWidth);
        this.$refs.srAlbum.style.height = this.data.option.height;
        this.data.option.classList.forEach((className) => {
            this.$refs.srAlbum.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName) => {
            this.styleStr += styleName + ";";
        });
        this.loadedPhotos = this.data.content;
        this.title = this.data.title;
    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal img {
    max-width: 80%;
    max-height: 80%;
    cursor: pointer;
}
</style>
