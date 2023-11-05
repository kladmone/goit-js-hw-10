import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.style.display = 'block';
const hideError = () => {
  error.style.display = 'none';
};

const showError = () => {
  error.style.display = 'block';
};
fetchBreeds()
  .then(breeds => {
    breeds.map(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.text = name;
      breedSelect.appendChild(option);
    });

    loader.style.display = 'none';

    breedSelect.style.display = 'block';
    hideError();
  })
  .catch(err => {
    loader.style.display = 'none';
    breedSelect.style.display = 'none';
    showError();
    console.error('Error fetching breeds:', err);
  });

breedSelect.addEventListener('change', e => {
  loader.style.display = 'block';

  catInfo.style.display = 'none';

  const q = e.target.value;
  fetchCatByBreed(q)
    .then(cat => {
      renderBreed(cat);
      hideError();
    })
    .catch(err => {
      loader.style.display = 'none';
      showError();
      console.error('Error fetching cat info:', err);
    });
});

function breedTemplate(cat) {
  const image = cat.url;
  return `
  <img class="cat-image" src="${image}" alt="${cat.name}" width="400" height="400"/>
    <div class="cat-info">
      <h2 class="breed-name">${cat.name}</h2>
      <p class="description">${cat.description}</p>
      <p class="temperament"><span class="temp-span">Temperament:</span> ${cat.temperament}</p>
    </div>
  `;
}

function renderBreed(cat) {
  const markup = breedTemplate(cat);
  catInfo.innerHTML = markup;

  loader.style.display = 'none';
  catInfo.style.display = 'flex';
}
