class AppBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        :host {
            width: 100%;
            height: 64px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: cornflowerblue;
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }
        </style>
        <h2>Club Finder</h2>`;
    }
}

customElements.define("app-bar", AppBar);
