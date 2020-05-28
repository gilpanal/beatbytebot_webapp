import { doFetch } from './song_helper'
import { USER_INFO } from './song'

export class TrackHandler {
    constructor(playlist) {
        this.playlist = playlist
    }
    displayOptMenuForTracks() {

        const controlsList = document.getElementsByClassName('controls')
        const arrayTracks = this.playlist.getInfo()

        for (let i = 0; i < controlsList.length; i++) {
            const menuBtnId = 'menuoptbtn-' + i
            const menuDrpDownId = 'menuDropdown' + i
            const span = document.createElement('span')
            const txt = document.createTextNode('...')
            span.className = 'menuoptbtn'
            span.onclick = () => {
                document.getElementById(menuDrpDownId).classList.toggle('show')
            }
            span.id = menuBtnId
            span.appendChild(txt)
            controlsList[i].appendChild(span)
            const listOptions = document.createElement('ul')
            listOptions.id = menuDrpDownId
            listOptions.className = 'dropdown-content'
            const listOptionsItem = document.createElement('li')
            listOptionsItem.id = arrayTracks[i].customClass.message_id
            listOptionsItem.dataset.name = arrayTracks[i].customClass.name
            listOptionsItem.dataset.trackId = arrayTracks[i].customClass.track_id
            listOptionsItem.dataset.chatId = arrayTracks[i].customClass.chatId
            listOptionsItem.onclick = (event) => {
                this.deleteTrackConfirmDialog(event, this.sendDeleteRequest, this.doAfterDeleted)
            }
            listOptionsItem.appendChild(document.createTextNode('Delete'))
            listOptions.appendChild(listOptionsItem)
            document.getElementById(menuBtnId).appendChild(listOptions)
        }
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
