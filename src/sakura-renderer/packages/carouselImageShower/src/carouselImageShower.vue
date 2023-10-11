<template>
    <div
        ref="srCarousell"
        :style="styleStr"
        class="sa-carousell"
        @mouseover="showLeftButtons(true), showRightButtons(true)"
        @mouseleave="showLeftButtons(false), showRightButtons(false)"
    >
        <span class="button-left"
            ><button ref="leftButton" class="button-ele" @click="buttonLeft()">
                &lt;
            </button></span
        >
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
        <span class="button-right"
            ><button
                ref="RightButton"
                class="button-ele"
                @click="buttonRight()"
                @mouseover="showRightButtons(true)"
                @mouseleave="showRightButtons(false)"
            >
                &gt;
            </button></span
        >
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
            showButtonsLeft: false,
            showButtonsRight: false,
            timer: null,
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
        if (this.data.option.play === true) {
            this.play();
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
        buttonLeft() {
            if (this.activeIndex > 0) {
                this.activeIndex = this.activeIndex - 1;
            }
        },
        buttonRight() {
            if (this.activeIndex + 1 < this.data.imgList.length) {
                this.activeIndex = this.activeIndex + 1;
            }
        },
        showLeftButtons(show) {
            if (show === true) {
                if (this.data.option.play === true) {
                    clearInterval(this.timer);
                }
                this.$refs.leftButton.classList.add("pop-up-right");
            } else {
                if (this.data.option.play === true) {
                    this.play();
                }
                this.$refs.leftButton.classList.remove("pop-up-right");
            }
        },
        showRightButtons(show) {
            if (show === true) {
                if (this.data.option.play === true) {
                    clearInterval(this.timer);
                }
                this.$refs.RightButton.classList.add("pop-up-left");
            } else {
                if (this.data.option.play === true) {
                    this.play();
                }
                this.$refs.RightButton.classList.remove("pop-up-left");
            }
        },
        play() {
            this.timer = setInterval(() => {
                if (this.activeIndex + 1 < this.data.imgList.length) {
                    this.activeIndex = this.activeIndex + 1;
                } else {
                    this.activeIndex = 0;
                }
            }, this.data.option.playtime);
        },
    },
};
</script>

<style></style>
