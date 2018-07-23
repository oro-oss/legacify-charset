import { encode } from '../src/encode'
import * as iconv from 'iconv-lite'

describe('Encode', () => {
  it('should encode to shift_jis', () => {
    const text = 'this should be encoded'
    const encoded = encode(text, 'test.txt', 'shift_jis')
    const result = iconv.decode(encoded, 'shift_jis')
    expect(result).toBe(text)
  })

  it('should encode to euc-jp', () => {
    const text = 'this should be encoded'
    const encoded = encode(text, 'test.txt', 'euc-jp')
    const result = iconv.decode(encoded, 'euc-jp')
    expect(result).toBe(text)
  })

  it('should replace charset meta element in html', () => {
    const html = `<!DOCTYPE html><html>
    <head>
      <meta charset="utf-8">
    </head>
    </html>`

    const expected = `<!DOCTYPE html><html>
    <head>
      <meta charset="shift_jis">
    </head>
    </html>`

    const encoded = encode(html, 'test.html', 'shift_jis')
    const result = iconv.decode(encoded, 'shift_jis')
    expect(result).toBe(expected)
  })

  it('should replace charset at-rule in css', () => {
    const css = `@charset "utf-8";
    .foo {
      color: cyan;
    }`

    const expected = `@charset "shift_jis";
    .foo {
      color: cyan;
    }`

    const encoded = encode(css, 'test.css', 'shift_jis')
    const result = iconv.decode(encoded, 'shift_jis')
    expect(result).toBe(expected)
  })

  it('adds charset at-rule if not exists', () => {
    const css = `
    .foo {
      color: cyan;
    }`

    const expected = `@charset "shift_jis";

    .foo {
      color: cyan;
    }`

    const encoded = encode(css, 'test.css', 'shift_jis')
    const result = iconv.decode(encoded, 'shift_jis')
    expect(result).toBe(expected)
  })
})
