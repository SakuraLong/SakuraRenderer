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
    name:"sr-icon-arrow-left",
    data(){
        return{
            path:"M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
        };
    }
};
</script>

<style></style>
