const MODE = 'DEV'
const DEVPORT = 8080

// PROD

const BOT_NAME_PROD = ''
const BASE_ENDPOINT_PROD = ''
const UPLOAD_ENDPOINT_PROD = ''
const CORS_ENDPOINT_PROD = ''

// DEV 

const BOT_NAME_DEV = ''
const BASE_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/graphql'
const UPLOAD_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/fileUpload'
const CORS_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/proxy/'


export const BOT_NAME = (MODE === 'PROD') ? BOT_NAME_PROD : BOT_NAME_DEV

export const ENDPOINT = (MODE === 'PROD') ? BASE_ENDPOINT_PROD : BASE_ENDPOINT_DEV

export const UPLOAD_ENDPOINT = (MODE === 'PROD') ? UPLOAD_ENDPOINT_PROD : UPLOAD_ENDPOINT_DEV

export const CORS_ENDPOINT = (MODE === 'PROD') ? CORS_ENDPOINT_PROD : CORS_ENDPOINT_DEV