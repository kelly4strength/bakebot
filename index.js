// add all of our code
'use strict'

// import os

const fb_token = process.env.FB_TOKEN


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

// fb is looking for a webhook
app.get('/webhook/', function (req, res){
	if(req.query['hub.verify_token'] === fb_token){
			res.send(req.query['hub.challenge'])
		}
	res.send('1486103994')
})

// adding the server
// go and get port, and the function will print running on port
app.listen(app.get('port'), function(){
	console.log('running on port', app.get('port'))
})