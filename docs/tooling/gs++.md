# GS++

::: tip View Repo:
[https://github.com/blockparty-sh/cpp_slp_graph_search](https://github.com/blockparty-sh/cpp_slp_graph_search)
:::

GS++ is a fast SLP indexer, validator, and graph search server. This means you can query for the full DAG of transactions in order to trustlessly verify SLP transactions.

[[toc]]

## Introduction

GS++ is a suite of tools built in C++ for high-performance SLP. The main program is a server, which returns graph search data using gRPC. The auxillary tools exist for debugging and testing SLP implementations.

## Install

### Install Third Party Libs

Install recent version of [Boost](https://www.boost.org/)

Install [SWIG 3](http://www.swig.org)

Follow [this](https://github.com/grpc/grpc/blob/master/BUILDING.md) guide to install gRPC and Protobuf for your system if it is not already installed.


### Build

The initial build might take a long time to download and build required dependencies, so grab some coffee.

From root directory build like normal CMake program.

```
mkdir build
cd build
cmake ..
make -j
```

You can use `-DCMAKE_BUILD_TYPE=Debug` for debug build.


## Running

Make sure you have bitcoind running and the following options enabled in `bitcoin.conf`:

```ini
txindex=1
server=1
rpcuser=bitcoin
rpcpassword=password
rpcport=8332
rpcworkqueue=10000
rpcthreads=8
zmqpubhashtx=tcp://*:28332
zmqpubrawtx=tcp://*:28332
zmqpubhashblock=tcp://*:28332
zmqpubrawblock=tcp://*:28332
```

### Configuration

Set up a `config.toml` and start gs++ like so:

```
$ gs++ config.toml
```

These options should be self-explanatory, if not please ask in Telegram or open an issue:

```toml
[cache]
dir = "/tmp/gs++/cache"

[grpc]
host = "0.0.0.0"
port = 50051

[bitcoind]
host = "0.0.0.0"
port = 8332
user = "user"
pass = "password"
zmq_port = 28332

[utxo]
checkpoint = "./utxo-checkpoints/QmXkBQJrMKkCKNbwv4m5xtnqwU9Sq7kucPigvZW8mWxcrv"
block_height = 543375
block_hash = "0000000000000000000000000000000000000000000000000000000000000000"
checkpoint_load = false
checkpoint_save = false

[zmqpub]
bind = "tcp://127.0.0.1:29069"

[graphsearch]
max_exclusion_set_size = 5

[services]
graphsearch = true
graphsearch_rpc = true
zmq = true
grpc = true
utxosync = false
cache = true
zmqpub = true
```

## ZMQ Publishing

gs++ publishes valid SLP transactions with ZMQ, similarly to how `bitcoind` publishes valid transactions. You can connect directly to the zmq port configured in `config.toml` or use [slpstream](/tooling/slpstream) to listen to new transactions and blocks from gs++.

## Further Reading

Make sure to check out the collection of tools included with GS++ to help develop on SLP.

* [cli](/tooling/gs++-cli)
* [txdecoder](/tooling/txdecoder)
* [slpdecoder](/tooling/slpdecoder)
* [blockdecoder](/tooling/blockdecoder)
* [fuzz](/tooling/fuzz)
