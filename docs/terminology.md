# Terminology

SLP inherits Bitcoin terminology and adds onto it. This list is not meant to be exhaustive for Bitcoin terminology, instead hopefully including just what is needed to adequately describe the SLP definitions here. It is important to understand the different concepts on this page to be an effective SLP developer and communicator.

## Address

An address corresponds to a [public key](#pubkey) and is generally what you share with others either in messaging or with QR codes.

## Base Unit

The smallest possible unit of a token. For BCH this is referred to as [Satoshi](#satoshi). For SLP tokens it is just called base unit. For example, [SPICE](https://simpleledger.info/token/4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf) has Decimals of 8, so when you send 1 spice you are actually sending 10^8 SPICE, or 100000000 base units of SPICE. Compare this with [HONK](https://simpleledger.info/token/7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1) which has Decimals of 0, so sending 1 HONK is the same as sending 1 base unit of HONK. It's easiest to think of the Decimals parameter as for visual purposes only, although many higher level libraries do operate in decimalized units rather than base units.

## Burn

Tokens can be burnt either by accident (such as by importing your wallet into non-SLP enabled wallet software) or intentionally by using tools to intentionally reduce the overall supply of your token. 

## Child NFT

Child tokens are made from performing a [Genesis](#genesis) by burning a [NFT Group](#nft-group) token. All child NFTs have a link to their parent/group, and so can represent multiple unique objects of the same kind.

## DAG

The [UTXO](#utxo) model ensures that the graph of transactions is a directed (one direction, like time) acyclic (no cycles, like no wormholes) graph (not like a line on a piece of paper). It's mostly used to be precise, you can read more about it [here](https://en.wikipedia.org/wiki/Directed_acyclic_graph).

## Dust Limit

The minimum amount of [satoshis](#satoshi) allowed for an output, currently 546. Most SLP outputs will have this many satoshis because it is the minimum overhead they have to spend.

## Federated Validation

Federated Validation is the idea to query multiple different third-party SLP validation services and ensure all or a large majority of their results are in agreement. This is necessarily weaker security than [graph search](#graph-search) however for resource constrained devices the performance benefits may outweigh the reduction in security. This is still a much better choice than having a single point of failure server.

## Graph Search

Graph Search is a method of trustless validation which reconstructs the [DAG](#dag) from data about raw Bitcoin transactions, and performs a client-side walk to validate the history is correct. Using the [Token Id](#token-id), the [TXID](#txid) we want to Graph Search, and the property that sha256 hashing is unbroken, we can ensure that the data received from a third party has not been tampered with. [GS++](/tooling/gs++) is the most popular and best performing Graph Search server.

## Genesis

The first transaction to create a token. For [Child NFTs](#child-nft) this involves burning a [Group NFT](#group-nft) token. However, for regula tokens you don't need any prior SLP - Genesis transactions can be created using only BCH [UTXOs](#utxo).

## Group NFT

Group NFTs act essentially as regular tokens, they can be minted or sent as normal. However, their special property allows for the creation of new [NFT Child](#nft-child) tokens by being burnt during a [Genesis](#genesis) transaction. Wallets and explorers may treat Group NFTs special, because they represent the ability to mint unique tokens in the future through the creation of NFT children.

## Input

Inputs are comprised of an [outpoint](#outpoint), a signature script to spend from the [script pubkey](#script-pubkey), and a sequence number which isn't really used. In short, inputs consume [UTXOs](#utxo) and the amount of BCH and SLP in each input determines how much that transaction can send in each [output](#output).

## Mint

Mint is one of the possible transaction types for SLP. It allows for a transaction which has the [minting baton](#minting-baton) as an input to create new tokens.

## Minting Baton

During [Genesis](/specs/slp-token-type-1/#genesis-token-genesis-transaction) you can choose to create a minting baton to continue minting tokens after the initial mint. The baton is a special [UTXO](#utxo) which gives the holder the ability to create new SLP tokens. You can choose to eventually stop minting capability by [burning](#burn) the minting baton.

## NFT

Non-fungible Token, or in other words, a token where their exists only 1. You can make NFTs using [TokenType1](/specs/slp-token-type-1/), however it is usually better to use [NFT1](/specs/slp-nft-1/) as they give additional functionality such as [Grouping](#group-nft) and [Child](#child-nft). In addition, using NFT1 can allow for different handling by wallets and explorers to better represent the tokens special place as the only one of its kind.

## OP_RETURN

A script opcode used to store data on the blockchain. SLP's metadata is stored using OP_RETURN messages.

## Outpoint

A combination of a [TXID](#txid) and a [Vout](#vout) to identify a specific [output](#output).

## Output

An output in a transaction contains both the amount of [satoshis](#satoshi) and a [pubkey script](#pubkey-script) allowing someone to spend the output in the future.

## Public Key

The public portion of your private key. These are used to generate [addresses](#address).

## Pubkey Script

Also known as scriptPubKey, these are scripts which constrain who can redeem the outputs. In most cases it will either be a person who can prove they own a certain [public key](#public-key) or a multisignature address.

## Satoshi

[Base unit](#base-unit) of Bitcoin. Also, the name of the creator of Bitcoin.

## Satoshis Locked Up

The amount of [satoshis](#satoshi) associated with [outputs](#output) that contain SLP funds. These satoshis are normally considered locked as they can't be spent without performing a SLP transaction, and also because normally these outputs are [dust](#dust-limit) outputs.

## Send

The most common operation in SLP, the simple act of transferring some tokens to someone else.

## Staking

Staking is a scheme where token holders who have older [UTXOs](#utxo) receive some benefit, such as dividends or voting privileges.

## Token

A token is some sort of tokenized asset or idea that has an associated [token id](#token-id) and was created using a [Genesis](#genesis) transaction. There are SLP Tokens, as well as tokens on other Blockchains as well.

## Token Id

A Token Id is the [TXID](#txid) of the [Genesis](#genesis) transaction for a specific [Token](#token). All future [sends](#send) and [mints](#mint) of the token must reference the Token Id inside the [OP_RETURN](#op-return).

## Tokengraph

Tokengraph is the concept of an all purpose node that allows for querying data about the graph of transactions. [SLPDB](/tooling/slpdb) is an implementation of Tokengraph. There is additional description inside the [spec](/specs/slp-token-type-1/#tokengraph).

## Trusted Validation

Validation of SLP transactions which rely on a single trusted source of truth. This can be very dangerous if it is a third-party server. However, if you are running your own infrastructure this is very safe. It is distinctly different from [Graph Search](#graph-search) in that this does not perform client-side validation. [Federated Validation](#federated-validation) is performing trusted validation but upon multiple sources of truth.

## TXID

Transaction identifier. It is the hash of the transactions data.

## UTXO

An unspent output (Unspent TX Output) which can be spent as an [input](#input) in a later transaction. In the SLP context, UTXOs may have associated SLP tokens. SLP tracks ownership of tokens using only UTXOs, including the [mint baton](#minting-baton) as well. The UTXO model is different from Ethereum which uses an Account model, so far the UTXO model has been more performant whereas the Account model is better suited for advanced scripting.

## Validation

Because SLP transactions are not ensured by mining, we instead must perform our own validation of transactions. Someone could easily spoof the [OP_RETURN](#op-return) message to make it appear like they have sent many tokens, without actually owning any. Because of this, we must use some method of validation of transaction data, such as [Graph Search](#graph-search), [Federated Validation](#federated-validation), or [Trusted Validation](#trusted-validation).

## Vout

Output vector. The second output of a transaction would be vout 2.
