class CataParser {
    constructor(option, templateList){
        this.option = option;
        this.templateList = templateList;
    }
    analyse(){
        let menu = createMenu(this.templateList);
        function createMenu(data) {
            let menu = [];
            let stack = [];
            for (let i = 0, len = data.length; i < len; i++) {
                let template = data[i];
                if(template.type !== "sr-title") continue;
                let level = getHeadingLevel(template.data.type);
                if (level === -1) continue;
                let item = {
                    title: template.data.content,
                    id: template.data.id,
                    children: [],
                };
                while (stack.length >= level) {
                    stack.pop();
                }
                if (stack.length === 0) {
                    menu.push(item);
                } else {
                    stack[stack.length - 1].children.push(item);
                }
                stack.push(item);
            }
            return menu;
        }

        function getHeadingLevel(type) {
            switch (type) {
                case "h1":
                    return 1;
                case "h2":
                    return 2;
                case "h3":
                    return 3;
                case "h4":
                    return 4;
                case "h5":
                    return 5;
                case "h6":
                    return 6;
                default:
                    return -1;
            }
        }
        // 递归深搜
        return menu;
    }
}

export default CataParser;