import ComponentsParser from "./componentParser";

class ImageShowerParser extends ComponentsParser {
    constructor(component, option){
        super(component, option);
        this.imageShowerOption = {
            baseUrl:"",
            imgWidth: [],
            imgHeight: [],
            imgMaxWidth: [],
            imgMaxHeight: [],
            imgPosition: "",
            fit: "cover",
            nameTitle: true,
            name:""
        }; // imageShower的基础配置项
    }
    analyseImageShowerOption() {
        let divideIndex = this.dataList.indexOf("-");
        for(let i = 1; i < divideIndex; i++) {
            let data = this.dataList[i];
            let key = data.split("=")[0];
            let value = data.split("=")[data.split("=").length - 1];
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
                    this.imageShowerOption.imgWidth = [];
                    this.imageShowerOption.imgWidth = this.imgDataAnalyse(value.split(";"));
                    break;
                case "imgHeight":
                case "IH":
                    this.imageShowerOption.imgHeight = [];
                    this.imageShowerOption.imgHeight = this.imgDataAnalyse(value.split(";"));
                    break;
                case "imgMaxWidth":
                case "IMW":
                    this.imageShowerOption.imgMaxWidth = [];
                    this.imageShowerOption.imgMaxWidth = this.imgDataAnalyse(value.split(";"));
                    break;
                case "imgMaxHeight":
                case "IMH":
                    this.imageShowerOption.imgMaxHeight = [];
                    this.imageShowerOption.imgMaxHeight = this.imgDataAnalyse(value.split(";"));
                    break;
                case "imgPosition":
                case "IP":
                    this.imageShowerOption.imgPosition = [];
                    this.imageShowerOption.imgPosition = this.imgDataAnalyse(value.split(";"));
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
            }
        }
        this.baseOption = Object.assign(this.baseOption, this.imageShowerOption); // 合并imageShowerOption
    }
    imgDataAnalyse(dataList){
        let res = [];
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
}

export default ImageShowerParser;