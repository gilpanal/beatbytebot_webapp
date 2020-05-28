/* https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript : Dealing with binary data */    
/* https://stackoverflow.com/a/38968948 */

import { UPLOAD_ENDPOINT } from '../js/config'
import { USER_INFO } from './song'

export class FileUploader {
    constructor(chatId, trackhandler, loaderElementId) {       
        this.chatId = chatId
        this.trackhandler = trackhandler
        this.loaderElementId = loaderElementId
    }
    enableUpload(){
             
        dropContainer.ondragover = dropContainer.ondragenter = (evt) => {            
            evt.preventDefault()
        }

        dropContainer.ondrop = (evt) => {            
            fileInput.files = evt.dataTransfer.files
            this.fileReader(fileInput.files[0])   
            evt.preventDefault()
        }
    }
    fileReader (thefile) {
               
        const chatField = {name:'chat_id' , value: this.chatId}
        const file = {
            dom: document.getElementById('fileInput'),
            binary: null
        }
        const reader = new FileReader()
    
        reader.addEventListener('load', () => {
           
            file.binary = reader.result
        })

        reader.addEventListener('loadend', () => {
            this.sendData(file, chatField)
        })
    
        if (thefile) {
            reader.readAsBinaryString(thefile)
        }
        
        file.dom.addEventListener("change", () => {
            if (reader.readyState === FileReader.LOADING) {
                reader.abort()
            }
            reader.readAsBinaryString(file.dom.files[0])
        })    
    }
    sendData(file, chatField) {        
        
        if (!file.binary && file.dom.files.length > 0) {
            setTimeout(this.sendData, 10)
            return
        }
    
        const XHR = new XMLHttpRequest()    
        
        const formData = new FormData()
        formData.append(chatField.name, chatField.value)
        formData.append(file.dom.name, file.dom.files[0], file.dom.files[0].name)      
        formData.append('user_info', USER_INFO)  
        
        XHR.addEventListener('load', (event) => {                     
            this.cancelLoader()
            if(event.srcElement && event.srcElement.response){
                const respJson = JSON.parse(event.srcElement.response)
                if(respJson.ok){
                    alert('Yeah! Data sent and response loaded.')
                } else {
                    alert('Oops! Something went wrong.')
                }                
            } else {
                alert('Oops! Something went wrong.')                          
            }            
        })
        
        XHR.addEventListener('error', (event) => {
            this.cancelLoader()
            alert('Oops! Something went wrong.')
        })
       
        XHR.open('POST', UPLOAD_ENDPOINT)                
        XHR.send(formData)      
        this.startLoader()
    }
    startLoader() {
        const loaderElement = document.getElementById(this.loaderElementId)
        loaderElement.classList.add(this.loaderElementId) 
    }
    cancelLoader() {
        const loaderElement = document.getElementById(this.loaderElementId)
        loaderElement.classList.remove(this.loaderElementId) 
    }
}
