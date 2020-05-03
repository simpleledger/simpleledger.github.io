# SLPSocket

::: tip View Repo:
[https://github.com/fountainhead-cash/slpsockserve](https://github.com/fountainhead-cash/slpockserve)
:::


SLPSockserve is a frontend API for SLPDB that provides a streaming output of new transactions. Unlike slpserve which is a similar frontend API used to fetch historical blockchain data, SLPSockserve can be used display data as it comes in.

Compare this project to [SLPStream](/tooling/slpstream) which may have better characteristics for your application.

[Try it here →](https://slpsocket.fountainhead.cash/)

## Introduction

SLPSocket querying is done much in the same way as with SLPDB, except in a reduced fashion. There are no `aggregate` functions possible, only `find`. Also, only transactions will be available.. so you can query only on `u` (unconfirmed / recent transactions) and `c` (all SLP transactions inside a block, limited transaction information).

## Examples

```json
{
  "v": 3,
  "q": {
    "find": {}
  }
}
```

[Try it here →](https://slpsocket.fountainhead.cash/)
