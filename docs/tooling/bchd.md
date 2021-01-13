# BCHD

::: tip View Repo:
[https://github.com/simpleledgerinc/bchd](https://github.com/simpleledgerinc/bchd)
:::

BCHD is an alternative full node bitcoin cash implementation written in Go (golang) that allows for easy querying of the blockchain. It may be used as an alternative to rest.bitcoin.com.

[[toc]]

## Introduction

BCHD now has SLP indexing built into it. Here is a quick overview of some of the features:

- Receive SLP metadata on transactions, tokens, all from one source. This allows you to do one query and not have to worry about synchronizing issues like when using SLPDB.

- Burn Protection -- you can be sure that you aren't burning any SLP tokens due to a bug in your software. If you do want to burn some tokens that still works too, just enumerate them. You can check SLP validity prior to broadcasting or during broadcast.

- Parse and create SLP metadata. You can use this inside your application when constructing your transactions.

- Subscribe to all transactions involving specific tokens.

### Public SLP Enabled Instances

[https://bchd.fountainhead.cash/](https://bchd.fountainhead.cash/)
