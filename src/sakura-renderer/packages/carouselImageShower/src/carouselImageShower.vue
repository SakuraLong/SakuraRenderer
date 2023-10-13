<template>
    <div
        ref="srCarousell"
        :style="styleStr"
        class="sa-carousell"
        @mouseover="showLeftButtons(true), showRightButtons(true)"
        @mouseleave="showLeftButtons(false), showRightButtons(false)"
    >
        <span class="sa-srCarousell-button-left"
            ><button
                ref="leftButton"
                class="sa-srCarousell-button-ele"
                @click="buttonLeft()"
            >
                &lt;
            </button></span
        >
        <ul class="sa-srCarousell-slides">
            <li
                v-for="(img, index) in this.data.imgList"
                class="sa-srCarousell-slide"
                :key="index"
                :style="{
                    left: `${index * 100}%`,
                    transform: `translateX(-${activeIndex * 100}%)`,
                }"
            >
                <img
                    class="sa-srCarousell-img"
                    :id="'img' + index"
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
            ><button
                ref="RightButton"
                class="sa-srCarousell-button-ele"
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
            setWidth: false,
            setHeight: false,
            activeIndex: 0, // 初始化第一个 index 为实心
            showButtonsLeft: false,
            showButtonsRight: false,
            timer: null,
        };
    },
    mounted() {
        // console.log(this.data);
        if (this.data.option.align === "center") {
            this.$refs.srCarousell.classList.add("sa-carousell--center");
        } else if (this.data.option.align === "left") {
            this.$refs.srCarousell.classList.add("sa-carousell--left");
        } else if (this.data.option.align === "right") {
            this.$refs.srCarousell.classList.add("sa-carousell--right");
        }
        if (this.data.option.play) {
            this.play();
        }
        this.data.option.classList.forEach((className) => {
            this.$refs.srCarousell.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName) => {
            this.styleStr += styleName + ";";
            if (styleName.includes("width")) {
                this.setWidth = true;
            }
            if (styleName.includes("height")) {
                this.setHeight = true;
            }
        });
        this.$nextTick(() => {
            this.setImgSize();
        });
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
                if (this.data.option.cycle) {
                    this.activeIndex = 0;
                }
            }
        },
        showLeftButtons(show) {
            if (show === true) {
                if (this.data.option.play === true) {
                    clearInterval(this.timer);
                }
                this.$refs.leftButton.classList.remove(
                    "sa-srCarousell-pop-out-left"
                );
                this.$refs.leftButton.classList.add(
                    "sa-srCarousell-pop-up-right"
                );
            } else {
                if (this.data.option.play === true) {
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
            }, this.data.option.playtime);
        },
        setImgSize() {
            setTimeout(() => {
                var maxwidth = 0;
                var maxheight = 0;
                var length = this.data.imgList.length;
                for (var i = 0; i < length; i++) {
                    var img = document.getElementById("img" + i);
                    if (img.naturalWidth > maxwidth) {
                        maxwidth = img.naturalWidth;
                        console.log(img.naturalWidth);
                    }
                    if (img.naturalHeight > maxheight) {
                        maxheight = img.naturalHeight;
                    }
                }
                if (!this.setWidth) {
                    this.styleStr += "width:" + maxwidth + "px;";
                }
                if (!this.setHeight) {
                    console.log(maxheight);
                    this.styleStr += "height:" + maxheight + "px;";
                }
            }, 100);
        },
    },
};
</script>

<style></style>
