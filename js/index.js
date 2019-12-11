// First postMessage top
// If search postMessage search

let movies = []
let type = 'top'
let webWorker
const pages = {
  minPage: 1,
  currentPage: 1,
  maxPage: 1
}
let currentSearch = ''

document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault()
  searchMovies()
})

if (window.Worker) {
  webWorker = new window.Worker('./js/worker.js')
  webWorker.onmessage = (event) => {
    movies = event.data.movies.results
    pages.maxPage = event.data.movies.total_pages
    displayMovies()
    if (pages.maxPage > 1) {
      displayPagesBtns()
    }
  }
} else {
  console.log('Not supported by browser')
}

const displayPagesBtns = () => {
  const btnContainer = document.getElementById('btn-container')
  btnContainer.textContent = ''
  let btns = []
  if (pages.currentPage - 1 > pages.minPage) {
    btns = [...btns, createBtn(pages.minPage, 'page-btn page-btn-endpoint')]
  }
  if (pages.currentPage - 1 > 0) {
    btns = [...btns, createBtn(pages.currentPage - 1, 'page-btn')]
  }
  btns = [...btns, createBtn(pages.currentPage, 'page-btn page-btn-active')]
  if (pages.currentPage + 1 <= pages.maxPage) {
    btns = [...btns, createBtn(pages.currentPage + 1, 'page-btn')]
  }
  if (pages.currentPage + 1 < pages.maxPage) {
    btns = [...btns, createBtn(pages.maxPage, 'page-btn page-btn-endpoint')]
  }
  for (const btn of btns) {
    if (btn.textContent !== pages.currentPage.toString()) {
      btn.onclick = () => setPage(btn.textContent)
    }
    btnContainer.appendChild(btn)
  }
}

const setPage = (page) => {
  pages.currentPage = parseInt(page)
  if (type === 'search') {
    searchMovies()
  } else {
    getTopMovies()
  }
}

const createBtn = (content, className) => {
  const currentBtn = document.createElement('div')
  currentBtn.className = className
  currentBtn.textContent = content
  return currentBtn
}

const searchMovies = () => {
  if (webWorker) {
    const searchInput = document.getElementById('search')
    pages.currentPage = currentSearch !== searchInput.value ? 1 : pages.currentPage
    currentSearch = searchInput ? searchInput.value : currentSearch
    const oldType = type
    type = currentSearch ? 'search' : 'top'
    if ((type !== oldType) || type === 'search') {
      webWorker.postMessage({ type: type, search: currentSearch, page: pages.currentPage })
    }
  }
}

const getTopMovies = () => {
  if (webWorker) {
    webWorker.postMessage({ type: type, page: pages.currentPage })
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
      img.src = 'https://image.tmdb.org/t/p/original' + movie.poster_path
      img.alt = 'https://image.tmdb.org/t/p/original' + movie.poster_path
      img.className = 'card-img-top'
      const cardBody = document.createElement('div')
      cardBody.className = 'card-body'
      const title = document.createElement('h5')
      title.innerText = movie.title
      title.title = movie.title
      title.className = 'card-title'
      const detailsLink = document.createElement('a')
      detailsLink.href = './details.html'
      const detailsBtn = document.createElement('button')
      detailsBtn.innerText = 'More infos'
      detailsBtn.onclick = function () {
        window.localStorage.setItem('movieTitle', movie.title)
        window.localStorage.setItem('moviePoster', 'https://image.tmdb.org/t/p/original' + movie.poster_path)
        window.localStorage.setItem('movieAdult', movie.Adult)
        window.localStorage.setItem('movieLanguage', movie.original_language)
        window.localStorage.setItem('moviePlot', movie.overview)
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
