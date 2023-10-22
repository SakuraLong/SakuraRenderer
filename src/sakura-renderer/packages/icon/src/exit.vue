<template>
    <sr-icon :width="width" :height="height" :color="color" :path="path"></sr-icon>
</template>

<script>
export default {
    props:{
        width: {
            type: String,
            default: "40px",
        },
        height: {
            type: String,
            default: "40px",
        },
        color: {
            type: String,
            default: "currentColor",
        },
    },
    name:"sr-icon-exit",
    data(){
        return{
            path:"M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        };
    }
};
</script>
