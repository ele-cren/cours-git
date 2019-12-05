// First postMessage top
// If search postMessage search

let movies = []
let type = 'top'
let webWorker
const pages = {
  minPage: 1,
  currentPage: 3,
  maxPage: 1
}

document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault()
  searchMovies()
})

if (window.Worker) {
  webWorker = new window.Worker('./js/worker.js') // WARNING : path to change
  webWorker.onmessage = (event) => {
    movies = type === 'top' ? event.data.movies : event.data.movies.Search
    const totalResults = event.data.movies.totalResults
    console.log(event.data.movies)
    pages.maxPage = totalResults ? Math.ceil(totalResults / 10) : 1
    displayMovies()
  }
} else {
  console.log('Not supported by browser')
}

const searchMovies = () => {
  if (webWorker) {
    const searchInput = document.getElementById('search')
    const search = searchInput ? searchInput.value : ''
    const oldType = type
    type = search ? 'search' : 'top'
    if ((type !== oldType) || type === 'search') {
      webWorker.postMessage({ type: type, search: search, page: pages.currentPage })
    }
  }
}

const getTopMovies = () => {
  if (webWorker) {
    webWorker.postMessage({ type: type })
  }
}

// Card Movie Display
const displayMovies = () => {
  const cardContainer = document.getElementById('card-container')
  cardContainer.textContent = ''
  if (movies) {
    for (const movie of movies) {
      const card = document.createElement('div')
      card.className = 'card'
      const img = document.createElement('img')
      img.src = movie.Poster !== 'N/A' ? movie.Poster : 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png'
      img.alt = movie.Poster !== 'N/A' ? movie.Poster : 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png'
      img.className = 'card-img-top'
      const cardBody = document.createElement('div')
      cardBody.className = 'card-body'
      const title = document.createElement('h5')
      title.innerText = movie.Title
      title.title = movie.Title
      title.className = 'card-title'
      cardBody.appendChild(title)
      card.appendChild(cardBody)
      card.appendChild(img)
      cardContainer.appendChild(card)
    }
  } else {
    type = 'top'
    getTopMovies()
  }
}

getTopMovies()
