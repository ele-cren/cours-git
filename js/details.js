const detailContainer = document.getElementById('detail-container')
const movieTitle = window.localStorage.getItem('movieTitle')
const moviePoster = window.localStorage.getItem('moviePoster')
const movieYear = window.localStorage.getItem('movieYear')
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
year.innerText = 'Release date : ' + movieYear
year.title = movieYear
const adult = document.createElement('h4')
adult.innerText = movieAdult === 'false' ? 'Is not an adult movie' : 'Is an adult movie'
adult.title = movieAdult
const language = document.createElement('h4')
language.innerText = 'Original language : ' + movieLanguage
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
