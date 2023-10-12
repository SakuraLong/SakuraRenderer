<template>
    <div class="sa-image-shower">
        <sr-mask></sr-mask>
        <div
            class="sa-image-shower__exit sa-image-shower-icon-button"
            @click="exit"
        >
            <sr-mask color="#606266" opacity="0.6"></sr-mask>
            <div class="sa-image-shower__exit__icon sa-icon">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="currentColor"
                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                    ></path>
                </svg>
            </div>
        </div>
        <div
            class="sa-image-shower__last sa-image-shower-icon-button"
            v-if="showNextLast"
            @click="changeIndex(false)"
        >
            <sr-mask color="#606266" opacity="0.6"></sr-mask>
            <div class="sa-image-shower__last__icon sa-icon">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="currentColor"
                        d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
                    ></path>
                </svg>
            </div>
        </div>
        <div
            class="sa-image-shower__next sa-image-shower-icon-button"
            v-if="showNextLast"
            @click="changeIndex(true)"
        >
            <sr-mask color="#606266" opacity="0.6"></sr-mask>
            <div class="sa-image-shower__next__icon sa-icon">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="currentColor"
                        d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
                    ></path>
                </svg>
            </div>
        </div>
        <div class="sa-image-shower-view">
            <img
                v-for="(data, index) in imgListData"
                :key="index"
                :src="data.src"
                :style="{ display: data.show ? 'block' : 'none' }"
                draggable="false"
                display="none"
                class="sa-image-shower__img"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "sr-image-shower",
    props: {
        imgList: {
            type: Object,
            default: null,
        },
        initialIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            showIndex: 0,
            showNextLast: true,
            imgListData: [],
        };
    },
    mounted() {
        document.body.style.overflow = "hidden"; // 阻止页面滚动
        try {
            this.imgList.forEach((imgSrc, index) => {
                this.imgListData.push({
                    src: imgSrc,
                    show: this.initialIndex === index ? true : false,
                });
            });
            this.showIndex = this.initialIndex;
        } catch {
            console.log("图片列表格式有误");
        }
        if(this.imgListData.length <= 1) this.showNextLast = false;
    },
    beforeUnmount() {
        document.body.style.overflow = ""; // 阻止页面滚动
    },
    methods: {
        changeIndex(next) {
            if (next) {
                this.showIndex =
                    this.showIndex + 1 >= this.imgListData.length
                        ? 0
                        : this.showIndex + 1;
            } else {
                this.showIndex =
                    this.showIndex - 1 < 0
                        ? this.imgListData.length - 1
                        : this.showIndex - 1;
            }
            this.render();
        },
        render() {
            let l = this.imgListData.length;
            for (let i = 0; i < l; i++) this.imgListData[i].show = false;
            for (let i = 0; i < l; i++) {
                if (i === this.showIndex) {
                    this.imgListData[i].show = true;
                    break;
                }
            }
        },
        exit() {
            this.$emit("exit");
        },
    },
};
</script>
