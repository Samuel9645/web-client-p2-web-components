import {SPECIES} from './species-data.js';

const detailPanel = document.createElement('species-detail');
detailPanel.classList.add('is-hidden');

document.getElementById('detail-container').appendChild(detailPanel);
const catalog = document.getElementById('catalog');
SPECIES.forEach(species => {
    const card = document.createElement('species-card');
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
