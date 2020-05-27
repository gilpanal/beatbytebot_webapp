import { ENDPOINT } from '../js/config'
//import demotrack from '../demoaudio/vocal.mp3'
import { TrackHandler } from './track_handler'
import { FileUploader } from './fileuploader'
import WaveformPlaylist from 'waveform-playlist'

const LOADER_ELEM_ID = 'loader'
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

function Track(title, link, customClass) {
  this.name = title
  this.src = `https://cors-anywhere.herokuapp.com/${link}`
  //this.src = link // to test local demotrack
  this.customClass = customClass
}

const trackHandler = new TrackHandler(playlist)
const queryString = window.location.search
const songId = parseFloat(queryString.split('songId=')[1])
const fileUploader = new FileUploader(userInfo, songId, trackHandler, LOADER_ELEM_ID)

let songName = 'No name'
let songNameHtml = '<h1 class="post-title">No name</h1>'
let lyricsHtml = null
let errorIs = null
let tracksInfo = {}

let query = `query GetTracks($songId: Float!) {
  songInfoById(songId: $songId){title, doc_url},tracks(songId: $songId){ id, message {message_id, date, audio{title, file_unique_id}, voice{file_unique_id}}, file_path}
}`
let body = JSON.stringify({
  query,
  variables: { songId }, 
})
if(userInfo){
  userInfo = JSON.parse(userInfo)
  query = `query GetTracks($songId: Float!, $userInfo: UserInfo) {
    songInfoById(songId: $songId, userInfo: $userInfo ){title, doc_url, user_permission},tracks(songId: $songId){ id, message {message_id, date, audio{title, file_unique_id}, voice{file_unique_id}}, file_path}
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
.then (() =>{ 
  if(errorIs){
    alert(errorIs)
  }
  createArrayOfTracks(tracksInfo)
  drawSongDetailInfo(tracksInfo)
})

const createArrayOfTracks = (tracksInfo) => {
  const isAdmin = tracksInfo.songInfoById && tracksInfo.songInfoById.user_permission  
  if(isAdmin){    
    fileUploader.enableUpload()
  }
  if(tracksInfo.tracks){
    const arrayLoad = []
    tracksInfo.tracks.forEach((element) => {
      const audio = element?.message?.audio || element?.message?.voice    
      const title = audio.title || element.message.date
      const track_id=  audio.file_unique_id + '_' + element.message.date      
      const customClass = {chatId: songId, message_id:element.message.message_id, name: title, track_id:track_id }
      const newTrack = new Track(title, element.file_path , customClass)
      //const newTrack = new Track(title, demotrack , customClass) // to test local demo track
      arrayLoad.push(newTrack)   
    })
    createTrackList(arrayLoad, isAdmin)
  }else{
    cancelLoader()
  } 
}

const createTrackList = (arrayLoad, isAdmin) => {
  let errorIs = null
  playlist.load(arrayLoad).then(() => {
    playlist.initExporter()
  }).catch((error) => {
    errorIs = error
  })
  .then(() => {
    cancelLoader()   
    if (errorIs) {
      alert(errorIs)
    } else {      
      if(isAdmin){
        trackHandler.displayOptMenuForTracks() 
      }
    }
  })
}
const drawSongDetailInfo = (tracksInfo) => { 

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
  const loaderElement = document.getElementById(LOADER_ELEM_ID)
  loaderElement.classList.remove(LOADER_ELEM_ID) 
}