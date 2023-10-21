class RefItem extends HTMLElement {
    constructor() {
        super();
        this.arrow = "↑";
        this.aToNode = document.createElement("a");
        this.span = document.createElement("span");
        this.link = "";
        this.nodeId = "";
        this.index = 0;
    }
    connectedCallback(){
        this.setAttribute("id", this.getAttribute("id"));
        this.nodeId = this.getAttribute("node-id");
        this.index = this.getAttribute("item-index");

        this.aToNode.innerHTML += "<sub>[" + this.index + "]</sub>";
        this.aToNode.href = "#" + this.nodeId;
        this.innerHTML = "";
        this.appendChild(this.aToNode);
        // if(this.getAttribute("node-content")){
        //     this.span.innerHTML = this.getAttribute("node-content");
        //     this.appendChild(this.span);
        // }else{
        //     this.aToLink.textContent = this.link;
        //     this.aToLink.href = this.link;
        //     this.aToLink.rel = "noreferrer noopener nofollow";
        //     this.aToLink.target = "_Blank";
        //     this.appendChild(this.aToLink);
        // }
        // this.aToLink.classList.add("sa-ref-node--link");
        this.aToNode.classList.add("sa-ref-node--arrow");
    }
}

export default RefItem;