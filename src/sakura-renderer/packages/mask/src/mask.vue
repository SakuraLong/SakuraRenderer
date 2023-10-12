<template>
    <div ref="srMask" class="sa-mask"></div>
</template>

<script>
export default {
    name: "sr-mask",
    props:{
        color:{
            type:String,
            default:""
        },
        opacity: {
            type:String,
            default:""
        }
    },
    mounted(){
        if(this.color !== ""){
            this.$refs.srMask.style.backgroundColor = this.color;
        }
        if(this.opacity !== ""){
            this.$refs.srMask.style.opacity = this.opacity;
        }
    }
};
</script>
