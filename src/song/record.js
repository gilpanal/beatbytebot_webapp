/* https://github.com/naomiaro/waveform-playlist/blob/master/dist/waveform-playlist/js/record.js */
import { playlist } from './song'


export class Recorder {

    init() {
        let userMediaStream
        const constraints = { audio: true }

        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia)

        const gotStream = (stream) => {
            userMediaStream = stream
            playlist.initRecorder(userMediaStream)
            $(".btn-record").removeClass("disabled")
        }

        const logError = (err) => {
            console.error(err);
        }

        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(gotStream)
                .catch(logError)
        } else if (navigator.getUserMedia && 'MediaRecorder' in window) {
            navigator.getUserMedia(
                constraints,
                gotStream,
                logError
            )
        }
    }
}
