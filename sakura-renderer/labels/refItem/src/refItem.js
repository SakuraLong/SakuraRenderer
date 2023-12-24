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
        this.aToNode.classList.add("sa-ref-node--arrow");
    }
}

export default RefItem;