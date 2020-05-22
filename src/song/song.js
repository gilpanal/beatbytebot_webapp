import { ENDPOINT } from '../js/config'
import WaveformPlaylist from 'waveform-playlist'

let userInfo = localStorage.getItem('telUser')

export const playlist = WaveformPlaylist({
  samplesPerPixel: 3000,
  waveHeight: 100,
  container: document.getElementById('playlist'),
  state: 'cursor',
  colors: {
    waveOutlineColor: '#E0EFF1',
    timeColor: 'grey',
    fadeColor: 'black'
  },
  controls: {
    show: true,
    width: 200
  },
  zoomLevels: [500, 1000, 3000, 5000],
  timescale: true
})

function Track(title, link) {
  this.name = title
  this.src = `https://cors-anywhere.herokuapp.com/${link}`
}

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const songId = parseFloat(urlParams.get('songId'))

let songName = 'No name'
let songNameHtml = '<h1 class="post-title">No name</h1>'
let lyricsHtml = null
let errorIs = null
let tracksInfo = {}

let query = `query GetTracks($songId: Float!) {
  songInfoById(songId: $songId){title, doc_url},tracks(songId: $songId){ message {date, audio{title}}, file_path}
}`
let body = JSON.stringify({
  query,
  variables: { songId }, 
})
if(userInfo){
  userInfo = JSON.parse(userInfo)
  query = `query GetTracks($songId: Float!, $userInfo: UserInfo) {
    songInfoById(songId: $songId, userInfo: $userInfo ){title, doc_url, user_permission},tracks(songId: $songId){ message {date, audio{title}}, file_path}
  }`
  body = JSON.stringify({
    query,
    variables: { songId, userInfo }, 
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
.then((data) => {  
  if(data.data){    
    tracksInfo = data.data
  }
})
.catch((error) =>{
  errorIs = error  
})
.finally (() =>{ 
  if(errorIs){
    alert(errorIs)
  }
  createArrayOfTracks(tracksInfo)
  drawSongDetailInfo(tracksInfo)
})

const createArrayOfTracks = (tracksInfo) => {
  if(tracksInfo.tracks){
    const arrayLoad = []
    tracksInfo.tracks.forEach((element) => {
      const title = element?.message?.audio?.title || element.message.date
      const newTrack = new Track(title, element.file_path)
      arrayLoad.push(newTrack)   
    })
    createTrackList(arrayLoad)
  }else{
    cancelLoader()
  } 
}

const createTrackList = (arrayLoad) => {
  let errorIs = null
  playlist.load(arrayLoad).then(() => {
    playlist.initExporter()
  }).catch((error) => {
    errorIs = error
  })
  .finally(() => {
    cancelLoader()   
    if (errorIs) {
      alert(errorIs)
    }
  })
}
const drawSongDetailInfo = (tracksInfo) => { 
  //const isAdmin = tracksInfo.songInfoById && tracksInfo.songInfoById.user_permission
  
  const songInfo = tracksInfo.songInfoById
  if(songInfo && songInfo.doc_url){    
    lyricsHtml = `<a href="#" onclick="window.open('${songInfo.doc_url}', 'lyrics_popup', 'fullscreen=yes',false); return false">Lyrics</a>`
    document.getElementById('post-header').insertAdjacentHTML('afterbegin', lyricsHtml) 
  }  
  if(songInfo){
    songName = songInfo.title
    songNameHtml = `<h1 class="post-title">${songName}</h1>`    
  } 
  document.getElementById('post-header').insertAdjacentHTML('afterbegin', songNameHtml)  
}

const cancelLoader = () => {
  const loaderElement = document.getElementById('loader')
  loaderElement.classList.remove('loader') 
}