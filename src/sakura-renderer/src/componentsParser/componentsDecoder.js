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
        }; // 全局渲染需要的数据
    }
    decode() {
        // 此处进行模板和模块和语法解析器解析
        for (let i = 0; i < this.componentsList.length; i++) {
            this.componentsList[i] = new GrammerParser(
                this.option,
                this.componentsList[i],
                this.rendererData
            ).analyse(); // 调用语法解析器解析
            this.componentsList[i] = new TemplateParser(
                this.option,
                this.componentsList[i],
                this.rendererData
            ).analyse(); // 调用模板解析器解析
            this.componentsList[i] = new ModuleParser(
                this.option,
                this.componentsList[i],
                this.rendererData
            ).analyse(); // 调用模块解析器解析
        }
        this.componentsList = this.listDecode(); // 组件拆分
        return this.componentsList;
    }
    /**
     * 处理组件列表
     */
    listDecode() {
        let componentsList = this.componentsList;
        let templateList = [];
        for (let i = 0; i < componentsList.length; i++) {
            for (let j = 0; j < this.parsers.length; j++) {
                let t = new this.parsers[j](
                    componentsList[i],
                    this.option,
                    this.rendererData
                );
                if (!t.judge()) continue;
                t.analyseBaseOption();
                let template = t.analyse(
                    this.ignoreReplaceList,
                    this.codeReplaceList,
                    this.poemReplaceList
                );
                if (template.type === "success") {
                    templateList.push(template.content);
                }
            }
        }
        // 组件处理完毕
        // 向列表加入头尾

        // 处理目录
        let cataMenu = new CataParser(this.option, templateList).analyse();
        return { templateList: templateList, cataMenu: cataMenu };
    }
    
}

export default ComponentsDecoder;
