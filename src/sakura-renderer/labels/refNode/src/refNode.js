class RefNode extends HTMLElement {
    constructor() {
        super();
        this.arrow = "↑";
        this.aToLink = document.createElement("a");
        this.aToItem = document.createElement("a");
        this.span = document.createElement("span");
        this.link = "";
        this.itemId = "";
        this.index = 0;
        this.aToItem.innerHTML = "↑";
        this.aToItem.title = "跳转引用内容";
    }
    connectedCallback(){
        this.setAttribute("id", this.getAttribute("id"));
        this.link = this.textContent;
        this.itemId = this.getAttribute("item-id");
        this.index = this.getAttribute("item-index");

        this.aToItem.innerHTML += "<sub>[" + this.index + "]</sub>";
        this.aToItem.href = "#" + this.itemId;
        this.innerHTML = "";
        this.appendChild(this.aToItem);
        if(this.getAttribute("node-content")){
            this.span.innerHTML = this.getAttribute("node-content");
            this.appendChild(this.span);
        }else{
            this.aToLink.textContent = this.link;
            this.aToLink.href = this.link;
            this.aToLink.rel = "noreferrer noopener nofollow";
            this.aToLink.target = "_Blank";
            this.appendChild(this.aToLink);
        }
        this.aToLink.classList.add("sa-ref-node--link");
        this.aToItem.classList.add("sa-ref-node--arrow");
    }
}

export default RefNode;