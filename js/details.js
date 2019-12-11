const detailContainer = document.getElementById('detail-container')
const movieTitle = window.localStorage.getItem('movieTitle')
const moviePoster = window.localStorage.getItem('moviePoster')
const movieYear = window.localStorage.getItem('movieYear')
const movieRuntime = window.localStorage.getItem('movieRuntime')
const movieGenre = window.localStorage.getItem('movieGenre')
const movieCountry = window.localStorage.getItem('movieCountry')
const movieDirector = window.localStorage.getItem('movieDirector')
const movieAdult= window.localStorage.getItem('movieAdult')
const movieLanguage = window.localStorage.getItem('movieLanguage')
const moviePlot = window.localStorage.getItem('moviePlot')

const div = document.createElement('div')
div.className = 'detail'

const title = document.createElement('h1')
title.innerText = movieTitle
title.title = movieTitle
const img = document.createElement('img')
img.src = moviePoster
img.alt = moviePoster
const year = document.createElement('h4')
year.innerText = movieYear
year.title = movieYear
const adult = document.createElement('h4')
adult.innerText = movieAdult
adult.title = movieAdult
const language = document.createElement('h4')
language.innerText = movieLanguage
language.title = movieLanguage
const plot = document.createElement('h2')
plot.innerText = moviePlot
plot.title = moviePlot

div.appendChild(title)
div.appendChild(img)
div.appendChild(year)
div.appendChild(language)
div.appendChild(adult)
div.appendChild(plot)
detailContainer.appendChild(div)
