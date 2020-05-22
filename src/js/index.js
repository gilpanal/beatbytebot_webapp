import SONG_COVER from '../img/agp.png'
import { ENDPOINT } from '../js/config'

let listElelemts = ''
let errorIs = null
let songs = []

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let collectionName = urlParams.get('collection')

let query = `query GetSongs {
  songs{id, title, photo_url, collection}
}`
let body = JSON.stringify({
  query,  
})
if(collectionName){
  collectionName = decodeURI(collectionName)
  query = `query GetSongs($collectionName: String!) {
    collection(collectionName: $collectionName){id, title, photo_url}
  }`
  body = JSON.stringify({
    query,
    variables: {collectionName},
  })
}

fetch(ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: body
})
.then((r) => {  
  if(!r.ok){
    errorIs = r.statusText
  } 
  return r.json()
})
.then(data => {
  if (data.data && data.data.songs || data.data.collection) {    
    songs = data.data.songs || data.data.collection
  }
}).catch((error) => {
  errorIs = error  
}).then(() => {
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
    let collection = ''
    if(element.collection){
      collection = `<a href="./index.html?collection=${element.collection}" class="card-link text-info">${element.collection}</a>`
    }    
    const template = `
      <div class="card">
      <a href="../song/song.html?songId=${element.id}">
        <img class="card-img-top" src="${element.photo_url || SONG_COVER}" alt="Card image cap">
      </a>
      <div class="card-body">
      <h5 class="card-title"></h5>
      <a href="../song/song.html?songId=${element.id}" class="card-link">${element.title}</a><br>
      ${collection}
      </div>
      </div>
      `
    listElelemts += template
  })
  document.getElementById('card-deck').insertAdjacentHTML('afterbegin', listElelemts)
  document.getElementById('searchInput').removeAttribute('disabled')
}