import WaveformPlaylist from 'waveform-playlist'
import { CONFIG_FIREBASE } from '../js/config'

firebase.initializeApp(CONFIG_FIREBASE)

export const playlist = WaveformPlaylist({
  samplesPerPixel: 3000,
  waveHeight: 100,
  container: document.getElementById("playlist"),
  state: "cursor",
  colors: {
    waveOutlineColor: "#E0EFF1",
    timeColor: "grey",
    fadeColor: "black"
  },
  controls: {
    show: true,
    width: 200
  },
  zoomLevels: [500, 1000, 3000, 5000]
})

function Track(title, link) {
  this.name = title
  this.src = `https://cors-anywhere.herokuapp.com/${link}`
}

const dbRef = firebase.database().ref()

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const songId = urlParams.get('songId')

const arrayLoad = []
let songName = 'No name'
let songNameHtml = '<h1 class="post-title">No name</h1>'
let lyricsHtml = null


dbRef.child(`songs/${songId}`).once('value').then((snapshot) => {
  const snap = snapshot.val()
  if (snap) {
    songName = snapshot.val().name
    songNameHtml = `<h1 class="post-title">${songName}</h1>`
    if (snapshot.val().lyrics.link !== '') {
      lyricsHtml = `<a href="#" onclick="window.open('${snapshot.val().lyrics.link}', 'lyrics_popup', 'fullscreen=yes',false); return false">Lyrics</a>`
    }
    const tracks = snapshot.val().tracks
    if (tracks && tracks.length) {
      snapshot.val().tracks.forEach((element) => {
        if (element.link !== '') {
          const audio = element.msgInfo.voice || element.msgInfo.audio
          const title = audio.title ? audio.title : element.msgInfo.date
          const newTrack = new Track(title, element.link)
          arrayLoad.push(newTrack)
        }
      })
    }
  }
}).catch((error) => {
  console.log('Failed :', error)
})
  .finally(() => {
    let errorIs = null
    document.title = songName
    if (lyricsHtml) {
      document.getElementById('post-header').insertAdjacentHTML('afterbegin', lyricsHtml)
    }
    document.getElementById('post-header').insertAdjacentHTML('afterbegin', songNameHtml)
    playlist.load(arrayLoad).then(() => {
      playlist.initExporter()
    }).catch((error) => {
      errorIs = error
    })
      .finally(() => {
        const loaderElement = document.getElementById('loader')
        loaderElement.classList.remove('loader')
        if (errorIs) {
          alert(errorIs)
        }
      })
  })
