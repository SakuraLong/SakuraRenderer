<!-- 文章整体存放位置 -->
<template>
    <div
        ref="article_container"
        class="article-container"
        :style="{
            height: height,
            overflow: height === 'auto' ? 'visible' : 'auto',
        }"
    >
        <!-- 全部区域 -->
        <div class="article-container__slot">
            <slot name="before">
                <h1>123</h1>
            </slot>
        </div>
        <main class="article-container__main">
            <div
                :class="{
                    'article-container__body--cata': has_article_cata,
                    'article-container__body--nocata': !has_article_cata,
                }"
                ref="article_container_body"
            >
                <!-- 文章主体区域 -->
                <div class="article-container__slot">
                    <slot name="before-article">
                        <h1>123</h1>
                    </slot>
                </div>
                <div class="article-area">
                    <!-- 文章区域 -->
                    <component
                        v-for="(item, index) in test_data"
                        :key="index"
                        :is="item.type"
                        :data="item.data"
                    ></component>
                    sacasc
                    <br />
                    sasa
                </div>
                <div class="article-container__slot">
                    <slot name="after-article">
                        <h1>123</h1>
                    </slot>
                </div>
            </div>
            <aside
                v-if="has_article_cata"
                class="article-container__cata"
                ref="article_container_cata"
            >
                <!-- 文章目录区域 -->
                <div class="article-container__slot">
                    <slot name="before-cata">
                        <h1>123</h1>
                    </slot>
                </div>
                <div class="cata-area">
                    <!-- 目录区域 和 末尾插槽区域 -->
                    <div class="cata-area__container">
                        <div class="cata-area__container__title">
                            <h3>目录</h3>
                        </div>
                        <div class="cata-area__container__body">sacascsac</div>
                    </div>
                    <div class="article-container__slot">
                        <slot name="after-cata">
                            <h1>123</h1>
                        </slot>
                    </div>
                </div>
            </aside>
        </main>
        <div class="article-container__slot">
            <slot name="after">
                <h1>123</h1>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "sr-article-container",
    props: {
        height: {
            type: String,
            default: "auto",
        },
    },
    data() {
        return {
            has_article_cata: true,
            test_data: [
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
                {
                    type: "sr-paragraph",
                    data: "",
                },
            ],
        };
    },
    mounted() {
        this.$refs.article_container.style.height = this.height; // 设置高度
    },
    methods: {
        setArticle(article_text) {
            return true;
        },
        render() {
            return true;
        },
    },
};
</script>

<style></style>
