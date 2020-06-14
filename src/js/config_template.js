const MODE = 'STAGE'
const DEVPORT = 8080

/* PROD and STAGE CONFIG:  
   Telegram Login Widget won't work (only one domain allowed for widget). 
   You can create your own bot and use it for login. 
   Follow these steps: https://github.com/gilpanal/beatbytebot_webapp/wiki/Telegram-Login-Widget
   and chenge to BOT_NAME_PROD variable to your bot name 
*/
/* DEV CONFIG: you need to run https://github.com/gilpanal/bunchofsongs_api */

const ENVIRONMENTS = {
    PROD:{
        BOT_NAME:'beatbytebot',
        ENDPOINT:'https://beatbytebotapi.herokuapp.com/graphql',
        UPLOAD_ENDPOINT:'https://beatbytebotapi.herokuapp.com/fileUpload',
        DOWNLOAD_ENDPOINT: 'https://beatbytebotapi.herokuapp.com/fileDownload?'
    },
    STAGE:{
        BOT_NAME:'bunchofsongs_bot',
        ENDPOINT:'https://bunchofsongsapi.herokuapp.com/graphql',
        UPLOAD_ENDPOINT:'https://bunchofsongsapi.herokuapp.com/fileUpload',
        DOWNLOAD_ENDPOINT: 'https://bunchofsongsapi.herokuapp.com/fileDownload?'
    },
    DEV:{
        BOT_NAME:'bostel_bot',
        ENDPOINT:'http://localhost:'+DEVPORT+'/graphql',
        UPLOAD_ENDPOINT:'http://localhost:'+DEVPORT+'/fileUpload',
        DOWNLOAD_ENDPOINT: 'https://bunchofsongsapi.herokuapp.com/fileDownload?'
    }
}

module.exports = {
    BOT_NAME: ENVIRONMENTS[MODE].BOT_NAME,
    ENDPOINT: ENVIRONMENTS[MODE].ENDPOINT,
    UPLOAD_ENDPOINT: ENVIRONMENTS[MODE].UPLOAD_ENDPOINT,
    DOWNLOAD_ENDPOINT: ENVIRONMENTS[MODE].DOWNLOAD_ENDPOINT
}