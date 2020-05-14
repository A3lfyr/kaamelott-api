/*
 * API developped by Arthur REITER
 * Website : https://reiter.tf
 * Documentation : https://github.com/arthur-reiter/kaamelott-api
 */

// Server settings
var hostname = 'localhost';
var port = 8081;

var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors());
app.use(express.static('public'));

// All json data was extracted from https://github.com/sin0light/api-kaamelott/
const quotes = require('./data/quotes.json');
const casting = require('./data/casting.json');
const persos = require('./data/persos.json');
const nb_quotes = 776;

var myRouter = express.Router();


// Returns the home page
myRouter.route('/')
	.get(function (req, res) {
		res.sendFile('index.html');
	});

// Returns a random quote
myRouter.route('/api/random')
	.get(function (req, res) {
		var id = Math.floor(Math.random() * Math.floor(nb_quotes));
		res.json(quotes[id]);
	});

// Returns the quotation corresponding to the id
myRouter.route('/api/quote/:quote_id')
	.get(function (req, res) {
		res.json(quotes[req.params.quote_id]);
	});

// Returns all quotes
myRouter.route('/api/all')
	.get(function (req, res) {
		res.json(quotes);
	});

app.use(myRouter);

app.listen(port, hostname, function () {
	console.log("Server work on http://" + hostname + ":" + port);
});