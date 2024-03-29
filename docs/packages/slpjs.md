# SLPJS

::: danger
SLPJS is abandoned
:::


::: tip View Repo:
[https://github.com/simpleledger/slpjs](https://github.com/simpleledger/slpjs)
:::


SLPJS is a JavaScript Library for validating and building [Simple Ledger Protocol (SLP)](https://github.com/simpleledger/slp-specification/blob/master/slp-token-type-1.md) token transactions.   GENESIS, MINT, and SEND token functions are supported.  See [change log](#change-log) for updates.


#### Table of Contents

[[toc]]


## Installation

NOTE: Using SLPJS requires bitbox-sdk and bitcore-lib-cash to also be installed.

#### For node.js

```
$ npm install slpjs bitbox-sdk bitcore-lib-cash
```

#### For browser (only works for versions <= 0.26.0)
```html
<script src='https://unpkg.com/slpjs@0.26.0'></script>
```

NOTE: The latest version of slpjs package will be refactored to fix this problem.

## Transaction Examples

The following code snippet examples can be copy/pasted directly into the node.js CLI.  See the examples directory for example files written in TypeScript than can be run using `tsc & node <filename>`.

Wallets utilizing this library will want to write their own methods in place of the methods found in `TransactionHelpers` and `BitboxNetwork` classes.

NOTES: 

* The [BigNumber.js library](https://github.com/MikeMcl/bignumber.js) is used to avoid precision issues with numbers having more than 15 significant digits.
* For the fastest validation performance all of the following transaction examples show how to use SLPJS using default SLP validation via `rest.bitcoin.com`.  See the [Local Validation](#local-validation) section for instructions on how to validate SLP locally with your own full node.
* All SLPJS methods require token quantities to be expressed in the smallest possible unit of account for the token (i.e., token satoshis).  This requires the token's precision to be used to calculate the quantity. For example, token having a decimal precision of 9 sending an amount of 1.01 tokens would need to first calculate the sending amount using `1.01 x 10^9 => 1010000000`.

### Get Balances

Get all balances for a given example.  See also the [TypeScript example](https://github.com/simpleledger/slpjs/blob/master/examples/1-get-token-balances-local.ts).

```js
// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk')
const slpjs = require('slpjs');

// FOR MAINNET UNCOMMENT
let addr = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });

// FOR TESTNET UNCOMMENT
// let addr = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

let balances;
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(addr);
  console.log("balances: ", balances);
})();
```

#### RETURNS ALL BALANCES & UTXOs: 

```js
{
  satoshis_available_bch: 190889,
  satoshis_locked_in_slp_baton: 546,
  satoshis_locked_in_slp_token: 1092,
  satoshis_in_invalid_token_dag: 0,
  satoshis_in_invalid_baton_dag: 0,
  slpTokenBalances: {
    '1cda254d0a995c713b7955298ed246822bee487458cd9747a91d9e81d9d28125': BigNumber { s: 1, e: 3, c: [ 1000 ] },
    '047918c612e94cce03876f1ad2bd6c9da43b586026811d9b0d02c3c3e910f972': BigNumber { s: 1, e: 2, c: [ 100 ] }
  },
  nftParentChildBalances: {
    'parentId1': {
      'childId1': BigNumber
      'childId2': BigNumber
    },
    'parentId2': {
      'childId1': BigNumber
      'childId2': BigNumber
    }
  },
  slpTokenUtxos: [ ... ],
  slpBatonUtxos: [ ... ],
  invalidTokenUtxos: [ ... ],
  invalidBatonUtxos: [ ... ],
  nonSlpUtxos: [ ... ],
  unknownTokenTypeUtxos: [ ... ]
}
```



### GENESIS - Create a new token

GENESIS is the most simple type of SLP transaction since no special inputs are required.  The following example shows how to create a fungible token.  Also see the TypeScript examples for: 
* [Type 1 Genesis](https://github.com/simpleledger/slpjs/blob/master/examples/3-genesis-token-type-1.ts).
* [NFT1 Parent Genesis](https://github.com/simpleledger/slpjs/blob/master/examples/4-genesis-token-type-NFT1-parent.ts).
* [NFT1 Child Genesis](https://github.com/simpleledger/slpjs/blob/master/examples/5-genesis-token-type-NFT1-child.ts).

```js
// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk')
const BigNumber = require('bignumber.js');
const slpjs = require('slpjs');

// FOR MAINNET UNCOMMENT
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const fundingAddress           = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";  // <-- must be simpleledger format
const fundingWif               = "L3gngkDg1HW5P9v5GdWWiCi3DWwvw5XnzjSPwNwVPN5DSck3AaiF";     // <-- compressed WIF format
const tokenReceiverAddress     = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";  // <-- must be simpleledger format
const bchChangeReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";  // <-- cashAddr or slpAddr format
// For unlimited issuance provide a "batonReceiverAddress"
const batonReceiverAddress     = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";

// FOR TESTNET UNCOMMENT
// const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });
// const fundingAddress           = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const fundingWif               = "cVjzvdHGfQDtBEq7oddDRcpzpYuvNtPbWdi8tKQLcZae65G4zGgy";
// const tokenReceiverAddress     = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const bchChangeReceiverAddress = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// // For unlimited issuance provide a "batonReceiverAddress"
// const batonReceiverAddress     = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

// 1) Get all balances at the funding address.
let balances; 
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("'balances' variable is set.");
  console.log('BCH balance:', balances.satoshis_available_bch);
})();

// WAIT FOR NETWORK RESPONSE...

// 2) Select decimal precision for this new token
let decimals = 2;
let name = "Awesome SLPJS README Token";
let ticker = "SLPJS";
let documentUri = "info@simpleledger.io";
let documentHash = null
let initialTokenQty = 1000000

// 3) Calculate the token quantity with decimal precision included
initialTokenQty = (new BigNumber(initialTokenQty)).times(10**decimals);

// 4) Set private keys
balances.nonSlpUtxos.forEach(txo => txo.wif = fundingWif)

// 5) Use "simpleTokenGenesis()" helper method
let genesisTxid;
(async function(){
    genesisTxid = await bitboxNetwork.simpleTokenGenesis(
        name, 
        ticker, 
        initialTokenQty,
        documentUri,
        documentHash,
        decimals,
        tokenReceiverAddress,
        batonReceiverAddress,
        bchChangeReceiverAddress,
        balances.nonSlpUtxos
        )
    console.log("GENESIS txn complete:",genesisTxid)
})();

```

### MINT - Create additional tokens

Adding additional tokens for a token that already exists is possible if you are in control of the minting "baton".  This minting baton is a special UTXO that gives authority to add to the token's circulating supply.  Also see the [TypeScript example](https://github.com/simpleledger/slpjs/blob/master/examples/6-mint-token.ts).

```javascript
// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk')
const BigNumber = require('bignumber.js');
const slpjs = require('slpjs');

// FOR MAINNET UNCOMMENT
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const fundingAddress           = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";  // <-- must be simpleledger format
const fundingWif               = "L3gngkDg1HW5P9v5GdWWiCi3DWwvw5XnzjSPwNwVPN5DSck3AaiF";     // <-- compressed WIF format
const tokenReceiverAddress     = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";  // <-- must be simpleledger format
const batonReceiverAddress     = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";
const bchChangeReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";  // <-- cashAddr or slpAddr format
const tokenIdHexToMint = "adcf120f51d45056bc79353a2831ecd1843922b3d9fac5f109160bd2d49d3f4c";
let additionalTokenQty = 1000

// FOR TESTNET UNCOMMENT
// const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });
// const fundingAddress           = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const fundingWif               = "cVjzvdHGfQDtBEq7oddDRcpzpYuvNtPbWdi8tKQLcZae65G4zGgy";
// const tokenReceiverAddress     = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const batonReceiverAddress     = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const bchChangeReceiverAddress = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const tokenIdHexToMint = "a67e2abb2fcfaa605c6a3b0dfb642cc830b63138d85b5e95eee523fdbded4d74";
// let additionalTokenQty = 1000

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

// 1) Get all balances at the funding address.
let balances; 
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("'balances' variable is set.");
  if(balances.slpBatonUtxos[tokenIdHexToMint])
    console.log("You have the minting baton for this token");
  else
    throw Error("You don't have the minting baton for this token");
})();

// 2) Fetch critical token decimals information using bitdb
let tokenDecimals;
(async function() {
    const tokenInfo = await bitboxNetwork.getTokenInformation(tokenIdHexToMint);
    tokenDecimals = tokenInfo.decimals; 
    console.log("Token precision: " + tokenDecimals.toString());
})();

// WAIT FOR ASYNC METHOD TO COMPLETE

// 3) Multiply the specified token quantity by 10^(token decimal precision)
let mintQty = (new BigNumber(additionalTokenQty)).times(10**tokenDecimals)

// 4) Filter the list to choose ONLY the baton of interest 
// NOTE: (spending other batons for other tokens will result in losing ability to mint those tokens)
let inputUtxos = balances.slpBatonUtxos[tokenIdHexToMint]

// 5) Simply sweep our BCH (non-SLP) utxos to fuel the transaction
inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);

// 6) Set the proper private key for each Utxo
inputUtxos.forEach(txo => txo.wif = fundingWif)

// 7) MINT token using simple function
let mintTxid;
(async function() {
    mintTxid = await bitboxNetwork.simpleTokenMint(
        tokenIdHexToMint, 
        mintQty, 
        inputUtxos, 
        tokenReceiverAddress, 
        batonReceiverAddress, 
        bchChangeReceiverAddress
        )
    console.log("MINT txn complete:",mintTxid);
})();

```



### SEND - Send tokens

This example shows the general workflow for sending an existing token.  Also see the [TypeScript example](https://github.com/simpleledger/slpjs/blob/master/examples/7-send-token-p2pkh.ts).

```js
// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk');
const BigNumber = require('bignumber.js');
const slpjs = require('slpjs');

// FOR MAINNET UNCOMMENT
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const fundingAddress           = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";     // <-- must be simpleledger format
const fundingWif               = "L3gngkDg1HW5P9v5GdWWiCi3DWwvw5XnzjSPwNwVPN5DSck3AaiF";        // <-- compressed WIF format
const tokenReceiverAddress     = [ "simpleledger:qplrqmjgpug2qrfx4epuknvwaf7vxpnuevyswakrq9" ]; // <-- must be simpleledger format
const bchChangeReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu";     // <-- must be simpleledger format
let tokenId = "d32b4191d3f78909f43a3f5853ba59e9f2d137925f28e7780e717f4b4bfd4a3f";
let sendAmounts = [ 1 ];

// FOR TESTNET UNCOMMENT
// const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });
// const fundingAddress           = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";   // <-- must be simpleledger format
// const fundingWif               = "cVjzvdHGfQDtBEq7oddDRcpzpYuvNtPbWdi8tKQLcZae65G4zGgy"; // <-- compressed WIF format
// const tokenReceiverAddress     = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";   // <-- must be simpleledger format
// const bchChangeReceiverAddress = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";   // <-- must be simpleledger format
// let tokenId = "78d57a82a0dd9930cc17843d9d06677f267777dd6b25055bad0ae43f1b884091";
// let sendAmounts = [ 10 ];

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

// 1) Fetch critical token information
let tokenDecimals;
(async function() {
    const tokenInfo = await bitboxNetwork.getTokenInformation(tokenId);
    tokenDecimals = tokenInfo.decimals; 
    console.log("Token precision: " + tokenDecimals.toString());
})();

// Wait for network responses...

// 2) Check that token balance is greater than our desired sendAmount
let balances; 
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("'balances' variable is set.");
  console.log(balances);
  if(balances.slpTokenBalances[tokenId] === undefined)
    console.log("You need to fund the addresses provided in this example with tokens and BCH.  Change the tokenId as required.")
  console.log("Token balance:", balances.slpTokenBalances[tokenId].toFixed() / 10**tokenDecimals);
})();

// Wait for network responses...

// 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
sendAmounts = sendAmounts.map(a => (new BigNumber(a)).times(10**tokenDecimals));  // Don't forget to account for token precision

// 4) Get all of our token's UTXOs
let inputUtxos = balances.slpTokenUtxos[tokenId];

// 5) Simply sweep our BCH utxos to fuel the transaction
inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);

// 6) Set the proper private key for each Utxo
inputUtxos.forEach(txo => txo.wif = fundingWif);

// 7) Send token
let sendTxid;
(async function(){
    sendTxid = await bitboxNetwork.simpleTokenSend(
        tokenId, 
        sendAmounts, 
        inputUtxos, 
        tokenReceiverAddress, 
        bchChangeReceiverAddress
        )
    console.log("SEND txn complete:", sendTxid);
})();
```

### SEND - Send BCH

This example demonstrates how to send BCH from a SLP enabled wallet. This API ensures the BCH transaction does not use SLP UTXOs which can cause token loss for the wallet.

```js
// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk');
const BigNumber = require('bignumber.js');
const slpjs = require('slpjs');

// FOR MAINNET
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const fundingAddress           = "bitcoincash:qzq6g2dzadew2ctt6cfhthwcc2q9m60mj56ld2hj5l";     // <-- must be CashAddr format

// can use BITBOX.HDNode.toWIF() to generate this
const fundingWif               = "KzzMBS6twjSLAjH3a1wkd7rWs3PpiHq4eQzqSEfHuxbXfxYFUBiL";        // <-- compressed WIF format
const bchReceiverAddress       = [ "bitcoincash:qz42xz5y2hfltsa94mwm36pnl3ew8u72cc9l038x8m" ]; // <-- must be CashAddr format
const bchChangeReceiverAddress = "bitcoincash:qzd5hqnlu2gprdxphqt6jvft33s3m2hegcqtu6mktg";     // <-- must be CashAddr format

let sendAmountsInSatoshi       = 1000;


const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);


// 1) Check that token balance is greater than our desired sendAmount
let balances; 
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("'balances' variable is set.", balances);
  
  if (balances.satoshis_available_bch < sendAmountsInSatoshi) {
    throw new Error("You need to fund the addresses provided in this example with BCH.");
  }
  console.log("BCH balance in sats:", balances.satoshis_available_bch);
})();

// Wait for network responses...

// 2) construct sendAmounts as an array of BigInt
let sendAmounts = [ new BigInt(sendAmountsInSatoshi) ];

// 3) Get all of non-SLP UTXOs
let inputUtxos = balances.nonSlpUtxos;

// 4) Set the proper private key for each Utxo
inputUtxos = inputUtxos.map(utxo => ({ ...utxo, wif: fundingWif }));

// 5) Send token
let sendTxId;
(async () => {
  sendTxId = await bitboxNetwork.simpleBchSend(
    sendAmounts, 
    inputUtxos, 
    bchReceiverAddress, 
    bchChangeReceiverAddress
  );
  console.log("SEND txn complete:", sendTxId);
})();
```


### SEND - Send tokens from a frozen address

This example shows how to freeze funds until a future time using OP_CLTV.  Also see the [TypeScript example](https://github.com/simpleledger/slpjs/blob/master/examples/8-send-token-p2sh-frozen.ts).  First, the address is calculated based on a user-defined public key and locktime. After the locktime has elapsed the user can proceed to spend those funds as demonstrated in this example:

redeemScript (locking script) = `<locktime> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubkey> OP_CHECKSIG`

unlocking script = `<signature>`

```js
const BITBOXSDK = require('bitbox-sdk');
const BigNumber = require('bignumber.js');
const slpjs = require('slpjs');
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });
const slp = new slpjs.Slp(BITBOX);
const helpers = new slpjs.TransactionHelpers(slp);
const opcodes = BITBOX.Script.opcodes;

const pubkey = "0286d74c6fb92cb7b70b817094f48bf8fd398e64663bc3ddd7acc0a709212b9f69";
const wif = "cPamRLmPyuuwgRAbB6JHhXvrGwvHtmw9LpVi8QnUZYBubCeyjgs1";
const tokenReceiverAddress     = [ "slptest:prk685k6r508xkj7u9g8v9p3f97hrmgr2qp7r4safs" ]; // <-- must be simpleledger format
const bchChangeReceiverAddress = "slptest:prk685k6r508xkj7u9g8v9p3f97hrmgr2qp7r4safs";     // <-- must be simpleledger format
let tokenId = "f0c7a8a7addc29edbc193212057d91c3eb004678e15e4662773146bdd51f8d7a";
let sendAmounts = [ 1 ];

// Set our BIP-113 time lock (subtract an hour to acount for MTP-11)
const time_delay_seconds = 0;  // let's just set it to 0 so we can redeem it immediately.
let locktime, locktimeBip62;
(async function(){
  locktime = (await BITBOX.Blockchain.getBlockchainInfo()).mediantime + time_delay_seconds - 3600;

  // NOTE: the following locktime is hard-coded so that we can reuse the same P2SH address.
  locktimeBip62 = 'c808f05c' //slpjs.Utils.get_BIP62_locktime_hex(locktime);  
})();

// Wait for network response...

let redeemScript = BITBOX.Script.encode([
  Buffer.from(locktimeBip62, 'hex'),
  opcodes.OP_CHECKLOCKTIMEVERIFY,
  opcodes.OP_DROP,
  Buffer.from(pubkey, 'hex'),
  opcodes.OP_CHECKSIG
])

// Calculate the address for this script contract 
// We need to send some token and BCH to it before we can spend it!
let fundingAddress = slpjs.Utils.slpAddressFromHash160(
                              BITBOX.Crypto.hash160(redeemScript), 
                              'testnet', 
                              'p2sh'
                            );

// gives us: slptest:prk685k6r508xkj7u9g8v9p3f97hrmgr2qp7r4safs

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

// Fetch critical token information
let tokenDecimals;
(async function() {
    const tokenInfo = await bitboxNetwork.getTokenInformation(tokenId);
    tokenDecimals = tokenInfo.decimals; 
    console.log("Token precision: " + tokenDecimals.toString());
})();

// Wait for network response...

// Check that token balance is greater than our desired sendAmount
let balances; 
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("'balances' variable is set.");
  console.log(balances);
  if(balances.slpTokenBalances[tokenId] === undefined)
    console.log("You need to fund the addresses provided in this example with tokens and BCH.  Change the tokenId as required.")
  console.log("Token balance:", balances.slpTokenBalances[tokenId].toFixed() / 10**tokenDecimals);
})();

// Wait for network response...

// Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
sendAmounts = sendAmounts.map(a => (new BigNumber(a)).times(10**tokenDecimals));  // Don't forget to account for token precision

// Get all of our token's UTXOs
let inputUtxos = balances.slpTokenUtxos[tokenId];

// Simply sweep our BCH utxos to fuel the transaction
inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);

// Estimate the additional fee for our larger p2sh scriptSigs
let extraFee = (8) *  // for OP_CTLV and timelock data push
                inputUtxos.length  // this many times since we swept inputs from p2sh address

// Build an unsigned transaction
let unsignedTxnHex = helpers.simpleTokenSend(tokenId, sendAmounts, inputUtxos, tokenReceiverAddress, bchChangeReceiverAddress, [], extraFee);
unsignedTxnHex = helpers.enableInputsCLTV(unsignedTxnHex);
unsignedTxnHex = helpers.setTxnLocktime(unsignedTxnHex, locktime);

// Build scriptSigs 
let scriptSigs = inputUtxos.map((txo, i) => {
    let sigObj = helpers.get_transaction_sig_p2sh(unsignedTxnHex, wif, i, txo.satoshis, redeemScript)
    return {
      index: i,
      lockingScriptBuf: redeemScript,
      unlockingScriptBufArray: [ sigObj.signatureBuf ]
  } 
})

let signedTxn = helpers.addScriptSigs(unsignedTxnHex, scriptSigs);

// 11) Send token
let sendTxid;
(async function(){
    sendTxid = await bitboxNetwork.sendTx(signedTxn)
    console.log("SEND txn complete:", sendTxid);
})();

```

### SEND - Send tokens from 2-of-2 multisig (P2SH)

This example shows the general workflow for sending tokens from a P2SH multisig address.  Also see the [TypeScript example](https://github.com/simpleledger/slpjs/blob/master/examples/9-send-token-p2sh-multisig.ts).  Electron Cash SLP edition [3.4.13](https://simpleledger.cash/project/electron-cash-slp-edition/) is compatible with signing the partially signed transactions generated from this example by using the `insert_input_values_for_EC_signers` helper method.

```js
// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk');
const BigNumber = require('bignumber.js');
const slpjs = require('slpjs');
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const slp = new slpjs.Slp(BITBOX);
const helpers = new slpjs.TransactionHelpers(slp);

const pubkey_signer_1 = "02471e07bcf7d47afd40e0bf4f806347f9e8af4dfbbb3c45691bbaefd4ea926307"; // Signer #1
const pubkey_signer_2 = "03472cfca5da3bf06a85c5fd860ffe911ef374cf2a9b754fd861d1ead668b15a32"; // Signer #2

// we have two signers for this 2-of-2 multisig address (so for the missing key we just put "null")
const wifs = [ null, "L2AdfmxwsYu3KnRASZ51C3UEnduUDy1b21sSF9JbLNVEPzsxEZib"] //[ "Ky6iiLSL2K9stMd4G5dLeXfpVKu5YRB6dhjCsHyof3eaB2cDngSr", null ];

// to keep this example alive we will just send everything to the same address
const tokenReceiverAddress     = [ "simpleledger:pphnuh7dx24rcwjkj0sl6xqfyfzf23aj7udr0837gn" ]; // <-- must be simpleledger format
const bchChangeReceiverAddress = "simpleledger:pphnuh7dx24rcwjkj0sl6xqfyfzf23aj7udr0837gn";     // <-- must be simpleledger format
let tokenId = "497291b8a1dfe69c8daea50677a3d31a5ef0e9484d8bebb610dac64bbc202fb7";
let sendAmounts = [ 1 ];

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

// 1) Fetch critical token information
let tokenDecimals;
(async function() {
    const tokenInfo = await bitboxNetwork.getTokenInformation(tokenId);
    tokenDecimals = tokenInfo.decimals; 
    console.log("Token precision: " + tokenDecimals.toString());
})();

// Wait for network responses...

// 2) Check that token balance is greater than our desired sendAmount
let fundingAddress = "simpleledger:pphnuh7dx24rcwjkj0sl6xqfyfzf23aj7udr0837gn";
let balances; 
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("'balances' variable is set.");
  console.log(balances);
  if(balances.slpTokenBalances[tokenId] === undefined)
    console.log("You need to fund the addresses provided in this example with tokens and BCH.  Change the tokenId as required.")
  console.log("Token balance:", balances.slpTokenBalances[tokenId].toFixed() / 10**tokenDecimals);
})();

// Wait for network responses...

// 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
sendAmounts = sendAmounts.map(a => (new BigNumber(a)).times(10**tokenDecimals));  // Don't forget to account for token precision

// 4) Get all of our token's UTXOs
let inputUtxos = balances.slpTokenUtxos[tokenId];

// 5) Simply sweep our BCH utxos to fuel the transaction
inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);

// 6) Estimate the additional fee for our larger p2sh scriptSigs
let extraFee = (2 * 33 +  // two pub keys in each redeemScript
                2 * 72 +  // two signatures in scriptSig
                10) *     // for OP_CMS and various length bytes
                inputUtxos.length  // this many times since we swept inputs from p2sh address

// 7) Build an unsigned transaction
let unsignedTxnHex = helpers.simpleTokenSend(tokenId, sendAmounts, inputUtxos, tokenReceiverAddress, bchChangeReceiverAddress, [], extraFee);

// 8) Build scriptSigs for all intputs
let redeemData = helpers.build_P2SH_multisig_redeem_data(2, [pubkey_signer_1, pubkey_signer_2]);
let scriptSigs = inputUtxos.map((txo, i) => {
    let sigData = redeemData.pubKeys.map((pk, j) => {
      if(wifs[j]) {
        return helpers.get_transaction_sig_p2sh(unsignedTxnHex, wifs[j], i, txo.satoshis, redeemData.lockingScript)
      }
      else {
        return helpers.get_transaction_sig_filler(i, pk)
      }
    })
    return helpers.build_P2SH_multisig_scriptSig(redeemData, i, sigData)
})

// 9) apply our scriptSigs to the unsigned transaction
let signedTxn = helpers.addScriptSigs(unsignedTxnHex, scriptSigs);

// 10) Update transaction hex with input values to allow for our second signer who is using Electron Cash SLP edition (https://simpleledger.cash/project/electron-cash-slp-edition/)
let input_values = inputUtxos.map(txo => txo.satoshis)
signedTxn = helpers.insert_input_values_for_EC_signers(signedTxn, input_values)

// 11) Send token
let sendTxid;
(async function(){
    sendTxid = await bitboxNetwork.sendTx(signedTxn)
    console.log("SEND txn complete:", sendTxid);
})();
```

### BURN - Destroy tokens for a certain Token Id

This example shows the general workflow for sending an existing token.  Also see the [TypeScript example](https://github.com/simpleledger/slpjs/blob/master/examples/10-burn-token.ts).

```javascript

// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk')
const BigNumber = require('bignumber.js');
const slpjs = require('slpjs');

const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const fundingAddress           = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu"; // <-- must be simpleledger format
const fundingWif               = "L3gngkDg1HW5P9v5GdWWiCi3DWwvw5XnzjSPwNwVPN5DSck3AaiF";    // <-- compressed WIF format
const bchChangeReceiverAddress = "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu"; // <-- must be simpleledger format
let tokenId = "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a";
let burnAmount = 102;

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

// 1) Fetch critical token information
let tokenDecimals;
(async function() {
    const tokenInfo = await bitboxNetwork.getTokenInformation(tokenId);
    tokenDecimals = tokenInfo.decimals; 
    console.log('Token precision:', tokenDecimals.toString());
})();

// 2) Check that token balance is greater than our desired sendAmount
let balances; 
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("'balances' variable is set.");
  console.log('Token balance:', balances.slpTokenBalances[tokenId].toFixed() / 10**tokenDecimals)
})();

// Wait for network responses...

// 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
let amount = (new BigNumber(burnAmount)).times(10**tokenDecimals);  // Don't forget to account for token precision

// 4) Get all of our token's UTXOs
let inputUtxos = balances.slpTokenUtxos[tokenId];

// 5) Simply sweep our BCH utxos to fuel the transaction
inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);

// 6) Set the proper private key for each Utxo
inputUtxos.forEach(txo => txo.wif = fundingWif)

// 7) Send token
let sendTxid;
(async function(){
    sendTxid = await bitboxNetwork.simpleTokenBurn(
        tokenId, 
        amount, 
        inputUtxos, 
        bchChangeReceiverAddress
        )
    console.log("BURN txn complete:",sendTxid);
})();
```


### Address Conversion

```javascript
let Utils = require('slpjs').Utils;

let slpAddr = Utils.toSlpAddress("bitcoincash:qzat5lfxt86mtph2fdmp96stxdmmw8hchyxrcmuhqf");
console.log(slpAddr);
// simpleledger:qzat5lfxt86mtph2fdmp96stxdmmw8hchy2cnqfh7h

let cashAddr = Utils.toCashAddress(slpAddr);
console.log(cashAddr);
// bitcoincash:qzat5lfxt86mtph2fdmp96stxdmmw8hchyxrcmuhqf
```



## Validation Examples

The following examples show three different ways how you can use this library to validate SLP transactions.  The validation techniques include:

* Local Validator with a JSON RPC full node connection
* Local Validation with a remote full node (using `rest.bitcoin.com`)
* Remote Validation (using `rest.bitcoin.com`)



### Local Validator with a JSON RPC full node connection

Validate SLP transaction locally with a local full node.


```js
const BITBOXSDK = require('bitbox-sdk')
const BITBOX = new BITBOXSDK.BITBOX();
const slpjs = require('slpjs');
const logger = console;
const RpcClient = require('bitcoin-rpc-promise');
const connectionString = 'http://bitcoin:password@localhost:8332'
const rpc = new RpcClient(connectionString);
const slpValidator = new slpjs.LocalValidator(BITBOX, async (txids) => [ await rpc.getRawTransaction(txids[0]) ], logger)

// Result = false
//let txid = "903432f451049357d51c19eb529478621272e7572b05179f89bcb7be31e55aa7";

// Result = true
let txid = "4a3829d6da924a16bbc0cc43d5d62b40996648a0c8f74725c15ec56ee930d0fa";

let isValid;
(async function() {
  console.log("Validating:", txid);
  console.log("This may take a several seconds...");
  isValid = await slpValidator.isValidSlpTxid(txid);
  console.log("Final Result:", isValid);
})();
```



### Local Validation with a remote full node (using `rest.bitcoin.com`)

Validate SLP transaction locally with a remote full node (i.e., rest.bitcoin.com).

```js
const BITBOXSDK = require('bitbox-sdk')
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const slpjs = require('slpjs');
const logger = console;

const getRawTransactions = async function(txids) { return await BITBOX.RawTransactions.getRawTransaction(txids) }
const slpValidator = new slpjs.LocalValidator(BITBOX, getRawTransactions, logger);

// Result = false
//let txid = "903432f451049357d51c19eb529478621272e7572b05179f89bcb7be31e55aa7";

// Result = true
let txid = "4a3829d6da924a16bbc0cc43d5d62b40996648a0c8f74725c15ec56ee930d0fa";

let isValid;
(async function() {
  console.log("Validating:", txid);
  console.log("This may take a several seconds...");
  isValid = await slpValidator.isValidSlpTxid(txid);
  console.log("Final Result:", isValid);
})();

```



### Remote Validation (using `rest.bitcoin.com`)

Validate SLP transaction using rest.bitcoin.com. 

```js
const BITBOXSDK = require('bitbox-sdk')
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const slpjs = require('slpjs');
const logger = console;

const slpValidator = new slpjs.BitboxNetwork(BITBOX, undefined, logger);

// Result = false
//let txid = "903432f451049357d51c19eb529478621272e7572b05179f89bcb7be31e55aa7";

// Result = true
let txid = "ab1550876e217d68bfac55e50b4a82535bb20842f976bdfbc07cca19e8028f13";

let isValid;
(async function() {
  console.log("Validating:", txid);
  console.log("This may take a several seconds...");
  isValid = await slpValidator.isValidSlpTxid(txid);
  console.log("Final Result:", isValid);
})();

```



## Building & Testing

Building this project creates lib/*.js files and then creates browserified versions in the dist folder.

### Requirements
Running the unit tests require node.js v8.15+. 

### Build
`npm run build`

### Test
`npm run test`
