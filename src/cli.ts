#!/usr/bin/env node

import * as meow from 'meow'
import encode, { LegacifyOptions } from './index'

const help = `
  Usage
    $ legacify-charset [options] <glob pattern ...>

  Options
    --encoding  Specify output encoding (default 'shift_jis')

  Examples
    $ legacify-charset --encoding euc-jp src/**/*.html
`

const cli = meow(help, {
  flags: {
    encoding: {
      type: 'string'
    }
  }
})

if (!cli.input[0]) {
  cli.showHelp()
}

const options: LegacifyOptions = {}
if (cli.flags.encoding) {
  options.encoding = cli.flags.encoding
}

cli.input.forEach(pattern => {
  encode(pattern, options)
})
