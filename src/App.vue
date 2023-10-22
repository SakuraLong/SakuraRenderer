<template>
    <div class="test-container" id="test-container">
        <sr-article-container ref="render"></sr-article-container>
    </div>
</template>

<script>
import testArticleData from "./assets/testArticleData";
export default {
    mounted() {
        this.$refs.render.setArticle(testArticleData.article);
        this.$refs.render.render();
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.test-container{
    // height: 500px;
    // overflow: auto;
}
</style>
