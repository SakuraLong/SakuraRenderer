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
            items: [
                "+ 有序列表1",
                "** 无序列表1",
                "** 无序列表1",
                "+ 有序列表2",
                "* 无序列表2",
                "++ 有序列表2",
            ],
        };
    },
    methods: {
        // renderItem(item) {
        //     // 提取列表级别和文本内容
        //     const level = item.match(/^(\*+|\++|-+)/)?.[0].length || 0;
        //     const text = item.replace(/^(\*+|\++|-+)\s*/, "");
        //     //根据级别设置缩进和样式
        //     const indentStyle = `margin-left: ${level * 20}px;`;
        //     //根据有序/无序列表类型生成对应的标签
        //     const tag = item.startsWith("+") ? "ol" : "ul";
        //     let textStyle = "";
        //     if (item.startsWith("+")) {
        //         return `<ol style="${indentStyle}"><li style="${textStyle}," class="sr-list-ol-number">${text}</li></ol>`;
        //     } else {
        //         return `<ul style="${indentStyle}"><li style="${textStyle}" class="sr-list-ul-solid">${text}</li></ul>`;
        //     }
        // },
        render(fatherEle, childData) {
            let i = 0;
            for (i; i < childData.length; i++) {
                let ele = childData[i];
                const list_ele = ele.order_judge
                    ? document.createElement("ol")
                    : document.createElement("ul");
                const list_li = document.createElement("li");
                list_li.innerHTML = childData[i].text;
                list_ele.appendChild(list_li);
                this.render(list_li, childData[i].children);
                let j = i + 1;
                while (
                    j < childData.length &&
                    this.listData[i].order_judge ===
                        this.listData[j].order_judge
                ) {
                    const list_li = document.createElement("li");
                    list_li.innerHTML = childData[j].text;
                    list_ele.appendChild(list_li);
                    this.render(list_li, childData[j].children);
                    j++;
                }
                fatherEle.appendChild(list_ele);
                i = j - 1;
            }
        },
    },
    mounted() {
        console.log(this.data.listData);
        this.listData = this.data.listData;
        this.render(this.$refs.test, this.data.listData);
        // if (this.listData[0].order_judge) {
        //     const list_ol = document.createElement("ol");
        //     const list_li = document.createElement("li");
        //     list_li.innerHTML = this.listData[0].text;
        //     list_ol.appendChild(list_li);
        //     let i = 1;
        //     for (i; i < this.listData.length; i++) {
        //         let j = i + 1;
        //         for (j; j < this.listData.length; j++) {
        //             if (
        //                 this.listData[i].order_judge ===
        //                 this.listData[j].order_judge
        //             ) {
        //                 const list_li = document.createElement("li");
        //                 list_li.innerHTML = this.listData[j].text;
        //             }
        //         }
        //     }
        // }
    },
    created() {},
};
</script>
<style>
ol {
    list-style-type: square;
}
ul {
    list-style-type: none;
}
</style>
