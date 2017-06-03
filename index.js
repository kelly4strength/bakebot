// add all of our code
'use strict'



// npm packages that we need
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

// environment variables
const token = process.env.FB_VERIFY_TOKEN
const access = process.env.FB_ACCESS_TOKEN

// we will access express through "app"
const app = express()

// set up our ports, running on heroku but you can run it locally
app.set('port', (process.env.PORT || 5000))

// this is checking for what info is coming in tothe app, seeing if it's the right type
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// root level function
app.get('/', function (req, res) {
	res.send('Jello World!')
})

// fb is looking for a webhook verification
app.get('/webhook/', function (req, res) {
	// console.log('wtf man why is this still showing got here')
	// console.log(req.query['hub.verify_token'])
	if (req.query['hub.verify_token'] === token) {
		res.send(req.query['hub.challenge'])
		return
	} 
	res.send('nope"')
})

app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});
  
function receivedMessage(event) {
  // Putting a stub for now, we'll expand it in the following steps
  console.log("Message data: ", event.message);
}

// adding the server
// go and get port, and the function will print running on port
app.listen(app.get('port'), function(){
	console.log('running on port', app.get('port'))
})









