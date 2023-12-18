import Template from "./template";

class QuoteParser extends Template {
    constructor(option, content, rendererData) {
        super(option, content, rendererData);
        this.name = ["quote", "引用"]; // 这个模板的名字
    }
    judge(){
        if (this.name.indexOf(this.dataList[0]) !== -1) {
            return true;
        } else {
            return false;
        }
    }
    analyseTemplate(content) {
        this.dataListInit(content); // 对dataList初始化，必须要写
        if(!this.judge()) return content; // 判断是不是这个模板
        // 以下是处理QuoteParser模板
        let text = ""; // 文本内容
        let from = "——"; // 来源

        const switchKeyValue = (key, value) => {
            switch(key){
                case "content":
                case "内容":
                    text = value;
                    return true;
                case "from":
                case "来源":
                    from += value;
                    return true;
            }
            return false;
        };
        this.dataList.forEach((data, index) => {
            const key = data.split("=")[0];
            const left = data.indexOf("=");
            const value = data.slice(left + 1, data.length);
            switch (index) {
                case 1:
                    if(switchKeyValue(key, value)) break;
                    else text = data;
                    break;
                case 2:
                    if(switchKeyValue(key, value)) break;
                    else from += data;
            }
        });
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let tr_t = document.createElement("tr");
        let tr_b = document.createElement("tr");
        let td_s_l = document.createElement("td");
        let td_s_r = document.createElement("td");
        let td_c = document.createElement("td");
        let td_f = document.createElement("td");
        let cite = document.createElement("cite");

        table.classList.add("class", "sa-quote-table");
        td_s_l.classList.add("class", "sa-quote-table__td-symbol");
        td_s_r.classList.add("class", "sa-quote-table__td-symbol");
        td_c.classList.add("class", "sa-quote-table__td-text");
        td_f.classList.add("class", "sa-quote-table__td-from");

        td_f.setAttribute("colspan", "3");

        td_c.innerHTML = text;
        cite.innerHTML = from;
        td_s_l.innerHTML = "“";
        td_s_r.innerHTML = "”";
        td_s_l.style.verticalAlign = "top";
        td_s_r.style.verticalAlign = "bottom";
        let res = {};
        tr_t.appendChild(td_s_l);
        tr_t.appendChild(td_c);
        tr_t.appendChild(td_s_r);
        tbody.appendChild(tr_t);
        td_f.appendChild(cite);
        tr_b.appendChild(td_f);
        tbody.appendChild(tr_b);
        table.appendChild(tbody);
        res = table;

        return res.outerHTML; // 返回被替换的内容
    }
}

export default QuoteParser;
