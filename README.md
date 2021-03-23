# kaamelott-api

A very simple API in NodeJS to get quotes from the french TV series Kaamelott

## Usage

Get a random quote

> GET /api/random

Get all quotes

> GET /api/all

Get a specific quote by id

> GET /api/quote/`quote_id`

## Set up a server

Juste clone the repo

`git clone https://github.com/arthur-reiter/kaamelott-api.git`

Go into the server directory

`cd kaamelott-api/`

Install node modules

`npm install`

Start the server

`node index.js [-p portNumber]`

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
