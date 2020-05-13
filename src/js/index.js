import SONG_COVER from '../img/agp.png'
import { ENDPOINT } from '../js/config'

let listElelemts = ''
let errorIs = null
let songs = []
const query = `query GetSongs {
  songs{id, title, photo_url}
}`

fetch(ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
  })
})
.then((r) => {  
  if(!r.ok){
    errorIs = r.statusText
  } 
  return r.json()
})
.then(data => {
  if (data.data && data.data.songs) {
    songs = data.data.songs
  }
}).catch((error) => {
  errorIs = error  
}).finally(() => {
  renderHomePage(songs, errorIs)
})

const renderHomePage = (songsList, error) => {

  const loaderElement = document.getElementById('loader')
  loaderElement.classList.remove('loader')  

  if (error) {
    alert(error)
  } else {
    paintListOfSongs(songsList)
  }
}

const paintListOfSongs = (songsList) => {

  songsList.forEach((element) => {
    const template = `
      <div class="card">
      <img class="card-img-top" src="${element.photo_url || SONG_COVER}" alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title"></h5>
      <a href="../song/song.html?songId=${element.id}" class="card-link">${element.title}</a></div></div>
      `
    listElelemts += template
  })
  document.getElementById('card-deck').insertAdjacentHTML('afterbegin', listElelemts)
  document.getElementById('searchInput').removeAttribute('disabled')
}