class Poem extends HTMLElement {
    constructor() {
        super();
        this.content = "";
        this.p = document.createElement("p");
    }
    connectedCallback(){
        this.style.whiteSpace = "pre";
        this.content = this.textContent;
        this.content.replace("\n", "<br>");
        this.content.replace(" ", "&nbsp");
        this.innerHTML = this.content;
    }
}

export default Poem;