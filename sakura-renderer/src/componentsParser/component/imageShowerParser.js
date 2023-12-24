import ComponentsParser from "./componentParser";

class ImageShowerParser extends ComponentsParser {
    constructor(component, option, rendererData){
        super(component, option, rendererData);
        this.imageShowerOption = {
            baseUrl:"",
            imgWidth: "",
            imgHeight: "",
            imgMaxWidth: "",
            imgMaxHeight: "",
            imgPosition: "",
            fit: "cover",
            nameTitle: true,
            name:""
        }; // imageShower的基础配置项
        this.imageListData = [];
    }
    analyseImageShowerOption() {
        this.changeImageBaseOption();
        const divideIndex = this.dataList.indexOf("-");
        for(let i = 1; i < divideIndex; i++) {
            const data = this.dataList[i];
            const key = data.split("=")[0];
            const value = data.split("=")[data.split("=").length - 1];
            switch(key){
                case "fill":
                case "contain":
                case "cover":
                    if(key === value) this.imageShowerOption.fit = key;
                    break;
                case "baseUrl":
                case "BU":
                    this.imageShowerOption.baseUrl = value;
                    break;
                case "imgWidth":
                case "IW":
                    // this.imageShowerOption.imgWidth = [];
                    // this.imageShowerOption.imgWidth = this.imgDataAnalyse(value.split(";"));
                    this.imageShowerOption.imgWidth = value;
                    break;
                case "imgHeight":
                case "IH":
                    // this.imageShowerOption.imgHeight = [];
                    // this.imageShowerOption.imgHeight = this.imgDataAnalyse(value.split(";"));
                    this.imageShowerOption.imgHeight = value;
                    break;
                case "imgMaxWidth":
                case "IMW":
                    // this.imageShowerOption.imgMaxWidth = [];
                    // this.imageShowerOption.imgMaxWidth = this.imgDataAnalyse(value.split(";"));
                    this.imageShowerOption.imgMaxWidth = value;
                    break;
                case "imgMaxHeight":
                case "IMH":
                    // this.imageShowerOption.imgMaxHeight = [];
                    // this.imageShowerOption.imgMaxHeight = this.imgDataAnalyse(value.split(";"));
                    this.imageShowerOption.imgMaxHeight = value;
                    break;
                case "imgPosition":
                case "IP":
                    // this.imageShowerOption.imgPosition = [];
                    // this.imageShowerOption.imgPosition = this.imgDataAnalyse(value.split(";"));
                    this.imageShowerOption.imgPosition = value;
                    break;
                case "fit":
                    this.imageShowerOption.fit = value;
                    break;
                case "nameTitle":
                case "NT":
                    if (["true", "false"].indexOf(value) !== -1) {
                        this.imageShowerOption.nameTitle = eval(["true", "false"].find((ele)=>{return ele === value;}));
                    }
                    break;
                case "name":
                case "n":
                    this.imageShowerOption.name = value;
                    break;
                default:
                    this.extractWidthAndHeight(value);
            }
        }
        this.baseOption = Object.assign(this.baseOption, this.imageShowerOption); // 合并imageShowerOption
    }
    changeImageBaseOption() {
        for (let key in this.imageShowerOption) {
            this.imageShowerOption[key] = this.componentBaseOption[key] === undefined ? this.imageShowerOption[key] : this.componentBaseOption[key];
        }
    }
    extractWidthAndHeight(input) {
        const regex1 = /^(\d+)x(\d+)px$/;
        const regex2 = /^x(\d+)px$/;
        const regex3 = /^(\d+)px$/;
        const match1 = input.match(regex1);
        const match2 = input.match(regex2);
        const match3 = input.match(regex3);
        if (match1 && match1.length === 3) {
            this.imageShowerOption.imgWidth = parseFloat(match1[1]).toString() + "px";
            this.imageShowerOption.imgHeight = parseFloat(match1[2]).toString() + "px";
        }
        if (match2 && match2.length === 2) {
            this.imageShowerOption.imgHeight = parseFloat(match2[1]).toString() + "px";
        }
        if (match3 && match3.length === 2) {
            this.imageShowerOption.imgWidth = parseFloat(match3[1]).toString() + "px";
        }
    }
    imgDataAnalyse(dataList){
        // 函数已废弃
        // 但是先不删除
        const res = [];
        dataList.forEach((data, index) => {
            if(data === "") return;
            if(data.indexOf(":") === -1){
                res.push({
                    from:-1,
                    to:-1,
                    option:data
                });
            }else{
                if(data.indexOf("-") === -1) {
                    res.push({
                        from:parseInt(data.split(":")[0]) - 1,
                        to:parseInt(data.split(":")[0]) - 1,
                        option:data.split(":")[data.split(":").length - 1]
                    });
                }else{
                    res.push({
                        from:parseInt(data.split(":")[0].split("-")[0]) - 1,
                        to:parseInt(data.split(":")[0].split(":")[data.split("-")[0].split("-").length - 1]) - 1,
                        option:data.split(":")[data.split(":").length - 1]
                    });
                }
            }
        });
        return res;
    }
    getImgListData() {
        let divideIndex = this.dataList.indexOf("-");
        for(let i = divideIndex + 1; i < this.dataList.length; i++) {
            let temp = this.dataList[i].trim();
            temp = temp.split(" ");
            const src = temp[0];
            let name = "";
            let title = "";
            if(temp.length > 1) {
                name = temp[1].indexOf("=") === -1 ? temp[1] : 0;
                title = name;
            }
            temp.forEach((data, index) => {
                if(index > 0) {
                    let t = data.split(";");
                    t.forEach((tData, tIndex) => {
                        const key = tData.trim().split("=")[0];
                        const value = tData.trim().split("=")[tData.trim().split("=").length - 1];
                        switch (key){
                            case "name":
                                name = value;
                                break;
                            case "title":
                                title = value;
                                break;
                            default:
                                switch(tIndex) {
                                    case 0:
                                        name = value;
                                        break;
                                    case 1:
                                        title = value;
                                        break;
                                }
                        }
                    });
                }
            });
            this.imageListData.push({
                src: src,
                name: name,
                title: title
            });
        }
    }
}

export default ImageShowerParser;