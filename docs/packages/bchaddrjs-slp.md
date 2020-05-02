# bchaddrjs-SLP

#### Bitcoin Cash general purpose address translation for Node.js and web browsers.

[[toc]]


## Installation

### Using NPM

```bsh
$ npm install --save bchaddrjs-slp
```

### Using Bower

```bsh
$ bower install --save bchaddrjs-slp
```

## Usage

### In Node.js

```javascript
var bchaddr = require('bchaddrjs-slp');
```

### Browser

#### Script Tag

You may include a script tag in your HTML and the `bchaddr` module will be defined globally on subsequent scripts.

```html
<html>
  <head>
    ...
    <script src="https://unpkg.com/bchaddrjs-slp@0.2.8/dist/bchaddrjs-slp-0.2.8.min.js"  integrity="sha384-hZrNJXgibEWJ1QD6fzDANAA1wyWItWPBdCLXcnnPHOorct3yz6tU1vJqO+L3lo+I" crossorigin="anonymous"></script>
  </head>
  ...
</html>
```

## Code Examples

### Supported formats, networks and address types.
```javascript
var Format = bchaddr.Format; // Legacy, Bitpay Cashaddr, or Slpaddr.
var Network = bchaddr.Network; // Mainnet or Testnet.
var Type = bchaddr.Type; // P2PKH or P2SH.
```

### Test for address format.
```javascript
var isLegacyAddress = bchaddr.isLegacyAddress;
var isBitpayAddress = bchaddr.isBitpayAddress;
var isCashAddress = bchaddr.isCashAddress;
var isSlpAddress = bchaddr.isSlpAddress;

isLegacyAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // true
isLegacyAddress('qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk') // false
isBitpayAddress('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj') // true
isBitpayAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // false
isCashAddress('qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk') // true
isCashAddress('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj') // false
isSlpAddress('qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk') // false
isSlpAddress('simpleledger:qph5kuz78czq00e3t85ugpgd7xmer5kr7ccj3fcpsg') // true
```

### Test for address network.
```javascript
var isMainnetAddress = bchaddr.isMainnetAddress;
var isTestnetAddress = bchaddr.isTestnetAddress;

isMainnetAddress('1P238gziZdeS5Wj9nqLhQHSBK2Lz6zPSke') // true
isMainnetAddress('mnbGP2FeRsbgdQCzDT35zPWDcYSKm4wrcg') // false
isTestnetAddress('qqdcsl6c879esyxyacmz7g6vtzwjjwtznsggspc457') // true
isTestnetAddress('CeUvhjLnSgcxyedaUafcyo4Cw9ZPwGq9JJ') // false
```

### Test for address type.
```javascript
var isP2PKHAddress = bchaddr.isP2PKHAddress;
var isP2SHAddress = bchaddr.isP2SHAddress;

isP2PKHAddress('1Mdob5JY1yuwoj6y76Vf3AQpoqUH5Aft8z') // true
isP2PKHAddress('2NFGG7yRBizUANU48b4dASrnNftqsNwzSM1') // false
isP2SHAddress('H92i9XpREZiBscxGu6Vx3M8jNGBKqscBBB') // true
isP2SHAddress('CeUvhjLnSgcxyedaUafcyo4Cw9ZPwGq9JJ') // false
```

### Detect address format.
```javascript
var detectAddressFormat = bchaddr.detectAddressFormat;

detectAddressFormat('qqdcsl6c879esyxyacmz7g6vtzwjjwtznsggspc457') // Format.Cashaddr
detectAddressFormat('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj') // Format.Bitpay
```

### Detect address network.
```javascript
var detectAddressNetwork = bchaddr.detectAddressNetwork;

detectAddressNetwork('1P238gziZdeS5Wj9nqLhQHSBK2Lz6zPSke') // Network.Mainnet
detectAddressNetwork('qqdcsl6c879esyxyacmz7g6vtzwjjwtznsggspc457') // Network.Testnet
```

### Detect address type.
```javascript
var detectAddressType = bchaddr.detectAddressType;

detectAddressType('1P238gziZdeS5Wj9nqLhQHSBK2Lz6zPSke') // Type.P2PKH
detectAddressType('3NKpWcnyZtEKttoQECAFTnmkxMkzgbT4WX') // Type.P2SH
```

### Translate address from any address format into a specific format.
```javascript
var toLegacyAddress = bchaddr.toLegacyAddress;
var toBitpayAddress = bchaddr.toBitpayAddress;
var toCashAddress = bchaddr.toCashAddress;
var toSlpAddress = bchaddr.toSlpAddress;

toLegacyAddress('qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk') // 1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR
toBitpayAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj
toCashAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // bitcoincash:qph5kuz78czq00e3t85ugpgd7xmer5kr7c5f6jdpwk
toSlpAddress('1B9UNtBfkkpgt8kVbwLN9ktE62QKnMbDzR') // simpleledger:qph5kuz78czq00e3t85ugpgd7xmer5kr7ccj3fcpsg
```
