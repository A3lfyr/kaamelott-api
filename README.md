# kaamelott-api

A very simple API in NodeJS to get quotes from the french TV series Kaamelott

## Usage

### Random quote

Get a random quote

> GET /quote/random

Get a random quote from a character

> GET /quote/random/character/`character_name`

Get a random quote from a book

> GET /quote/random/book/`book_number`

Geta random quote from a character in a book

> GET /quote/random/character/`character_name`/book/`book_number`

Get a specific quote by id

> GET /api/quote/`quote_id`

### Quotes

Get all quotes

> GET /quotes

Get all quotes from a character

> GET /quotes/character/:character_name

Get the number of quotes from a character

> GET /quotes/character/:character_name/nb

Get all quotes from a book

> GET '/quotes/book/:book_number

Get the number of quotes from a book

> GET'/quotes/book/:book_number/nb

Get the number of quotes

> GET /quotes/nb

### Casting

Get the list of characters

> GET /characters

Get the casting

> GET /casting

## Set up a server

Juste clone the repo

`git clone https://github.com/arthur-reiter/kaamelott-api.git`

Go into the server directory

`cd kaamelott-api/`

Install node modules

`npm install`

Start the server

`node index.ts [-p portNumber]`

## Sample response

```json
{
  "citation": " Commencez pas à noyer la peau de l’ours avant d’avoir vendu le poisson.",
  "infos": {
    "auteur": "Alexandre Astier",
    "acteur": "Gilles Graveleau",
    "personnage": "Roparzh",
    "saison": "Livre IV ",
    "episode": " 53 : Vox populi III"
  }
}
```

## Credit

All json data was extracted from https://github.com/sin0light/api-kaamelott/
