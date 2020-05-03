# GS++-CLI

::: tip View Repo:
[ihttps://github.com/blockparty-sh/cpp_slp_graph_search/tree/master/cli](https://github.com/blockparty-sh/cpp_slp_graph_search/tree/master/cli)
:::

`gs++-cli` is a swiss army knife of interating with GS++ servers. It allows you to perform graph searches, graph rendering, validation, and trusted validation.

[[toc]]

## Introduction

This program is most often used for debugging SLP, therefore it is encouraged and expected to modify the CLI to suit your particular needs. It has been used for investigating SLP implementation bugs, being able to rapidly find inconsistent states, and also as a tool to help implement Graph Search in wallets.

Using the [--dot](#dot) option you can create visual graphs which can be loaded into programs such as [cytoscape](https://cytoscape.org/). These can help in understanding how your token is being used, or as part of debugging procedure to see what types of graphs are causing issue.



## Examples

### --graphsearch

Get raw graph search data. This should be processed using another program or saved.

```
$ gs++-cli --host gs.fountainhead.cash --port 443 --use_tls --graphsearch d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
```

#### Result

```
AgAAAAN5pMyCb9TE0PnSHNz1vsHt95RTmwc2NI9c+rNWIdawxAIAAABqRzBEAiAsPzP4AlPUXKRJZcruOwDozVypeiCHBxfkEXrPp3y0awIgAxNizFb2/GDS2x+7ItUj7e/1O9OssXxGNhogNkSuGDtBIQMMmaW7a70AA0Y8lssaOP4V8k6H3YdhkQDOsvmbxHYwTv////95pMyCb9TE0PnSHNz1vsHt95RTmwc2NI9c+rNWIdawxAMAAABrSDBFAiEAwgNwN2KwugaYgcYjYuazVWSvyl0FQ9M/rj9tm6E8wUQCIEvSZMz5GqYXwbSHwfP/LMjUWxZNgJHNEQb/DMHk2IwlQSEDDJmlu2u9AANGPJbLGjj+FfJOh92HYZEAzrL5m8R2ME7/////eaTMgm/UxND50hzc9b7B7feUU5sHNjSPXPqzViHWsMQBAAAAakcwRAIgPAEqG2Q8qeZ3g9FW0S553ms5nTW8VJqz8BQY6uJ1+osCIAzOXVDTzhWd2CfsZ8j7/ruhqSKLYLkhSuUo0/gDPjENQSEDDJmlu2u9AANGPJbLGjj+FfJOh92HYZEAzrL5m8R2ME7/////BAAAAAAAAAAAOWoEU0xQAAEBBE1JTlQgxLDWIVaz+lyPNDYHm1OU9+3BvvXcHNL50MTUb4LMpHkBAggAAAAAAAAD6CICAAAAAAAAGXapFN64LpLJ6diryltq1estfV0u8mCEiKwiAgAAAAAAABl2qRTeuC6SyenYq8pbatXrLX1dLvJghIisQo6YAAAAAAAZdqkU3rguksnp2KvKW2rV6y19XS7yYISIrAAAAAA=
AgAAAALND60Ok98EgoAW7lbeJqwywsh8c1GJcpkhupDMPtjbhwMAAABrSDBFAiEAr7kdTBKvM5EBrDf6DmXwWvh8dhGOQcigPe+fUWZ7HI4CIEwHMa+/MEhTXY1C/51iL1lOpJYGqVSH1fveEUlR1ItHQSEDDJmlu2u9AANGPJbLGjj+FfJOh92HYZEAzrL5m8R2ME7/////zQ+tDpPfBIKAFu5W3iasMsLIfHNRiXKZIbqQzD7Y24cBAAAAakcwRAIgDXjE5NICRwc48S6+4jhRO8mZNueAouNqPXqjEmMfKFoCIFmiMhK06FQHYOtQO3Y97bJ0q4B/7SZp8TblORHjsFe3QSEDDJmlu2u9AANGPJbLGjj+FfJOh92HYZEAzrL5m8R2ME7/////BAAAAAAAAAAAQWoEU0xQAAEBB0dFTkVTSVMEVVNESApIb25lc3RDb2luEXd3dy5ob25lc3Rjb2luLmlvTAABAgECCAAAAAAAAAAAIgIAAAAAAAAZdqkU3rguksnp2KvKW2rV6y19XS7yYISIrCICAAAAAAAAGXapFN64LpLJ6diryltq1estfV0u8mCEiKyxkJgAAAAAABl2qRTeuC6SyenYq8pbatXrLX1dLvJghIisAAAAAA==
```



### --validate

Performs a graph search like above, then runs the data through our own validation code to check the transaction. 

```
$ gs++-cli --host gs.fountainhead.cash --port 443 --use_tls --validate d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
```

#### Result:

```
hydrate:	0ms
validate(txid): d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
validate(tx): d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
mint: front d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083 back d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083: valid
validate:	0ms
```

### --tvalidate

Trusted Validation method, this just asks the server if the transaction is valid or not. This will only tell you if a tx is valid, it is impossible for it to know if a transaction it has not yet seen is valid.

::: warning

Not recommended unless you are running your own GS++ instance or using Federated Validation.

:::

```
$ gs++-cli --host gs.fountainhead.cash --port 443 --use_tls --tvalidate d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
```

### --validatefile

Using the output from a [--graphsearch](#graphsearch) call, you can validate from a file.

```
$ gs++-cli --host gs.fountainhead.cash --port 443 --use_tls --graphsearch d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083 > /tmp/txs.gs
$ gs++-cli --validatefile /tmp/txs.gs
```

#### Result:

```
c4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479
d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
validate(txid): d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
validate(tx): d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
mint: front d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083 back d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083: valid
```

### --dot

Generates a [Graphviz](https://www.graphviz.org/) dot file for rendering in an external program of the graph search data.

```
$ gs++-cli --host gs.fountainhead.cash --port 443 --use_tls --dot d679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083
```

#### Result:

```
digraph G {
td679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083 [label=""];
tc4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479 [label=""];
t87dbd83ecc90ba2199728951737cc8c232ac26de56ee16808204df930ead0fcd [label=""];
t87dbd83ecc90ba2199728951737cc8c232ac26de56ee16808204df930ead0fcd -> tc4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479;
t87dbd83ecc90ba2199728951737cc8c232ac26de56ee16808204df930ead0fcd -> tc4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479;
tc4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479 -> td679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083;
tc4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479 -> td679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083;
tc4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479 -> td679656066917a9a3a1b886cb8b4ec0c933635585a3209739c0216023b26f083;
}
```
