/*
标题解析器
*/

import ComponentsParser from "./componentParser"; // 组件解析器（各个具体组件解析器的父类）

class ClearParser extends ComponentsParser {
    constructor(component, option) {
        super(component, option);
        this.name = ["clear"];
        this.template = {
            type: "sr-clear", // 组件名称（请不要更改名称，这个和vue的name是对应的）
            data: {
                clear:"none"
            },
        }; // 标题默认配置
    }
    judge() {
        // 重写
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            this.default = true;
            return true;
        } else {
            return false;
        }
    }
    analyse() {
        this.dataList.forEach((data)=>{
            let key = data.split("=")[0];
            let value = data.split("=")[data.split("=").length - 1];
            switch(key){
                case "left":
                    if(key === value) this.template.data.clear = key;
                    break;
                case "right":
                    if(key === value) this.template.data.clear = key;
                    break;
                case "both":
                    if(key === value) this.template.data.clear = key;
                    break;
                case "none":
                    if(key === value) this.template.data.clear = key;
                    break;
                
            }
        });
        return {
            type: "success",
            msg: "",
            content: this.template,
        };
    }
}

export default ClearParser;
