<template>
    <div ref="list_container">
        <div ref="test"></div>
    </div>
</template>

<script>
export default {
    name: "sr-list",
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            listData: [],
        };
    },
    methods: {
        render(fatherEle, childData) {
            // const deepBuild = (data,indexList,lastIndex) => {
            //     let cataIndex = "";
            //     let tempList = [];
            //     let spanLiIndex = document.createElement("span");
            //     // li.classList.add("sa-list-li");
            //     spanLiIndex.classList.add("sa-list-li-index");
            //     indexList.forEach((element, index) => {
            //         tempList[index] = element;
            //         if (index !== 0) {
            //             cataIndex += ".";
            //         }
            //         cataIndex += element;
            //     });
            //     spanLiIndex.textContent = cataIndex;
            //     if (data.children.length !== 0) {
            //         tempList.push(0);
            //         data.children.forEach((data, index) => {
            //             tempList[tempList.length - 1] = index + 1;
            //             deepBuild(data, tempList);
            //         });
            //     }
            //     return spanLiIndex;
            // };
            // let i = 0;
            // for (i; i < childData.length; i++) {
            //     let ele = childData[i];
            //     const list_ele = ele.order_judge //判断有序列表或无序列表
            //         ? document.createElement("ol")
            //         : document.createElement("ul");
            //     let list_li = document.createElement("li");
            //     // list_ele.classList.add("sa-list-li");
            //     list_li.innerHTML = childData[i].text;
            //     list_ele.appendChild(list_li);
            //     this.render(
            //         list_li,
            //         childData[i].children
            //     );
            //     let j = i + 1;
            //     while (
            //         j < childData.length &&
            //         this.listData[i].order_judge ===
            //             this.listData[j].order_judge
            //     ) {
            //         const list_li = document.createElement("li");
            //         // 添加层级序号
            //         list_li.innerHTML = childData[j].text;
            //         list_ele.appendChild(list_li);
            //         this.render(list_li, childData[j].children);
            //         j++;
            //     }
            //     fatherEle.appendChild(list_ele);
            //     i = j - 1;
            // }
            const deepBuild = (data, indexList, lastIndex, type) => {
                let cataIndex = "";
                let tempList = [];
                let li = document.createElement("li");
                let a = document.createElement("div");
                let spanLiIndex = document.createElement("span");
                let spanLiContent = document.createElement("span");
                li.classList.add("sa-list-li");
                a.classList.add("sa-cata-li-a");
                spanLiIndex.classList.add("sa-list-li-index");
                spanLiContent.classList.add("sa-cata-li-conetnt");
                indexList.forEach((element, index) => {
                    tempList[index] = element;
                    if (index !== 0) {
                        cataIndex += ".";
                    }
                    cataIndex += element;
                });
                if (type === "default") {
                    // number or default
                    cataIndex = (
                        tempList[tempList.length - 1] - lastIndex
                    ).toString();
                }
                // a.title = data.title;
                a.href = "#" + data.id;
                spanLiIndex.textContent = cataIndex;
                spanLiContent.innerHTML = data.text;

                a.appendChild(spanLiIndex);
                a.appendChild(spanLiContent);
                li.append(a);

                if (data.children.length !== 0) {
                    console.log("递归");
                    let olulList = []; // 存储外层ol和ul
                    let lastIndex_ = -1;
                    tempList.push(0);
                    data.children.forEach((data, index) => {
                        tempList[tempList.length - 1] = index + 1;
                        if (data.order_judge) {
                            if (
                                lastIndex_ === -1 ||
                                olulList.length === 0 ||
                                olulList[olulList.length - 1].type === "ol"
                            ) {
                                lastIndex_ = lastIndex_ === -1 ? 0 : lastIndex_;
                                let ol = document.createElement("ol");
                                olulList.push({
                                    type: "ol",
                                    data: ol,
                                });
                                ol.appendChild(
                                    deepBuild(data, tempList, lastIndex_, type)
                                );
                            } else {
                                olulList[olulList.length - 1].data.appendChild(
                                    deepBuild(data, tempList, lastIndex_, type)
                                );
                            }
                        } else {
                            lastIndex_ = index + 1;
                            if (
                                lastIndex_ === -1 ||
                                olulList.length === 0 ||
                                olulList[olulList.length - 1].type === "ul"
                            ) {
                                let ul = document.createElement("ul");
                                olulList.push({
                                    type: "ul",
                                    data: ul,
                                });
                                ul.appendChild(
                                    deepBuild(data, tempList, lastIndex_, type)
                                );
                            } else {
                                olulList[olulList.length - 1].data.appendChild(
                                    deepBuild(data, tempList, lastIndex_, type)
                                );
                            }
                        }
                    });
                    olulList.forEach((data) => {
                        li.appendChild(data.data);
                    });
                }
                return li;
            };
            let olulList = []; // 存储外层ol和ul
            let lastIndex = -1;
            let type = "number";
            childData.forEach((data, index) => {
                console.log("lastIndex", lastIndex);
                if (data.order_judge) {
                    if (
                        lastIndex === -1 ||
                        olulList.length === 0 ||
                        olulList[olulList.length - 1].type === "ol"
                    ) {
                        lastIndex = lastIndex === -1 ? 0 : lastIndex;
                        let ol = document.createElement("ol");
                        olulList.push({
                            type: "ol",
                            data: ol,
                        });
                        ol.appendChild(
                            deepBuild(data, [index + 1], lastIndex, type)
                        );
                    } else {
                        olulList[olulList.length - 1].data.appendChild(
                            deepBuild(data, [index + 1], lastIndex, type)
                        );
                    }
                } else {
                    lastIndex = index + 1;
                    if (
                        lastIndex === -1 ||
                        olulList.length === 0 ||
                        olulList[olulList.length - 1].type === "ul"
                    ) {
                        let ul = document.createElement("ul");
                        olulList.push({
                            type: "ul",
                            data: ul,
                        });
                        ul.appendChild(
                            deepBuild(data, [index + 1], lastIndex, type)
                        );
                    } else {
                        olulList[olulList.length - 1].data.appendChild(
                            deepBuild(data, [index + 1], lastIndex, type)
                        );
                    }
                }
            });
            olulList.forEach((data) => {
                fatherEle.appendChild(data.data);
            });
        },
    },
    mounted() {
        console.log(this.data.listData);
        this.listData = this.data.listData;
        this.render(this.$refs.test, this.data.listData);
    },
    created() {},
};
</script>
<style>
ol {
    list-style-type: decimal;
}
ul {
    /* list-style-type: none; */
}
</style>
