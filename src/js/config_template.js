const MODE = 'DEV'

// TELEGRAM BOT INFO: TOKEN, NAME
// More info: https://core.telegram.org/bots#6-botfather

// PROD

const BOT_TOKEN_PROD = ''
const BOT_NAME_PROD = ''
const ENDPOINT_PROD = ''

// DEV
  
const BOT_TOKEN_DEV = ''
const BOT_NAME_DEV = ''
const ENDPOINT_DEV = ''


export const BOT_TOKEN = (MODE === 'PROD') ? BOT_TOKEN_PROD : BOT_TOKEN_DEV

export const BOT_NAME = (MODE === 'PROD') ? BOT_NAME_PROD : BOT_NAME_DEV

export const ENDPOINT = (MODE === 'PROD') ? ENDPOINT_PROD : ENDPOINT_DEV