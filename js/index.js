// First postMessage top
// If search postMessage search

let movies = []
let type = 'top'
let webWorker

if (window.Worker) {
  webWorker = new Worker('/js/worker.js')
  webWorker.onmessage = (event) => {
    movies = event.data.movies
    console.log(type === 'top' ? movies : movies['Search'])
  }
} else {
  // Not supported by browser
}

const searchMovies = () => {
  if (webWorker) {
    const searchInput = document.getElementById('search')
    const search = searchInput ? searchInput.value : ''
    const oldType = type
    type = search ? 'search' : 'top'
    if (type !== oldType) {
      webWorker.postMessage({ type: type, 'search': search })
    }
  }
}

const getTopMovies = () => {
  if (webWorker) {
    webWorker.postMessage({ type: type })
  }
}

getTopMovies()