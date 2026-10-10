import {SPECIES} from './species-data.js';
import {speciesDetailsElementName} from "./species-detail";
import {speciesCardElementName} from "./species-card";

const detailPanel = document.createElement(speciesDetailsElementName);
detailPanel.classList.add('is-hidden');

document.getElementById('detail-container').appendChild(detailPanel);
const catalog = document.getElementById('catalog');
SPECIES.forEach(species => {
    const card = document.createElement(speciesCardElementName);
    card.setAttribute('threat', species.threat);
    card.species = species;
    card.innerHTML = `
    <span slot="icon">${species.icon}</span>
    <span slot="name">${species.name}</span>
    <span slot="scientific">${species.scientificName}</span>
    <span slot="island">${species.island}</span>
  `;
    catalog.appendChild(card);
});
