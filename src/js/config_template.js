const MODE = 'PROD'
const DEVPORT = 8080

// PROD CONFIG:  Telegram Login Widget won't work (only one domain allowed for widget). 
// You can create your own bot and use it for login. 
// Follow these steps: https://github.com/gilpanal/beatbytebot_webapp/wiki/Telegram-Login-Widget
// and chenge to BOT_NAME_PROD variable to your bot name 

const BOT_NAME_PROD = 'bunchofsongs_bot'
const BASE_ENDPOINT_PROD = 'https://bunchofsongsapi.herokuapp.com/graphql'
const UPLOAD_ENDPOINT_PROD = 'https://bunchofsongsapi.herokuapp.com/fileUpload'
const FILES_ENDPOINT_PROD = 'https://bunchofsongsapi.herokuapp.com/fileDownload?'

// DEV CONFIG: you need to run https://github.com/gilpanal/bunchofsongs_api

const BOT_NAME_DEV = ''
const BASE_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/graphql'
const UPLOAD_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/fileUpload'
const FILES_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/fileDownload?'


export const BOT_NAME = (MODE === 'PROD') ? BOT_NAME_PROD : BOT_NAME_DEV

export const ENDPOINT = (MODE === 'PROD') ? BASE_ENDPOINT_PROD : BASE_ENDPOINT_DEV

export const UPLOAD_ENDPOINT = (MODE === 'PROD') ? UPLOAD_ENDPOINT_PROD : UPLOAD_ENDPOINT_DEV

export const FILES_ENDPOINT = (MODE === 'PROD') ? FILES_ENDPOINT_PROD : FILES_ENDPOINT_DEV