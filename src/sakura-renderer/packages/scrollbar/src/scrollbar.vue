<template>
    <div
        ref="sr_scrollbar"
        class="sa-scrollbar"
        style="{height: height;}"
    >
        <!-- <div class="sc-scrollbar__bar">

        </div> -->
        <div class="sa-scrollbar__view" ref="scrollbar_view">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "sr-scrollbar",
    props: {
        height: {
            type: String,
            default: "100%",
        },
        width: {
            type: String,
            default: "100%",
        },
        "max-height": {
            type: String,
            default: "none",
        },
        "max-width": {
            type: String,
            default: "none",
        },
    },
    data() {
        return {};
    },
    mounted() {
        this.$refs.sr_scrollbar.style.height = this.height;
        this.$refs.sr_scrollbar.style.width = this.width;
        this.$refs.sr_scrollbar.style.maxHeight = this.maxHeight;
        this.$refs.sr_scrollbar.style.maxWidth = this.maxWidth;
        let viewList = this.$refs.scrollbar_view.querySelectorAll("*");
        let viewWidth = 0;
        let viewHeight = 0;
        viewList.forEach((view) => {
            viewWidth = view.clientWidth > viewWidth ? view.clientWidth : viewWidth;
            viewHeight += view.clientHeight;
        });
        // console.log(viewList);
        // console.log(viewWidth);
        // console.log(viewHeight);
    },
    methods: {
        render() {},
        scrollTo(data1, data2){
            if(!data2){
                console.log("scrolllll1");
                this.$refs.sr_scrollbar.scrollTo(data1);
            }else{
                console.log("scrolllll2");
                this.$refs.sr_scrollbar.scrollTo(data1, data2);
            }
        }
    },
};
</script>
