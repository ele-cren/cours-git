/* eslint-env worker */
const URL = 'https://developers.themoviedb.org/3/getting-started'
const API_KEY = '967d5bd6ff00ae4d796d69af5cc03155'

const baseMovies = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Dark Knight',
  '12 Angry Men',
  'The Lord of the Rings: The Return of the King',
  'Pulp Fiction',
  'The Good, the Bad and the Ugly',
  'Fight Club',
  'The Lord of the Rings: The Fellowship of the Ring',
  'Forrest Gump'
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
