<template>
    <div class="sa-image-shower">
        <sr-mask></sr-mask>
        <div
            class="sa-image-shower__exit sa-image-shower-icon-button"
            @click="exit"
        >
            <sr-mask color="#606266" opacity="0.6"></sr-mask>
            <div class="sa-image-shower__exit__icon sa-icon">
                <sr-icon-exit width="30px" height="30px"></sr-icon-exit>
            </div>
        </div>
        <div
            class="sa-image-shower__last sa-image-shower-icon-button"
            v-if="showNextLast"
            @click="changeIndex(false)"
        >
            <sr-mask color="#606266" opacity="0.6"></sr-mask>
            <div class="sa-image-shower__last__icon">
                <sr-icon-arrow-left width="30px" height="30px"></sr-icon-arrow-left>
            </div>
        </div>
        <div
            class="sa-image-shower__next sa-image-shower-icon-button"
            v-if="showNextLast"
            @click="changeIndex(true)"
        >
            <sr-mask color="#606266" opacity="0.6"></sr-mask>
            <div class="sa-image-shower__next__icon sa-icon">
                <sr-icon-arrow-right width="30px" height="30px"></sr-icon-arrow-right>
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
            <div class="sa-image-shower__img-name" v-if="(imgListData.length > 0 ? imgListData[showIndex].name : '').length !== 0">
                <sr-mask color="#606266" opacity="0.7"></sr-mask>
                {{ imgListData.length > 0 ? imgListData[showIndex].name : ''}}
            </div>
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
        console.log(this.imgList);
        document.body.style.overflow = "hidden"; // 阻止页面滚动
        try {
            this.imgList.forEach((imgData, index) => {
                this.imgListData.push({
                    src: imgData.src,
                    name: imgData.name,
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
