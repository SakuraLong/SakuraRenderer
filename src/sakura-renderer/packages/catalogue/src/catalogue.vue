<template>
    <div class="sa-cata-container">
        <div class="sa-cata-body">
            <div class="sa-cata-title">
                <h3>目录</h3>
            </div>
            <div class="sa-cata-data" ref="saCataView">
                <sr-scrollbar
                    max-height="calc((100vh - 80px - 6rem)/2)"
                    width="100%"
                    ref="scrollbar"
                >
                    <nav>
                        <div>
                            <div ref="saCataOl"></div>
                            <div
                                ref="saCataWrapper"
                                class="sa-cata-border-wrapper"
                            >
                                <div class="sa-cata-line">
                                    <div class="sa-cata-line__select" ref="saCataLineSelect"></div>
                                </div>
                                <div class="sa-cata-shadow" ref="saCataShadow"></div>
                            </div>
                        </div>
                    </nav>
                </sr-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "sr-catalogue",
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    data(){
        return{
            firstCataId:"",
            nowCataId:""
        };
    },
    mounted() {
        // let data = [1, 1, 2, 3, 3, 3, 4, 5, 4, 1, 2];
        // let res = [];
        // let i = 0;
        // const cal = (nowLevel, childrenList, data) => {
        //     if(data <= nowLevel) return;
        //     for(let j = 0; )
        // };
        window.addEventListener("resize", this.windowResize);
        // window.addEventListener("wheel", (event) => {
        //     console.log(event);
        // });
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.windowResize);
    },
    methods: {
        render(dataList) {
            // console.log(dataList);
            let ol = document.createElement("ol");
            ol.classList.add("sa-cata-ol");
            ol.classList.add("sa-cata-ol-root");
            const deepBuild = (data, indexList) => {
                let cataIndex = "";
                let tempList = [];
                let li = document.createElement("li");
                let a = document.createElement("a");
                let spanLiIndex = document.createElement("span");
                let spanLiContent = document.createElement("span");
                let id = "sa-cata-id-" + data.id;
                this.firstCataId = this.firstCataId === "" ? id : this.firstCataId;
                li.classList.add("sa-cata-li");
                a.classList.add("sa-cata-li-a");
                spanLiIndex.classList.add("sa-cata-li-index");
                spanLiContent.classList.add("sa-cata-li-conetnt");
                indexList.forEach((element, index) => {
                    tempList[index] = element;
                    if (index !== 0) {
                        cataIndex += ".";
                    }
                    cataIndex += element;
                });
                a.title = data.title;
                a.href = "#" + data.id;
                a.setAttribute("id", id);
                a.addEventListener("click", (event) => {
                    this.clickCata(id, data.id);
                });
                spanLiIndex.textContent = cataIndex;
                spanLiContent.innerHTML = data.title;

                a.appendChild(spanLiIndex);
                a.appendChild(spanLiContent);
                li.appendChild(a);

                if (data.children.length !== 0) {
                    let sonOl = document.createElement("ol");
                    sonOl.classList.add("sa-cata-ol");
                    tempList.push(0);
                    data.children.forEach((data, index) => {
                        tempList[tempList.length - 1] = index + 1;
                        sonOl.appendChild(deepBuild(data, tempList));
                    });
                    li.appendChild(sonOl);
                }
                return li;
            };
            dataList.forEach((data, index) => {
                ol.appendChild(deepBuild(data, [index + 1]));
            });
            this.$refs.saCataOl.appendChild(ol);

            this.nowCataId = this.firstCataId;
            this.windowResize();
        },
        windowResize() {
            this.$refs.saCataWrapper.style.height =
                this.$refs.saCataOl.clientHeight.toString() + "px";
            this.$refs.saCataShadow.style.height = document.getElementById(this.nowCataId).clientHeight.toString() + "px";
            this.$refs.saCataLineSelect.style.height = document.getElementById(this.nowCataId).clientHeight.toString() + "px";
        },
        clickLink(data) {
            // 标题点击页面内跳转
            // 目录需要滚动
            let cataId = "sa-cata-id-" + data.id;
            this.scrollToElementById(cataId);
            console.log("clickLink", data);
        },
        clickCata(cataId, id) {
            let data = {
                id:id
            };
            this.$emit("eventsFunction", "title", "clickLink", data);
        },
        scrollToElementById(elementId){
            this.nowCataId = elementId;
            let offsetTop = document.getElementById(elementId).offsetTop;
            let elementHeight = document.getElementById(elementId).clientHeight;
            let viewHeight = this.$refs.saCataView.clientHeight;
            this.$refs.scrollbar.scrollTo({
                top: offsetTop + elementHeight / 2 - viewHeight / 2,
                behavior: "instant",
            });
            this.$refs.saCataShadow.style.top = offsetTop.toString() + "px";
            this.$refs.saCataShadow.style.height = document.getElementById(this.nowCataId).clientHeight.toString() + "px";
            this.$refs.saCataLineSelect.style.top = offsetTop.toString() + "px";
            this.$refs.saCataLineSelect.style.height = document.getElementById(this.nowCataId).clientHeight.toString() + "px";
        }
    },
};
</script>
