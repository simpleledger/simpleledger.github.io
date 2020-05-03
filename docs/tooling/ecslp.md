# Electron Cash SLP Edition

::: tip View Repo:
[https://github.com/simpleledger/Electron-Cash-SLP](https://github.com/simpleledger/Electron-Cash-SLP)
:::

Electron Cash SLP is a fully featured SLP light-wallet implementation that can Create, Mint, Burn, and Send SLP tokens and much more. This wallet validates all token transactions locally requiring no special SLP aware servers or infrastructure. Electron Cash wallet was built by the Electron Cash developers.


## CLI Interface

Electron Cash SLP Edition can be used in the development of SLP applications, often being very useful for automating transactions to test deposit detection among other tasks. You can also do `electron-cash --help` to see the full list of commands, and more advanced options for the following items.

::: warning
Be sure to not perform any broadcasts from a non-testing wallet. Failure to ensure this could mean you lose your SLP tokens or BCH.
:::

### Get Balance

```
TOKEN_ID="7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1" # SLP token id (64 character hex string)
$ electron-cash getbalance_slp $TOKEN_ID
```

### Send SLP


```
TOKEN_ID="7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1" # SLP token id (64 character hex string)
DESTINATION_SLP="simpleledger:qpygaungmfry8xzxphj4pw24kk5l9vfxlymlyey6rp" # SLP address; where to send the token
AMOUNT_SLP=10000 # Amount to be sent (in token units, floats ok)

$ electron-cash payto_slp $TOKEN_ID $DESTINATION_SLP $AMOUNT_SLP | electron-cash signtransaction - | electron-cash broadcast -
```

### Send SLP to Multiple Addresses

```
TOKEN_ID="7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1"
DESTINATION_SLP1="simpleledger:qpygaungmfry8xzxphj4pw24kk5l9vfxlymlyey6rp"
AMOUNT_SLP1=10000
DESTINATION_SLP2="simpleledger:qpygaungmfry8xzxphj4pw24kk5l9vfxlymlyey6rp"
AMOUNT_SLP1=3000

$ electron-cash payto_slp $TOKEN_ID "[[\"$DESTINATION_SLP1\", $AMOUNT_SLP1], [\"$DESTINATION_SLP2\", $AMOUNT_SLP2]]" | electron-cash signtransaction - | electron-cash broadcast -
```

## RPC Interface

There is an JSONRPC interface which mirrors the CLI interface. You must first configure Electron Cash with the `rpcport`, `rpcuser`, and `rpcpassword` variables, and start Electron Cash  SLP Edition in daemon mode i.e. `electron-cash --daemon`.


```
curl --data-binary '{"id":0,"method":"payto_slp","params":{"change_addr":"simpleledger:qpygaungmfry8xzxphj4pw24kk5l9vfxlymlyey6rp","token_id":"7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1","destination_slp":"simpleledger:qpfuqzv9vuuz7qp5x7spdmwvgl0pgdn5dy9lfc4kr0","amount_slp":100000}}' http://user:password@127.0.0.1:7777
```
