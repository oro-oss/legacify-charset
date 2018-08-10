import * as fse from 'fs-extra'
import * as fg from 'fast-glob'
import chalk from 'chalk'
import { encode } from './encode'
import { convertLineBreaks } from './line-break'

export interface LegacifyOptions {
  encoding?: string
  lineBreak?: 'crlf' | false
}

const defaultOptions: Required<LegacifyOptions> = {
  encoding: 'shift_jis',
  lineBreak: false
}

export default async function transform(
  pattern: string,
  rawOptions: LegacifyOptions = {}
): Promise<void> {
  const { encoding, lineBreak } = {
    ...defaultOptions,
    ...rawOptions
  }
  const files = fg.sync<string>(pattern)

  await Promise.all(
    files.map(async file => {
      // We assume input file is always utf-8
      const content = String(await fse.readFile(file))
      const transformed = encode(
        convertLineBreaks(content, lineBreak),
        file,
        encoding
      )

      await fse
        .writeFile(file, transformed)
        .then(() => {
          console.log(chalk.greenBright('WROTE') + ' ' + file)
        })
        .catch(() => {
          console.error(chalk.redBright('ERROR') + ' ' + file)
        })
    })
  )
}
