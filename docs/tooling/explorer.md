# SLP-Explorer

::: tip View Repo:
[https://github.com/blockparty-sh/slp-explorer](https://github.com/blockparty-sh/slp-explorer)
:::

SLP-Explorer is the most advanced SLP explorer, showing a variety of statistics for tokens and addresses.

## Public Access

You can easily run your own explorer, however it's probably easier to use a public version.

### Mainnet

[https://simpleledger.info/](https://simpleledger.info/)

### Testnet

[https://testnet.simpleledger.info/](https://testnet.simpleledger.info/)

## Verified Tokens

SLP-Explorer maintians a list of tokens whos creators have asked to be recognized as the "verified" token of that name. What this means in practice, the token will show up higher in search results, and have a little checkmark. This does not imply anything about the token other than it has registered itself with the explorer as the canonical token.

The reasoning for this is such: imagine there is a token called MONEY which is worth some BCH, because of this other people start making multiple tokens called MONEY and use those to trick people into thinking they were using the original MONEY token. This helps to make that a little bit harder. Of course, the best way is for users to ensure the tokenId is the correct one, but this hopes to help lazier (read: normal) users.

## Token Icons

Kosinus maintains an open-source token icon repository [here](https://github.com/kosinusbch/slp-token-icons) - if you want your logo on the explorer please open a Pull Request here.

## Dividend Helper

SLP-Explorer contains a simple dividend calculator tool [here](https://simpleledger.info/#dividend) which allows you to use the explorer to calculate token ownership. For more serious applications, consider using [SLP-List](/packages/slp-list).
