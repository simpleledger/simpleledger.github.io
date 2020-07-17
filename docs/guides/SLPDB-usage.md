# SLPDB usage

For those of you not already familiar with [SLPDB](/tooling/slpdb), it's purpose is storing all data related to the Simple Ledger Protocol, with real-time transaction and block notifications.

As such, it's an invaluable tool whenever looking to build services that require reliable data on SLP specifics without needing to transverse the blockchain ourselves.

## Getting started

There are several SLPDB instances available for the public to query, like [https://slpdb.fountainhead.cash](https://slpdb.fountainhead.cash) or [https://slpdb.bitcoin.com](https://slpdb.bitcoin.com).
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

   //console.log(url);

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

var trythis = async function(){console.log(await all_tokens());}  
trythis();
```

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
      _id: '5f0df6ad07fe81da0f282951',
      schema_version: 79,
      lastUpdatedBlock: 644215,
      tokenDetails: [Object],
      mintBatonUtxo: '',
      mintBatonStatus: 'DEAD_ENDED',
      tokenStats: [Object],
      _pruningState: [Object]
    },
    {
      _id: '5f0df5dc07fe81da0f279b75',
      schema_version: 79,
      lastUpdatedBlock: 644211,
      tokenDetails: [Object],
      mintBatonUtxo: '',
      mintBatonStatus: 'DEAD_ENDED',
      tokenStats: [Object],
      _pruningState: [Object]
    },
    {
      _id: '5f0dfa2407fe81da0f2a529f',
      schema_version: 79,
      lastUpdatedBlock: 624791,
      tokenDetails: [Object],
      mintBatonUtxo: '',
      mintBatonStatus: 'DEAD_ENDED',
      tokenStats: [Object],
      _pruningState: [Object]
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
      _id: '5f110a4e9192ff857038c417',
      tx: [Object],
      in: [Array],
      out: [Array],
      slp: [Object],
      blk: [Object],
      graph: [Array],
      token: [Array]
    }
  ],
  u: []
}
```

This is a more complex query where we make several lookups to the different DBs to retrieve an aggregate result on the transaction defined in `txid`. In this case the call to the function should look like this

```js
//txid example
console.log(await tx('3098dc4e99622711b61cbd292492482c2233cca76c58a806e58fd9cf616b4a13'));
```

We can also navigate the different fields in order to expand them on the console. For example if we navigate to `c` 

```js
console.log((await tx('3098dc4e99622711b61cbd292492482c2233cca76c58a806e58fd9cf616b4a13')).c);
```

We will get the following

```js
[
  {
    _id: '5f110a4e9192ff857038c417',
    tx: {
      h: '3098dc4e99622711b61cbd292492482c2233cca76c58a806e58fd9cf616b4a13',
      raw: 'AgAAAAIjAdFg0NiNjQcNUQNhObSR46+1/jN7VGKDRUxIXXkr9QIAAABqRzBEAiBuDfC/aCD5ES+wFoILXi3t1/zqww6uXGu0gcAKh3QM9QIgfY13PiHNAtlzq0ou1CUp6QOmcIhGu9fcm5iMl2EeGj9BIQM/Jn/sD36ysn+MLjBSs9A7CdNrR95Agv+2OP+zNO8O7v////8jAdFg0NiNjQcNUQNhObSR46+1/jN7VGKDRUxIXXkr9QQAAABrSDBFAiEAus0f0Ow0GH7RTMOkeZiQzp/99GgbwV/uAlSwUBFROSoCICYDFAn+uJtgYohQ3TiASBcAN+OL5zrelRardfIdqbA5QSEDPyZ/7A9+srJ/jC4wUrPQOwnTa0feQIL/tjj/szTvDu7/////BQAAAAAAAAAAQGoEU0xQAAEBBFNFTkQgLTSzpYVbxcdFfTNQnkmfGIuJrRyN85ohkiVsJXtmmUAIAAAAAAX14QAIAAAAAUfTVwAiAgAAAAAAABl2qRQoJQwcCJd0uWdayMSPKX9YhHg10IisIgIAAAAAAAAZdqkUZrIVb3FinIn1v4gss5ILDh5NT6iIrNAHAAAAAAAAGXapFCA7ZL+6qeWDMylbYhFZ3evFkeyxiKwqvgMAAAAAABl2qRRmshVvcWKcifW/iCyzkgsOHk1PqIisAAAAAA=='
    },
    in: [ [Object], [Object] ],
    out: [ [Object], [Object], [Object], [Object], [Object] ],
    slp: {
      valid: true,
      detail: [Object],
      invalidReason: null,
      schema_version: 79
    },
    blk: {
      h: '000000000000000000d8c7625e49216062bd14c555bc4c25284309e230739873',
      i: 644228,
      t: 1594952220
    },
    graph: [ [Object] ],
    token: [ [Object] ]
  }
]
```

## More examples

You can find an extensive library of examples in our [SLPDB Examples](/tooling/slpdb_examples/) section.