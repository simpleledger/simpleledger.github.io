# Get Started With SLP

## Install a Wallet

First you will want to download [Electron Cash SLP Edition](https://github.com/simpleledger/Electron-Cash-SLP) this is the reference wallet and very good for learning and developing as it has every SLP feature built into it.

## Get some Bitcoin Cash

You need BCH in order to create tokens. Fortunately, a very small amount. However, for testing you can use testnet BCH. These can be withdrawn at [faucet.fullstack.cash](https://faucet.fullstack.cash/). Remember to start the wallet in [testnet mode](/tooling/ecslp/#testnet) if using testnet tokens.


## Create a Token

Roger Ver made a great video showing how to create a token using Electron Cash, the version is older though so things may be slightly different now.

<iframe width="100%" height="500" src="https://www.youtube-nocookie.com/embed/3aqBly2hK84" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## View the Token on the Explorer

You can visit [simpleledger.info](https://simpleledger.info/) and search for the tokenId or name of your token and see it and all transaction details. If using testnet, you can use [testnet.simpleledger.info](https://testnet.simpleledger.info/). Easy, huh?

## Query the Token using SLPDB

Just swap out the tokenIdHex with the tokenId of your newly created token [here](https://slpdb.fountainhead.cash/explorer/ewogICJ2IjogMywKICAicSI6IHsKICAgICJmaW5kIjogewogICAgICAidG9rZW5EZXRhaWxzLnRva2VuSWRIZXgiOiAiN2Y4ODg5NjgyZDU3MzY5ZWQwZTMyMzM2ZjhiN2UwZmZlYzYyNWEzNWNjYTE4M2Y0ZTgxZmRlNGU3MWE1MzhhMSIKICAgIH0sCiAgICAibGltaXQiOiAxMAogIH0KfQ==) and click "Run query". This will find the token and any token graph data. This is how the explorer is built, it's a bunch of SLPDB queries.

For testnet, just change the url from slpdb to [slpdb-testnet](https://slpdb-testnet.fountainhead.cash/explorer/ewogICJ2IjogMywKICAicSI6IHsKICAgICJmaW5kIjogewogICAgICAidG9rZW5EZXRhaWxzLnRva2VuSWRIZXgiOiAiNjUwZGVhMTRjNzdmNGQ3NDk2MDhlMzZlMzc1NDUwYzlhYzkxZGViOGIxYjUzZTUwY2IwZGUyMDU5YTUyZDE5YSIKICAgIH0sCiAgICAibGltaXQiOiAxMAogIH0KfQ==).

## Automate Sending SLP Tokens

Read the information page for [Electron Cash SLP CLI](https://slp.dev/tooling/ecslp/#cli-interface) and modify for your own token. You can use this to make your first simple SLP app along with SLPDB. You'll probably want to check out [SLPJS](/packages/slpjs) for more advanced applications though.

## Next Steps

Well, now that you've made a token you are really ready to start building! Check out some of the [Guides](/guides/overview) and take a look at the [Specification](/specs/slp-token-type-1) to get a better idea of how SLP works under the hood - it's really quite simple. Join the [Telegram](https://t.me/simpleledger) chatroom to ask questions and meet other cool people.
