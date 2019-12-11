/* eslint-env worker */
const URL = 'https://api.themoviedb.org/3/'
const API_KEY = '967d5bd6ff00ae4d796d69af5cc03155'


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
  const response = await fetch(URL + 'search/movie?api_key=' + API_KEY + '&query=' + search + '&page=' + page + '&include_adult=false')
  const data = await response.json()
  movies = [...movies, data]
  console.log({ movies: movies[0] })
  postMessage({ movies: movies[0] })
}

const getTopRatedMovies = async () => {
  let movies = []
  //https://api.themoviedb.org/3/movie/top_rated?api_key=967d5bd6ff00ae4d796d69af5cc03155&page=1
  const response = await fetch(URL + 'movie/top_rated?api_key=' + API_KEY + '&page=1')
  const data = await response.json()
  movies = [...movies, data]
  postMessage({ movies: movies[0] })
}

