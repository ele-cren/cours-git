// First postMessage top
// If search postMessage search

let movies = []
let type = 'top'
let webWorker

if (window.Worker) {
  webWorker = new Worker('/js/worker.js') //WARNING : path to change
  webWorker.onmessage = (event) => {
    movies = type === 'top' ? event.data.movies : event.data.movies['Search']
    displayMovies()
  }
} else {
  console.log("Not supported by browser")
}

const searchMovies = () => {
  if (webWorker) {
    const searchInput = document.getElementById('search')
    const search = searchInput ? searchInput.value : ''
    console.log('search')
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

//Card Movie Display

const displayMovies = () => {
  let cardContainer = document.getElementById('card-container')
  cardContainer.textContent = ''
  for(let movie of movies){
    let card = document.createElement('div')
    card.className = 'card'

    let img = document.createElement('img');
    img.src = movie['Poster']
    img.alt = movie['Poster']
    img.className = 'card-img-top'

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body'

    let title = document.createElement('h5');
    title.innerText = movie['Title'];
    title.className = 'card-title';

    cardBody.appendChild(title);
    card.appendChild(cardBody);
    card.appendChild(img);
    cardContainer.appendChild(card);
  }
}

getTopMovies()