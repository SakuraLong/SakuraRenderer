<template>
    <component 
        :is="data.type" 
        :data-title="data.content" 
        ref="srTitle"
        :style="styleStr"
        class="sa-title"
    >
    <span></span>
    <span :id="data.id" ref="srTitle_span" :data-title="data.content">{{ data.content }}</span>
    <a v-if="hasLink" class="sa-title__a" :href="'#'+data.id" aria-hidden="true">#</a>
    </component>
</template>

<script>
/*
data:{
    type:"h1",
    content:"标题",
    id:"title_id",
    option:{
        text_align:"left",
        borderPosition:"left",
        hoverAnimation:false,
        color:"",
        fontSize:""
    }
}
*/
export default {
    name: "sr-title",
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
    mounted(){
        console.log(this.data);
        if(this.data.option.textAlign === "center"){
            this.$refs.srTitle.classList.add("sa-title--center");
        }else{
            this.$refs.srTitle.classList.add("sa-title--left");
        }
        if(this.data.option.borderPosition === "bottom"){
            this.$refs.srTitle.classList.add("sa-title--border-bottom");
        }else if(this.data.option.borderPosition === "none"){
            //
        }else{
            this.$refs.srTitle.classList.add("sa-title--border-left");
        }
        if(this.data.option.hoverAnimation && this.data.option.borderPosition === "bottom"){
            this.$refs.srTitle.classList.add("sa-title--border-bottom--ani");
        }else if(this.data.option.hoverAnimation){
            this.$refs.srTitle.classList.add("sa-title--border-left--ani");
        }
        this.hasLink = this.data.option.hasLink === true ? true : false;
        this.data.option.classList.forEach((className)=>{
            this.$refs.srTitle.classList.add(className);
        });
        this.data.option.styleList.forEach((styleName)=>{
            this.styleStr += styleName + ";";
        });
    }
};
</script>
