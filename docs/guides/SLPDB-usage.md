# SLPDB usage

For those of you not already familiar with [SLPDB](/tooling/slpdb), it's purpose is storing all data related to the Simple Ledger Protocol, with real-time transaction and block notifications.

As such, it's an invaluable tool whenever looking to build services that require reliable data on SLP specifics without needing to transverse the blockchain ourselves.

## Getting started

There are several SLPDB instances available for the public to query, like [https://slpdb.fountainhead.cash](https://slpdb.fountainhead.cash) or [https://slpdb.electroncash.de/explorer](https://slpdb.electroncash.de/explorer).
If you are thinking that you might need your own installation of SLPDB, check our recommendations [here](/tooling/slpdb/#do-you-need-to-install-slpdb).

Once you've decided on which option works best for you, the first thing you need to know is how to start querying away.

Queries into SLPDB data are made using [bitquery](https://docs.bitdb.network/docs/query_v3#2-what). You can do further reading on the operators following the link, but the basic format is the following:

![Bitquery format](./images/ql3.png "Bitquery format")

Our documentation on [SLPDBs MongoDB Collections & Data Schema](/tooling/slpdb/#mongodb-collections-data-schema) will get you acquainted with the different datasets you can  and their field structure. At a quick glance, 
these are the four available DBs:

- `t` stands for `tokens` and contains metadata and statistics about each token.
- `c` stands for `confirmed` and includes any confirmed SLP transaction, valid or invalid.
- `u` stands for `unconfirmed` and includes any unconfirmed SLP transaction, valid or invalid.
- `g` stands for `graphs` and contains an item for each valid SLP transaction.

## Execution

To get started you can use two basic ways to query the existing SLPDB instances: browser and node.js.

### Browser

If you visit [https://slpdb.fountainhead.cash](https://slpdb.fountainhead.cash) you can edit the query on the top of the page and hit the `Run query` button on the right side. This will execute your request in 
real time and show the result on the corresponding DB result section underneath.

The notation for browser and for JavaScript are a bit different: make sure to use double quote marks instead of single ones, and remove any commas before closing curly brackets.

### Node.js

For a more programmatic approach, we will go through how to use Node.js to execute JavaScript snippets.

First off, you'll need to use npm to install the required library `node-fetch`

```bash
> npm install node-fetch
```

After that, create a new JavaScript file in the same folder tree where you installed `node-fetch`. We called this file `SLPDB.js` and it contains the following

```js
const fetch = require('node-fetch');
const util = require('util');

const fetch_retry = (url, options, n=5) => fetch(url, options).catch(function(error) {
  if (n === 0) {
    throw error;
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(fetch_retry(url, options, n - 1)), 1000);
  });
});

const btoa_ext = (buf) => Buffer.from(buf).toString('base64');

const query = (query) => new Promise((resolve, reject) => {
  if (! query) {
    return resolve(false);
  }
  const b64 = btoa_ext(JSON.stringify(query));
  const url = 'https://slpdb.fountainhead.cash/q/' + b64;

  fetch_retry(url)
  .then((r) => r = r.json())
  .then((r) => {
    if (r.hasOwnProperty('error')) {
      reject(new Error(r['error']));
    }
    resolve(r);
  });
});

//EXAMPLE QUERY
const all_tokens = (limit=10, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['t'],
    'find': {},
    'sort': {
      'tokenStats.approx_txns_since_genesis': -1,
    },
    'limit': limit,
    'skip': skip,
  },
});

const run = async () => {console.log(util.inspect(await all_tokens(), {showHidden: false, depth: null}));}  
run();
```

`fetch_retry` is used to deal with occassional network errors that might occur when connecting with 3rd party servers.

You can learn more about this implementation [here](/tooling/slpdb_examples/#how-to-query-slpdb).

In this case we already added one example query and the call to start the execution. Whenever changing the query,
 make sure to also change the name in the execution call at the end.

To execute, just run

```bash
> node SLPDB.js
```

## Examples

Now that we have pinned down the basics, let's jump on to some examples. Let's start with the one in the code above

### Get All Tokens

```js
const all_tokens = (limit=10, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['t'],
    'find': {},
    'sort': {
      'tokenStats.approx_txns_since_genesis': -1,
    },
    'limit': limit,
    'skip': skip,
  },
});
```

Here we are sorting all the tokens in descending order using the `approx_txns_since_genesis` field, and then limiting this result to only 10 results. This will give us all the details of the tokens with more activity 
in the network.

The result looks as follows

```js
{
  t: [
    {
      _id: '5f107a29df976301040d4c57',
      schema_version: 79,
      lastUpdatedBlock: 644379,
      tokenDetails: {
        decimals: 0,
        tokenIdHex: '7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1',
        timestamp: '2019-04-03 11:28:58',
        timestamp_unix: 1554290938,
        transactionType: 'GENESIS',
        versionType: 1,
        documentUri: 'THE REAL HONK SLP TOKEN',
        documentSha256Hex: null,
        symbol: 'HONK',
        name: 'HONK HONK',
        batonVout: null,
        containsBaton: false,
        genesisOrMintQuantity: '100000000000',
        sendOutputs: null
      },
      mintBatonUtxo: '',
      mintBatonStatus: 'DEAD_ENDED',
      tokenStats: { block_created: 576633, approx_txns_since_genesis: 344976 },
      _pruningState: { pruneHeight: 644329, sendCount: 51154, mintCount: 0 }
    },
    {
      _id: '5f107d32df976301040f7544',
      schema_version: 79,
      lastUpdatedBlock: 624791,
      tokenDetails: {
        decimals: 8,
        tokenIdHex: '0df768b5485c72645de069b68f66d02205c26f827c608ef5ffa976266d753d50',
        timestamp: '2019-06-11 12:18:18',
        timestamp_unix: 1560255498,
        transactionType: 'GENESIS',
        versionType: 1,
        documentUri: '',
        documentSha256Hex: null,
        symbol: 'TGT',
        name: 'tribeOS Token Test #3',
        batonVout: null,
        containsBaton: false,
        genesisOrMintQuantity: '50000000',
        sendOutputs: null
      },
      mintBatonUtxo: '',
      mintBatonStatus: 'DEAD_ENDED',
      tokenStats: { block_created: 586567, approx_txns_since_genesis: 111463 },
      _pruningState: { pruneHeight: 623860, sendCount: 34894, mintCount: 0 }
    },
    {
      _id: '5f107972df976301040cc084',
      schema_version: 79,
      lastUpdatedBlock: 644379,
      tokenDetails: {
        decimals: 8,
        tokenIdHex: '4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf',
        timestamp: '2019-02-24 21:14:35',
        timestamp_unix: 1551042875,
        transactionType: 'GENESIS',
        versionType: 1,
        documentUri: 'spiceslp@gmail.com',
        documentSha256Hex: null,
        symbol: 'SPICE',
        name: 'Spice',
        batonVout: null,
        containsBaton: false,
        genesisOrMintQuantity: '1000000000',
        sendOutputs: null
      },
      mintBatonUtxo: '',
      mintBatonStatus: 'DEAD_ENDED',
      tokenStats: { block_created: 571212, approx_txns_since_genesis: 108218 },
      _pruningState: { pruneHeight: 644325, sendCount: 84505, mintCount: 0 }
    },
    
	...
```

As you can see this returns all the fields detailed in the `t` DB schema, plus an `_id` field by default.

### Count Total Tokens

```js
const count_tokens = () => query({
  'v': 3,
  'q': {
    'db': ['t'],
    'aggregate': [
      {
        '$match': {},
      },
      {
        '$group': {
          '_id': null,
          'count': {'$sum': 1},
        },
      },
    ],
  },
  'r': {
    'f': '[ .[] | {count: .count } ]',
  },
});
```

Result

```js
{ t: [ { count: 9092 } ] }
```

Here we get the total amount of SLP tokens created to date. As you can see we make the query for all the tokens and then alter the result with the field `'r'` before the response is sent back to us, which translates to a 
more lightweight data transfer.

### Look up Transaction by TXID

```js
const tx = (txid) => query({
  'v': 3,
  'q': {
    'db': ['c', 'u'],
    'aggregate': [
      {
        '$match': {
          'tx.h': txid,
        },
      },
      {
        '$limit': 1,
      },
      {
        '$lookup': {
          'from': 'graphs',
          'localField': 'tx.h',
          'foreignField': 'graphTxn.txid',
          'as': 'graph',
        },
      },
      {
        '$lookup': {
          'from': 'tokens',
          'localField': 'slp.detail.tokenIdHex',
          'foreignField': 'tokenDetails.tokenIdHex',
          'as': 'token',
        },
      },
    ],
    'limit': 1,
  },
});
```

Result

```js
{
  c: [
    {
      _id: '5f115750df9763010453aabc',
      tx: {
        h: '3098dc4e99622711b61cbd292492482c2233cca76c58a806e58fd9cf616b4a13',
        raw: 'AgAAAAIjAdFg0NiNjQcNUQNhObSR46+1/jN7VGKDRUxIXXkr9QIAAABqRzBEAiBuDfC/aCD5ES+wFoILXi3t1/zqww6uXGu0gcAKh3QM9QIgfY13PiHNAtlzq0ou1CUp6QOmcIhGu9fcm5iMl2EeGj9BIQM/Jn/sD36ysn+MLjBSs9A7CdNrR95Agv+2OP+zNO8O7v////8jAdFg0NiNjQcNUQNhObSR46+1/jN7VGKDRUxIXXkr9QQAAABrSDBFAiEAus0f0Ow0GH7RTMOkeZiQzp/99GgbwV/uAlSwUBFROSoCICYDFAn+uJtgYohQ3TiASBcAN+OL5zrelRardfIdqbA5QSEDPyZ/7A9+srJ/jC4wUrPQOwnTa0feQIL/tjj/szTvDu7/////BQAAAAAAAAAAQGoEU0xQAAEBBFNFTkQgLTSzpYVbxcdFfTNQnkmfGIuJrRyN85ohkiVsJXtmmUAIAAAAAAX14QAIAAAAAUfTVwAiAgAAAAAAABl2qRQoJQwcCJd0uWdayMSPKX9YhHg10IisIgIAAAAAAAAZdqkUZrIVb3FinIn1v4gss5ILDh5NT6iIrNAHAAAAAAAAGXapFCA7ZL+6qeWDMylbYhFZ3evFkeyxiKwqvgMAAAAAABl2qRRmshVvcWKcifW/iCyzkgsOHk1PqIisAAAAAA=='
      },
      in: [
        {
          i: 0,
          b0: 'MEQCIG4N8L9oIPkRL7AWggteLe3X/OrDDq5ca7SBwAqHdAz1AiB9jXc+Ic0C2XOrSi7UJSnpA6ZwiEa719ybmIyXYR4aP0E=',
          b1: 'Az8mf+wPfrKyf4wuMFKz0DsJ02tH3kCC/7Y4/7M07w7u',
          str: '304402206e0df0bf6820f9112fb016820b5e2dedd7fceac30eae5c6bb481c00a87740cf502207d8d773e21cd02d973ab4a2ed42529e903a6708846bbd7dc9b988c97611e1a3f41 033f267fec0f7eb2b27f8c2e3052b3d03b09d36b47de4082ffb638ffb334ef0eee',
          e: {
            h: 'f52b795d484c458362547b33feb5afe391b4396103510d078d8dd8d060d10123',
            i: 2,
            s: 'RzBEAiBuDfC/aCD5ES+wFoILXi3t1/zqww6uXGu0gcAKh3QM9QIgfY13PiHNAtlzq0ou1CUp6QOmcIhGu9fcm5iMl2EeGj9BIQM/Jn/sD36ysn+MLjBSs9A7CdNrR95Agv+2OP+zNO8O7g==',
            a: 'simpleledger:qpnty9t0w93fez04h7yzevujpv8pun204qqp0jfafg'
          },
          h0: '304402206e0df0bf6820f9112fb016820b5e2dedd7fceac30eae5c6bb481c00a87740cf502207d8d773e21cd02d973ab4a2ed42529e903a6708846bbd7dc9b988c97611e1a3f41',
          h1: '033f267fec0f7eb2b27f8c2e3052b3d03b09d36b47de4082ffb638ffb334ef0eee'
        },
        {
          i: 1,
          b0: 'MEUCIQC6zR/Q7DQYftFMw6R5mJDOn/30aBvBX+4CVLBQEVE5KgIgJgMUCf64m2BiiFDdOIBIFwA344vnOt6VFqt18h2psDlB',
          b1: 'Az8mf+wPfrKyf4wuMFKz0DsJ02tH3kCC/7Y4/7M07w7u',
          str: '3045022100bacd1fd0ec34187ed14cc3a4799890ce9ffdf4681bc15fee0254b0501151392a022026031409feb89b60628850dd388048170037e38be73ade9516ab75f21da9b03941 033f267fec0f7eb2b27f8c2e3052b3d03b09d36b47de4082ffb638ffb334ef0eee',
          e: {
            h: 'f52b795d484c458362547b33feb5afe391b4396103510d078d8dd8d060d10123',
            i: 4,
            s: 'SDBFAiEAus0f0Ow0GH7RTMOkeZiQzp/99GgbwV/uAlSwUBFROSoCICYDFAn+uJtgYohQ3TiASBcAN+OL5zrelRardfIdqbA5QSEDPyZ/7A9+srJ/jC4wUrPQOwnTa0feQIL/tjj/szTvDu4=',
            a: 'simpleledger:qpnty9t0w93fez04h7yzevujpv8pun204qqp0jfafg'
          },
          h0: '3045022100bacd1fd0ec34187ed14cc3a4799890ce9ffdf4681bc15fee0254b0501151392a022026031409feb89b60628850dd388048170037e38be73ade9516ab75f21da9b03941',
          h1: '033f267fec0f7eb2b27f8c2e3052b3d03b09d36b47de4082ffb638ffb334ef0eee'
        }
      ],
      out: [
        {
          i: 0,
          b0: { op: 106 },
          b1: 'U0xQAA==',
          s1: 'SLP\u0000',
          b2: 'AQ==',
          s2: '\u0001',
          b3: 'U0VORA==',
          s3: 'SEND',
          b4: 'LTSzpYVbxcdFfTNQnkmfGIuJrRyN85ohkiVsJXtmmUA=',
          s4: '-4���[��E}3P�I�\u0018���\u001c��!�%l%{f�@',
          b5: 'AAAAAAX14QA=',
          s5: '\u0000\u0000\u0000\u0000\u0005��\u0000',
          b6: 'AAAAAUfTVwA=',
          s6: '\u0000\u0000\u0000\u0001G�W\u0000',
          str: 'OP_RETURN 534c5000 01 53454e44 2d34b3a5855bc5c7457d33509e499f188b89ad1c8df39a2192256c257b669940 0000000005f5e100 0000000147d35700',
          e: {
            v: 0,
            i: 0,
            s: 'agRTTFAAAQEEU0VORCAtNLOlhVvFx0V9M1CeSZ8Yi4mtHI3zmiGSJWwle2aZQAgAAAAABfXhAAgAAAABR9NXAA=='
          },
          h1: '534c5000',
          h2: '01',
          h3: '53454e44',
          h4: '2d34b3a5855bc5c7457d33509e499f188b89ad1c8df39a2192256c257b669940',
          h5: '0000000005f5e100',
          h6: '0000000147d35700'
        },
        {
          i: 1,
          b0: { op: 118 },
          b1: { op: 169 },
          b2: 'KCUMHAiXdLlnWsjEjyl/WIR4NdA=',
          s2: '(%\f\u001c\b�t�gZ�ď)X�x5�',
          b3: { op: 136 },
          b4: { op: 172 },
          str: 'OP_DUP OP_HASH160 28250c1c089774b9675ac8c48f297f58847835d0 OP_EQUALVERIFY OP_CHECKSIG',
          e: {
            v: 546,
            i: 1,
            s: 'dqkUKCUMHAiXdLlnWsjEjyl/WIR4NdCIrA==',
            a: 'simpleledger:qq5z2rqupzthfwt8ttyvfref0avgg7p46qs5t7a3uy'
          },
          h2: '28250c1c089774b9675ac8c48f297f58847835d0'
        },
        {
          i: 2,
          b0: { op: 118 },
          b1: { op: 169 },
          b2: 'ZrIVb3FinIn1v4gss5ILDh5NT6g=',
          s2: 'f�\u0015oqb�����,��\u000b\u000e\u001eMO�',
          b3: { op: 136 },
          b4: { op: 172 },
          str: 'OP_DUP OP_HASH160 66b2156f71629c89f5bf882cb3920b0e1e4d4fa8 OP_EQUALVERIFY OP_CHECKSIG',
          e: {
            v: 546,
            i: 2,
            s: 'dqkUZrIVb3FinIn1v4gss5ILDh5NT6iIrA==',
            a: 'simpleledger:qpnty9t0w93fez04h7yzevujpv8pun204qqp0jfafg'
          },
          h2: '66b2156f71629c89f5bf882cb3920b0e1e4d4fa8'
        },
        {
          i: 3,
          b0: { op: 118 },
          b1: { op: 169 },
          b2: 'IDtkv7qp5YMzKVtiEVnd68WR7LE=',
          s2: ' ;d����3)[b\u0011Y��ő�',
          b3: { op: 136 },
          b4: { op: 172 },
          str: 'OP_DUP OP_HASH160 203b64bfbaa9e58333295b621159ddebc591ecb1 OP_EQUALVERIFY OP_CHECKSIG',
          e: {
            v: 2000,
            i: 3,
            s: 'dqkUIDtkv7qp5YMzKVtiEVnd68WR7LGIrA==',
            a: 'simpleledger:qqsrke9lh257tqen99dkyy2emh4uty0vkyflye6lwa'
          },
          h2: '203b64bfbaa9e58333295b621159ddebc591ecb1'
        },
        {
          i: 4,
          b0: { op: 118 },
          b1: { op: 169 },
          b2: 'ZrIVb3FinIn1v4gss5ILDh5NT6g=',
          s2: 'f�\u0015oqb�����,��\u000b\u000e\u001eMO�',
          b3: { op: 136 },
          b4: { op: 172 },
          str: 'OP_DUP OP_HASH160 66b2156f71629c89f5bf882cb3920b0e1e4d4fa8 OP_EQUALVERIFY OP_CHECKSIG',
          e: {
            v: 245290,
            i: 4,
            s: 'dqkUZrIVb3FinIn1v4gss5ILDh5NT6iIrA==',
            a: 'simpleledger:qpnty9t0w93fez04h7yzevujpv8pun204qqp0jfafg'
          },
          h2: '66b2156f71629c89f5bf882cb3920b0e1e4d4fa8'
        }
      ],
      slp: {
        valid: true,
        detail: {
          decimals: 8,
          tokenIdHex: '2d34b3a5855bc5c7457d33509e499f188b89ad1c8df39a2192256c257b669940',
          transactionType: 'SEND',
          versionType: 1,
          documentUri: 'https://imgur.com/DgGEgpc',
          documentSha256Hex: null,
          symbol: '┗(°0°)┛',
          name: 'To the MOON',
          txnBatonVout: null,
          txnContainsBaton: false,
          outputs: [
            {
              address: 'simpleledger:qq5z2rqupzthfwt8ttyvfref0avgg7p46qs5t7a3uy',
              amount: '1'
            },
            {
              address: 'simpleledger:qpnty9t0w93fez04h7yzevujpv8pun204qqp0jfafg',
              amount: '55'
            }
          ]
        },
        invalidReason: null,
        schema_version: 79
      },
      blk: {
        h: '000000000000000000d8c7625e49216062bd14c555bc4c25284309e230739873',
        i: 644228,
        t: 1594952220
      },
      graph: [
        {
          _id: '5f115750df9763010453aae7',
          tokenDetails: {
            tokenIdHex: '2d34b3a5855bc5c7457d33509e499f188b89ad1c8df39a2192256c257b669940'
          },
          graphTxn: {
            txid: '3098dc4e99622711b61cbd292492482c2233cca76c58a806e58fd9cf616b4a13',
            details: {
              decimals: null,
              tokenIdHex: '2d34b3a5855bc5c7457d33509e499f188b89ad1c8df39a2192256c257b669940',
              timestamp: null,
              timestamp_unix: null,
              transactionType: 'SEND',
              versionType: 1,
              documentUri: null,
              documentSha256Hex: null,
              symbol: null,
              name: null,
              batonVout: null,
              containsBaton: false,
              genesisOrMintQuantity: null,
              sendOutputs: [ '0', '1', '55' ]
            },
            outputs: [
              {
                slpAmount: '1',
                address: 'simpleledger:qq5z2rqupzthfwt8ttyvfref0avgg7p46qs5t7a3uy',
                vout: 1,
                bchSatoshis: 546,
                spendTxid: null,
                status: 'UNSPENT',
                invalidReason: null
              },
              {
                slpAmount: '55',
                address: 'simpleledger:qpnty9t0w93fez04h7yzevujpv8pun204qqp0jfafg',
                vout: 2,
                bchSatoshis: 546,
                spendTxid: '51056834bd6ce492b9be3a9f4688f4b34b1380e6b94fab7ecd3da97c1aa199e6',
                status: 'SPENT_SAME_TOKEN',
                invalidReason: null
              }
            ],
            inputs: [
              {
                address: 'simpleledger:qpnty9t0w93fez04h7yzevujpv8pun204qqp0jfafg',
                txid: 'f52b795d484c458362547b33feb5afe391b4396103510d078d8dd8d060d10123',
                vout: 2,
                bchSatoshis: 546,
                slpAmount: '56'
              }
            ],
            _blockHash: 'AAAAAAAAAAAA2MdiXkkhYGK9FMVVvEwlKEMJ4jBzmHM=',
            _pruneHeight: null
          }
        }
      ],
      token: [
        {
          _id: '5f10879ddf9763010416358f',
          schema_version: 79,
          lastUpdatedBlock: 644234,
          tokenDetails: {
            decimals: 8,
            tokenIdHex: '2d34b3a5855bc5c7457d33509e499f188b89ad1c8df39a2192256c257b669940',
            timestamp: '2019-09-19 03:13:02',
            timestamp_unix: 1568862782,
            transactionType: 'GENESIS',
            versionType: 1,
            documentUri: 'https://imgur.com/DgGEgpc',
            documentSha256Hex: null,
            symbol: '┗(°0°)┛',
            name: 'To the MOON',
            batonVout: 2,
            containsBaton: true,
            genesisOrMintQuantity: '21000000',
            sendOutputs: null
          },
          mintBatonUtxo: '2d34b3a5855bc5c7457d33509e499f188b89ad1c8df39a2192256c257b669940:2',
          mintBatonStatus: 'ALIVE',
          tokenStats: { block_created: 600877, approx_txns_since_genesis: 296 },
          _pruningState: { pruneHeight: 644224, sendCount: 72, mintCount: 0 }
        }
      ]
    }
  ],
  u: []
}
```

This is a more complex query where we make several lookups to the different DBs to retrieve an aggregate result on the transaction defined in `txid`. In this case the call to the function should look like this

```js
//txid example
console.log(util.inspect(await tx('3098dc4e99622711b61cbd292492482c2233cca76c58a806e58fd9cf616b4a13'), {showHidden: false, depth: null}));
```

## More examples

You can find an extensive library of examples in our [SLPDB Examples](/tooling/slpdb_examples/) section.