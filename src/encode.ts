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

const htmlCharsetRe = /charset=(['"]?)utf-?8(["']?)/i
function encodeHtml(html: string, encoding: string): Buffer {
  const replaced = html.replace(htmlCharsetRe, `charset=$1${encoding}$2`)
  return iconv.encode(replaced, encoding)
}

const cssCharsetRe = /@charset\s+(['"])utf-?8(['"])/i
function encodeCss(css: string, encoding: string): Buffer {
  let replaced: string

  if (!cssCharsetRe.test(css)) {
    // If @charset does not exist, prepend it
    replaced = `@charset "${encoding}";\n` + css
  } else {
    replaced = css.replace(cssCharsetRe, `@charset $1${encoding}$2`)
  }

  return iconv.encode(replaced, encoding)
}
