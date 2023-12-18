<template>
    <div ref="sr_table_container" class="sa-table-container">
        <div
            class="sa-table-buton"
            ref="sr_table_button"
            @click="clickButton"
            v-if="showButton"
        >
            {{ buttonName }}{{tableName}}
        </div>
        <sr-scrollbar>
            <div ref="sr_table_body" v-show="showTable">
                <table
                    ref="sr_table"
                    v-html="tableBody"
                    class="sa-table"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                ></table>
            </div>
            <!-- <p v-for="item in 20" :key="item" style="background-color: aqua;" class="scrollbar-demo-item">{{ item }}</p> -->
        </sr-scrollbar>
        <div style="text-align: center;" v-if="!showButton || (showButton && showTable) ">{{ tableName }}</div>
    </div>
</template>

<script>
/*
{
type: "sr-table", // 组件名称
data: {
    tableData: [],
    option: {
        // 表格配置项
        fold: false, // 是否折叠
        hover: true, // 是否有浮动样式
        border: "border", // border属性
        maxWidth: "none", // 最大宽度
        maxHeight: "none", // 最大高度
        width: "auto", // 宽度
        height: "auto", // 高度
        classList: [], // 类名列表
        styleList: [], // 样式列表
    },
},
}
*/
export default {
    name: "sr-table",
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            showTable: false,
            showName: false,
            showButton: true,
            buttonName: "展开",
            tableName: "",
            tableBody: "",
            tableClassDict: {
                tableContainer: {
                    float: {
                        center: "sa-center",
                        left: "sa-float--left",
                        right: "sa-float--right",
                        none: "sa-table--block"
                    },
                    display: {
                        table:"sa-table-container--inline-block",
                    }
                },
                table: {
                    border: {
                        border: "sa-table--border",
                        bottom: "sa-no-style",
                        none: "sa-no-style",
                    },
                },
                thead: {
                    default: "sa-table__thead",
                },
                tbody: {
                    default: "sa-table__tbody",
                },
                tr: {
                    default: "sa-table__tr",
                    hover: {
                        row: "sa-table__tr--hover",
                        node: "sa-no-style",
                        none: "sa-no-style",
                    },
                },
                td: {
                    default: "sa-table__td",
                    title: "sa-table__td--title",
                    hasCR: "sa-table__td--cr",
                    hover: {
                        node: "sa-table__td--hover-node",
                    },
                    noWH: "sa-table__td--no-wh", // 没有设置宽高
                    hasWH: "sa-table__td--has-wh", // 设置了宽高
                    border: {
                        border: "sa-table__td--border",
                        bottom: "sa-table__td--border-bottom",
                        none: "sa-no-style",
                        anytime: "sa-table__td--border-anytime",
                    },
                },
            },
        };
    },
    mounted() {
        if (!this.data.option.fold) {
            this.showTable = true;
            this.showButton = false;
        }
        this.render();
    },
    methods: {
        render() {
            const tableContainer = this.$refs.sr_table_container;
            tableContainer.style.clear = this.data.option.clear; // clear
            const tableBody = this.$refs.sr_table_body;
            if (this.data.option.float === "center") {
                tableBody.classList.add(
                    this.tableClassDict.tableContainer.float[
                        this.data.option.float
                    ]
                );
            } else {
                tableContainer.classList.add(
                    this.tableClassDict.tableContainer.display.table
                );
                tableContainer.classList.add(
                    this.tableClassDict.tableContainer.float[
                        this.data.option.float
                    ]
                );
            }
            const table = this.$refs.sr_table;
            table.classList.add(
                this.tableClassDict.table.border[this.data.option.border]
            ); // 默认
            tableBody.style.width = this.data.option.width;
            table.style.width = this.data.option.width;
            tableBody.style.maxWidth = this.data.option.maxWidth;
            tableBody.style.minWidth = this.data.option.minWidth;
            tableBody.style.height = this.data.option.height;
            table.style.height = this.data.option.height;
            tableBody.style.maxHeight = this.data.option.maxHeight;
            tableBody.style.minHeight = this.data.option.minHeight;
            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");
            thead.classList.add(this.tableClassDict.thead.default);
            tbody.classList.add(this.tableClassDict.tbody.default);
            let hasHead = false;
            this.data.tableData.forEach((rowData, index) => {
                const tr = document.createElement("tr");
                tr.classList.add(this.tableClassDict.tr.default); // 默认
                tr.classList.add(
                    this.tableClassDict.tr.hover[this.data.option.hover]
                ); // 浮动
                let data = rowData.rowData;
                data.forEach((tdData) => {
                    const td = document.createElement("td");
                    td.classList.add(this.tableClassDict.td.default); // 默认
                    // 边框设置
                    td.classList.add(
                        this.tableClassDict.td.border[this.data.option.border]
                    );
                    // colSpan rowSpan设置
                    td.setAttribute("colSpan", tdData.c);
                    td.setAttribute("rowSpan", tdData.r);
                    if (
                        (tdData.c !== 1 || tdData.r !== 1) &&
                        this.data.option.border === "border"
                    ) {
                        td.classList.add(this.tableClassDict.td.border.anytime);
                    }
                    // 宽高设置
                    if (
                        this.data.option.node.width === "auto" &&
                        this.data.option.node.height === "auto"
                    ) {
                        td.classList.add(this.tableClassDict.td.noWH); // 没设置宽高
                    } else {
                        td.classList.add(this.tableClassDict.td.hasWH); // 设置了宽高
                        td.style.minWidth = this.data.option.node.width;
                        td.style.minHeight = this.data.option.node.height;
                    }
                    td.style.width = this.data.option.node.width;
                    td.style.height = this.data.option.node.height;
                    // 是否显示
                    if (!tdData.display) td.style.display = "none";
                    // 显示信息设置
                    td.innerHTML = tdData.content;
                    if (
                        tdData.hasCR &&
                        this.data.option.hover === "row" &&
                        tdData.r !== 1
                    )
                        td.classList.add(this.tableClassDict.td.hasCR);
                    else if (this.data.option.hover === "node")
                        td.classList.add(this.tableClassDict.td.hover.node);
                    if (tdData.t)
                        td.classList.add(this.tableClassDict.td.title); // 标题

                    tr.appendChild(td);
                });
                if (rowData.thead && index === 0) {
                    hasHead = true;
                    thead.appendChild(tr);
                } else {
                    tbody.appendChild(tr);
                }
            });
            if (hasHead) this.$refs.sr_table.appendChild(thead);
            table.appendChild(tbody);
            this.tableName = this.data.option.name; // 表格名字
        },
        clickButton() {
            this.showTable = !this.showTable;
            this.buttonName = this.buttonName === "折叠" ? "展开" : "折叠";
        },
    },
};
</script>

<style></style>
