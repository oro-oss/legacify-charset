# legacify-charset

Encode charset from UTF-8 to legacy one.

## Usage

```bash
# install
$ npm i -g legacify-charset

# encode
$ legacify-charset --encoding euc-jp src/**/*
```

All files matched with the glob pattern are encoded from UTF-8 to specified charset.

In addition, `.html` and `.css` files will be replaced its charset meta data such as `<meta charset="uft-8">` and `@charset "utf-8";`.

## License

MIT
