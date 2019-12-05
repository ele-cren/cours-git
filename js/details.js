const pageTitle = document.getElementById('title')
const movie = window.localStorage.getItem('movieItem')

console.log(movie.Title)

pageTitle.innerText = movie.Title
