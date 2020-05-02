# SLPDB Examples

#### Table of contents

[[toc]]

## Introduction

### How to Query SLPDB

The following examples assume a similar implementation as the following to query SLPDB. `fetch_retry` is used to deal with occassional network errors, and `btoa_ext` is a nice way to ensure we can handle the full range of possible characters (such as querying some Chinese characters). If you are using SLPDB from a browser, browserify, babel, and other tools provide a Buffer implementation.

The core idea to this is to take JSON and convert it into a string, then convert that to base64, and perform a GET request to a SLPServe server.

```js
const fetch = require('node-fetch');

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

  console.log(url);

  fetch_retry(url)
  .then((r) => r = r.json())
  .then((r) => {
    if (r.hasOwnProperty('error')) {
      reject(new Error(r['error']));
    }
    resolve(r);
  });
});
```

## General Queries

### Get All Tokens

```js
const all_tokens = (limit=100, skip=0) => query({
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

### Token Transaction History

```js
const token_transaction_history_query_generator = (db, tokenIdHex, address=null, limit=100, skip=0) => {
  const q = {
    'v': 3,
    'q': {
      'db': [db],
      'find': {
        '$and': [
          {'slp.valid': true},
          {'slp.detail.tokenIdHex': tokenIdHex},
        ],
      },
      'sort': {'blk.i': -1},
      'limit': limit,
      'skip': skip,
    },
  };

  if (address !== null) {
    q['q']['find']['$query']['$or'] = [
      {'in.e.a': address},
      {'out.e.a': address},
    ];
  }

  return q;
};

const unconfirmed_token_transaction_history = (tokenIdHex, address=null, limit=100, skip=0) => {
  return query(token_transaction_history_query_generator('u', tokenIdHex, address, limit, skip));
};

