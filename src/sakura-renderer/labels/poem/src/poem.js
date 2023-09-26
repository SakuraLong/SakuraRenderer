class Poem extends HTMLElement {
    constructor() {
        super();
        this.content = "";
        this.p = document.createElement("p");
        console.log("sr-poem");
    }
    connectedCallback(){
        this.style.whiteSpace = "pre";
        this.content = this.textContent;
        console.log(this.content);
        this.content.replace("\n", "<br>");
        this.content.replace(" ", "&nbsp");
        this.innerHTML = this.content;
    }
}

export default Poem;