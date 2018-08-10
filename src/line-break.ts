export function convertLineBreaks(str: string, type: 'crlf' | false): string {
  switch (type) {
    case 'crlf':
      return toCrlf(str)
    default:
      return str
  }
}

function toCrlf(str: string): string {
  return str.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n')
}