confirmed_token_transaction_history = (tokenIdHex, address=null, limit=100, skip=0) => {
  return query(token_transaction_history_query_generator('c', tokenIdHex, address, limit, skip));
};
```

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

### Transactions in a Block 

```js
const txs_by_block = (height, limit=150, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['c'],
    'aggregate': [
      {
        '$match': {
          '$and': [
            {'slp.valid': true},
            {'blk.i': height},
          ],
        },
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
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
    'limit': limit,
  },
});
```

### Transactions in Mempool

```js
const txs_in_mempool = (limit=150, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['u'],
    'aggregate': [
      {
        '$match': {
          'slp.valid': true,
        },
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
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
    'limit': limit,
  },
});
```

### Look up Token By tokenIdHex

```js
const token = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['t'],
    'find': {
      'tokenDetails.tokenIdHex': tokenIdHex,
    },
    'limit': 1,
  },
});
```

### Look up Multiple Tokens in one Query

```js
const tokens = (tokenIdHexs) => query({
  'v': 3,
  'q': {
    'db': ['t'],
    'find': {
      'tokenDetails.tokenIdHex': {
        '$in': tokenIdHexs,
      },
    },
    'limit': tokenIdHexs.length,
  },
});
```

### Look up All Addresses associated with a Token

```js
const token_addresses = (tokenIdHex, limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': 'UNSPENT',
        },
      },
      {
        '$group': {
          '_id': '$graphTxn.outputs.address',
          'slpAmount': {
            '$sum': '$graphTxn.outputs.slpAmount',
          },
        },
      },
      {
        '$match': {
          'slpAmount': {
            '$gt': 0,
          },
        },
      },
    ],
    'sort': {
      'slpAmount': -1,
    },
    'project': {
      'address': '$_id',
      'token_balance': '$slpAmount',
    },
    'limit': limit,
    'skip': skip,
  },
});
```

### Token Mint History
 
```js
const token_mint_history = (tokenIdHex, limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['u', 'c'],
    'find': {
      'slp.valid': true,
      'slp.detail.tokenIdHex': tokenIdHex,
      '$or': [
        {
          'slp.detail.transactionType': 'GENESIS',
        },
        {
          'slp.detail.transactionType': 'MINT',
        },
      ],
    },
    'sort': {
      'blk.i': -1,
    },
    'limit': limit,
    'skip': skip,
  },
});
```

### Token Burn History

```js
const token_burn_history = (tokenIdHex, limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          'graphTxn.outputs': {
            '$elemMatch': {
              'status': {
                '$in': [
                  'SPENT_NON_SLP',
                  'BATON_SPENT_INVALID_SLP',
                  'SPENT_INVALID_SLP',
                  'BATON_SPENT_NON_SLP',
                  'MISSING_BCH_VOUT',
                  'BATON_MISSING_BCH_VOUT',
                  'BATON_SPENT_NOT_IN_MINT',
                  'EXCESS_INPUT_BURNED',
                ],
              },
              'slpAmount': {
                '$gt': 0,
              },
            },
          },
        },
      },
      {
        '$lookup': {
          'from': 'confirmed',
          'localField': 'graphTxn.txid',
          'foreignField': 'tx.h',
          'as': 'tx',
        },
      },
      {
        '$sort': {
          'tx.blk.i': -1,
        },
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
      },
    ],
  },
});
```

### Address Burn History

```js
const address_burn_history = (address, limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          '$or': [
            {
              'graphTxn.outputs': {
                '$elemMatch': {
                  'address': address,
                  'status': {
                    '$in': [
                      'SPENT_NON_SLP',
                      'BATON_SPENT_INVALID_SLP',
                      'SPENT_INVALID_SLP',
                      'BATON_SPENT_NON_SLP',
                      'MISSING_BCH_VOUT',
                      'BATON_MISSING_BCH_VOUT',
                      'BATON_SPENT_NOT_IN_MINT',
                      'EXCESS_INPUT_BURNED',
                    ],
                  },
                  'slpAmount': {
                    '$gt': 0,
                  },
                },
              },
            },
            {
              'graphTxn.inputs.address': address,
              'graphTxn.outputs': {
                '$elemMatch': {
                  'status': {
                    '$in': [
                      'SPENT_NON_SLP',
                      'BATON_SPENT_INVALID_SLP',
                      'SPENT_INVALID_SLP',
                      'BATON_SPENT_NON_SLP',
                      'MISSING_BCH_VOUT',
                      'BATON_MISSING_BCH_VOUT',
                      'BATON_SPENT_NOT_IN_MINT',
                      'EXCESS_INPUT_BURNED',
                    ],
                  },
                  'slpAmount': {
                    '$gt': 0,
                  },
                },
              },
            },
          ],
        },
      },
      {
        '$lookup': {
          'from': 'confirmed',
          'localField': 'graphTxn.txid',
          'foreignField': 'tx.h',
          'as': 'tx',
        },
      },
      {
        '$lookup': {
          'from': 'tokens',
          'localField': 'tx.slp.detail.tokenIdHex',
          'foreignField': 'tokenDetails.tokenIdHex',
          'as': 'token',
        },
      },
      {
        '$sort': {
          'tx.blk.i': -1,
        },
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
      },
    ],
  },
});
```

### Get burn history of all tokens

```js
const total_burn_history = (limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'graphTxn.outputs': {
            '$elemMatch': {
              'status': {
                '$in': [
                  'SPENT_NON_SLP',
                  'BATON_SPENT_INVALID_SLP',
                  'SPENT_INVALID_SLP',
                  'BATON_SPENT_NON_SLP',
                  'MISSING_BCH_VOUT',
                  'BATON_MISSING_BCH_VOUT',
                  'BATON_SPENT_NOT_IN_MINT',
                  'EXCESS_INPUT_BURNED',
                ],
              },
              'slpAmount': {
                '$gt': 0,
              },
            },
          },
        },
      },
      {
        '$lookup': {
          'from': 'confirmed',
          'localField': 'graphTxn.txid',
          'foreignField': 'tx.h',
          'as': 'tx',
        },
      },
      {
        '$lookup': {
          'from': 'tokens',
          'localField': 'tx.slp.detail.tokenIdHex',
          'foreignField': 'tokenDetails.tokenIdHex',
          'as': 'token',
        },
      },
      {
        '$sort': {
          'tx.blk.i': -1,
        },
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
      },
    ],
  },
});
```

### Token Child NFTs

```js
const token_child_nfts = (tokenIdHex, limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['t'],
    'aggregate': [
      {
        '$match': {
          'nftParentId': tokenIdHex,
        },
      },
      {
        '$sort': {
          'tokenStats.block_created': -1,
        },
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
      },
    ],
  },
});
```

### Recent transactions

```js
const recent_transactions = (limit=150, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['c', 'u'],
    'aggregate': [
      {
        '$match': {
          'slp.valid': true,
          'slp.detail.transactionType': 'SEND',
        },
      },
      {
        '$sort': {
          '_id': -1,
        },
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
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
    'limit': limit,
  },
});
```

### Transactions involving address

```js
const transactions_by_slp_address = (db, address, limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': [db],
    'aggregate': [
      {
        '$match': {
          '$and': [
            {'slp.valid': true},
            {
              '$or': [
                {'in.e.a': address},
                {'out.e.a': address},
              ],
            },
          ],
        },
      },
      {
        '$sort': {'blk.i': -1},
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
      },
      {
        '$lookup': {
          'from': 'tokens',
          'localField': 'slp.detail.tokenIdHex',
          'foreignField': 'tokenDetails.tokenIdHex',
          'as': 'token',
        },
      },
      {
        '$lookup': {
          'from': 'graphs',
          'localField': 'tx.h',
          'foreignField': 'graphTxn.txid',
          'as': 'graph',
        },
      },
    ],
    'limit': limit,
  },
});

