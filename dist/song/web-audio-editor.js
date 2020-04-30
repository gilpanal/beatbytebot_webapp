/* eslint-disable no-undef */
// eslint-disable-next-line import/no-unresolved
const config = CONFIG_DEV;
firebase.initializeApp(config);


const playlist = WaveformPlaylist.init({
  samplesPerPixel: 3000,
  waveHeight: 100,
  container: document.getElementById('playlist'),
  state: 'cursor',
  colors: {
    waveOutlineColor: '#E0EFF1',
    timeColor: 'grey',
    fadeColor: 'black',
  },
  timescale: true,
  controls: {
    show: true, // whether or not to include the track controls
    width: 200, // width of controls in pixels
  },
  seekStyle: 'line',
  zoomLevels: [500, 1000, 3000, 5000],
});

function Track(title, link) {
  this.name = title;
  this.src = `https://cors-anywhere.herokuapp.com/${link}`;
}

const dbRef = firebase.database().ref();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const songId = urlParams.get('songId');

const arrayLoad = [];
let songName = 'No name';
let songNameHtml = '<h1 class="post-title">No name</h1>';
let lyricsHtml = null;

dbRef.child(`songs/${songId}`).once('value').then((snapshot) => {
  const snap = snapshot.val();
  if (snap) {
    songName = snapshot.val().name;
    songNameHtml = `<h1 class="post-title">${songName}</h1>`;
    if (snapshot.val().lyrics.link !== '') {
      lyricsHtml = `<a href="#" onclick="window.open('${snapshot.val().lyrics.link}', 'lyrics_popup', 'fullscreen=yes',false); return false">Lyrics</a>`;
    }
    const tracks = snapshot.val().tracks;
    if (tracks && tracks.length) {
      snapshot.val().tracks.forEach((element) => {
        if (element.link !== '') {
          const audio = element.msgInfo.voice || element.msgInfo.audio;
          const title = audio.title ? audio.title : element.msgInfo.date;
          const newTrack = new Track(title, element.link);
          arrayLoad.push(newTrack);
        }
      });
    }
  }
}).catch((error) => {
  // eslint-disable-next-line no-console
  console.log('Failed :', error);
})
.finally(() => {
  document.title = songName;
  if (lyricsHtml) {
    document.getElementById('post-header').insertAdjacentHTML('afterbegin', lyricsHtml);
  }
  document.getElementById('post-header').insertAdjacentHTML('afterbegin', songNameHtml);
  playlist.load(arrayLoad).then(() => {
    playlist.initExporter();
  });
});
