class SpeciesCard extends HTMLElement {
    static get observedAttributes() {
        return ['threat'];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const template = document.getElementById('species-card-template');
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.species = null;
        this.handleRatingChanged = event => this.updateRating(event.detail);
        this.handleCardClick = () => {
            this.dispatchEvent(new CustomEvent('species-opened', {
                detail: {species: this.species}, bubbles: true, composed: true,
            }));
        };
    }

    connectedCallback() {
        this.updateThreatBadge();
        this.updateRating();
        this.shadowRoot.querySelector('.card').addEventListener('click', this.handleCardClick);
        document.addEventListener('rating-changed', this.handleRatingChanged);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.card').removeEventListener('click', this.handleCardClick);
        document.removeEventListener('rating-changed', this.handleRatingChanged);
    }

    attributeChangedCallback(name) {
        if (name === 'threat' && this.shadowRoot) {
            this.updateThreatBadge();
        }
    }

    updateThreatBadge() {
        const badge = this.shadowRoot.getElementById('threat-badge');
        const threat = this.getAttribute('threat') || 'LC';
        const labels = {EN: 'En peligro', VU: 'Vulnerable', LC: 'Segura'};

        badge.textContent = labels[threat] || threat;
        badge.className = `card-threat threat-${threat}`;
    }

    updateRating(updateDetails) {
        if (updateDetails?.speciesId === undefined ||
            updateDetails?.rating === undefined ||
            updateDetails.speciesId !== this.species?.id) {
            return;
        }
        const rating = updateDetails.rating;
        this.shadowRoot.getElementById('card-rating-value').textContent = rating.toString();
    }
}

export const speciesCardElementName = 'species-card';
customElements.define(speciesCardElementName, SpeciesCard);
