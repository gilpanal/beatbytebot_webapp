/**
 * TO USE PROD INFO JUST CHANGE => MODE = 'PROD'
 */
const MODE = 'DEV'

// PROD SETTINGS: FIREBASE DATABASE
// More info: https://firebase.google.com/docs/web/setup?authuser=0#config-object
const CONFIG_FIREBASE_PROD = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
}

// TELEGRAM BOT INFO: TOKEN, NAME
// More info: https://core.telegram.org/bots#6-botfather
const BOT_TOKEN_PROD = ''
const BOT_NAME_PROD = ''

// DEV SETTINGS: FIREBASE DATABASE
const CONFIG_FIREBASE_DEV = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
}
// TELEGRAM BOT INFO: TOKEN, NAME
const BOT_TOKEN_DEV = ''
const BOT_NAME_DEV = ''

////////////////////////////////////////////////////////////////////////

export const CONFIG_FIREBASE = (MODE === 'PROD') ? CONFIG_FIREBASE_PROD : CONFIG_FIREBASE_DEV

export const BOT_TOKEN = (MODE === 'PROD') ? BOT_TOKEN_PROD : BOT_TOKEN_DEV

export const BOT_NAME = (MODE === 'PROD') ? BOT_NAME_PROD : BOT_NAME_DEV