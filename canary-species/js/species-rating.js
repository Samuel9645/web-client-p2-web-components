class SpeciesRating extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const template = document.getElementById('species-rating-template');
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.ratings = new Map();
        this.currentSpecies = null;
        this.handleSpeciesOpened = event => this.setActiveSpecies(event.detail.species);
        this.handleLike = () => this.likeCurrentSpecies();
    }

    connectedCallback() {
        this.shadowRoot.getElementById('like-button')
            .addEventListener('click', this.handleLike);
        document.addEventListener('species-opened', this.handleSpeciesOpened);
    }

    disconnectedCallback() {
        document.removeEventListener('species-opened', this.handleSpeciesOpened);
        this.shadowRoot.getElementById('like-button')
            .removeEventListener('click', this.handleLike);
    }

    setActiveSpecies(species) {
        this.currentSpecies = species;
        if (!this.ratings.has(species.id)) {
            this.ratings.set(species.id, 0);
        }
        this.updateRatingText();
    }

    get currentSpeciesRating() {
        return this.ratings.get(this.currentSpecies?.id) ?? 0;
    }

    updateRatingText() {
        this.shadowRoot.getElementById('detail-rating-value').textContent =
            this.currentSpeciesRating.toString();
    }

    likeCurrentSpecies() {
        if (!this.currentSpecies) {
            return;
        }
        this.ratings.set(this.currentSpecies.id, this.currentSpeciesRating + 1);
        this.updateRatingText();
        this.dispatchEvent(new CustomEvent('rating-changed', {
            detail: {
                speciesId: this.currentSpecies.id,
                rating: this.currentSpeciesRating,
            },
            bubbles: true,
            composed: true,
        }));
    }
}


customElements.define('species-rating', SpeciesRating);
