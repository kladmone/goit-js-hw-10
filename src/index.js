import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const name = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');
const img = document.querySelector('.cat-image');

loader.style.display = 'block';
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
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
  e.preventDefault();
  const q = e.target.elements.breedSelect.value;
  fetchBreeds(q).then(cat => {
    console.log(cat);
  });
});
