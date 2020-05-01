# SLP Implementation Instruction for Wallet and Exchanges

This document provides a baseline checklist of application level security considerations for developers. It is maintained by the SLP Foundation and serves as a standard for production ready SLP implementations.

Following all the best practices below will ensure users have a reliable and seamless experience on the developer's SLP implementation. 

Not following Best Practices for SLP may result in users losing money. It is in the best interest of app developers to follow these guidelines and if they are unable to, to let users know the wallet is not safe to use for larger amounts and that it is a work-in-progress. 

The SLP protocol when used properly is extremely secure. It is only when implementations do not follow best practices that they may result in users losing funds or burning SLP tokens.

## Have Multiple Sources of Validation or Client Side Validation

[high level] 

It is very important for any released SLP implementation to not rely on a single third party server for SLP validation queries in the developer's implementation, as any bug, breach, or timeout can give a wrong validity result that is not in sync with the blockchain.

A wrong validity result will provide bad data, in which case the user or developer may lose money because the amount of valid SLP input into a transaction will be less than the amount sent out, causing a burning of all valid input SLP balances. 

Some common examples of this is relying on bitcoin.com's REST API for validation, or on a single SLPDB instance. Whilst this is fine for developing the application it is not good practice to trust only one source of SLP validation for production.

This is not an issue in the case the developer's application does client side validation, as it doesn't need multiple sources of truth to compare against because it can validate for itself and not be subject to bad third party data.

In cases where the client cannot validate themselves due to resource constraints they should pull data from multiple SLP validation sources so that the data can be cross checked.

In any design it would be bad practice to be sending transactions based on only one server's response. 

[tech level]

### Self validation: how does it work? 

To perform client-side validation you must first look up the provided transaction.

You then must get the DAG back to the last transactions you have verified. If this is the first transaction of a token verification this means the DAG back to genesis. If you have already validated transactions for a token, you may store these valid txids and cancel the crawl once you hit txids which are in the intersection of the already validated DAG and the currently validating DAG. Gs++ provides a way for you to enter in “exclude_txids” which internally will provide you the set difference or delta allowing you to recombine and validate on the client side. Using the “exclude_txids” feature allow for greatly reduced bandwidth requirements. 

You should use a library such as slp-validate which has passed the SLP unit tests to perform the validation. Once you have a valid result, you may mark the utxos involved as valid and use them in future transactions.


### Multiple validation sources: how to do it?

Use more than your own company's servers!

Pull from as many sources as possible.. If more than N are down… mark utxos as unresolved, if more than M are disagreeing mark as unresolved. This way an attacker could not simply dos the servers to force validity. Also, if one or more hacked would not be able to steal funds/scam/cause destruction. If you are relying on a single server or a single companies servers, you will not be doing due diligence on the validity of the transactions and it can lead to token burns. 

There are many different public SLPDB sources which can be used for validity checking (status.slpdb.io), as well as GS++ servers, and there is bitcoin.com’s slp-indexer as well. Pulling from multiple of these will ensure your users funds are safe.

## Pass All SLP Unit Tests

[high level]

This applies only to developers reimplementing SLP. If the developer is using existing libraries which handles SLP, they should check such libraries have already met the SLP best practices and if not improve them until they do meet them.

The developer application needs to implement all SLP unit tests (https://github.com/simpleledger/slp-unit-test-data/) without fail. 

Any SLP implementation should make it easy to run these tests and have the resulting test data updated as part of each build that the developer is working on.

Prior to any release all tests should be passing beforehand.

As in the previous case, a wrong validity result due to not running these unit tests thoroughly may result in users losing money.

The tests do not necessarily catch everything and it is highly recommended for developers to also use fuzzers if they are reimplementing SLP. 


[tech level]

Ensure that all libraries used by your application and your application itself adheres to the https://github.com/simpleledger/slp-unit-test-data repository. 

These should be run for before any update to the services are pushed to production. 

Any code which parses SLP transactions should be fuzzed using differential fuzzing applications (such as the GS++ fuzzing system). The SLP Foundation is able to provide assistance for setting this up for new applications. You should run the differential fuzzing tools for at least 1 billion transactions after changes to SLP handling code, or ideally any update (in case things interact in ways you did not foresee).

## Prevent Users Burning Tokens by Accident

[high level]

The design of the application should include measures to prevent SLP tokens being burned by accident, applicable to the type of implementation being developed.

If burning is a feature of the SLP implementation, it should be made explicit to the user before allowing them to proceed.


[tech level]

Wallet Functionality:

- Preventing SLP UTXO's being spent as BCH without special warning.
- Perform double check on transactions that no burns are happening with different code paths
- Performs full client side validation of all SLP validity
- Require sending SLP to simple ledger addresses
- Use 245 derivation path to signal SLP wallet, or some other derivation change such as new account.
- You should perform a pre-signing token burn check such as done in Electron Cash SLP. This is a last chance check to ensure that user will not lose funds. 

You can refer to https://github.com/simpleledger/Electron-Cash-SLP/blob/master/lib/slp_checker.py for an example of how to perform a pre-signing burn check. 

## Refer to White Listed Tokens if Necessary

The design of SLP allows tokens to appear with the same name. If a developer's application wants to verify which is the whitelisted token they should refer to a verified tokens list kept by the application. One choice is to periodically pull the simpleledger.info [verified tokens list](https://github.com/blockparty-sh/slp-explorer) if you don’t want to maintain your own list, however this list should be scrutinized during each update. 

It is the developer's responsibility to ensure that they find the correct tokenid for any token they wish to let the user access, unless the design makes it implicit that it is the user's responsibility to check the token.


Nice to have: an interface that puts user in control of whitelist choices.



## Sending Considerations

[high level]

It’s important to use minimal sized utxos (dust limit) as it otherwise requires multiple outputs to split the BCH and SLP. SLP utxos should be just that - SLP.


If you have SLP but no or little BCH you won’t be able to send. The wallet should handle this gracefully with a message for the user.


[tech level]

Create SLP utxos using dust limit (546 satoshis).

Do not allow wallet to use utxos unless they have been validated as described above.

Keep in mind, it is possible for receiving SLP utxos to be any sized BCH.
