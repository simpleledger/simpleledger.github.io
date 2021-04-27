(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{187:function(e,o,t){e.exports=t.p+"assets/img/SOUR-slp-icon.3aca4bc7.png"},188:function(e,o,t){e.exports=t.p+"assets/img/slp-token-folders.e674119c.png"},189:function(e,o,t){e.exports=t.p+"assets/img/sour-slp-explorer-icon.83eb12ef.png"},226:function(e,o,t){"use strict";t.r(o);var n=t(2),r=Object(n.a)({},(function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"add-an-icon-for-your-slp-token"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#add-an-icon-for-your-slp-token"}},[e._v("#")]),e._v(" Add an icon for your SLP Token")]),e._v(" "),n("p",[n("img",{attrs:{src:t(187),alt:"SOUR Icon",title:"SOUR Icon in SLP Explorer"}}),n("em",[e._v("https://simpleledger.info/#token/6448381f9649ecacd8c30189cfbfee71a91b6b9738ea494fe33f8b8b51cbfca0")])]),e._v(" "),n("p",[e._v("When your token is created (either on Memo or Electron Cash SLP), it will be assigned a default icon. In order to change that icon, you will need a GitHub account & the icon files in different sizes. There are a few different GitHub repositories that house token icons for different apps and serve those icons from censorship resistant servers.")]),e._v(" "),n("ul",[n("li",[e._v("You will first need to create a GitHub account if you don’t already have one.")]),e._v(" "),n("li",[e._v("Next "),n("a",{attrs:{href:"https://guides.github.com/activities/forking/",target:"_blank",rel:"noopener noreferrer"}},[e._v("fork the below repo"),n("OutboundLink")],1),e._v(" from your account (On repo page, click the fork button):"),n("br"),e._v(" "),n("a",{attrs:{href:"https://github.com/kosinusbch/slp-token-icons",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/kosinusbch/slp-token-icons"),n("OutboundLink")],1)])]),e._v(" "),n("p",[n("code",[e._v("git clone https://github.com/yourUSERNAME/slp-token-icons")])]),e._v(" "),n("ul",[n("li",[e._v("Make your changes on your fork by adding the images to the corresponding paths within your repo. Don’t change any other files, only add your own. At this point, you can either open the repo in a file explorer and then drag & drop your files into it or you can copy them via command-line.")]),e._v(" "),n("li",[e._v("The format is /{size}/{txid}.{format}"),n("br"),e._v("\n{size} can be any number from 1-2399 (or “original”)"),n("br"),e._v("\n{txid} is the transaction id of the token genesis transaction"),n("br"),e._v("\n{format} must be png")])]),e._v(" "),n("p",[n("img",{attrs:{src:t(188),alt:"SLP Token Icon folders",title:"SLP Token Icon folders"}}),n("em",[e._v("https://github.com/kosinusbch/slp-token-icons")])]),e._v(" "),n("p",[n("code",[e._v("cd slp-token-icons")])]),e._v(" "),n("p",[e._v("`cp TOKENID.png path/{size}/{txid}(tokenID).png")]),e._v(" "),n("p",[e._v("Repeat cp for each size of token icon.")]),e._v(" "),n("ul",[n("li",[e._v("Next commit your changes. The below commands will add all changes, stage them for commit with a message & then push them back into your forked repo.")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("git add *\ngit commit -m 'commit message'\ngit push\n")])])]),n("p",[e._v("At this point, you have your token icons in your own forked repository, under the correct sizes, with the tokenID as your icon name. Now you will need to open a Pull Request from the original repo in order to add your changes in there.")]),e._v(" "),n("p",[e._v("Go back to the "),n("a",{attrs:{href:"https://github.com/kosinusbch/slp-token-icons",target:"_blank",rel:"noopener noreferrer"}},[e._v("original repo"),n("OutboundLink")],1),e._v(" and click “New pull request”. From the Compare Changes page, select your repository & changes to merge into the original one.\nThe pull request will need to be reviewed & approved so it can take a few days or couple weeks, depending on the dev(s) maintaining the repo.")]),e._v(" "),n("p",[e._v("For Bitcoin.com services you can use "),n("a",{attrs:{href:"https://mint.bitcoin.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("mint.bitcoin.com"),n("OutboundLink")],1),e._v(" to upload an icon.")]),e._v(" "),n("p",[e._v("You can get more help on the SLP Devs telegram group: "),n("a",{attrs:{href:"https://t.me/slp_devs_for_hire",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://t.me/slp_devs_for_hire"),n("OutboundLink")],1)]),e._v(" "),n("p",[e._v("The SOUR token displays the icon for the SLP explorer because a pull request was created and accepted for kosinusbch/slp-token-icons.")]),e._v(" "),n("p",[n("img",{attrs:{src:t(189),alt:"SOUR icon",title:"SOUR Icon in SLP Explorer"}}),n("em",[e._v("https://simpleledger.info/#token/6448381f9649ecacd8c30189cfbfee71a91b6b9738ea494fe33f8b8b51cbfca0")])])])}),[],!1,null,null,null);o.default=r.exports}}]);