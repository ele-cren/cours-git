// First postMessage top
// If search postMessage search

let movies = []
let type = 'top'
let webWorker

document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault()
  searchMovies()
})

if (window.Worker) {
  webWorker = new window.Worker('./js/worker.js') // WARNING : path to change
  webWorker.onmessage = (event) => {
    movies = type === 'top' ? event.data.movies : event.data.movies.Search
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
      webWorker.postMessage({ type: type, search: search })
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
      img.src = movie.Poster
      img.alt = movie.Poster
      img.className = 'card-img-top'
      const cardBody = document.createElement('div')
      cardBody.className = 'card-body'
      const title = document.createElement('h5')
      title.innerText = movie.Title
      title.title = movie.Title
      title.className = 'card-title'
      const detailsLink = document.createElement('a')
      detailsLink.href = './details.html'
      const detailsBtn = document.createElement('button')
      detailsBtn.innerText = 'More infos'
      detailsBtn.onclick = function () {
        console.log(movie)
        window.localStorage.setItem('movieItem', movie)
      }
      detailsBtn.className = 'card-btn'

      detailsLink.appendChild(detailsBtn)
      cardBody.appendChild(title)
      card.appendChild(cardBody)
      card.appendChild(img)
      card.appendChild(detailsLink)
      cardContainer.appendChild(card)
    }
  } else {
    type = 'top'
    getTopMovies()
  }
}

getTopMovies()
