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
See project .env.

## Dev and Build

`npm install`

`npm run build` or `npm run build-watch`


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
