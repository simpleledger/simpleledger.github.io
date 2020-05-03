# SLPStream

::: tip View Repo:
[https://github.com/blockparty-sh/slpstream](https://github.com/blockparty-sh/slpstream)
:::

SLPStream is a frontend API for GS++ that provides a streaming output of new transactions. Unlike [SLPSocket](/tooling/slpsocket), SLPStream uses GS++ to for greater efficiency and has slightly different semantics.

[Try it here →](https://slpstream.fountainhead.cash/)

[[toc]]

## Introduction

SLPStream querying is done much in the same way as with SLPDB (and SLPSocket of course), except in a reduced fashion. There are no `aggregate` functions possible, only `find`. Also, only transactions will be available.. so you can query only on `u` (unconfirmed / recent transactions) and `c` (all SLP transactions inside a block, limited transaction information).

SLPStream uses base units of tokens instead of the visual representation of decimals. Therefore, you will need to understand the `decimals` value for a token (perhaps by querying [SLPDB](/tooling/slpdb)).

## Examples

### Get all SLP Transactions and Blocks

```json
{
  "v": 3,
  "q": {
    "find": {}
  }
}
```

After a transaction occurs you will see data start to come in:

**Result:**


```json
[
  {
    "tx": {
      "h": "223d188b1725d33e57fbb8fc4a85b9eadf1c717555f9a396be820842b99dfc45"
    },
    "in": [
      {
        "i": 0,
        "b0": "MEQCIAVyweZnlo8RAQS5darvrZCHYkH+DBKh3XuYJvcETNIiAiBgWzcqTMNbc9FTAzEsxHC/lgS/ivA6+2rMZAb0pSCr00E=",
        "b1": "AivHQr3Mk94melZTIVsHGXflIa5V+5P31+F0J9NTnrlK",
        "str": "304402200572c1e667968f110104b975aaefad90876241fe0c12a1dd7b9826f7044cd2220220605b372a4cc35b73d15303312cc470bf9604bf8af03afb6acc6406f4a520abd341 022bc742bdcc93de267a5653215b071977e521ae55fb93f7d7e17427d3539eb94a",
        "e": {
          "h": "1cbde8336c1c456dffb9276bcd706ef0669fb646097919c995c3775dfabb6373",
          "i": 2,
          "a": "simpleledger:qqzcyl5h59lus0y825kywlaggte5562mnsdmqw93zw"
        },
        "h0": "304402200572c1e667968f110104b975aaefad90876241fe0c12a1dd7b9826f7044cd2220220605b372a4cc35b73d15303312cc470bf9604bf8af03afb6acc6406f4a520abd341",
        "h1": "022bc742bdcc93de267a5653215b071977e521ae55fb93f7d7e17427d3539eb94a"
      },
      {
        "i": 1,
        "b0": "MEUCIQDEg+Y0cMdm6as2i7MPvsNz3nT9vlz7k1GW97EkM48H1AIgFguaShxFbGhk6gK3/4ymhFsEC+ehgIHsHseqyzhh+xlB",
        "b1": "AivHQr3Mk94melZTIVsHGXflIa5V+5P31+F0J9NTnrlK",
        "str": "3045022100c483e63470c766e9ab368bb30fbec373de74fdbe5cfb935196f7b124338f07d40220160b9a4a1c456c6864ea02b7ff8ca6845b040be7a18081ec1ec7aacb3861fb1941 022bc742bdcc93de267a5653215b071977e521ae55fb93f7d7e17427d3539eb94a",
        "e": {
          "h": "1cbde8336c1c456dffb9276bcd706ef0669fb646097919c995c3775dfabb6373",
          "i": 3,
          "a": "simpleledger:qqzcyl5h59lus0y825kywlaggte5562mnsdmqw93zw"
        },
        "h0": "3045022100c483e63470c766e9ab368bb30fbec373de74fdbe5cfb935196f7b124338f07d40220160b9a4a1c456c6864ea02b7ff8ca6845b040be7a18081ec1ec7aacb3861fb1941",
        "h1": "022bc742bdcc93de267a5653215b071977e521ae55fb93f7d7e17427d3539eb94a"
      }
    ],
    "out": [
      {
        "i": 0,
        "b0": {
          "op": 106
        },
        "b1": "U0xQAA==",
        "s1": "SLP\u0000",
        "b2": "AQ==",
        "s2": "\u0001",
        "b3": "U0VORA==",
        "s3": "SEND",
        "b4": "f4iJaC1XNp7Q4yM2+Lfg/+xiWjXMoYP06B/eTnGlOKE=",
        "s4": "��h-W6���#6�����bZ5̡���\u001f�Nq�8�",
        "b5": "AAAAAAAAAPo=",
        "s5": "\u0000\u0000\u0000\u0000\u0000\u0000\u0000�",
        "b6": "AAAAAAcXMys=",
        "s6": "\u0000\u0000\u0000\u0000\u0007\u00173+",
        "str": "OP_RETURN 534c5000 01 53454e44 7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1 00000000000000fa 000000000717332b",
        "e": {
          "v": 0,
          "i": 0
        },
        "h1": "534c5000",
        "h2": "01",
        "h3": "53454e44",
        "h4": "7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1",
        "h5": "00000000000000fa",
        "h6": "000000000717332b"
      },
      {
        "i": 1,
        "b0": {
          "op": 118
        },
        "b1": {
          "op": 169
        },
        "b2": "apkgFSC37EbpCBjd3aT2+72YYuk=",
        "s2": "j� \u0015 ��F�\b\u0018�ݤ����b�",
        "b3": {
          "op": 136
        },
        "b4": {
          "op": 172
        },
        "str": "OP_DUP OP_HASH160 6a99201520b7ec46e90818dddda4f6fbbd9862e9 OP_EQUALVERIFY OP_CHECKSIG",
        "e": {
          "v": 546,
          "i": 1,
          "a": "simpleledger:qp4fjgq4yzm7c3hfpqvdmhdy7mammxrzayc356qc4j"
        },
        "h2": "6a99201520b7ec46e90818dddda4f6fbbd9862e9"
      },
      {
        "i": 2,
        "b0": {
          "op": 118
        },
        "b1": {
          "op": 169
        },
        "b2": "BYJ+l6F/yDyHVSxHf6hC80ppW5w=",
        "s2": "\u0005�~���<�U,G�B�Ji[�",
        "b3": {
          "op": 136
        },
        "b4": {
          "op": 172
        },
        "str": "OP_DUP OP_HASH160 05827e97a17fc83c87552c477fa842f34a695b9c OP_EQUALVERIFY OP_CHECKSIG",
        "e": {
          "v": 546,
          "i": 2,
          "a": "simpleledger:qqzcyl5h59lus0y825kywlaggte5562mnsdmqw93zw"
        },
        "h2": "05827e97a17fc83c87552c477fa842f34a695b9c"
      },
      {
        "i": 3,
        "b0": {
          "op": 118
        },
        "b1": {
          "op": 169
        },
        "b2": "BYJ+l6F/yDyHVSxHf6hC80ppW5w=",
        "s2": "\u0005�~���<�U,G�B�Ji[�",
        "b3": {
          "op": 136
        },
        "b4": {
          "op": 172
        },
        "str": "OP_DUP OP_HASH160 05827e97a17fc83c87552c477fa842f34a695b9c OP_EQUALVERIFY OP_CHECKSIG",
        "e": {
          "v": 7207049,
          "i": 3,
          "a": "simpleledger:qqzcyl5h59lus0y825kywlaggte5562mnsdmqw93zw"
        },
        "h2": "05827e97a17fc83c87552c477fa842f34a695b9c"
      }
    ],
    "slp": {
      "valid": true,
      "detail": {
        "versionType": 1,
        "transactionType": "SEND",
        "tokenIdHex": "7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1",
        "outputs": [
          {
            "address": "simpleledger:qp4fjgq4yzm7c3hfpqvdmhdy7mammxrzayc356qc4j",
            "amount": "250"
          },
          {
            "address": "simpleledger:qqzcyl5h59lus0y825kywlaggte5562mnsdmqw93zw",
            "amount": "118960939"
          }
        ]
      }
    }
  }
]
```

### All Transactions an Address Sent or Received

You can use operators like `$or` and `$and` to make complex filtering rules.

```json
{
  "v": 3,
  "q": {
    "find": {
      "$or": [
        {
          "in.e.a": "simpleledger:qpa0uvdqggk64uzamjt80h29zf59x4fl2c9k4dlc7a"
        },
        {
          "out.e.a": "simpleledger:qpa0uvdqggk64uzamjt80h29zf59x4fl2c9k4dlc7a"
        }
      ]
    }
  }
}
```

### Only Confirmed HONK Transactions 

See how `db` is set to `c`.

```json
{
  "v": 3,
  "q": {
    "db": ["c"],
    "find": {
      "slp.detail.tokenIdHex": "7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1"
    }
  }
}
```
