# SLP Parser for Dart

::: tip View Repo:
[https://github.com/simpleledger/slp-parser.dart](https://github.com/simpleledger/slp-parser.dart)
:::

This package is for parsing [Simple Ledger Protocol (SLP)](https://github.com/simpleledger/slp-specifications) metadata. TokenType1 and NFT1 tokens are supported.


## Usage

```dart
  var scriptPubKey = '6a04534c500001010747454e455349530ce3838ae382abe383a2e383884c004c004c0001094c00080000000000000064';
  var slpMsg = parseSLP(hex.decode(scriptPubKey));
  print('Parsed results (raw form):\n ${slpMsg.toMap(raw: true)}');
  print('Parsed results (readable form):\n ${slpMsg.toMap()}');
```

## Test

`$ dart test/parser.spec.dart`
