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
import ClearParser from "./component/ClearParser";
import CataParser from "./component/cataParser";

import GrammerParser from "./grammar/grammarParser"; // 语法解析器
import TemplateParser from "./template/templateParser"; // 模板解析器
import ModuleParser from "./module/moduleParser"; // 模块解析器

class ComponentsDecoder {
    constructor(option, body, componentsList = [], replaceData) {
        this.option = option;
        this.body = body;
        this.componentsList = componentsList; // components列表
        this.ignoreReplaceList = replaceData.ignoreReplaceList ? replaceData.ignoreReplaceList: []; // ignore替换列表
        this.codeReplaceList = replaceData.codeReplaceList ? replaceData.codeReplaceList: []; // code替换列表
        this.poemReplaceList = replaceData.poemReplaceList ? replaceData.poemReplaceList: []; // poem替换列表
        this.parsers = [
            TitleParser,
            ParaParser,
            AlbumISParser,
            AllISParser,
            CISParser,
            ListParser,
            TableParser,
            ClearParser,
        ]; // parsers

        this.rendererData = {
            ref: {
                amount: 0, // 参考的数量
                refList: [], // 底部ref的渲染列表
            },
            title: {
                idMap: new Map(), // 标题id
            }
        }; // 全局渲染需要的数据
    }
    decode() {
        this.componentsList = this.listDecode(); // 组件拆分
        return this.componentsList;
    }
    /**
     * 模板模块解析器
     */
    TDecode(content) {
        const self = this;
        content = new TemplateParser(
            self.option,
            content,
            self.rendererData
        ).analyse(); // 调用模板解析器解析
        return content;
    }
    MDecode(content) {
        const self = this;
        content = new ModuleParser(
            self.option,
            content,
            self.rendererData
        ).analyse(); // 调用模块解析器解析
        return content;
    }
    /**
     * 语法
     */
    GDecode(content) {
        const self = this;
        content = new GrammerParser(
            self.option,
            content,
            self.rendererData
        ).analyse(); // 调用语法解析器解析
        return content;
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
                    {
                        TDecode: this.TDecode,
                        MDecode: this.MDecode,
                        GDecode: this.GDecode,
                        ignoreReplaceList: this.ignoreReplaceList,
                        codeReplaceList: this.codeReplaceList,
                        poemReplaceList: this.poemReplaceList,
                        rendererData: this.rendererData
                    }
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
            const refTitle = new TitleParser("", {}).analysePro("注释", "h1", {});
            const refList = new ListParser("", {}).analysePro(listData, {});
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
            const title = new TitleParser("", {}).analysePro("默认标题", "h1", {});
            templateList.unshift(title.content);
        }
    }
}

export default ComponentsDecoder;
