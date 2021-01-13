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

## Custom NFT Icon Repository

The explorer has functionality to use a custom token icon server for all child NFTs of a specific group. If you are building an application which would like to use this, simply provide an api that responds correctly to these routes:

```
/32/{tokenid}.png
/64/{tokenid}.png
/128/{tokenid}.png
/original/{tokenid}.png
```

Submit a PR once it is working, with reasonable caching and optimization of the images. If you are a wallet developer who is interested in showing icons from custom icon repositories, you may reference/link to [group_icon_repos.json](https://simpleledger.info/group_icon_repos.json).

## Dividend Helper

SLP-Explorer contains a simple dividend calculator tool [here](https://simpleledger.info/#dividend) which allows you to use the explorer to calculate token ownership. For more serious applications, consider using [SLP-List](/packages/slp-list).
