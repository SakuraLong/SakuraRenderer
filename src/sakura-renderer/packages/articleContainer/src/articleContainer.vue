<!-- 文章整体存放位置 -->
<template>
    <div
        ref="article_container"
        class="sa-article-container sa-mathjax"
        :style="{
            height: height ? height : 'auto',
        }"
    >
        <!-- 全部区域 -->
        <div class="sa-article-container__slot">
            <slot name="before">
                <h1>文档和目录之前的slot插槽</h1>
            </slot>
        </div>
        <main class="sa-article-container__main">
            <div
                :class="{
                    'sa-article-container__body--cata': hasArticleCata,
                    'sa-article-container__body--nocata': !hasArticleCata,
                }"
                ref="article_container_body"
            >
                <div class="sa-article-container__body">
                    <!-- 文章主体区域 -->
                    <div class="sa-article-container__slot">
                        <slot name="before-article">
                            <h1>文章主体区域前的slot插槽</h1>
                        </slot>
                    </div>
                    <div class="sa-article-area" id="sr-article-area">
                        <!-- 文章区域 -->
                        <component
                            v-for="(item, index) in componentsList"
                            :key="index"
                            :is="item.type"
                            :data="item.data"
                            @eventsFunction="this.eventsFunction"
                            @showImageShower="this.imageShower.show = true;"
                        ></component>
                    </div>
                    <div class="sa-article-container__slot">
                        <slot name="after-article">
                            <h1>文章主体区域后的slot插槽</h1>
                        </slot>
                    </div>
                </div>
            </div>
            <aside
                v-if="hasArticleCata"
                class="sa-article-container__cata"
                ref="article_container_cata"
            >
                <!-- 文章目录区域 -->
                <div class="sa-article-container__slot">
                    <slot name="before-cata">
                        <h1>目录主体区域前的slot插槽</h1>
                    </slot>
                </div>
                <div class="sa-cata-area">
                    <sr-catalogue ref="saCata"></sr-catalogue>
                    <div class="sa-article-container__slot">
                        <slot name="after-cata">
                            <h1>目录主体区域后的slot插槽</h1>
                        </slot>
                    </div>
                </div>
            </aside>
        </main>
        <div class="sa-article-container__slot">
            <slot name="after">
                <h1>文档和目录之后的slot插槽</h1>
            </slot>
        </div>
        <sr-image-shower v-if="imageShower.show" :imgList="imageShower.imgList" :initialIndex="imageShower.index" @exit="this.imageShower.show = false;"></sr-image-shower>
        <div style="display: none" id="sa-article-temp"></div>
    </div>
</template>

<script>
import SakuraRenderer from "../../../sakuraRenderer";
export default {
    name: "sr-article-container",
    props: {
        height: {
            type: String,
            default: "auto",
        },
        domId: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            sakuraRenderer: null, // 渲染器类
            hasArticleCata: true,
            componentsList: [],
            imageShower:{
                show: false,
                imgList: [],
                index: 0
            }
        };
    },
    mounted() {
        this.$refs.article_container.style.height = this.height; // 设置高度
        this.sakuraRenderer = new SakuraRenderer();

        let scrollDom = document.documentElement;
        if(this.domId !== ""){
            scrollDom = document.getElementById(this.domId);
        }
        scrollDom.style.scrollBehavior = "smooth";
        scrollDom = this.domId !== "" ? scrollDom : window; // 换绑 scroll事件绑定不能在html上
        scrollDom.addEventListener("scroll", (event) => {
            this.pageScroll(event);
        }); // 绑定scroll事件

        // 绑定resize事件
    },
    methods: {
        setArticle(article) {
            return this.sakuraRenderer.setArticle(article); // 返回文章渲染成功还是失败
        },
        setOption(option) {
            return this.sakuraRenderer.setOption(option); // 返回渲染器配置成功还是失败
        },
        /**
         * 渲染
         */
        render() {
            let data = this.sakuraRenderer.render();
            this.componentsList = data.templateList;
            this.$refs.saCata.render(data.cataMenu);
            // console.log(this.componentsList);
            return true;
        },
        /**
         * 有滚动条的元素发生滚动触发的函数
         * @param {Object} event event
         */
        pageScroll(event) {
            console.log("页面滚动");
        },
        /**
         * 所有组件涉及的事件分发器
         * @param {String} componentType 组件类型
         * @param {String} eventName 事件名字
         * @param {Object} data 数据
         */
        eventsFunction(componentType, eventName, data){
            let dict = {
                title:{
                    clickLink:(data) => {this.clickLink(data);}
                }
            };
            dict[componentType][eventName](data);
        },
        clickLink(data){
            // 标题点击页面内跳转
            this.$refs.saCata.clickLink(data);
        }
    },
};
</script>

<style></style>
