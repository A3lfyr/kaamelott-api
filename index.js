/*
 * API developped by Arthur REITER
 * Website : https://reiter.tf
 * Documentation : https://github.com/arthur-reiter/kaamelott-api
 */

// Server settings
var hostname = 'localhost';
var port = 8081;
// Check Arguments
var Args = process.argv.slice(2);
if(Args[0] == "-port" || Args[0] == "-p")
{
	if(parseInt(Args[1]) > 1023 && parseInt(Args[1]) < 49152)
	{
		port = Args[1];
	} else {
		console.log("/!\\ Port not recognized, use default port")
	}
		
} 


var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors());
app.use(express.static('public'));

var router = express.Router();


// All json data was extracted from https://github.com/sin0light/api-kaamelott/
const quotes = require('./data/quotes.json');
const casting = require('./data/casting.json');
const persos = require('./data/persos.json');
const nb_quotes = quotes.length;

// Returns the home page
router.route('/')
	.get(function (req, res) {
		res.sendFile('index.html');
	});

// Returns a random quote
router.route('/api/random')
	.get(function (req, res) {
		var id = Math.floor(Math.random() * Math.floor(nb_quotes));
		res.json(quotes[id]);
	});

// Returns the quotation corresponding to the id
router.route('/api/quote/:quote_id')
	.get(function (req, res) {
		res.json(quotes[req.params.quote_id]);
	});

// Returns all quotes
router.route('/api/all')
	.get(function (req, res) {
		res.json(quotes);
	});

app.use(router);

app.listen(port, hostname, function () {
	console.log("Server work on http://" + hostname + ":" + port);
});