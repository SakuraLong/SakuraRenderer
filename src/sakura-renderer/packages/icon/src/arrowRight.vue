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
    name:"sr-icon-arrow-right",
    data(){
        return{
            path:"M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
        };
    }
};
</script>
