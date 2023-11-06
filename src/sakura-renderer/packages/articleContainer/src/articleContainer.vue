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
                            @showImageShower="this.imageShower.show = true"
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
                    <sr-catalogue ref="saCata" @eventsFunction="this.eventsFunction"></sr-catalogue>
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
        <sr-image-shower
            v-if="imageShower.show"
            :imgList="imageShower.imgList"
            :initialIndex="imageShower.index"
            @exit="this.imageShower.show = false"
        ></sr-image-shower>
        <div class="sa-test-div">sss</div>
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
            default: "",
        },
    },
    data() {
        return {
            sakuraRenderer: null, // 渲染器类
            hasArticleCata: true, // 有没有侧边目录
            componentsList: [], // 渲染组件列表
            imageShower: {
                show: false,
                imgList: [],
                index: 0,
            },
            scrollDomData: null, // 获取数据的dom（默认是document.documentElement
            scrollDomEvent: null, // 绑定事件的dom（默认是window
            scrollData: {
                nowShowTitleId: "", // 当前显示的title的id
                targetShowTitleId: "", // 目标显示的id
                hasWheel: false, // 是否出现了鼠标滚动事件
                hasClickLink: false, // 是否出现了点击链接滚动事件
            },
            hasWheelTimer: null, // 计时器
        };
    },
    mounted() {
        let that = this;
        this.$refs.article_container.style.height = this.height; // 设置高度
        this.sakuraRenderer = new SakuraRenderer();

        let scrollDomData = document.documentElement;
        let scrollDomEvent = window;
        if (this.domId !== "") {
            scrollDomData = document.getElementById(this.domId);
            scrollDomEvent = document.getElementById(this.domId);
        }
        scrollDomData.style.scrollBehavior = "smooth";
        scrollDomEvent.addEventListener("scroll", this.pageScroll); // 绑定scroll事件
        scrollDomEvent.addEventListener("wheel", this.onWheel); // 绑定scroll事件
        this.scrollDomData = scrollDomData;
        this.scrollDomEvent = scrollDomEvent;

        // 绑定resize事件
    },
    beforeUnmount() {
        // 事件解绑
        let that = this;
        this.scrollDomEvent.removeEventListener("scroll", this.pageScroll); // 解绑scroll事件
        this.scrollDomEvent.removeEventListener("wheel", this.onWheel); // 解绑wheel事件
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
        async render() {
            let data = await this.sakuraRenderer.render();
            this.componentsList = data.templateList;
            this.$refs.saCata.render(data.cataMenu);
            console.log(this.componentsList);
            return true;
        },
        /**
         * 有滚动条的元素发生滚动触发的函数
         * @param {Object} event event
         */
        pageScroll(event) {
            const getElementTop = (elem) => {
                let elemTop = elem.offsetTop; // 获取当前元素顶部距离父元素顶部的距离
                let parentElem = elem.offsetParent; // 获取当前元素的父元素

                while (parentElem !== this.scrollDomData && parentElem) {
                    elemTop += parentElem.offsetTop;
                    parentElem = parentElem.offsetParent;
                }
                return elemTop;
            }; // 递归查询到距离滚动元素的offset
            let scrollTop = this.scrollDomData.scrollTop;
            let titleList = [];
            for (let i = 0; i < this.componentsList.length; i++) {
                let component = this.componentsList[i];
                if (component.type === "sr-title") {
                    titleList.push(component);
                }
            }
            for (let i = 0; i < titleList.length; i++) {
                let component = titleList[i];
                if (component.type === "sr-title") {
                    let offsetTop = getElementTop(
                        document.getElementById(
                            "sr-title-" + component.data.option.id
                        )
                    );
                    if (
                        offsetTop < scrollTop + 10 &&
                        ((i < titleList.length - 1 &&
                            getElementTop(
                                document.getElementById(
                                    "sr-title-" +
                                        titleList[i + 1].data.option.id
                                )
                            ) > scrollTop) ||
                            i === titleList.length - 1)
                    ) {
                        if (this.scrollData.hasWheel) {
                            if (
                                this.scrollData.nowShowTitleId !==
                                titleList[i].data.option.id
                            ) {
                                this.scrollData.nowShowTitleId =
                                    titleList[i].data.option.id;
                                this.$refs.saCata.clickLink({
                                    id: this.scrollData.nowShowTitleId,
                                });
                            }
                            break;
                        }
                    }
                }
            }
        },
        onWheel() {
            this.scrollData.hasWheel = true;
            this.scrollData.hasClickLink = false;
        },
        /**
         * 所有组件涉及的事件分发器
         * @param {String} componentType 组件类型
         * @param {String} eventName 事件名字
         * @param {Object} data 数据
         */
        eventsFunction(componentType, eventName, data) {
            let dict = {
                title: {
                    clickLink: (data) => {
                        this.clickLink(data);
                    },
                },
            };
            dict[componentType][eventName](data);
        },
        clickLink(data) {
            // 标题点击页面内跳转
            this.scrollData.targetShowTitleId = data.id;
            this.scrollData.hasWheel = false;
            this.scrollData.hasClickLink = true;
            this.$refs.saCata.clickLink(data);
        },
    },
};
</script>
