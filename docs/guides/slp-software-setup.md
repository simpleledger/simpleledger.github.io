# SLP software setup

So, now that you’ve learned all the key theoretical concepts, we are set to start your journey as an SLP developer.

To make sure you start with the right foot, let’s get you set up with the main tools you’ll need along the way.

By the end of this guide, you'll have the basic software needed to be able to develop your own SLP project, and also your first programmatically created SLP token.

### Install Git

Official download -   
[https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Remember that after installing Git, you need to add `C:\Program Files\Git\cmd` and `C:\Program Files\Git\bin` (your installation path) to the system path.    
(For Windows: click `start menu` and type `Edit the system environment variable`)

### Node.js and npm

In order to continue, you’ll need to install both [Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Done? Let’s continue.


### SLPJS

For the SLP handling you’ll be using SLPJS. You can find a detailed guide on it [here](/packages/slpjs), but to keep things simple you should just run

```bash
#initialize the environment setup
> npm init

#install the required libraries
> npm install -g slpjs bitbox-sdk bitcore-lib-cash
```

Make sure everything is installed without errors.


## SLP wallet
Before moving on with the scripting, you’ll need some SLP addresses of your own to work with. If you already have some, feel free to skip these steps.

First off, let’s get you an SLP compatible wallet. This will be the place where your freshly minted SLP tokens will reside, and also where you’ll have to send the required BCH to do so. After installing the software, we will make sure to keep the SLP address and it’s WIF.


### Option 1: Electron Cash SLP

#### GUI

[Check out our Electron Cash SLP edition walkthrough](https://www.google.com) (WIP)

#### CLI

**SLP wallet creation**

```bash
> Electron-Cash-SLP-3.6.4.exe create_slp

Password (hit return if you do not wish to encrypt your wallet):
Your wallet type is: slp_standard
Your wallet generation seed is:
"dinner valley cattle brush moment critic diagram party crack frost tilt shock"
Please keep it in a safe place; if you lose it, you will not be able to restore your wallet.
Wallet saved in 'c:\users\<user>\appdata\roaming\electroncash\wallets\default_wallet'
```

**List addresses in wallet**

```bash
> Electron-Cash-SLP-3.6.4.exe listaddresses

[
    "qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh",
    "qr70zmq9l7fyrnu4f9nz4fzp5a80zrfppc3s3w90lf",
    "qqekzmw5tgxaqfps0f63wgjnx38q8jfv8cjlf8vzy5",
    "qz6rgncgck5qa6ez8ej7t2yqc4yt9zmanyqxs5uxxf",
    "qrlxewwqqsen2ude8alh6p50xd3tekdaqv28h3qsh7",
    "qru0k6ws0dx44699xkvw7gmxpfavj9ll4sqkqm6vge",
    ...
]
```



**Get the private key from an address**

```bash
> Electron-Cash-SLP-3.6.4.exe getprivatekeys qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh

WARNING: ALL your private keys are secret.
Exposing a single private key can compromise your entire wallet!
In particular, DO NOT use 'redeem private key' services proposed by third parties.
L1aeBNDeQ43PtFN2Jc9tbeqhNiqBgDHbxMctefHftHw4WtSo621e
```

As a last step, in order to send the needed BCH to the funding address, we need to make sure to use the Cash address format. For that conversion we will use the following call

```bash
> Electron-Cash-SLP-3.6.4.exe addressconvert qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh

{
    "cashaddr": "bitcoincash:qzvjfs5tuw56est4mwtzw3fegucgdwr00vrgaayqsf",
    "legacy": "1ExkRUc6r128pvMkqwLGiLgfnmmdyYL6BA",
    "simpleledger": "simpleledger:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh"
}
```

After this, we will have generated the three necessary bits of information we need:

**The WIF (private key)**    
`L1aeBNDeQ43PtFN2Jc9tbeqhNiqBgDHbxMctefHftHw4WtSo621e`

**The recieving SLP address, make sure to add the prefix ‘simpleledger:’**    
`simpleledger:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh`

**And the funding cashaddr format address:**    
`bitcoincash:qzvjfs5tuw56est4mwtzw3fegucgdwr00vrgaayqsf`


### Option 2: bitcore

Bitcore is a library used by SLPJS which, aside from many other things, allows us to create and manage new addresses using many different methods, like seed based, WIF based, or without any arguments at all.

We can generate our new addresses using the following script. If you are not sure how to run it, use the same method as the balance.js and genesis.js described in the next section of the guide.

### bitcoreAddr

```javascript
const bitcore = require('bitcore-lib-cash');

var privateKey = new bitcore.PrivateKey();

var publicKey = new bitcore.PublicKey(privateKey)

console.log("WIF:", privateKey.toWIF());

console.log("cashaddr:", publicKey.toAddress().toString());
```

Result

```bash
> npm run-script bitcoreAddr

> <folder>@1.0.0 bitcoreAddr C:\Users\<user>\<folder>
> node bitcoreAddr.js

WIF: Ky3QwBS8gKD2Cdu4iUe5aaqojsU8BfuT4Gf8zMT11AdsEkcN9UJj
cashaddr: bitcoincash:qp8x5ppmu4d0h2g2mgu405jkp5r4x87h7yya64tfd6
```

This will give us:

**The WIF (private key)**    
`Ky3QwBS8gKD2Cdu4iUe5aaqojsU8BfuT4Gf8zMT11AdsEkcN9UJj`

**And the funding cashaddr format address:**    
`bitcoincash:qp8x5ppmu4d0h2g2mgu405jkp5r4x87h7yya64tfd6`

Now to obtain the **recieving SLP address** we can use multiple different methods, like calling the Electron Cash CLI described in the previous section, or using any other resource that performs the conversion, like for example the [bitcoin.com explorer](https://explorer.bitcoin.com/bch) which given a cashaddr format will display the corresponding simpleledger address. In this case:

**Recieving SLP address**    
`simpleledger:qp8x5ppmu4d0h2g2mgu405jkp5r4x87h7ygx3w7fny`

## Scripts

Now that everything is set up, and we have all the information we need, we can take care of the code.

Note that for these examples, we will be using the addresses we created using the Electron Cash SLP method.

After running init, you should have a `package.json` file created in the same folder you have run the command. In this file you can find a section called `scripts`. There you can define various scripts you will be able to easily run with commands as follows

```bash
> npm run-script <script-name>
```

For this tutorial we want our scripts section to look like this. You can add more if you need them, for example if you're using the bitcore library to generate your addresses.

```json
"scripts": {
	"balance": "node balance.js",
    	"genesis": "node genesis.js"
  },
```

Now we only need to create the corresponding `genesis.js` and `balance.js` files on the same folder. Let’s get on that

### balance.js

```javascript
// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk')
const slpjs = require('slpjs');

// FOR MAINNET UNCOMMENT
let addr = "simpleledger:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh";
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });

// FOR TESTNET UNCOMMENT
// let addr = "slptest:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh";
// const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

let balances;
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(addr);
  console.log("balances: ", balances);
})();
```

Just switch the addr field to the address you want to check.


### genesis.js

```javascript
// Install BITBOX-SDK v8.1+ for blockchain access
// For more information visit: https://www.npmjs.com/package/bitbox-sdk
const BITBOXSDK = require('bitbox-sdk')
const BigNumber = require('bignumber.js');
const slpjs = require('slpjs');

// FOR MAINNET UNCOMMENT
const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' });
const fundingAddress           = "simpleledger:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh";  // <-- must be simpleledger format
const fundingWif               = "L1aeBNDeQ43PtFN2Jc9tbeqhNiqBgDHbxMctefHftHw4WtSo621e";     // <-- compressed WIF format
const tokenReceiverAddress     = "simpleledger:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh";  // <-- must be simpleledger format
const bchChangeReceiverAddress = "simpleledger:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh";  // <-- cashAddr or slpAddr format
// For unlimited issuance provide a "batonReceiverAddress"
const batonReceiverAddress     = "simpleledger:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh";

// FOR TESTNET UNCOMMENT
// const BITBOX = new BITBOXSDK.BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });
// const fundingAddress           = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const fundingWif               = "cVjzvdHGfQDtBEq7oddDRcpzpYuvNtPbWdi8tKQLcZae65G4zGgy";
// const tokenReceiverAddress     = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// const bchChangeReceiverAddress = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";
// // For unlimited issuance provide a "batonReceiverAddress"
// const batonReceiverAddress     = "slptest:qpwyc9jnwckntlpuslg7ncmhe2n423304ueqcyw80l";

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);


// 1) Select decimal precision for this new token
let decimals = 2;
let name = "My first awesome SLPJS Token";
let ticker = "SLPJS";
let documentUri = "info@simpleledger.io";
let documentHash = null
let initialTokenQty = 1000000

let genesisTxid;

// 2) Calculate the token quantity with decimal precision included
initialTokenQty = (new BigNumber(initialTokenQty)).times(10**decimals);


// 3) Get all balances at the funding address.
let balances; 
(async function() {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("'balances' variable is set.");
  console.log('BCH balance:', balances.satoshis_available_bch);

// 4) Set private keys
  balances.nonSlpUtxos.forEach(txo => txo.wif = fundingWif)
  
// 5) Use "simpleTokenGenesis()" helper method
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

Here you’ll want to make sure to change the `fundingAddress`, `fundingWif`, `tokenReceiverAddress`, `bchChangeReceiverAddress` and `batonReceiverAddress` in the script to the ones you obtained in the previous steps. Also, remember to send a small amount of BCH to the funding address using the cashAddr format. Some cents will be enough.

Also, here you can edit the parameters of the new token. Feel free to change the `decimals`, `name`, `ticker`, `documentUri`, `documentHash` and `initialTokenQty` to match the desired specifications of your token. Or just leave the defaults for testing purposes.

## Run

Now we are ready to finally test our scripts. Lets begin with balance

```bash
> npm run-script balance
```

This will return all the balances and UTXOs associated with the address provided in the script

```bash
balances:  {
  satoshis_available_bch: 86546,
  satoshis_in_slp_baton: 0,
  satoshis_in_slp_token: 0,
  satoshis_in_invalid_token_dag: 0,
  satoshis_in_invalid_baton_dag: 0,
  satoshis_in_unknown_token_type: 0,
  slpTokenBalances: {},
  nftParentChildBalances: {},
  slpTokenUtxos: {},
  slpBatonUtxos: {},
  nonSlpUtxos: [
    {
      satoshis: 86546,
      txid: '6f51b4d203c3998c5012cebfd375f69407d3e52a5468540efdc7ab99db8955cc',
      amount: 0.00086546,
      confirmations: 0,
      height: undefined,
      vout: 0,
      cashAddress: 'bitcoincash:qzvjfs5tuw56est4mwtzw3fegucgdwr00vrgaayqsf',
      legacyAddress: '1ExkRUc6r128pvMkqwLGiLgfnmmdyYL6BA',
      slpAddress: 'simpleledger:qzvjfs5tuw56est4mwtzw3fegucgdwr00v0nkx3qwh',
      scriptPubKey: '76a9149924c28be3a9acc175db96274539473086b86f7b88ac',
      tx: [Object],
      slpUtxoJudgement: 'NOT_SLP'
    }
  ],
  invalidTokenUtxos: [],
  invalidBatonUtxos: [],
  unknownTokenTypeUtxos: []
}
```

The most relevant bit of information at the moment is the `satoshis_available_bch: 86546` where you can confirm your address is properly funded.

Now let’s go ahead and run genesis

```bash
> npm run-script genesis

'balances' variable is set.
BCH balance: 86546
GENESIS txn complete: a17054f4cdb99fca43ad8ae218fd55c53814c02c450fb540a263edab5f1ac527
```

Try checking the transaction on your favourite SLP explorer, like [simpleledger.info](https://simpleledger.info/), and you’ll find the info on your newly minted token. Plus the tokens will be waiting for you in your SLP wallet.

Now that you have completed your first steps in the SLP world, you can start imagining what your future project will look like.

In the next tutorial, we will learn about... (WIP)
