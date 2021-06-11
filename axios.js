import axios from 'axios'

const tmdbAPI = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',

})

export default tmdbAPI