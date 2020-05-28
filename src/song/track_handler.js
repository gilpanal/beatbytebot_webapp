import { doFetch } from './song_helper'
import { USER_INFO, SONG_ID } from './song'

export class TrackHandler {
    constructor(playlist) {
        this.playlist = playlist
    }
    displayOptMenuForNewTrack(newTrack){        
        const element = newTrack.result
        const audio = element?.message?.audio || element?.message?.voice
        const title = audio.title || element.message.date
        const track_id = audio.file_unique_id + '_' + element.message.date
        const controlsList = document.getElementsByClassName('controls')
        const message_id = element.message.message_id
        const pos = controlsList.length - 1  
        this.createMenuOptButton(controlsList, pos, message_id, title, track_id, SONG_ID)
    }
    displayOptMenuForTracks() {

        const controlsList = document.getElementsByClassName('controls')
        const arrayTracks = this.playlist.getInfo()

        for (let i = 0; i < controlsList.length; i++) {
            if(arrayTracks[i].customClass){
                const message_id = arrayTracks[i].customClass.message_id
                const name = arrayTracks[i].customClass.name
                const track_id = arrayTracks[i].customClass.track_id
                const chatId = arrayTracks[i].customClass.chatId
                this.createMenuOptButton(controlsList, i, message_id, name, track_id, chatId)
            }            
        }
    }
    createMenuOptButton(controlsList, pos, message_id, name, track_id, chatId){
        const menuBtnId = 'menuoptbtn-' + pos
        const menuDrpDownId = 'menuDropdown' + pos
        const span = document.createElement('span')
        const txt = document.createTextNode('...')
        span.className = 'menuoptbtn'
        span.onclick = () => {
            document.getElementById(menuDrpDownId).classList.toggle('show')
        }
        span.id = menuBtnId
        span.appendChild(txt)
        controlsList[pos].appendChild(span)
        const listOptions = document.createElement('ul')
        listOptions.id = menuDrpDownId
        listOptions.className = 'dropdown-content'
        const listOptionsItem = document.createElement('li')
        listOptionsItem.id = message_id
        listOptionsItem.dataset.name = name
        listOptionsItem.dataset.trackId = track_id
        listOptionsItem.dataset.chatId = chatId
        listOptionsItem.onclick = (event) => {
            this.deleteTrackConfirmDialog(event, this.sendDeleteRequest, this.doAfterDeleted)
        }
        listOptionsItem.appendChild(document.createTextNode('Delete'))
        listOptions.appendChild(listOptionsItem)
        document.getElementById(menuBtnId).appendChild(listOptions)
    }
    deleteTrackConfirmDialog(event, callback, afterCallback) {

        const dialog = confirm('Delete ' + event.target.dataset.name + '?')
        if (dialog) {
            callback(event.target.dataset.chatId, event.target.id, event.target.dataset.trackId, afterCallback)
        }
    }
    sendDeleteRequest(chat_id, message_id, track_id, doAfterDeleted) {
   
        chat_id = parseFloat(chat_id)
        message_id = parseInt(message_id)

        const userInfo = JSON.parse(USER_INFO)

        const query = `query DeleteTrack($chat_id: Float!, $message_id: Int!, $track_id: String!, $userInfo: UserInfo!) {
            deleteMessage(chat_id: $chat_id, message_id: $message_id, track_id: $track_id, userInfo: $userInfo ){ ok, description }
        }`
        const body = JSON.stringify({
            query,
            variables: { chat_id, message_id, track_id, userInfo },
        })

        doFetch(body, doAfterDeleted)       
    }
    doAfterDeleted (deleteTrackResult){
        if (deleteTrackResult.deleteMessage && deleteTrackResult.deleteMessage.ok) {
            alert('Track deleted successfully!')                    
        }
    }
}
