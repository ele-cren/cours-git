// First postMessage top
// If search postMessage search

let movies = []
let type = 'top'
let webWorker

if (window.Worker) {
  webWorker = new Worker('/cours-git/js/worker.js') //WARNING : path to change
  webWorker.onmessage = (event) => {
    movies = event.data.movies
    console.log(type === 'top' ? movies : movies['Search'])
  }
} else {
  console.log("Not supported by browser")
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

//Card Movie Display

let cardContainer = document.getElementById('card-container')

const displayMovies = () => {
  if(type === 'top'){
    for(let movie of movies){
      let card = document.createElement('card')

      let img = document.createElement('img');
      img.src = movie['Poster']
      img.alt = movie['Poster']
      img.className = 'card-img-top'

      let cardBody = document.createElement('card-body');

      let title = document.createElement('h5');
      title.innerText = movie['Title'];
      title.className = 'card-title';

      cardBody.appendChild(title);
      card.appendChild(cardBody);
      card.appendChild(img);
      cardContainer.appendChild(card);
    }
  } else {
    //movies['Search']
  }
}

displayMovies()

