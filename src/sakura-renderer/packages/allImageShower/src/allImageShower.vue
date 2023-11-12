<template>
    <div ref="srAllImage" class="all-image-fit">
        <div class="all-image-container" :style="containerStyle">
            <img
                v-for="(img, index) in this.data.imgList"
                :key="index"
                :src="img.src"
                @click="this.showModal(index)"
                class="slide"
                :style="{
                    'object-fit': 'cover',
                    width: '100%',
                    height: '100%',
                }"
            />
        </div>
        <sr-image-shower v-if="modalVisible" :imgList=this.data.imgList :initialIndex="currentIndex" @exit="hideModal"></sr-image-shower>
    </div>
</template>

<script>
export default {
    name: "sr-all-is",
    props: {
        data: { type: Object, default: null },
    },
    data() {
        return {
            hasLink: false,
            styleStr: "",
            containerStyle: {},
            // loadedPhotos: [], // 存储照片地址的数组
            currentIndex: 0, // 当前展示的照片索引
            modalVisible: false, // 控制大图展示的模态框可见性
        };
    },
    mounted() {
        // console.log(this.data);
        this.setStyles();
    },
    methods: {
        setStyles() {
            console.log(this.data.option);
            if (this.data.option.float === "center") {
                this.$refs.srAllImage.classList.add("sa-all-image--center");
            } else if (this.data.option.float === "left") {
                this.$refs.srAllImage.classList.add("sa-all-image--left");
            } else if (this.data.option.float === "right") {
                this.$refs.srAllImage.classList.add("sa-all-image--right");
            }
            this.containerStyle = {
                "grid-template-columns": `repeat(${this.data.option.column}, ${this.data.option.imgWidth})`,
                "grid-gap": this.data.option.space,
                "grid-template-rows": `repeat(${this.data.option.row}, ${this.data.option.imgHeight})`,
                "height": this.data.option.height,
                "width": this.data.option.width,
            };
            if (this.data.option.direction !== "auto") {
                this.containerStyle["grid-auto-flow"]=this.data.option.direction;
            }
            if (this.data.option.cs !== false) {
                this.containerStyle["grid-template-columns"] =
                    this.data.option.cs;
            }
            if (this.data.option.rs !== false) {
                this.containerStyle["grid-template-rows"] =
                    this.data.option.rs;
            }
            const container = this.$refs.srAllImage;
            const images = container.querySelectorAll(".slide");
            images.forEach((image) => {
                const rect = image.getBoundingClientRect();
                if (
                    rect.bottom > container.clientHeight ||
                    rect.top < 0 ||
                    rect.right > container.clientWidth ||
                    rect.left < 0
                ) {
                    image.classList.add("show");
                } else {
                    image.classList.remove("show");
                }
            });
            console.log(this.containerStyle);
        },
        showModal(index) {
            this.currentIndex= index;
            this.modalVisible = true;
        },
        hideModal() {
            this.modalVisible = false;
        },
    },
};
</script>

<style>
/* .allmage-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
} */
</style>
