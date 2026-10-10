class SpeciesCard extends HTMLElement {
  static get observedAttributes() {
    return ['threat'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.getElementById('species-card-template');
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.species = null;
  }

  connectedCallback() {
    this.updateThreatBadge();
    this.shadowRoot.querySelector('.card').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('species-opened', {
        detail: { species: this.species },
        bubbles: true,
        composed: true,
      }));
    });
  }

  attributeChangedCallback(name) {
    if (name === 'threat' && this.shadowRoot) {
      this.updateThreatBadge();
    }
  }

  updateThreatBadge() {
    const badge = this.shadowRoot.getElementById('threat-badge');
    const threat = this.getAttribute('threat') || 'LC';
    const labels = { EN: 'En peligro', VU: 'Vulnerable', LC: 'Segura' };

    badge.textContent = labels[threat] || threat;
    badge.className = `card-threat threat-${threat}`;
  }
}

customElements.define('species-card', SpeciesCard);
