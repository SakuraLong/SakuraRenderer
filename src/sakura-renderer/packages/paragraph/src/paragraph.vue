<template>
    <div ref="srParaType">
        <p ref="srPara"  v-html="data.content" :style="para_styleStr"></p>
    </div>
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
            hasLink:false,
            styleStr:""
        };
    },
    mounted() {
        console.log(this.data);
        // if(this.data.option.textAlign === "center"){
        //     this.$refs.srPara.classList.add("sa-para--center");
        // }else{
        //     this.$refs.srPara.classList.add("sa-para--left");
        // }
        if(this.data.option.border === "bottom"){
            this.$refs.srPara.classList.add("sa-para--border-bottom");
        }else if(this.data.option.border === "none"){
            //
        }else{
            this.$refs.srPara.classList.add("sa-para--border-left");
        }
        // if(this.data.option.hoverAnimation && this.data.option.borderPosition === "bottom"){
        //     this.$refs.srPara.classList.add("sa-para--border-bottom--ani");
        // }else if(this.data.option.hoverAnimation){
        //     this.$refs.srPara.classList.add("sa-para--border-left--ani");
        // }
        console.log("this.data.type",this.data.type);
        if (this.data.option.type==="warning"){
            this.$refs.srParaType.classList.add("sa-para--border-warning");
        }
        this.para_styleStr=`border-color: ${this.data.option.bc}; line-height: ${this.data.option.lineHeight}; border: ${this.data.border}; background-color:${this.data.option.bgc}`;
        console.log("this.para_styleStr",this.para_styleStr);
        this.hasLink = this.data.option.hasLink === true ? true : false;
        this.data.option.classList.forEach((className)=>{
            // console.log(className);
            // console.log(this.$refs.srPara.classList);
            
            this.$refs.srPara.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName)=>{
            this.styleStr += styleName + ";";
        });
    },
};
</script>

<style>
:root {
    --sa-color-para-text: var(--sa-color-primary-text);
    --sa-color-para-border: var(--sa-color-primary-base);
    --sa-color-para-a-text: var(--sa-color-primary-base);
    --block-warning-bg-color: rgba(var(--el-color-danger-rgb), .1);
    --el-color-danger: #f56c6c;

}
.sa-para {
    position: relative;
    /* margin: 0; */
    padding: 0;
    border: 0;
}

.sa-para--center {
    width: 100%;
    text-align: center;
    color: var(--sa-color-title-text);
}
.sa-para--left {
    width: auto;
    text-align: left;
    color: var(--sa-color-title-text);
}
.sa-para--border-left {
    padding-left: 1rem;
}


.sa-para--border-bottom > span {
    position: relative;
    padding-bottom: 1rem;
}


.sa-para--border-warning {
    padding: 8px 16px;
    background-color: var(--block-warning-bg-color);
    border-radius: 4px;
    border-left: 5px solid var(--el-color-danger);
    margin: 20px 0;
}
</style>
