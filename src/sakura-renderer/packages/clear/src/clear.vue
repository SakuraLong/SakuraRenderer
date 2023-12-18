<!-- 弃用 -->
<template>
    <div ref="srClearSpan">clear</div>
</template>

<script>
export default {
    name: "sr-clear",
    props: {
        data: { type: Object, default: null },
    },
    data() {
        return {
            showIndex: 0,
            showNextLast: true,
            imgListData: [],
        };
    },
    mounted() {
        this.$refs.srClearSpan.style.clear = this.data.clear;
    },
};
</script>
