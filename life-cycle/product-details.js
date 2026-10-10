class ProductDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes() {
        return ['title', 'description'];
    }

    connectedCallback() {
        this.render();
        console.log('connected');
    }

    disconnectedCallback() {
        console.log('disconnected');
    }

    render() {
        const title = this.getAttribute('title') || '';
        const description = this.getAttribute('description') || '';
        this.shadowRoot.innerHTML = `
            <div>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
        console.log('rendered');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            console.log('attributes changed');
            this.render();
        }
    }

    setTitle(newTitle) {
        this.setAttribute('title', newTitle);
    }

    setDescription(newDescription) {
        this.setAttribute('description', newDescription);
    }
}

customElements.define('product-details', ProductDetails);
