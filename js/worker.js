/* eslint-env worker */
const URL = 'https://developers.themoviedb.org/3/'
const API_KEY = '967d5bd6ff00ae4d796d69af5cc03155'

const baseMovies = [
  '278',
  '238',
  '155',
  '389',
  '122',
  '680',
  '429',
  '550',
  '120'
]

onmessage = (event) => {
  if (event.data.type === 'top') {
    getTopRatedMovies()
  } else if (event.data.type === 'search') {
    searchMovies(event.data.search, event.data.page)
  }
}

const searchMovies = async (search, page) => {
  let movies = []
  //https://api.themoviedb.org/3/search/movie?api_key=API_KEY%20%3A%20967d5bd6ff00ae4d796d69af5cc03155&query=Star%20Wars&page=1&include_adult=false
  const response = await fetch(URL + 'search/' + 'movie?api_key=' + API_KEY + '&query=' + search + '&page=' + page + '&include_adult=false')
  const data = await response.json()
  movies = [...movies, data]
  postMessage({ movies: movies[0] })
}

const getTopRatedMovies = async () => {
  let movies = []
  //https://api.themoviedb.org/3/movie/278?api_key=967d5bd6ff00ae4d796d69af5cc03155
  for (let i = 0; i < baseMovies.length; i++) {
    const response = await fetch(URL + 'movie' + baseMovies[i] + '?apikey=' + API_KEY)
    const data = await response.json()
    movies = [...movies, data]
  }
  postMessage({ movies: movies })
}
