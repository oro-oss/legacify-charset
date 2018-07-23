import * as path from 'path'
import * as iconv from 'iconv-lite'

export function encode(
  content: string,
  filename: string,
  encoding: string
): Buffer {
  switch (path.extname(filename)) {
    case '.html':
      return encodeHtml(content, encoding)
    case '.css':
      return encodeCss(content, encoding)
    default:
      return iconv.encode(content, encoding)
  }
}

function encodeHtml(html: string, encoding: string): Buffer {
  const replaced = html.replace(
    /charset=(['"]?)utf-?8(["']?)/i,
    `charset=$1${encoding}$2`
  )
  return iconv.encode(replaced, encoding)
}

function encodeCss(css: string, encoding: string): Buffer {
  const replaced = css.replace(
    /@charset\s+(['"])utf-?8(['"])/i,
    `@charset $1${encoding}$2`
  )
  return iconv.encode(replaced, encoding)
}
