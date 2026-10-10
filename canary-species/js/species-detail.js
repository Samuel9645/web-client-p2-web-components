class SpeciesDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const template = document.getElementById('species-detail-template');
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.handleSpeciesOpened = event => this.showSpecies(event.detail.species);
        this.currentSpecies = null;
        this.handleClose = () => this.close();
        this.handleLike = () => this.likeCurrentSpecies();
    }

    connectedCallback() {
        this.shadowRoot.getElementById('close-button')
            .addEventListener('click', this.handleClose);
        this.shadowRoot.getElementById('like-button')
            .addEventListener('click', this.handleLike);
        document.addEventListener('species-opened', this.handleSpeciesOpened);
    }

    disconnectedCallback() {
        document.removeEventListener('species-opened', this.handleSpeciesOpened);
        this.shadowRoot.getElementById('close-button')
            .removeEventListener('click', this.handleClose);
        this.shadowRoot.getElementById('like-button')
            .removeEventListener('click', this.handleLike);
    }

    showSpecies(species) {
        this.currentSpecies = species;
        this.shadowRoot.getElementById('detail-icon').textContent = species.icon;
        this.shadowRoot.getElementById('detail-name').textContent = species.name;
        this.shadowRoot.getElementById('detail-scientific').textContent = species.scientificName;
        this.shadowRoot.getElementById('detail-description').textContent = species.description;
        const metadata = this.shadowRoot.getElementById('detail-meta');
        metadata.replaceChildren();
        [
            `🏝 ${species.island}`,
            `🌡 ${species.threatLabel}`,
            `🌲 ${species.habitat}`,
            `📏 ${species.height}`,
        ].forEach(text => {
            const chip = document.createElement('span');
            chip.className = 'chip';
            chip.textContent = text;
            metadata.appendChild(chip);
        });
        this.updateRating();

        this.classList.remove('is-hidden');
    }

    updateRating() {
        this.shadowRoot.getElementById('detail-rating-value').textContent =
            this.currentSpecies.rating.toString();
    }

    likeCurrentSpecies() {
        if (this.currentSpecies === null || this.currentSpecies === undefined) {
            return;
        }
        this.currentSpecies.rating += 1;
        this.updateRating();
    }

    close() {
        this.classList.add('is-hidden');
        // this.dispatchEvent(new CustomEvent('species-closed', {
        //     bubbles: true,
        //     composed: true,
        // }));
    }
}

export const speciesDetailsElementName = 'species-detail';
customElements.define(speciesDetailsElementName, SpeciesDetail);
