// index.js


// 'use strict'
// add all of our code

// npm packages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// this is
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.send('Jello World!')
})

app.get('/webhook/', function(req, res){
	if req.query['hub.verify_token'] === 
		// PUT TOKEN IN
		'my_voice_is_my_password_verify_me') {
			res.send(req.query['hub.challenge'])
		}
	res.send('No entry')
})

// adding the server
// go and get port, and the function will print running on port
app.listen(app.get('port'), function(){
	console.log('running on port', app.get('port'))
})