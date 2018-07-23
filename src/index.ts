import * as fse from 'fs-extra'
import * as fg from 'fast-glob'
import { encode as _encode } from './encode'

interface LegacifyOptions {
  encoding?: string
}

const defaultOptions: Required<LegacifyOptions> = {
  encoding: 'shift_jis'
}

export default async function encode(
  pattern: string,
  rawOptions: LegacifyOptions = {}
): Promise<void> {
  const { encoding } = {
    ...defaultOptions,
    ...rawOptions
  }
  const files = fg.sync<string>(pattern)

  await Promise.all(
    files.map(async file => {
      // We assume input file is always utf-8
      const content = String(fse.readFile(file))
      const encoded = _encode(content, file, encoding)
      await fse.writeFile(file, encoded)
    })
  )
}
