import { BOT_TOKEN, BOT_NAME } from './config'
import { createHash, createHmac } from 'crypto'

/* https://gist.github.com/Pitasi/574cb19348141d7bf8de83a0555fd2dc */
const secret = createHash('sha256').update(BOT_TOKEN).digest()

const checkSignature = ({ hash, ...data }) => {
  const checkString = Object.keys(data)
    .sort()
    .map(k => (`${k}=${data[k]}`))
    .join('\n')
  const hmac = createHmac('sha256', secret)
    .update(checkString)
    .digest('hex')
  return hmac === hash
}
const handleTelegramResponse = (response) => {
  console.log(response)
  console.log(checkSignature(response))   
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
  