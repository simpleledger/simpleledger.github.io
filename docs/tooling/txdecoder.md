# TxDecoder

::: tip View Repo:
[https://github.com/blockparty-sh/cpp_slp_graph_search/tree/master/txdecoder](https://github.com/blockparty-sh/cpp_slp_graph_search/tree/master/txdecoder)
:::

txdecoder provides an easy way to parse and debug SLP transactions.

```
$ ./txdecoder 010000000184c663467c098d1058f4f49e28f1afc7ad28c849067531992fa97a8e66574ae1020000006a473044022045cd384954a2e3f0446e72345b87e117b1e553970a33c3ad135f5f2911bf804502205f07693f399b7922bd16f3318c392887234c89aff8b76ecb3fed0d18f6abfdd9412102fde03670ccc6950b76029ef131280b604df9b44d4520cd9df9023aade2082b07feffffff030000000000000000466a04534c500001010747454e4553495304484f4e4b09484f4e4b20484f4e4b17544845205245414c20484f4e4b20534c5020544f4b454e4c0001004c0008000000174876e80022020000000000001976a91453c0098567382f003437a016edcc47de1436746988acf27f0100000000001976a9145afb7e1a1216788d7c69c509269d75b8750e750688ac78cc0800
```

#### Result:


```
txid:             7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1
version:          1
lock_time:        576632
token_type:       1
tokenid:          7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1
transaction_type: GENESIS

ticker:           HONK
name:             HONK HONK
document_uri:     THE REAL HONK SLP TOKEN
document_hash:    [none]
decimals:         0
has_mint_baton:   0

inputs:
#0
    txid: e14a57668e7aa92f9931750649c828adc7aff1289ef4f458108d097c4663c684
    vout: 2

outputs:
#0
    value:        0
    scriptpubkey: 6a04534c500001010747454e4553495304484f4e4b09484f4e4b20484f4e4b17544845205245414c20484f4e4b20534c5020544f4b454e4c0001004c0008000000174876e800
    mint_baton

#1
    value:        546
    scriptpubkey: 76a91453c0098567382f003437a016edcc47de1436746988ac
    slp_amount:   100000000000

#2
    value:        98290
    scriptpubkey: 76a9145afb7e1a1216788d7c69c509269d75b8750e750688ac
```
