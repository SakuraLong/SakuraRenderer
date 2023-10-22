import Box from "./src/box";

window.customElements.define("sr-box", Box);

/* 此处是临时测试区域，之后会删除
*/
import utils from "../../utils";
import Template from "@/sakura-renderer/src/componentsParser/template/template";

const test = `
sca{{{{{{c{{sac|scasac|{ascsac{{scasc}}}}}ascasc`;
const test_1 = "asscacsacas";
const l = "{{";
const r = "}}";
const l_1 = "<code>";
const r_1 = "</code>";
const tset_2 = 
`
sa{{font|哈哈哈{{font|哈哈哈2222|size=20px}}|size=20px}}
`;
function t(data){
    console.log(data.content);
    console.log(data.replace);
    console.log(data.content.indexOf("咯"));
    let content = data.replace;
    content = content.slice(data.stringBegin.length, -data.stringEnd.length); // 去掉头尾标记符
    console.log(content);
    return "132435465787";
}

// let tem = new Template(test);
// tem.decodeDefault(test);

console.log(test.length); // 49

console.log(utils.replaceNonGreed(l, r, tset_2, t));
console.log(utils.replaceGreed(l, r, tset_2, t));