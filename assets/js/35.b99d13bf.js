(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{248:function(t,s,e){"use strict";e.r(s);var a=e(2),r=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"uri-scheme-specificaton"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#uri-scheme-specificaton"}},[t._v("#")]),t._v(" URI Scheme Specificaton")]),t._v(" "),e("h4",{attrs:{id:"version-0-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#version-0-3"}},[t._v("#")]),t._v(" Version: 0.3")]),t._v(" "),e("h4",{attrs:{id:"date-published-1-18-2019"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#date-published-1-18-2019"}},[t._v("#")]),t._v(" Date published: 1-18-2019")]),t._v(" "),e("h2",{attrs:{id:"purpose"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#purpose"}},[t._v("#")]),t._v(" Purpose")]),t._v(" "),e("p",[t._v("The purpose of this URI scheme is to enable users to easily make SLP token & Bitcoin Cash payments by simply clicking links on webpages or scanning QR Codes.")]),t._v(" "),e("h2",{attrs:{id:"specification"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#specification"}},[t._v("#")]),t._v(" Specification")]),t._v(" "),e("h3",{attrs:{id:"general-rules-for-handling-important"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#general-rules-for-handling-important"}},[t._v("#")]),t._v(" General rules for handling (important!)")]),t._v(" "),e("p",[t._v("SLP clients MUST NOT act on URIs without getting the user's authorization.\nThey SHOULD require the user to manually approve each payment individually, though in some cases they MAY allow the user to automatically make this decision.")]),t._v(" "),e("h3",{attrs:{id:"operating-system-integration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#operating-system-integration"}},[t._v("#")]),t._v(" Operating system integration")]),t._v(" "),e("p",[t._v('Graphical SLP clients SHOULD register themselves as the handler for the "simpleledger:" URI scheme by default, if no other handler is already registered. If there is already a registered handler, they MAY prompt the user to change it once when they first run the client.')]),t._v(" "),e("h3",{attrs:{id:"general-format"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#general-format"}},[t._v("#")]),t._v(" General Format")]),t._v(" "),e("p",[t._v("SLP URIs follow the general format for URIs as set forth in RFC 3986. The path component consists of a simpleledger address, and the query component provides additional payment options.")]),t._v(" "),e("p",[t._v("Elements of the query component may contain characters outside the valid range. These must first be encoded according to UTF-8, and then each octet of the corresponding UTF-8 sequence must be percent-encoded as described in RFC 3986.")]),t._v(" "),e("h3",{attrs:{id:"abnf-grammar"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#abnf-grammar"}},[t._v("#")]),t._v(" ABNF grammar")]),t._v(" "),e("div",{staticClass:"language-abnf extra-class"},[e("pre",{pre:!0,attrs:{class:"language-abnf"}},[e("code",[e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("slpurn")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"simpleledger:"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("address")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("cashsigndata")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"?"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("params")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("address")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("slpaddr")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("params")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("param")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("params")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("param")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("amountparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("multiamounts")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("labelparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("messageparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("otherparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("reqparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("cashsign-type")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("cashsign-data")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("cashsign-callbackurl")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("amountparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"amount="')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token core-rule rule constant"}},[t._v("digit")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"."')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token core-rule rule constant"}},[t._v("digit")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("tokenid")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("multiamounts")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("multiamount")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"&"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("multiamounts")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("multiamount")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"amount"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("uniquechar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"="')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token core-rule rule constant"}},[t._v("digit")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"."')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token core-rule rule constant"}},[t._v("digit")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("tokenid")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" |\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("tokenid")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("64*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("hexchar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("tokenflags")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("tokenflags")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("tokenflag")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("tokenflags")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("tokenflag")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"isgroup"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("labelparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"label="')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("messageparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"message="')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("cashsign-type")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("utf8")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("bytes")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("txn")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("cashsign-data")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("hexchar")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("cashsign-callbackurl")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("otherparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"="')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token definition keyword"}},[t._v("reqparam")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"req-"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"="')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token repetition operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token rule"}},[t._v("qchar")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n")])])]),e("h3",{attrs:{id:"implementation-requirements"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#implementation-requirements"}},[t._v("#")]),t._v(" Implementation Requirements")]),t._v(" "),e("ol",[e("li",[t._v('Bitcoin Cash is the blockchain associated with the "simpleledger" URI scheme.')]),t._v(" "),e("li",[t._v("If "),e("code",[t._v("tokenflags")]),t._v(" is omitted the payment shall be made using the tokenid specified.  However, if the "),e("code",[t._v("isgroup")]),t._v(" tokenflag option is provided then the payment request can satisfied using any valid NFT originating from the NFT group tokenid provided.  Read NFT group specification "),e("a",{attrs:{href:"https://github.com/simpleledger/slp-specifications/blob/master/NFT.md#extension-groupable-supply-limitable-nft-tokens-as-a-derivative-of-fungible-tokens",target:"_blank",rel:"noopener noreferrer"}},[t._v("here"),e("OutboundLink")],1),t._v(" for more information.  In the future additional "),e("code",[t._v("tokenflag")]),t._v(" options may be possible.")]),t._v(" "),e("li",[t._v("The character set requirements for the "),e("code",[t._v("*slpaddr")]),t._v(" address format are specified "),e("a",{attrs:{href:"https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md#slp-addr",target:"_blank",rel:"noopener noreferrer"}},[t._v("here"),e("OutboundLink")],1),t._v(".")])]),t._v(" "),e("h3",{attrs:{id:"examples"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),e("p",[t._v("This section is non-normative and does not cover all possible syntax.\nPlease see the BNF grammar above for the normative syntax.")]),t._v(" "),e("h4",{attrs:{id:"address"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#address"}},[t._v("#")]),t._v(" Address")]),t._v(" "),e("ul",[e("li",[e("p",[e("strong",[t._v("Just the address:")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0")])])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("Address with name:")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?label=Satoshi-Nakamoto")])])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v('Request 10.0001 XYZ tokens to "Satoshi-Nakamoto":')])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?amount1=10.0001-<xyzTokenID>&label=Satoshi-Nakamoto")])])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v('Request 20.30 BCH & 1000 XYZ tokens to "Satoshi-Nakamoto":')])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?amount=20.3&amount2=1000-<xyzTokenID>&label=Satoshi-Nakamoto")])])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("Request 50 BCH & 1 ABC token with message:")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?amount1=50&amount2=1-<abcTokenID>&label=Satoshi-Nakamoto&message=Donation%20for%20project%20xyz")])])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v('Request any 1 NFT token from group XYZ (using "isgroup"):')])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?amount1=1&amount2=1-<xyzGroupID>-isgroup&label=Satoshi-Nakamoto")])])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("Some future version that has variables which are (currently) not understood and required and thus invalid:")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?req-somethingyoudontunderstand=50&req-somethingelseyoudontget=999")])])])]),t._v(" "),e("li",[e("p",[e("strong",[t._v("Some future version that has variables which are (currently) not understood but not required and thus valid:")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?somethingyoudontunderstand=50&somethingelseyoudontget=999")])])])])]),t._v(" "),e("h4",{attrs:{id:"cashsign"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cashsign"}},[t._v("#")]),t._v(" CashSign")]),t._v(" "),e("p",[t._v("We use "),e("code",[t._v("cashsign")]),t._v(' in the parameter names in the hope that wallets which do not yet support CashSign will be able to show the user an error message regarding the parameter "cashsign-X" not being supported.')]),t._v(" "),e("p",[e("code",[t._v("cashsign-type")]),t._v(": can be message (utf8, bytes) or transaction (txn), more can be added in future")]),t._v(" "),e("p",[e("code",[t._v("cashsign-data")]),t._v(": contains the payload, can be a message or a transaction. prefixed with 0x")]),t._v(" "),e("p",[e("code",[t._v("cashsign-callbackurl")]),t._v(": url for the wallet to post the signed data back to.")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("Sign arbitrary message")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?cashsign-type=message&cashsign-data=0x00001111DEADBEEF9999cashsign-callbackurl=https://example.com/cashsigncallback")])])])])]),t._v(" "),e("p",[t._v("Will allow for user to see this data in wallet:")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("Request for signing message (Provide confirmation and cancel box)")])]),t._v(" "),e("li",[e("p",[t._v("Inform user that this data will be signed and returned to $cashsign-callbackurl")])])]),t._v(" "),e("p",[t._v("This should be UTF-8 and the message should be shown in a textbox for the user to inspect.")]),t._v(" "),e("ul",[e("li",[e("p",[e("strong",[t._v("Sign transaction")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("simpleledger:qqmtw4c35mpv5rcjnnsrskpxvzajyq3f9ygldn8fj0?cashsign-type=transaction&cashsign-data=0x000000000010101010000000010100fffff&cashsign-callbackurl=https://example.com/cashsigncallback")])])]),t._v(" "),e("p",[t._v("Will allow for user to see a graphical representation of a transaction and be able to sign some or all of the inputs.")])]),t._v(" "),e("li",[e("p",[t._v("Request for signing transaction (Provide confirmation and cancel box)")])]),t._v(" "),e("li",[e("p",[t._v("Inform user that the transaction will be signed and returned to $cashsign-callbackurl")])]),t._v(" "),e("li",[e("p",[t._v("Show a transaction renderer with the following properties:")])]),t._v(" "),e("li",[e("p",[t._v("Our own inputs must be colored")])]),t._v(" "),e("li",[e("p",[t._v("Our own outputs must be colored similarly")])]),t._v(" "),e("li",[e("p",[t._v("Our change should be visible so that users can easily see how much they are actually spending.")])])]),t._v(" "),e("h2",{attrs:{id:"reference-implementations"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reference-implementations"}},[t._v("#")]),t._v(" Reference Implementations")]),t._v(" "),e("h3",{attrs:{id:"clients"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#clients"}},[t._v("#")]),t._v(" Clients")]),t._v(" "),e("ul",[e("li",[t._v("Electron Cash SLP")]),t._v(" "),e("li",[t._v("Badger")])]),t._v(" "),e("h3",{attrs:{id:"libraries"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#libraries"}},[t._v("#")]),t._v(" Libraries")]),t._v(" "),e("ul",[e("li",[t._v("SLPJS "),e("a",{attrs:{href:"https://github.com/simpleledger/slpjs/blob/master/lib/utils.ts#L166",target:"_blank",rel:"noopener noreferrer"}},[t._v("Utils.parseSlpUri()"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);