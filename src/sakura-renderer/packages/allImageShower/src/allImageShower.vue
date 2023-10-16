<template>
    <div ref="srAllImage" class="all-image-fit">
        <div class="all-image-container" :style="containerStyle">
            <div
                v-for="(img, index) in this.data.imgList"
                :key="index"
                class="slide"
                :style="{
                    'background-image': `url(${img})`,
                    'background-size': 'cover',
                    'background-position': 'center',
                    'object-fit': 'cover',
                }"
            ></div>
        </div>
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
            containerStyle: "",
        };
    },
    mounted() {
        console.log(this.data);
        this.setStyles();
    },
    methods: {
        setStyles() {
            // console.log(this.data.option.align);
            if (this.data.option.align === "center") {
                this.$refs.srAllImage.classList.add("sa-all-image--center");
            } else if (this.data.option.align === "left") {
                this.$refs.srAllImage.classList.add("sa-all-image--left");
            } else if (this.data.option.align === "right") {
                this.$refs.srAllImage.classList.add("sa-all-image--right");
            }
            this.containerStyle = `grid-template-columns: repeat(${this.data.option.column}, ${this.data.option.width}); grid-gap: ${this.data.option.space}; grid-template-rows: repeat(${this.data.option.row}, ${this.data.option.height});`;
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
