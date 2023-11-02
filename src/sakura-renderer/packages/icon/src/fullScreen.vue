<template>
    <sr-icon
        :width="width"
        :height="height"
        :color="color"
        :path="path"
    ></sr-icon>
</template>

<script>
export default {
    props: {
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
    name: "sr-icon-full-screen",
    data() {
        return {
            path: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z",
        };
    },
};
</script>
