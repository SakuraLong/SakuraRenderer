/**
 * 弃用
 */

class Code extends HTMLElement {
    constructor() {
        super();
        // this.default_prompt = null;
        // this.is_over = false;
        // this.timer = null;
        // this.id = "";
        // this.content = "";
    }
    connectedCallback(){
        // console.log("sr-box");
        this.style.color = "red";
        // 组件添加到页面后触发
        // let that = this;
        // this.default_prompt = new DefaultPrompt(this);
        // this.default_prompt.setGetIsOverFunc((function(that){
        //     return function(){
        //         that.getIsOver();
        //     };
        // })(that), that);
        // this.setAttribute("class", "entity_link");
        // this.addEventListener("mouseover", (function(that){
        //     return function(){
        //         that.mouseOver(that);
        //     };
        // })(that));
        // this.addEventListener("mouseout", (function(that){
        //     return function(){
        //         that.mouseOut(that);
        //     };
        // })(that));
        // this.addEventListener("click", (function(that){
        //     return function(){
        //         that.click(that);
        //     };
        // })(that));
        // this.style.color = "#822296";
        // let text = this.textContent;
        // if(text.split("|").length === 1){
        //     // 没有id
        //     this.default_prompt.setText(this.textContent);
        // }else{
        //     // 有id
        //     this.id = text.split("|")[0];
        //     this.content = text.split("|")[1];
        //     this.textContent = this.content;
        //     Connector.send([this.id.toString()], "getNodeResume", abstractCallback, abstractWaiting, abstractTimeput);
        // }
        // function abstractCallback(msg){
        //     if(msg.success){
        //         let text = Code.Base64.decode(msg.content.result);
        //         that.default_prompt.setText(text);
        //     }else{
        //         that.default_prompt.setText("服务器异常或未查询到相关信息");
        //     }
        // }
        // function abstractWaiting(is_waiting){

        // }
        // function abstractTimeput(){
        //     that.default_prompt.setText("服务器异常或未查询到相关信息");
        // }
        // this.button.textContent = this.textContent;
        // this.innerHTML = "";
        // this.appendChild(this.button);
    }
    // mouseOver(that){
    //     console.log("link over");
    //     clearTimeout(that.timer);
    //     that.is_over = true;
    //     let x = 0;
    //     let y = 100;
    //     let is_over = that.default_prompt.getIsOver();
    //     if(!is_over){
    //         that.default_prompt.setPosByPrecent(x, y);
    //         that.default_prompt.append();
    //     }
    //     // that.default_prompt.setPosByPrecent(x, y);
    //     // that.default_prompt.append();
    // }
    // mouseOut(that){
    //     console.log("link out");
    //     clearTimeout(that.timer);
    //     that.timer = setTimeout(()=>{
    //         let is_over = that.default_prompt.getIsOver();
    //         if(!is_over){
    //             that.is_over = false;
    //             that.default_prompt.remove();
    //         }
    //     }, 100);
    // }
    // getIsOver(){
    //     return this.is_over;
    // }
    // click(that){
    //     let entity = that.textContent;
    //     console.log(entity);
    // }
}

export default Code;