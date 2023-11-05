import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.style.display = 'block';
fetchBreeds()
  .then(breeds => {
    breeds.map(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.text = name;
      breedSelect.appendChild(option);
    });
    loader.style.display = 'none';
  })
  .catch(err => {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error('Error fetching breeds:', err);
  });

breedSelect.addEventListener('change', e => {
  const q = e.target.value;
  fetchCatByBreed(q).then(cat => {
    renderBreed(cat);
    console.log(cat);
  });
});

function breedTemplate(cat) {
  const image = cat.url;
  return `
  <div class="cat-info">
  <h2 class="breed-name">${cat.name}</h2>
    <p class="description">${cat.description}</p>
    <p class="temperament">${cat.temperament}</p></div>
     ${image}
  `;
}
function renderBreed(cat) {
  const markup = breedTemplate(cat);
  catInfo.innerHTML = markup;
}
