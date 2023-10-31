<template>
    <div
        ref="srCarousell"
        :style="styleStr"
        class="sa-carousell"
        @mouseover="showLeftButtons(true), showRightButtons(true)"
        @mouseleave="showLeftButtons(false), showRightButtons(false)"
    >
        <span class="sa-srCarousell-button-left"
            ><div
                ref="leftButton"
                class="sa-srCarousell-button-ele"
                @click="buttonLeft()"
            >
                <sr-mask color="#606266" opacity="0.6"></sr-mask>
                <sr-icon-arrow-left
                    width="30px"
                    height="30px"
                ></sr-icon-arrow-left></div
        ></span>
        <ul class="sa-srCarousell-slides">
            <li
                v-for="(img, index) in this.data.imgList"
                class="sa-srCarousell-slide"
                :id="'sa-carousel' + this.id"
                :key="index"
                :style="{
                    left: `${index * 100}%`,
                    transform: `translateX(-${activeIndex * 100}%)`,
                }"
            >
                <img
                    class="sa-srCarousell-img"
                    :id="'sa-carousel-img' + index"
                    :src="img"
                />
            </li>
            <div class="sa-srCarousell-controls">
                <span
                    v-for="(img, index) in this.data.imgList"
                    :key="index"
                    class="sa-srCarousell-control"
                    :class="{ active: activeIndex === index }"
                    @click="setActiveIndex(index)"
                ></span>
            </div>
        </ul>
        <span class="sa-srCarousell-button-right"
            ><div
                ref="RightButton"
                class="sa-srCarousell-button-ele"
                @click="buttonRight()"
                @mouseover="showRightButtons(true)"
                @mouseleave="showRightButtons(false)"
            >
                <sr-mask color="#606266" opacity="0.6"></sr-mask>
                <sr-icon-arrow-right
                    width="30px"
                    height="30px"
                ></sr-icon-arrow-right></div
        ></span>
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
            setWidth: false,
            setHeight: false,
            setCenter: false,
            activeIndex: 0, // 初始化第一个 index 为实心
            showButtonsLeft: false,
            showButtonsRight: false,
            timer: null,
            id: Date.now(),
        };
    },
    mounted() {
        // console.log(this.data);
        if (this.data.option.align === "center") {
            this.setCenter = true;
            this.$refs.srCarousell.classList.add("sa-carousell--center");
        } else if (this.data.option.align === "left") {
            this.$refs.srCarousell.classList.add("sa-carousell--left");
        } else if (this.data.option.align === "right") {
            this.$refs.srCarousell.classList.add("sa-carousell--right");
        }
        if (this.data.option.interval) {
            this.play();
        }
        this.data.option.classList.forEach((className) => {
            this.$refs.srCarousell.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName) => {
            if (styleName.includes("width")) {
                this.setWidth = true;
                if (this.setCenter) {
                    return true;
                }
            }
            if (styleName.includes("height")) {
                this.setHeight = true;
            }
            this.styleStr += styleName + ";";
        });
        this.$nextTick(() => {
            setTimeout(()=>{
                this.setImgSize();
            }, 1000);
        });
        window.addEventListener("resize", this.setImgSize);
    },
    beforeUnmount(){
        window.removeEventListener("resize", this.setImgSize);
    },
    methods: {
        setActiveIndex(index) {
            this.activeIndex = index;
        },
        buttonLeft() {
            if (this.activeIndex > 0) {
                this.activeIndex = this.activeIndex - 1;
            } else {
                if (this.data.option.cycle) {
                    this.activeIndex = this.data.imgList.length - 1;
                }
            }
        },
        buttonRight() {
            if (this.activeIndex + 1 < this.data.imgList.length) {
                this.activeIndex = this.activeIndex + 1;
            } else {
                if (this.data.option.loop) {
                    this.activeIndex = 0;
                }
            }
        },
        showLeftButtons(show) {
            if (show === true) {
                if (this.data.option.interval === true) {
                    clearInterval(this.timer);
                }
                this.$refs.leftButton.classList.remove(
                    "sa-srCarousell-pop-out-left"
                );
                this.$refs.leftButton.classList.add(
                    "sa-srCarousell-pop-up-right"
                );
            } else {
                if (this.data.option.interval === true) {
                    this.play();
                }
                this.$refs.leftButton.classList.remove(
                    "sa-srCarousell-pop-up-right"
                );
                this.$refs.leftButton.classList.add(
                    "sa-srCarousell-pop-out-left"
                );
            }
        },
        showRightButtons(show) {
            if (show === true) {
                this.$refs.RightButton.classList.remove(
                    "sa-srCarousell-pop-out-right"
                );
                this.$refs.RightButton.classList.add(
                    "sa-srCarousell-pop-up-left"
                );
            } else {
                this.$refs.RightButton.classList.remove(
                    "sa-srCarousell-pop-up-left"
                );
                this.$refs.RightButton.classList.add(
                    "sa-srCarousell-pop-out-right"
                );
            }
        },
        play() {
            this.timer = setInterval(() => {
                if (this.activeIndex + 1 < this.data.imgList.length) {
                    this.activeIndex = this.activeIndex + 1;
                } else {
                    this.activeIndex = 0;
                }
            }, this.data.option.intervaltime);
        },
        setImgSize() {
            var maxwidth = 0;
            var maxheight = 0;
            var length = this.data.imgList.length;
            for (var i = 0; i < length; i++) {
                var img = document.querySelector(
                    "#sa-carousel" + this.id + " #sa-carousel-img" + i
                );
                // console.log(img);
                if (img.clientWidth > maxwidth) {
                    maxwidth = img.clientWidth;
                    // console.log(img.clientWidth);
                }
                if (img.clientHeight > maxheight) {
                    maxheight = img.clientHeight;
                }
            }
            if (!this.setWidth) {
                // console.log(maxwidth);
                if (!this.setCenter) {
                    this.styleStr += "width:" + maxwidth + "px;";
                }
            }
            if (!this.setHeight) {
                // console.log(maxheight);
                this.styleStr += "height:" + maxheight + "px;";
            }
        },
    },
};
</script>

<style></style>
