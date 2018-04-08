#!/usr/bin/env node

import program from 'commander'
import { products, colors } from './commands'
import * as db from './db'

db.connect()

program
  .command('products')
  .description('Import products CSV')
  .option('-c, --catalog', 'Catalog URI')
  .action(options =>
    products
      .load(options)
      .then(() => {
        console.log('Products Import Success')
        process.exit(0)
      })
      .catch(err => {
        console.log('Products Import Error')
        console.log(err)
        process.exit(0)
      })
  )

program
  .command('colors')
  .description('Get products color from Google Vision API')
  .action(_ => {
    colors
      .set()
      .then(() => {
        console.log('Products Colors set Success')
        process.exit(0)
      })
      .catch(err => {
        console.log('Products Colors set Error')
        console.log(err)
        process.exit(0)
      })
  })

program.version('0.1.0', '-v, --version').parse(process.argv)
