<template>
    <div v-if="this.data.option.type!=='default'" class="sa-pre-para">
        <div ref="srParaType" class="sa-para sa-para--border" >
            <p class="custom-block-title" v-html="data.option.title" :style="styleStr"></p>
            <p ref="srPara" v-html="data.content" :style="styleStr"></p>
        </div>
    </div>
    <p v-else ref="srPara" v-html="data.content" class="sa-para" :style="styleStr"></p>
</template>

<script>
export default {
    name: "sr-paragraph",
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
        };
    },
    mounted() {
        if (this.data.option.border === "bottom") {
            this.$refs.srPara.classList.add("sa-para--border-bottom");
        } else if (this.data.option.border === "none") {
            //
        } else {
            this.$refs.srPara.classList.add("sa-para--border-left");
        }
        if (this.data.option.type === "warning") {
            this.$refs.srParaType.classList.add("sa-para--border-warning");
        }
        else if (this.data.option.type === "success") {
            this.$refs.srParaType.classList.add("sa-para--border-success");
        } else if (this.data.option.type === "tip") {
            this.$refs.srParaType.classList.add("sa-para--border-tip");
        } else if (this.data.option.type === "info") {
            this.$refs.srParaType.classList.add("sa-para--border-info");
        }
        this.$refs.srPara.style=`line-height: ${this.data.option.lineHeight}; border: ${this.data.option.border}; border-color: ${this.data.option.bc}; background-color:${this.data.option.bgc}; clear:${this.data.option.clear}`;
        this.data.option.classList.forEach((className)=>{
            this.$refs.srPara.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName) => {
            this.styleStr += styleName + ";";
        });
    },
    methods: {
    },
};
</script>

<style></style>
