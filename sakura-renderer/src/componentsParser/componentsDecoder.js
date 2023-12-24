/*
组件拆分器
拆分大组件：标题、段落、表格、列表、图片显示器
*/
import TitleParser from "./component/titleParser";
import ParaParser from "./component/paraParser";
import AlbumISParser from "./component/AlbumISParser";
import AllISParser from "./component/AllISParser";
import CISParser from "./component/CISParser";
import ListParser from "./component/listParser";
import TableParser from "./component/tableParser";
import CataParser from "./component/cataParser";

class ComponentsDecoder {
    constructor(option, body, componentsList = [], rendererData) {
        this.option = option;
        this.body = body;
        this.componentsList = componentsList; // components列表
        this.ignoreReplaceList = rendererData.ignoreReplaceList ? rendererData.ignoreReplaceList: []; // ignore替换列表
        this.codeReplaceList = rendererData.codeReplaceList ? rendererData.codeReplaceList: []; // code替换列表
        this.poemReplaceList = rendererData.poemReplaceList ? rendererData.poemReplaceList: []; // poem替换列表
        this.parsers = [
            TitleParser,
            ParaParser,
            AlbumISParser,
            AllISParser,
            CISParser,
            ListParser,
            TableParser,
        ]; // parsers

        this.rendererData = {
            title: {
                idMap: new Map(), // 标题id
            }
        }; // 全局渲染需要的数据

        this.rendererData = Object.assign(this.rendererData, rendererData);

    }
    decode() {
        this.componentsList = this.listDecode(); // 组件拆分
        return this.componentsList;
    }
    selfDecode(Parser) {
        const self = this;
        return function(content) {
            content = new Parser(
                self.option,
                content,
                self.rendererData
            ).analyse();
            return content;
        };
    }
    /**
     * 处理组件列表
     */
    listDecode() {
        const componentsList = this.componentsList;
        const templateList = [];
        for (let i = 0; i < componentsList.length; i++) {
            for (let j = 0; j < this.parsers.length; j++) {
                const t = new this.parsers[j](
                    componentsList[i],
                    this.option,
                    this.rendererData
                );
                if (!t.judge()) continue;
                t.analyseBaseOption();
                const template = t.analyse();
                if (template.type === "success") {
                    templateList.push(template.content);
                }
            }
        }
        // 组件处理完毕
        // 向列表加入头尾
        const listData = this.refListData();
        if(listData.length > 0) {
            const refTitle = new TitleParser("", {}, this.rendererData).analysePro("参考", "h1", {});
            const refList = new ListParser("", {}, this.rendererData).analysePro(listData, {});
            templateList.push(refTitle.content);
            templateList.push(refList.content);
        }
        // 检查是否有标题
        this.checkTitle(templateList);
        // 处理目录
        const cataMenu = new CataParser(this.option, templateList).analyse();
        return { templateList: templateList, cataMenu: cataMenu };
    }
    refListData() {
        const listData = [];
        const refListData = this.rendererData.ref.refList;
        refListData.forEach((data) => {
            const temp = {
                children: [],
                level: 1,
                order_judge: true,
                text: data
            };
            listData.push(temp);
        });
        return listData;
    }
    checkTitle(templateList) {
        let has = false;
        templateList.forEach((template) => {
            if(template.type === "sr-title") has = true;
        });
        if(!has) {
            const title = new TitleParser("", {}, this.rendererData).analysePro("默认标题", "h1", {});
            templateList.unshift(title.content);
        }
    }
}

export default ComponentsDecoder;
