# beatbytebot_webapp
A new concept for collaborative music

## Summary:
The following repository can be used as a template for anyone who wants to create their own client to consume the API provided by https://github.com/gilpanal/beatbytebot_api, a middleware to connect audio projects through a Telegram Bot: https://github.com/gilpanal/beatbytebot


## Requirements:
- Node.js (v14)

## How to run it locally:
1. git clone https://github.com/gilpanal/beatbytebot_webapp
2. cd beatbytebot_webapp
3. npm i
4. Rename "src/js/config_template.js" to "src/js/config.js" and adapt it accordingly. See Note.
5. Do the following asjustments: https://github.com/gilpanal/beatbytebot_webapp/wiki/Solved-Issues
6. npm run dev
7. Open 127.0.0.1/index.html

#### NOTE:
In case you are running the API locally (https://github.com/gilpanal/beatbytebot_api#how-to-run-it-locally). Change the following values at `config.js`

>      const BOT_NAME_DEV = ''
>      const BASE_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/graphql'
>      const UPLOAD_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/fileUpload'
>      const CORS_ENDPOINT_DEV = 'http://localhost:'+DEVPORT+'/proxy/'

DEVPORT is `8080` by default or the number choosen for the API in case you use a different port.
BOT_NAME_DEV is the name of your custom bot in case you want to allow login in the web client using the Telegram Login Widget (https://core.telegram.org/widgets/login). This also gives persmission to upload and delete tracks in channels/groups where the user is admin.


## More info:

Wiki: https://github.com/gilpanal/beatbytebot_webapp/wiki

Project Dev Board: https://github.com/gilpanal/beatbytebot_webapp/projects/1

## Acknowledgements:
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/naomiaro"><img src="https://avatars2.githubusercontent.com/u/35253?v=4" width="100px;" alt=""/><br /><sub><b>Naomi Aro</b></sub></a><br /><a href="https://github.com/naomiaro/waveform-playlist" title="Code">waveform-playlist</a></td> 
  </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
