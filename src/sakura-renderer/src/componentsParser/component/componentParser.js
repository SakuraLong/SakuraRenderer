/*
组件解析器
*/

class ComponentsParser{
    constructor(component, option){
        this.component = component.trim();
        this.option = option;
        this.type = ""; // 类型
        this.dataList = []; // 数据列表

        this.init();
    }
    judge(){
        // 需要重写，返回true/false代表是不是这个组件
        return false;
    }
    analyse(){
        // 需要重写，返回解析的数据
        return {};
    }
    init(){
        // 初始化，如果不是{||}不影响，因为不是{||}格式不会调用dataList
        let component = this.component;
        component = component.slice(2, -2); // 去掉{||}
        component = component.replace(/\n/g, ""); // 去掉所有换行符
        let dataList = component.split("|"); // 分割数据
        for(let i=0;i<dataList.length;i++){
            dataList[i] = dataList[i].trim();
        }
        this.dataList = dataList;
    }
    replace(ignoreReplaceList, codeReplaceList, poemReplaceList, content){
        codeReplaceList.forEach((codeData)=>{
            content = content.replace(codeData.key, codeData.value);
        });
        poemReplaceList.forEach((poemData)=>{
            content = content.replace(poemData.key, poemData.value);
        });
        ignoreReplaceList.forEach((ignoreData)=>{
            content = content.replace(ignoreData.key, ignoreData.value);
        });
        return content;
    }
}

export default ComponentsParser;