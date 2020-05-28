/* https://github.com/hprobotic/react-telegram-login/blob/master/src/index.js */

import { BOT_NAME } from './config'

export class TelegramLogin {
  constructor(callBack) {
    this.telegramUser = localStorage.getItem('telUser') || null
    this.callBack = callBack || null
    window.TelegramLoginWidget = {
      dataOnauth: user => this.handleTelegramResponse(user),
    }
  }
  handleTelegramResponse (response) { 
    const userString = JSON.stringify(response)
    this.telegramUser = userString
    localStorage.setItem('telUser', userString)
    if(this.callBack){
      this.callBack(userString)
    }
  }
  init() {  
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?4'
    script.setAttribute('data-telegram-login', BOT_NAME )
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-request-access', 'write')
    script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)')
    script.async = true
    document.getElementById('telegram-login').appendChild(script)
  }
}
  