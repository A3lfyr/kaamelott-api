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
if (Args[0] == "-port" || Args[0] == "-p") {
	if (parseInt(Args[1]) > 1023 && parseInt(Args[1]) < 49152) {
		port = parseInt(Args[1]);
	} else {
		console.log("/!\\ Port not recognized, use default port")
	}

}


var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors());
app.use(express.static('public'));

// All json data was extracted from https://github.com/sin0light/api-kaamelott/
const quotes = require('./data/quotes.json');
const casting = require('./data/casting.json');
//const persos = require('./data/persos.json');
const nb_quotes = quotes.length;
var characters = new Array();
casting.forEach(cast => {
	// Get characters list
	characters.push(cast.personnage)
});

var router = express.Router();

///////////
// QUOTE //
///////////

// Returns the home page
router.route('/')
	.get(function (req, res) {
		res.sendFile('index.html');
	});

// Returns a random quote
router.route('/quote/random')
	.get(function (req, res) {
		res.json(randomQuote(quotes))
	});

// Returns a random quote from a character
router.route('/quote/random/character/:character_name')
	.get(function (req, res) {
		let characterName = formatCharacterName(req.params.character_name)
		if (checkCaracterName(characterName)) {
			let filterQuote = filterQuotesByCharacter(quotes, characterName)
			res.json(randomQuote(filterQuote));
		} else {
			res.status(404)
			res.json("Le personnage " + req.params.character_name + " est introuvable.");
		}
	});

// Returns a random quote from a book
router.route('/quote/random/book/:book_number')
	.get(function (req, res) {
		let bookName = getBooknameByBookNumber(req.params.book_number)
		if(!bookName) {
			res.status(404)
			res.json("Aucune citation pour le livre " + req.params.book_number + ".");
		} else {
			let filterQuote = filterQuotesByBook(quotes, bookName)
			res.json(randomQuote(filterQuote));
		}
	});

// Returns a random quote from a character in a book
router.route('/quote/random/character/:character_name/book/:book_number')
	.get(function (req, res) {
		let characterName = formatCharacterName(req.params.character_name)
		if (checkCaracterName(characterName)) {
			var filterQuoteByChar = filterQuotesByCharacter(quotes, characterName)
		} else {
			res.status(404)
			res.json("Le personnage " + req.params.character_name + " est introuvable.");
		}

		let bookName = getBooknameByBookNumber(req.params.book_number)
		if(!bookName) {
			res.status(404)
			res.json("Aucune citation pour le livre " + req.params.book_number + ".");
		} else {
			let filterQuote = filterQuotesByBook(filterQuoteByChar, bookName)
			res.json(randomQuote(filterQuote));
		}
	});

// Returns the quotation corresponding to the id
router.route('/quote/:quote_id')
	.get(function (req, res) {
		res.json(quotes[req.params.quote_id]);
	});


////////////
// QUOTES //
////////////

// Returns all quotes
router.route('/quotes')
	.get(function (req, res) {
		res.json(quotes);
	});

// Returns all quotes from a character
router.route('/quotes/character/:character_name')
	.get(function (req, res) {
		let characterName = formatCharacterName(req.params.character_name)
		if (checkCaracterName(characterName)) {
			res.json(filterQuotesByCharacter(quotes, characterName));
		} else {
			res.status(404)
			res.json("Le personnage " + req.params.character_name + " est introuvable.");
		}
	});

// Returns the number of quotes from a character
router.route('/quotes/character/:character_name/nb')
	.get(function (req, res) {
		let characterName = formatCharacterName(req.params.character_name)
		if (checkCaracterName(characterName)) {
			res.json(filterQuotesByCharacter(quotes, characterName).length);
		} else {
			res.status(404)
			res.json("Le personnage " + req.params.character_name + " est introuvable.");
		}
	});

// Returns all quotes from a book
router.route('/quotes/book/:book_number')
	.get(function (req, res) {
		let bookName = getBooknameByBookNumber(req.params.book_number)
		if(!bookName) {
			res.status(404)
			res.json("Aucune citation pour le livre " + req.params.book_number + ".");
		} else {
			res.json(filterQuotesByBook(quotes, bookName));
		}
	});

// Returns the number of quotes from a book
router.route('/quotes/book/:book_number/nb') 
	.get(function (req, res) {
		let bookName = getBooknameByBookNumber(req.params.book_number)
		if(!bookName) {
			res.status(404)
			res.json("Aucune citation pour le livre " + req.params.book_number + ".");
		} else {
			res.json(filterQuotesByBook(quotes, bookName).length);
		}
	});

// Returns the number of quotes
router.route('/quotes/nb')
	.get(function (req, res) {
		res.json(nb_quotes);
	});

/////////////
// CASTING //
/////////////

// Returns the list of characters
router.route('/characters')
	.get(function (req, res) {
		res.json(characters);
	});

// Returns the casting
router.route('/casting')
	.get(function (req, res) {
		res.json(casting);
	});


app.use(router);

app.listen(port, hostname, function () {
	console.log("Server work on http://" + hostname + ":" + port);
});


function randomQuote(quotesToRandom) {
    let nb = quotesToRandom.length;
    let chosen = Math.floor(Math.random() * Math.floor(nb));
    return(quotesToRandom[chosen])
}

function getBooknameByBookNumber(bookNumber) {
	let bookName = "Livre ";
		switch (parseInt(bookNumber)) {
			case 1:
				bookName += "I";
				break;
			case 2:
				bookName += "II";
				break;
			case 3:
				bookName += "III";
				break;
			case 4:
				bookName += "IV";
				break;
			case 5:
				bookName += "V";
				break;
			case 6:
				bookName += "VI";
				break;
		}
		if(bookName != "Livre ") {
			return bookName
		} else {
			return false
		}
}

function checkCaracterName(characterName) {
	return characters.includes(characterName)
}

function formatCharacterName(characterName) {
	return characterName.charAt(0).toUpperCase() + characterName.slice(1).toLowerCase()
}

function filterQuotesByCharacter(quotesToFilter, character) {
	let filterQuotes = quotesToFilter.filter(
		quote => quote.infos.personnage == formatCharacterName(character)
	);
	return filterQuotes;
}

function filterQuotesByBook(quotesToFilter, bookName) {
	let filterQuotes = quotesToFilter.filter(
		quote => quote.infos.saison == bookName
	);
	return filterQuotes;
}