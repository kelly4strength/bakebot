// add all of our code
'use strict'

const token = process.env.FB_PAGE_ACCESS_TOKEN
const vtoken = process.env.FB_VERIFY_ACCESS_TOKEN

// npm packages that we need
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

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
	console.log(req.query['hub.verify_token'])
	if (req.query['hub.verify_token'] === vtoken) {
		res.send(req.query['hub.challenge'])
		return
	} 
	res.send('nope"')
})

// adding the server
// go and get port, and the function will print running on port
app.listen(app.get('port'), function(){
	console.log('running on port', app.get('port'))
})