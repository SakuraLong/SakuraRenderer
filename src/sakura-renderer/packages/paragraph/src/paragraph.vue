<template>
    <div
        v-if="this.data.option.type !== 'default'"
        ref="srParaType"
        class="sa-para sa-para--border"
    >
        <p class="custom-block-title" v-html="data.option.tips"></p>
        <p ref="srPara" v-html="data.content"></p>
    </div>
    <p v-else ref="srPara" v-html="data.content" class="sa-para"></p>
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
        // console.log(this.data);
        // if(this.data.option.textAlign === "center"){
        //     this.$refs.srPara.classList.add("sa-para--center");
        // }else{
        //     this.$refs.srPara.classList.add("sa-para--left");
        // }
        if (this.data.option.border === "bottom") {
            this.$refs.srPara.classList.add("sa-para--border-bottom");
        } else if (this.data.option.border === "none") {
            //
        } else {
            this.$refs.srPara.classList.add("sa-para--border-left");
        }
        // if(this.data.option.hoverAnimation && this.data.option.borderPosition === "bottom"){
        //     this.$refs.srPara.classList.add("sa-para--border-bottom--ani");
        // }else if(this.data.option.hoverAnimation){
        //     this.$refs.srPara.classList.add("sa-para--border-left--ani");
        // }
        if (this.data.option.type === "warning") {
            this.$refs.srParaType.classList.add("sa-para--border-warning");
        }
        //"success","warning","tip","info"
        else if (this.data.option.type === "success") {
            this.$refs.srParaType.classList.add("sa-para--border-success");
        } else if (this.data.option.type === "tip") {
            this.$refs.srParaType.classList.add("sa-para--border-tip");
        } else if (this.data.option.type === "info") {
            this.$refs.srParaType.classList.add("sa-para--border-info");
        }
        this.$refs.srPara.style = `border-color: ${this.data.option.bc}; line-height: ${this.data.option.lineHeight}; border: ${this.data.border}; background-color:${this.data.option.bgc}`;
        // console.log("this.para_styleStr", this.$refs.srPara.style);
        this.data.option.classList.forEach((className) => {
            this.$refs.srPara.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName) => {
            this.styleStr += styleName + ";";
        });

        window.test = this.test;
    },
    methods: {
        test(event) {
            // console.log("test", event.target.parent);
            // // 创建一个新的PDF文档
            // var doc = new jspdf.jsPDF();
            // // 获取<div>元素内容
            // var element = document.getElementById("sr-article-area");
            // console.log(element);
            // // 将<div>内容转为HTML字符串
            // var htmlString = element.outerHTML;
            // // 将HTML字符串转为PDF
            // doc.html(htmlString, {
            //     callback: function (pdf) {
            //         // 将PDF保存为文件
            //         pdf.save("example.pdf");
            //     },
            // });
        },
    },
};
</script>

<style></style>
