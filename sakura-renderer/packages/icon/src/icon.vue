<template>
    <div class="sa-icon" :style="{ width: width, height: height }">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path :fill="color" :d="path"></path>
        </svg>
    </div>
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
        path: {
            type: String,
            default: "",
        },
    },
    name:"sr-icon"
};
</script>
