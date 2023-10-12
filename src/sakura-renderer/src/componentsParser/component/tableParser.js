/*
表格解析器
龙文
*/
import ComponentsParser from "./componentParser";
import GrammerParser from "../grammar/grammarParser"; // 语法解析器
import TemplateParser from "../template/templateParser"; // 模板解析器
import ModuleParser from "../module/moduleParser"; // 模块解析器
import utils from "../../../utils";

class TableParser extends ComponentsParser {
    constructor(component, option) {
        super(component, option);
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
                    float: "none", // 浮动情况
                    clear: "none", // clear情况
                    hover: "row", // 是否有浮动样式
                    border: "border", // border属性
                    maxWidth: "100%", // 最大宽度
                    maxHeight: "none", // 最大高度
                    minWidth: "none", // 最小宽度
                    minHeight: "none", // 最小高度
                    width: "auto", // 宽度
                    height: "auto", // 高度
                    classList: [], // 类名列表
                    styleList: [], // 样式列表
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
        // return false;
        console.log(this.dataList[0]);
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            console.log(this.component);
            return true;
        } else {
            return false;
        }
    }
    analyse() {
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
                    console.log(tempTableList);
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
                case "class":
                    if (value)
                        this.template.data.option.classList.concat(
                            value.split(";")
                        );
                    break;
                case "style":
                    if (value)
                        this.template.data.option.styleList.concat(
                            value.split(";")
                        );
                    break;
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
                case "float":
                    if (["none", "center", "left", "right"].indexOf(value) !== -1) {
                        this.template.data.option.float = ["center", "left", "right", "none"].find((ele)=>{return ele === value;});
                    }
                    break;
                case "clear":
                    if (["none", "both", "left", "right"].indexOf(value) !== -1) {
                        this.template.data.option.clear = ["center", "both", "right", "none"].find((ele)=>{return ele === value;});
                    }
                    break;
                case "maxWidth":
                    this.template.data.option.maxWidth = value;
                    break;
                case "maxHeight":
                    this.template.data.option.maxHeight = value;
                    break;
                case "minWidth":
                    this.template.data.option.minWidth = value;
                    break;
                case "minHeight":
                    this.template.data.option.minHeight = value;
                    break;
                case "height":
                    this.template.data.option.height = value;
                    break;
                case "width":
                    this.template.data.option.width = value;
                    break;
                case "nw":
                    this.template.data.option.node.width = value;
                    break;
                case "nh":
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
                tempDataDict.content = new GrammerParser(this.option, tempDataDict.content).analyse(); // 调用语法解析器解析
                tempDataDict.content = new TemplateParser(this.option, tempDataDict.content).analyse(); // 调用模板解析器解析
                tempDataDict.content = new ModuleParser(this.option, tempDataDict.content).analyse(); // 调用模块解析器解析
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
