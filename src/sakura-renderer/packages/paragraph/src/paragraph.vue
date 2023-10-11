<template>
    <div 
        :data-para="data.content" 
        ref="srPara"
        :style="styleStr"
        class="sa-para"
    >
    <span :id="data.id" ref="srPara_span" :data-para="data.content" v-html="data.content" :style="para_styleStr"></span>
    <a v-if="hasLink" class="sa-para__a" :href="'#'+data.id" aria-hidden="true">#</a>
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
        this.para_styleStr=`border-color: ${this.data.option.bc}; line-height: ${this.data.option.lineHeight}; border: ${this.data.border}; background-color:${this.data.option.bgc}`;
        
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
