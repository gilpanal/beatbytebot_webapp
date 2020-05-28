//import demotrack from '../demoaudio/vocal.mp3'
import { ENDPOINT } from '../js/config'
import { LOADER_ELEM_ID, SONG_ID, setUser, trackHandler, fileUploader, playlist } from './song'

function Track(title, link, customClass) {
    this.name = title
    this.src = `https://cors-anywhere.herokuapp.com/${link}`
    //this.src = link // to test local demotrack
    this.customClass = customClass
}

export const doFetch = (body, callback) => {

    let errorIs = null
    let tracksInfo = {}

    fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: body
    })
    .then((r) => {
        if (!r.ok) {
            errorIs = r.statusText
        }
        return r.json()
    })
    .then((data) => {
        if (data.data) {
            tracksInfo = data.data
        }
    })
    .catch((error) => {
        errorIs = error
    })
    .then(() => {
        if (errorIs) {
            alert(errorIs)
        }
        callback(tracksInfo)
    })

}

export const doAfterSongFetched = (tracksInfo) => {
    createArrayOfTracks(tracksInfo)
    drawSongDetailInfo(tracksInfo)
}

export const telegramLoginCallback = (telegramUser) => {
    setUser(telegramUser)
    const userInfo = JSON.parse(telegramUser)
    const songId = SONG_ID
    const query = `query GetUserPermission($songId: Float!, $userInfo: UserInfo) {
        songInfoById(songId: $songId, userInfo: $userInfo ){user_permission}
    }`
    const body = JSON.stringify({
        query,
        variables: { songId, userInfo },
    })
    doFetch(body, successfulLoginAtPage)
}

const cancelLoader = (loaderId) => {
    const loaderElement = document.getElementById(loaderId)
    loaderElement.classList.remove(loaderId)
}

const successfulLoginAtPage = (info) => {

    if (info && info.songInfoById.user_permission) {
        fileUploader.enableUpload()
        trackHandler.displayOptMenuForTracks()
    }
}

const createArrayOfTracks = (tracksInfo) => {
    const isAdmin = tracksInfo.songInfoById && tracksInfo.songInfoById.user_permission
    if (isAdmin) {
        fileUploader.enableUpload()
    }
    if (tracksInfo.tracks) {
        const arrayLoad = []
        tracksInfo.tracks.forEach((element) => {
            const audio = element?.message?.audio || element?.message?.voice
            const title = audio.title || element.message.date
            const track_id = audio.file_unique_id + '_' + element.message.date
            const customClass = { chatId: SONG_ID, message_id: element.message.message_id, name: title, track_id: track_id }
            const newTrack = new Track(title, element.file_path , customClass)
            //const newTrack = new Track(title, demotrack, customClass) // to test local demo track
            arrayLoad.push(newTrack)
        })
        createTrackList(arrayLoad, isAdmin)
    } else {
        cancelLoader(LOADER_ELEM_ID)
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
        cancelLoader(LOADER_ELEM_ID)
        if (errorIs) {
            alert(errorIs)
        } else {
            if (isAdmin) {
                trackHandler.displayOptMenuForTracks()
            }
        }
    })
}
const drawSongDetailInfo = (tracksInfo) => {
    let lyricsHtml = null
    let songName = 'No name'
    let songNameHtml = '<h1 class="post-title">No name</h1>'
    const songInfo = tracksInfo.songInfoById
    if (songInfo && songInfo.doc_url) {
        lyricsHtml = `<a href="#" onclick="window.open('${songInfo.doc_url}', 'lyrics_popup', 'fullscreen=yes',false); return false">Lyrics</a>`
        document.getElementById('post-header').insertAdjacentHTML('afterbegin', lyricsHtml)
    }
    if (songInfo) {
        songName = songInfo.title
        songNameHtml = `<h1 class="post-title">${songName}</h1>`
    }
    document.getElementById('post-header').insertAdjacentHTML('afterbegin', songNameHtml)
}