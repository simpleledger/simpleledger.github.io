# SLP Metadata Maker

This package is for creating Simple Ledger Protocol (SLP) OP_RETURN messages. Both TokenType1 and NFT1 tokens are supported.


### Usage

The following snippet shows basic usage.  Don't forget to adjust the BigInt quantities to account for decimal divisibility of the token (see code in `example/main.dart` with an example of this conversion).

```dart
var tokenId = hex.decode('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
var sendMsg = Send(tokenId, [BigInt.from(1), BigInt.from(10)]);
print(hex.encode(sendMsg));

var mintMsg = Mint(tokenId, BigInt.from(10), mintBatonVout);
print(hex.encode(mintMsg));
```

### Test

`dart test/slp_mdm.dart`
