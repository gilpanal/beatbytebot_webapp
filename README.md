# beatbytebot_webapp
A new concept for collaborative music

## Summary:
The following repository can be used as a template for anyone who wants to create their own client to consume the API provided by https://github.com/gilpanal/beatbytebot_api, a middleware to connect audio projects through a Telegram Bot: https://github.com/gilpanal/beatbytebot


## Requirements:
- Node.js (v14)

## Demo:
If you want to see it in action just follow these steps:
1. In Telegram, create a new channel or group
2. Add the bot called "bunchofsongsbot" as an admin to the chat
3. Record something or attach an audio file
4. Visit https://sheltered-meadow-50218.herokuapp.com/ and check the content was successfully created
5. Visit https://bunchofsongs.web.app/ to actually listen to your audio tracks

Current Bot features: https://github.com/gilpanal/beatbytebot/wiki/Current-Features

## How to run it locally:
1. git clone https://github.com/gilpanal/beatbytebot_webapp
2. cd beatbytebot_webapp
3. npm i
4. Rename "src/js/config_template.js" to "src/js/config.js". See Notes below
5. Do the following asjustment: https://github.com/gilpanal/beatbytebot_webapp/wiki/Solved-Issues
6. npm run dev
7. Open 127.0.0.1/index.html

#### NOTES:
In case you are also running the API project locally (https://github.com/gilpanal/beatbytebot_api#how-to-run-it-locally). Change `MODE=DEV` at `config.js`
DEVPORT is `8080` by default or the number choosen for the API in case you use a different port.
BOT_NAME_DEV is the name of your custom bot in case you want to allow login in the web client using the Telegram Login Widget (https://core.telegram.org/widgets/login). This also gives persmission to upload and delete tracks in channels/groups where the user is admin. More details: https://github.com/gilpanal/beatbytebot_webapp/wiki/Telegram-Login-Widget


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
