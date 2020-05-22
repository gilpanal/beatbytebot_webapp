import { BOT_NAME } from './config'

const handleTelegramResponse = (response) => {  
  localStorage.setItem('telUser', JSON.stringify(response))
}
  
window.TelegramLoginWidget = {
  dataOnauth: user => handleTelegramResponse(user),
}

/* https://github.com/hprobotic/react-telegram-login/blob/master/src/index.js */
const script = document.createElement('script')
script.src = 'https://telegram.org/js/telegram-widget.js?4'
script.setAttribute('data-telegram-login', BOT_NAME )
script.setAttribute('data-size', 'large')
// script.setAttribute('data-radius', cornerRadius)
script.setAttribute('data-request-access', 'write')
// script.setAttribute('data-userpic', usePic)
script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)')
script.async = true
document.getElementById('telegram-login').appendChild(script)
  