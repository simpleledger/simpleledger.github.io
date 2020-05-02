# SLP Parser

slp-parser is a JavaScript Library for parsing [Simple Ledger Protocol (SLP)](https://github.com/simpleledger/slp-specifications) metadata. TokenType1 and NFT1 tokens are supported. This repo is designed to be easy to port to other languages.

## Installation

#### For node.js
```
$ npm install slp-parser
```

#### For browser
```html
<script src='https://unpkg.com/slp-parser'></script>
```


## Examples

This library does not perform any validation of the inputs, dealing solely with parsing the OP_RETURN messages SLP uses to function. If this is not clear, please read the [slp-specifications](https://github.com/simpleledger/slp-specifications).

NOTES: 

* The [BigNumber.js library](https://github.com/MikeMcl/bignumber.js) is used to avoid precision issues with numbers having more than 15 significant digits. This can be accessed with `slpParser.BN`.

### How to parse

This library has a single method called `parseSLP` which takes either a Buffer or a hex-string and returns an object such as described with the type definitions inside `./lib/index.ts`.

There are additional examples in `examples` folder.


#### Node.js
```js
const slpParser = require('slp-parser');
const obj = slpParser.parseSLP(Buffer.from('6a04534c500001010747454e455349534c004c004c004c0001004c00080000000000000064', 'hex'));
console.log(obj);
```

#### Web

```html
<script>
const slpParser = require('slp-parser');
const obj = slpParser.parseSLP('6a04534c500001010747454e455349534c004c004c004c0001004c00080000000000000064');
console.log(obj);
</script>
```

## Building & Testing

Building this project creates browserified versions in the `dist` folder.

### Requirements
Running the unit tests require node.js v8.15+. 

### Build
`npm run build`

### Test
`npm run test`


## Porting

slp-parser was designed to be very easy to port to other languages. If you are working on a port to another language please open an issue on this repo so we can link to your port or help with any questions. Make sure to utilize the unit-tests :)
