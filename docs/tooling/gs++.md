# GS++

::: tip View Repo:
[https://github.com/blockparty-sh/cpp_slp_graph_search](https://github.com/blockparty-sh/cpp_slp_graph_search)
:::

GS++ is a fast SLP indexer, validator, and graph search server. This means you can query for the full DAG of transactions in order to trustlessly verify SLP transactions.

[[toc]]

## Introduction

GS++ is a suite of tools built in C++ for high-performance SLP. The main program is a server, which returns graph search data using gRPC. The auxillary tools exist for debugging and testing SLP implementations.
