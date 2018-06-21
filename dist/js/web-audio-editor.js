var playlist = WaveformPlaylist.init({
  samplesPerPixel: 3000,
  waveHeight: 100,
  container: document.getElementById("playlist"),
  state: 'cursor',
  colors: {
    waveOutlineColor: '#E0EFF1',
    timeColor: 'grey',
    fadeColor: 'black'
  },
  timescale: true,
  controls: {
    show: true, //whether or not to include the track controls
    width: 200 //width of controls in pixels
  },
  seekStyle : 'line',
  zoomLevels: [500, 1000, 3000, 5000]
});

playlist.load([
  {
    "src": "media/Estefa/Acustica_00.mp3",
    "name": "Guitar",
    "fadeIn": {
      "duration": 0.5
    },
    "fadeOut": {
      "duration": 0.5
    },    
    
    "waveOutlineColor": '#c0dce0'
  },
  {
    "src": "media/Estefa/Acustica_01.mp3",
    "name": "Guitar",
    "start": 8.5,
    "gain": 0.10,
    "fadeIn": {
      "shape": "logarithmic",
      "duration": 0.5
    },
    "fadeOut": {
      "shape": "logarithmic",
      "duration": 0.5
    }
  },
  {
    "src": "media/Estefa/Voz_01.mp3",
    "name": "Vocals",
    "start": 23.5,
    "customClass": "vocals",
    "fadeOut": {
      "shape": "linear",
      "duration": 0.5
    },
    "cuein": 15
  },
  {
    "src": "media/Estefa/Voz_02.mp3",
    "name": "Vocals",
    "start": 23.5,
    "customClass": "vocals",
    "fadeOut": {
      "shape": "linear",
      "duration": 0.5
    },
    "cuein": 15
  }
]).then(function() {
  //can do stuff with the playlist.

  //initialize the WAV exporter.
  playlist.initExporter();
});