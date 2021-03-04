const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const establish = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => establish.push(...data));





function findMatches(wordToMatch, establish) {
  return establish.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.city.match(regex)
  });
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, establish);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="pname">${cityName}, ${stateName}</span>
        <span class="pcity">${numberWithCommas(place.city)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
