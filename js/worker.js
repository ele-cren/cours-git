/* eslint-env worker */
const URL = 'https://developers.themoviedb.org/3/getting-started'
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
  const response = await fetch(URL + '?apikey=' + API_KEY + '&s=' + search + '&page=' + page)
  const data = await response.json()
  movies = [...movies, data]
  postMessage({ movies: movies[0] })
}

const getTopRatedMovies = async () => {
  let movies = []
  for (let i = 0; i < baseMovies.length; i++) {
    const response = await fetch(URL + '?apikey=' + API_KEY + '&t=' + baseMovies[i])
    const data = await response.json()
    movies = [...movies, data]
  }
  postMessage({ movies: movies })
}
