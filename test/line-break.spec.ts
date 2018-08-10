import { convertLineBreaks } from '../src/line-break'

describe('Line break', () => {
  it('convers lf to crlf', () => {
    const result = convertLineBreaks('abc\ndef\nghi\n', 'crlf')
    expect(result).toBe('abc\r\ndef\r\nghi\r\n')
  })

  it('does not converts crlf', () => {
    const result = convertLineBreaks('abc\ndef\r\nghi\n', 'crlf')
    expect(result).toBe('abc\r\ndef\r\nghi\r\n')
  })
})
