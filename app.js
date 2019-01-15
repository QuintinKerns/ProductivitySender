require('dotenv').config();

const request = require('request');
const schedule = require('node-schedule');
const osmosis = require('osmosis');
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'DENBH3M2T';

// Scheduled to run every hour from 7am to 10pm, Monday to Saturday
schedule.scheduleJob('0 7-22 * * 2-6', function () {
    // Get productivity from web scraper
    var productivity = scrapeForProd()
    // Send message with productivity
    web.chat.postMessage({
            channel: conversationId,
            text: productivity,
            username: 'D2 Productivity Bot'
        })
        .then((res) => {
            // `res` contains information about the posted message
            console.log('Message sent: ', res.ts);
        })
        .catch(console.error);
});

function scrapeForProd(){
    return osmosis.get('https://cfahome.okta.com/')
                  .login(process.env.CFAHOME_USERNAME, process.env.CFAHOME_PASSWORD, /* #productivity */)
                  .set();
}

console.log(scrapeForProd());


// function scrapeForProd() {
//     request('https://cfahome.okta.com/', (err, res, html) => {
//         const $ = cheerio.load(html);

//         const usernameField = $('#okta-signin-username');
//         const passwordField = $('#okta-signin-password');
//         const form = $('#form42');

//         usernameField.value = process.env.CFAHOME_USERNAME;
//         passwordField.value = process.env.CFAHOME_PASSWORD;

//         form.submit();
//     });
// }