<template>
    <div ref="srCarousell" :style="styleStr" class="sa-carousell">
        <!-- <span class="button-left">&lt;</span> -->
        <ul class="slides">
            <li
                v-for="(img, index) in this.data.imgList"
                :key="index"
                class="slide"
                :style="{
                    'background-color': '#ef32ef',
                    'background-image': `url(${img})`,
                    left: `${index * 100}%`,
                    transform: `translateX(-${activeIndex * 100}%)`,
                }"
            ></li>
            <div class="controls">
                <span
                    v-for="(img, index) in this.data.imgList"
                    :key="index"
                    class="control"
                    :class="{ active: activeIndex === index }"
                    @click="setActiveIndex(index)"
                ></span>
            </div>
        </ul>
        <!-- <span class="button-right">&gt;</span> -->
    </div>
</template>

<script>
export default {
    name: "sr-carousel-is",
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            hasLink: false,
            styleStr: "",
            activeIndex: 0, // 初始化第一个 index 为实心
        };
    },
    mounted() {
        console.log(this.data);
        if (this.data.option.align === "center") {
            this.$refs.srCarousell.classList.add("sa-carousell--center");
        } else if (this.data.option.align === "left") {
            this.$refs.srCarousell.classList.add("sa-carousell--left");
        } else if (this.data.option.align === "right") {
            this.$refs.srCarousell.classList.add("sa-carousell--right");
        }
        this.data.option.classList.forEach((className) => {
            this.$refs.srCarousell.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName) => {
            this.styleStr += styleName + ";";
        });
    },
    methods: {
        setActiveIndex(index) {
            this.activeIndex = index;
        },
    },
};
</script>

<style></style>
