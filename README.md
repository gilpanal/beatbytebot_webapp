# bunchofsongs
A new concept for collaborative music

## Summary:
The following repository can be used as a template for anyone who wants to create their own client to consume the API provided by https://github.com/gilpanal/bunchofsongs_api, a middleware to connect audio projects through a Telegram Bot: https://github.com/gilpanal/bunchofsongs_bot


## Requirements:
- Node.js (v14)
- API: https://github.com/gilpanal/bunchofsongs_api#how-to-run-it-locally

## How to run it locally:
1. git clone https://github.com/gilpanal/bunchofsongs
2. cd bunchofsongs
3. npm i
4. Rename "src/js/config_template.js" to "src/js/config.js" and adapt it accordingly. See Note.
5. npm run dev
6. Open 127.0.0.1/index.html

#### NOTE:
A public API endpoint will be provided in the future so people don't have to start the API project in their machines to test the web app. By now the following values are needed at `config.js`

>      const BOT_NAME_DEV = ''
>      const BASE_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/graphql'
>      const UPLOAD_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/fileUpload'
>      const CORS_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/proxy/'

Where DEVPORT is `8080` the default number choosen for the API.
BOT_NAME_DEV is the name of your custom bot in case you want to allow login in the web client using th Telegram Login Widget: https://core.telegram.org/widgets/login. It also gives persmission to edit upload and delete tracks in channels/groups where the bot is admin.


## More info:

Wiki: https://github.com/gilpanal/bunchofsongs/wiki

Project Dev Board: https://github.com/gilpanal/bunchofsongs/projects/1

## Acknowledgements:
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/naomiaro"><img src="https://avatars2.githubusercontent.com/u/35253?v=4" width="100px;" alt=""/><br /><sub><b>Naomi Aro</b></sub></a><br /><a href="https://github.com/naomiaro/waveform-playlist" title="Code">💻</a></td> 
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
