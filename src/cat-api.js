import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_1Rwovf41IemW2Ytj7Mt4b69JhAYVwi0mOl7CeObFDIOfHlLdZwqDaKDG5SvEsTX6';
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
}
