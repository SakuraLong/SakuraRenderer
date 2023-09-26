class RefNode extends HTMLElement {
    constructor() {
        super();
        this.arrow = "↑";
        this.aToLink = document.createElement("a");
        this.aToItem = document.createElement("a");
        this.link = "";
        this.itemId = "";
        this.index = 0;
        this.aToItem.innerHTML = "↑";
        this.aToItem.title = "跳转引用内容";
    }
    connectedCallback(){
        this.link = this.textContent;
        this.itemId = this.getAttribute("item-id");
        this.index = this.getAttribute("item-index");

        this.aToItem.innerHTML += "<sub>[" + this.index + "]</sub>";
        this.aToItem.href = "#" + this.itemId;
        this.aToLink.textContent = this.getAttribute("node-content") == null ? this.link : this.getAttribute("node-content");
        this.aToLink.href = this.link;
        this.aToLink.rel = "noreferrer noopener nofollow";
        this.aToLink.target = "_Blank";
        this.innerHTML = "";
        this.aToLink.classList.add("sa-ref-node--link");
        this.aToItem.classList.add("sa-ref-node--arrow");
        this.appendChild(this.aToItem);
        this.appendChild(this.aToLink);
    }
}

export default RefNode;