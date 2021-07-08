import axios from 'axios';

const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

const episodesAPI = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

export { tmdbAPI, episodesAPI };
