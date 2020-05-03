# SLPDecoder

::: tip View Repo:
[https://github.com/blockparty-sh/cpp_slp_graph_search/tree/master/slpdecoder](https://github.com/blockparty-sh/cpp_slp_graph_search/tree/master/slpdecoder)
:::

slpdecoder provides an easy way to parse and debug SLP metadata. It can be very useful when trying to figure out why an OP_RETURN is not parsed as valid SLP.

```
$ ./slpdecoder 6a04534c500001010747454e4553495304484f4e4b09484f4e4b20484f4e4b17544845205245414c20484f4e4b20534c5020544f4b454e4c0001004c0008000000174876e800
```

#### Result:


```
slp: GENESIS
token_type:       1
tokenid:          0000000000000000000000000000000000000000000000000000000000000000
transaction_type: GENESIS

ticker:           HONK
name:             HONK HONK
document_uri:     THE REAL HONK SLP TOKEN
document_hash:    [none]
decimals:         0
has_mint_baton:   0
slp_amount:       100000000000
mint_baton_vout:  0
```