const unconfirmed_transactions_by_slp_address = (address, limit=100, skip=0) => {
  return transactions_by_slp_address('u', address, limit, skip);
};

const confirmed_transactions_by_slp_address = (address, limit=100, skip=0) => {
  return transactions_by_slp_address('c', address, limit, skip);
};
```

### Tokens by SLP Address

```js
const tokens_by_slp_address = (address, limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'graphTxn.outputs.address': address,
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': 'UNSPENT',
          'graphTxn.outputs.address': address,
        },
      },
      {
        '$group': {
          '_id': '$tokenDetails.tokenIdHex',
          'slpAmount': {
            '$sum': '$graphTxn.outputs.slpAmount',
          },
        },
      },
      {
        '$sort': {
          'slpAmount': -1,
        },
       },
      {
        '$match': {
          'slpAmount': {
            '$gt': 0,
          },
        },
      },
      {
        '$lookup': {
          'from': 'tokens',
          'localField': '_id',
          'foreignField': 'tokenDetails.tokenIdHex',
          'as': 'token',
        },
      },
    ],
    'sort': {
      'slpAmount': -1,
     },
    'skip': skip,
    'limit': limit,
  },
});
```

### Recently created tokens

```js
const recent_tokens = (limit=100, skip=0) => query({
  'v': 3,
  'q': {
    'db': ['c'],
    'aggregate': [
      {
        '$match': {
          'slp.detail.transactionType': 'GENESIS',
          'slp.valid': true,
        },
      },
      {
        '$lookup': {
          'from': 'tokens',
          'localField': 'tx.h',
          'foreignField': 'tokenDetails.tokenIdHex',
          'as': 'token',
        },
      },
      {
        '$sort': {
          'blk.i': -1,
        },
      },
      {
        '$skip': skip,
      },
      {
        '$limit': limit,
      },
    ],
    'limit': limit,
  },
});
```

## Counting

### Count how many tokens there are

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

### Count total tokens minted

```js
const token_get_total_minted = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          '$or': [
            {'graphTxn.details.transactionType': 'GENESIS'},
            {'graphTxn.details.transactionType': 'MINT'},
          ],
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$group': {
          '_id': null,
          'count': {
            '$sum': '$graphTxn.outputs.slpAmount',
          },
        },
      },
    ],
    'limit': 10,
  },
});
```


### Count Unconfirmed Transaction History

```js
const count_unconfirmed_token_transaction_history = (tokenIdHex, address=null) => {
  let match;

  if (address == null) {
    match = {
      '$and': [
        {'slp.valid': true},
        {'slp.detail.tokenIdHex': tokenIdHex},
      ],
    };
  } else {
    match = {
      '$and': [
        {'slp.valid': true},
        {'slp.detail.tokenIdHex': tokenIdHex},
      ],
      '$or': [
        {'in.e.a': address},
        {'out.e.a': address},
      ],
    };
  }

  return {
    'v': 3,
    'q': {
      'db': ['u'],
      'aggregate': [
        {
          '$match': match,
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
  };
};
```

### Count Transactions By Block

```js
const count_txs_by_block = (height) => query({
  'v': 3,
  'q': {
    'db': ['c'],
    'aggregate': [
      {
        '$match': {
          '$and': [
            {'slp.valid': true},
            {'blk.i': height},
          ],
        },
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

### Count Transactions in Mempool

```js
const count_txs_in_mempool = () => query({
  'v': 3,
  'q': {
    'db': ['u'],
    'aggregate': [
      {
        '$match': {
          'slp.valid': true,
        },
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

### Count Total Mints for a Token

```js
const count_token_mint_transactions = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['c'],
    'aggregate': [
      {
        '$match': {
          'slp.valid': true,
          'slp.detail.tokenIdHex': tokenIdHex,
          '$or': [
            {
              'slp.detail.transactionType': 'GENESIS',
            },
            {
              'slp.detail.transactionType': 'MINT',
            },
          ],
        },
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

### Count Total Burned Tokens

```js
const token_get_total_burned = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          'graphTxn.outputs.status': {
            '$in': [
              'SPENT_NON_SLP',
              'BATON_SPENT_INVALID_SLP',
              'SPENT_INVALID_SLP',
              'BATON_SPENT_NON_SLP',
              'MISSING_BCH_VOUT',
              'BATON_MISSING_BCH_VOUT',
              'BATON_SPENT_NOT_IN_MINT',
              'EXCESS_INPUT_BURNED',
            ],
          },
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': {
            '$in': [
              'SPENT_NON_SLP',
              'BATON_SPENT_INVALID_SLP',
              'SPENT_INVALID_SLP',
              'BATON_SPENT_NON_SLP',
              'MISSING_BCH_VOUT',
              'BATON_MISSING_BCH_VOUT',
              'BATON_SPENT_NOT_IN_MINT',
              'EXCESS_INPUT_BURNED',
            ],
          },
        },
      },
      {
        '$group': {
          '_id': null,
          'count': {
            '$sum': '$graphTxn.outputs.slpAmount',
          },
        },
      },
    ],
    'limit': 1,
  },
  'r': {
    'f': '[ .[] | {count: .count } ]',
  },
});
```

### Count Total Satoshis Locked Up

```js
const token_get_total_satoshis_locked = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          'graphTxn.outputs.status': {
            '$in': [
              'UNSPENT',
              'BATON_UNSPENT',
            ],
          },
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': {
            '$in': [
              'UNSPENT',
              'BATON_UNSPENT',
            ],
          },
        },
      },
      {
        '$group': {
          '_id': null,
          'count': {
            '$sum': '$graphTxn.outputs.bchSatoshis',
          },
        },
      },
    ],
    'limit': 1,
  },
  'r': {
    'f': '[ .[] | {count: .count} ]',
  },
});
```

### Count Total Tokens Minted

```js
const token_get_total_minted = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          '$or': [
            {'graphTxn.details.transactionType': 'GENESIS'},
            {'graphTxn.details.transactionType': 'MINT'},
          ],
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$group': {
          '_id': null,
          'count': {
            '$sum': '$graphTxn.outputs.slpAmount',
          },
        },
      },
    ],
    'limit': 10,
  },
});
```

### Count Tokens Total Transactions

```js
const token_get_total_transactions = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
        },
      },
      {
        '$group': {
          '_id': null,
          'count': {
            '$sum': 1,
          },
        },
      },
    ],
    'limit': 1,
  },
  'r': {
    'f': '[ .[] | {count: .count} ]',
  },
});
```

### Count UTXOs Involving a Token

```js
const token_get_total_utxos = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          'graphTxn.outputs.status': {
            '$in': [
              'UNSPENT',
              'BATON_UNSPENT',
            ],
          },
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': {
            '$in': [
              'UNSPENT',
              'BATON_UNSPENT',
            ],
          },
          'graphTxn.outputs.slpAmount': {
            '$gt': 0,
          },
        },
      },
      {
        '$group': {
          '_id': null,
          'count': {
            '$sum': 1,
          },
        },
      },
    ],
    'limit': 1,
  },
  'r': {
    'f': '[ .[] | {count: .count} ]',
  },
});
```

### Count Total Addresses associated with a Token

```js
const token_get_total_addresses = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          'graphTxn.outputs.status': {
            '$in': [
              'UNSPENT',
              'BATON_UNSPENT',
            ],
          },
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': {
            '$in': [
              'UNSPENT',
              'BATON_UNSPENT',
            ],
          },
          'graphTxn.outputs.slpAmount': {
            '$gt': 0,
          },
        },
      },
      {
        '$group': {
          '_id': '$graphTxn.outputs.address',
        },
      },
      {
        '$group': {
          '_id': null,
          'count': {
            '$sum': 1,
          },
        },
      },
    ],
    'limit': 1,
  },
  'r': {
    'f': '[ .[] | {count: .count} ]',
  },
});
```

### Count Token Burn Transactions

```js
const count_token_burn_transactions = (tokenIdHex) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          'graphTxn.outputs': {
            '$elemMatch': {
              'status': {
                '$in': [
                  'SPENT_NON_SLP',
                  'BATON_SPENT_INVALID_SLP',
                  'SPENT_INVALID_SLP',
                  'BATON_SPENT_NON_SLP',
                  'MISSING_BCH_VOUT',
                  'BATON_MISSING_BCH_VOUT',
                  'BATON_SPENT_NOT_IN_MINT',
                  'EXCESS_INPUT_BURNED',
                ],
              },
              'slpAmount': {
                '$gt': 0,
              },
            },
          },
        },
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

### Count an Addresses Total Burn Transactions

```js
const count_address_burn_transactions = (address) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          '$or': [
            {
              'graphTxn.outputs': {
                '$elemMatch': {
                  'address': address,
                  'status': {
                    '$in': [
                      'SPENT_NON_SLP',
                      'BATON_SPENT_INVALID_SLP',
                      'SPENT_INVALID_SLP',
                      'BATON_SPENT_NON_SLP',
                      'MISSING_BCH_VOUT',
                      'BATON_MISSING_BCH_VOUT',
                      'BATON_SPENT_NOT_IN_MINT',
                      'EXCESS_INPUT_BURNED',
                    ],
                  },
                  'slpAmount': {
                    '$gt': 0,
                  },
                },
              },
            },
            {
              'graphTxn.inputs.address': address,
              'graphTxn.outputs': {
                '$elemMatch': {
                  'status': {
                    '$in': [
                      'SPENT_NON_SLP',
                      'BATON_SPENT_INVALID_SLP',
                      'SPENT_INVALID_SLP',
                      'BATON_SPENT_NON_SLP',
                      'MISSING_BCH_VOUT',
                      'BATON_MISSING_BCH_VOUT',
                      'BATON_SPENT_NOT_IN_MINT',
                      'EXCESS_INPUT_BURNED',
                    ],
                  },
                  'slpAmount': {
                    '$gt': 0,
                  },
                },
              },
            },
          ],
        },
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

### Count Total Token Burn Transactions

```js
const count_total_burn_transactions = () => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'graphTxn.outputs': {
            '$elemMatch': {
              'status': {
                '$in': [
                  'SPENT_NON_SLP',
                  'BATON_SPENT_INVALID_SLP',
                  'SPENT_INVALID_SLP',
                  'BATON_SPENT_NON_SLP',
                  'MISSING_BCH_VOUT',
                  'BATON_MISSING_BCH_VOUT',
                  'BATON_SPENT_NOT_IN_MINT',
                  'EXCESS_INPUT_BURNED',
                ],
              },
              'slpAmount': {
                '$gt': 0,
              },
            },
          },
        },
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
}),
```

### Count of Tokens an Address Holds

```js
const count_tokens_by_slp_address = (address) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'graphTxn.outputs.address': address,
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': 'UNSPENT',
          'graphTxn.outputs.address': address,
        },
      },
      {
        '$group': {
          '_id': '$tokenDetails.tokenIdHex',
        },
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

###  Total Transactions by Address

```js
const count_total_transactions_by_slp_address = (address) => query({
  'v': 3,
  'q': {
    'db': [
      'c',
      'u',
    ],
    'aggregate': [
      {
        '$match': {
          '$and': [
            {
              '$or': [
                {'in.e.a': address},
                {'out.e.a': address},
              ],
            },
            {'slp.valid': true},
          ],
        },
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

### Count Address's Sent Transactions

```js
const count_address_sent_transactions = (address) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'graphTxn.inputs.address': address,
        },
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

### Count Address's Received Transactions

```js
const count_address_recv_transactions = (address) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'graphTxn.inputs.address': {
            '$ne': address,
          },
          'graphTxn.outputs.address': address,
        },
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

## Dividend Calculations

### Calculate Dividends from Mempool

```js
const dividend_calculate_bch_mempool = (tokenIdHex, slp_supply, bch_amount, ignoreAddresses) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          'graphTxn.outputs.status': 'UNSPENT',
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': 'UNSPENT',
          'graphTxn.outputs.address': {
            '$nin': ignoreAddresses,
          },
        },
      },
      {
        '$group': {
          '_id': '$graphTxn.outputs.address',
          'slpAmount': {
            '$sum': '$graphTxn.outputs.slpAmount',
          },
        },
      },
      {
        '$sort': {
          'slpAmount': -1,
        },
      },
      {
        '$project': {
          '_id': 1,
          'bchAmount': {
            '$divide': ['$slpAmount', slp_supply],
          },
        },
      },
      {
        '$project': {
          '_id': 1,
          'bchAmount': {
            '$multiply': ['$bchAmount', bch_amount],
          },
        },
      },
      {
        '$limit': 10000,
      },
       {
        '$match': {
          'bchAmount': {
            '$gte': 0.00000546,
          },
        },
      },
    ],
    'limit': 10000,
  },
  'r': {
    'f': '[ .[] | { address: ._id, bchAmount: .bchAmount } ]',
  },
});
```

### Dividend Ignore Amount from Mempool

```js
const dividend_count_ignore_amounts = (tokenIdHex, addresses) => query({
  'v': 3,
  'q': {
    'db': ['g'],
    'aggregate': [
      {
        '$match': {
          'tokenDetails.tokenIdHex': tokenIdHex,
          'graphTxn.outputs.status': 'UNSPENT',
          'graphTxn.outputs.address': {
            '$in': addresses,
          },
        },
      },
      {
        '$unwind': '$graphTxn.outputs',
      },
      {
        '$match': {
          'graphTxn.outputs.status': 'UNSPENT',
          'graphTxn.outputs.address': {
            '$in': addresses,
          },
        },
      },
      {
        '$group': {
          '_id': null,
          'count': {
            '$sum': '$graphTxn.outputs.slpAmount',
          },
        },
      },
    ],
  },
  'r': {
    'f': '[ .[] | {count: .count } ]',
  },
});
```
