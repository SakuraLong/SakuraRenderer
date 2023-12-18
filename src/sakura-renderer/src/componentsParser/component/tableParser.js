/*
表格解析器
龙文
*/
import ComponentsParser from "./componentParser";
import utils from "../../../utils";

class TableParser extends ComponentsParser {
    constructor(component, option, param) {
        super(component, option, param);
        this.contentNone = ["sr-none"]; // 内容是这些的表格为空
        this.name = ["table", "表格"];
        this.template = {
            type: "sr-table", // 组件名称
            data: {
                tableData: [],
                option: {
                    // 表格配置项
                    name:"", // 表格名字
                    fold: false, // 是否折叠
                    hover: "row", // 是否有浮动样式
                    border: "border", // border属性
                    node: {
                        width: "auto", // nw=100px
                        height: "auto", // nh=100px
                    }
                },
            },
        }; // 表格配置
    }
    judge() {
        // 重写
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            return true;
        } else {
            return false;
        }
    }
    analyse() {
        this.template.data.option = Object.assign(this.template.data.option, this.baseOption); // 合并baseOption
        let divideIndexList = [];
        let optionList = []; // 配置项列表
        let tableList = []; // 表格数据列表
        let tempTableList = []; // temp
        let hasCR = false; // 是否包含设置非1的cr
        this.dataList.forEach((data, index) => {
            if (divideIndexList.length === 0 && data !== "-" && index > 0)
                optionList.push(data);
            else if (
                divideIndexList.length !== 0 &&
                data !== "-"
            )
                tempTableList.push(data);
            if (data === "-") {
                divideIndexList.push(index);
                if (divideIndexList.length > 1) {
                    tableList.push(utils.deepClone(tempTableList));
                    tempTableList = [];
                }
            }
        });
        tableList.push(utils.deepClone(tempTableList));
        optionList.forEach((option) => {
            let key = option.split("=")[0];
            let value = option.split("=")[option.split("=").length - 1];
            switch (key) {
                case "fold":
                    if (["true", "false"].indexOf(value) !== -1) {
                        this.template.data.option.fold = eval(value);
                    } else if (key === value) {
                        this.template.data.option.fold = true;
                    }
                    break;
                case "border":
                    if (["border", "bottom", "none"].indexOf(value) !== -1) {
                        this.template.data.option.border = ["border", "bottom", "none"].find((ele)=>{return ele === value;});
                    }
                    break;
                case "hover":
                    if (["row", "node", "none"].indexOf(value) !== -1) {
                        this.template.data.option.hover = ["row", "node", "none"].find((ele)=>{return ele === value;});
                    }
                    break;
                case "tdWidth":
                case "TW":
                    this.template.data.option.node.width = value;
                    break;
                case "tdHeight":
                case "TH":
                    this.template.data.option.node.height = value;
                    break;
                case "name":
                    this.template.data.option.name = value;
                    break;
            }
        });
        tableList.forEach((rowData, index) => {
            let tempRowDataDict = {
                rowData:[],
                thead: false
            };
            rowData.forEach((data) => {
                let tempDataDict = {
                    content: "",
                    c: 1,
                    r: 1,
                    hasCR: false,
                    t: false,
                    display: true
                };
                let tempData = data.trim();
                let tempDataList = tempData.split(" ");
                let hasConfig = false;
                if(tempDataList[0] === "+" && index === 0) tempRowDataDict.thead = true;
                if(tempDataList.length - 1 !== 0){
                    tempDataList[tempDataList.length - 1].split("/").forEach((config)=>{
                        let key = config.split("=")[0];
                        let value = config.split("=")[config.split("=").length - 1];
                        switch(key){
                            case "c":
                                if(value && value !== key && /^[\d]+$/.test(value)){
                                    tempDataDict.c = parseInt(value);
                                    hasConfig = true;
                                    tempDataDict.hasCR = true;
                                }
                                break;
                            case "r":
                                if(value && value !== key && /^[\d]+$/.test(value)){
                                    tempDataDict.r = parseInt(value);
                                    hasConfig = true;
                                    tempDataDict.hasCR = true;
                                }
                                break;
                            case "t":
                                tempDataDict.t = true;
                                hasConfig = true;
                                break;
                            case "d":
                                tempDataDict.display = false;
                                hasConfig = true;
                                break;
                        }
                    });
                }
                tempDataList.forEach((data, i) => {
                    if(tempRowDataDict.thead && i === 0 && data === "+") return;
                    else if(i === tempDataList.length - 1 && hasConfig) return;
                    else {
                        if(i === 1 && !tempRowDataDict.thead) tempDataDict.content += " ";
                        else if(i > 1) tempDataDict.content += " ";
                        tempDataDict.content += data;
                    }
                });
                tempDataDict.content = this.contentNone.indexOf(tempDataDict.content) !== -1 ? "" : tempDataDict.content; // 是否是空表格
                tempDataDict.content = this.GDecode(tempDataDict.content);
                tempDataDict.content = this.replaceCode(tempDataDict.content); // 替换code
                tempDataDict.content = this.replaceIgnore(tempDataDict.content); // 替换ignore
                tempRowDataDict.rowData.push(tempDataDict);
            });
            this.template.data.tableData.push(tempRowDataDict);
        });
        if(hasCR){
            // 包含设置cr时，样式进行强制设置
            // this.template.data.option.border = this.template.data.option.border === "border" ? "bottom" : this.template.data.option.border;
        }

        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default TableParser;
