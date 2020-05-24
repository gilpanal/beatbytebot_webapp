import { ENDPOINT } from '../js/config'
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
                this.deleteTrackConfirmDialog(event, this.sendDeleteRequest)
            }
            listOptionsItem.appendChild(document.createTextNode('Delete'))
            listOptions.appendChild(listOptionsItem)
            document.getElementById(menuBtnId).appendChild(listOptions)
        }
    }
    deleteTrackConfirmDialog(event, callback) {

        const dialog = confirm('Delete ' + event.target.dataset.name + '?')
        if (dialog) {
            callback(event.target.dataset.chatId, event.target.id, event.target.dataset.trackId)
        }
    }
    sendDeleteRequest(chat_id, message_id, track_id) {
        const me = this
        chat_id = parseFloat(chat_id)
        message_id = parseInt(message_id)

        let errorIs = null
        let deleteTrackResult = {}
        let userInfo = localStorage.getItem('telUser')
        userInfo = JSON.parse(userInfo)

        const query = `query DeleteTrack($chat_id: Float!, $message_id: Int!, $track_id: String!, $userInfo: UserInfo!) {
            deleteMessage(chat_id: $chat_id, message_id: $message_id, track_id: $track_id, userInfo: $userInfo ){ ok, description }
        }`
        const body = JSON.stringify({
            query,
            variables: { chat_id, message_id, track_id, userInfo },
        })
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
            
            // data.errors[0].message => check error
            if (data.data) {
                deleteTrackResult = data.data
            }
        })
        .catch((error) => {            
            errorIs = error
        })
        .then(() => {
            if (errorIs) {
                alert(errorIs)
            } else {
                if (deleteTrackResult.deleteMessage.ok) {
                    alert('Track deleted successfully!')                    
                }
            }
        })
    }
}
