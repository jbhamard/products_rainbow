# Products Rainbow

This application allows you to :

- Import a set of products from a CSV source
- Get each products color from Google API vision
- For a given product in the DB, request color related products

## Dependencies

- Nodejs (version specified in .nvmrc)
- MongoDB
- A Google Vision API account

## Config

All config vars are set through environment variables.
See project .env.template file.

```
NODE_ENV="development"
NODE_PORT=6000

MONGO_CONNECTION="mongodb://localhost/rainbow"
GOOLGE_API_VISION_URL=https://vision.googleapis.com/v1/images:annotate
GOOGLE_API_KEY=_your_google_api_key
```


## Dev and Build

`npm install`

`npm run build` or `npm run build-watch`


## Test

`npm run test`

## CLI

`node ./app/cli.js --help`

```
Usage: cli [options] [command]

  Options:

    -v, --version       output the version number
    -h, --help          output usage information

  Commands:

    products [options]  Import products CSV
    colors              Get products color from Google Vision API
```

### Import products from CSV source

Reads products from CSV Catalog file (specified as URI), and save them to MongoDB.

Required CSV headers and types :

```
id:          String
title:       String
gender_id:   String
composition: String
sleeve:      String
photo:       String
url:         String
```


`node ./app/cli.js products --help`

```
Usage: products [options]

  Import products CSV

  Options:

    -c, --catalog  Catalog URI
    -h, --help     output usage information
```

### Set products image main color

- Reads all imported products
- Calls Google Vision API to get each product image main color.
- Saves product color to DB.

`node ./app/cli.js colors --help`

```
Usage: colors [options]

  Get products color from Google Vision API

  Options:

    -h, --help  output usage information
```

## API

Start the server :

`node app/server.js`

`/products/:id/related`

`:id` example : L1212-00-001

For a given product in DB, returns the 5 most similar products in terms of color.

The service will respond with :


```
[
    {
        "id": "DF7790-00-5SX",
        "title": "Polo Lacoste en jersey de coton uni dos plissé",
        "gender_id": "WOM",
        "composition": "100% Coton",
        "sleeve": "Manches courtes",
        "photo": "//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/DF7790_5SX_24.jpg?sw=458&sh=443",
        "url": "https://www.lacoste.com/fr/lacoste/femme/vetements/polos/polo-lacoste-en-jersey-de-coton-uni-dos-plisse/DF7790-00.html?dwvar_DF7790-00_color=5SX"
    },
    {
        "id": "DF7790-00-F9F",
        "title": "Polo Lacoste en jersey de coton uni dos plissé",
        "gender_id": "WOM",
        "composition": "100% Coton",
        "sleeve": "Manches courtes",
        "photo": "//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/DF7790_F9F_24.jpg?sw=458&sh=443",
        "url": "https://www.lacoste.com/fr/lacoste/femme/vetements/polos/polo-lacoste-en-jersey-de-coton-uni-dos-plisse/DF7790-00.html?dwvar_DF7790-00_color=F9F"
    },
    {
        "id": "DF7789-00-RQG",
        "title": "Polo slim fit Lacoste en mini jacquard Prince de Galles",
        "gender_id": "WOM",
        "composition": "100% Coton",
        "sleeve": "Manches courtes",
        "photo": "//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/DF7789_RQG_24.jpg?sw=458&sh=443",
        "url": "https://www.lacoste.com/fr/lacoste/femme/vetements/polos/polo-slim-fit-lacoste-en-mini-jacquard-prince-de-galles/DF7789-00.html?dwvar_DF7789-00_color=RQG"
    },
    {
        "id": "DF7325-00-F9M",
        "title": "Polo slim fit manches trois-quart Lacoste LIVE côtelé ",
        "gender_id": "WOM",
        "composition": "100% Coton",
        "sleeve": "Manches longues",
        "photo": "//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/DF7325_F9M_24.jpg?sw=458&sh=443",
        "url": "https://www.lacoste.com/fr/lacoste/femme/vetements/polos/polo-slim-fit-manches-trois-quart-lacoste-live-cotele-/DF7325-00.html?dwvar_DF7325-00_color=F9M"
    },
    {
        "id": "DF7789-00-RQU",
        "title": "Polo slim fit Lacoste en mini jacquard Prince de Galles",
        "gender_id": "WOM",
        "composition": "100% Coton",
        "sleeve": "Manches courtes",
        "photo": "//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/DF7789_RQU_24.jpg?sw=458&sh=443",
        "url": "https://www.lacoste.com/fr/lacoste/femme/vetements/polos/polo-slim-fit-lacoste-en-mini-jacquard-prince-de-galles/DF7789-00.html?dwvar_DF7789-00_color=RQU"
    }
]
```
