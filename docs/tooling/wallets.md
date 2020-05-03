# Wallets

[[toc]]

## Comparison

|                                 | Electron Cash SLP | memo.cash       | Bitcoin.com mobile | mint.bitcoin.com | Badger mobile | Badger browser | Crescent Cash | Blockparty Wallet | Electron Cash     | HoneyPoints/HoneyPay |
|---------------------------------|-------------------|-----------------|--------------------|------------------|---------------|----------------|---------------|-------------------|-------------------|----------------------|
| **Fungible Tokens (0x01)**          |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Won't Burn                      | ✓                 | ✓               | ✓                  | ✓                | ✓             | ✓              | ✓             | ✓                 | ✓                 | ✓                    |
| Displays Received               | ✓                 | ✓               | ✓                  | ✓                | ✓             | ✓              | ✓             | ✓                 |                   | ✓                    |
| Send                            | ✓                 | ✓               | ✓                  | ✓                | ✓             | ✓              | ✓             | ✓                 |                   | ✓                    |
| Genesis                         | ✓                 | ✓               |                    | ✓                |               |                |               |                   |                   |                      |
| Mint                            | ✓                 | ✓               |                    | ✓                |               |                |               |                   |                   |                      |
| Burn                            | ✓                 |                 |                    | ✓                |               |                |               |                   |                   |                      |
| **Non-Fungible Tokens (0x81/0x41)** |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Won't Burn                      | ✓                 | ✓               | ✓                  | ✓                | ✓             | ✓              | ✓             | ✓                 | ✓                 | ?                    |
| Displays Received               | ✓                 | ✓               |                    |                  | ?             | ?              | ?             | ✓                 |                   | ?                    |
| Send                            | ✓                 | ✓               |                    |                  |               |                |               | ✓                 |                   | ?                    |
| Genesis Group (0x81)            | ✓                 | ✓               |                    |                  |               |                |               |                   |                   |                      |
| Mint Group (0x81)               | ✓                 | ✓               |                    |                  |               |                |               |                   |                   |                      |
| Genesis NFT (0x41)              | ✓                 | ✓               |                    |                  |               |                |               |                   |                   |                      |
| Burn                            | ✓                 |                 |                    |                  |               |                |               |                   |                   |                      |
| Future Token Types (e.g., 0x02) |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Won't Burn                      | ✓                 |                 |                    |                  |               |                |               | ✓                 | ✓                 | ?                    |
| Displays Received               | ✓                 |                 |                    |                  |               |                |               | ✓                 |                   | ?                    |
| **SLP URI Scheme**                  |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Fungible TokenID (0x01)         | ✓                 |                 |                    |                  |               |                |               |                   |                   |                      |
| NFT1 TokenID (0x81/41)          | ?                 |                 |                    |                  |               |                |               |                   |                   |                      |
| NFT1 GroupID ("isgroup" flag)   | (2020-Q3)         |                 |                    |                  |               |                |               |                   |                   |                      |
| **SLP Payment Protocol**            |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Fungible TokenID (0x01)         | (dev-2020-Q3)     |                 |                    |                  |               |                |               |                   |                   |                      |
| NFT1 TokenID (0x81/41)          | ?                 |                 |                    |                  |               |                |               |                   |                   |                      |
| NFT1 Group Payment Protocol     | (2020-Q3)         |                 |                    |                  |               |                |               |                   |                   |                      |
| **SLP Post-Office**                 |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Wallet UI / Server API          |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Merchant SLP BIP-70             | (dev-2020-Q3)     |                 |                    |                  |               |                |               |                   |                   |                      |
| **Platforms**                       |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Windows                         | ✓                 |                 |                    |                  |               |                | ✓             |                   | ✓                 |                      |
| Linux                           | ✓                 |                 |                    |                  |               |                | ✓             |                   | ✓                 |                      |
| macOS                           | ✓                 |                 |                    |                  |               |                | ✓             |                   | ✓                 |                      |
| iOS                             | (2021-Q2)         |                 | ✓                  |                  |               |                |               |                   |                   |                      |
| Android                         | (2021-Q2)         |                 | ✓                  |                  |               |                | ✓             |                   |                   |                      |
| Open-source Code                | ✓                 | ✓               |                    | ✓                | ✓             | ✓              | ✓             | ✓                 | ✓                 |                      |
| Web-browser                     |                   | ✓               |                    | ✓                |               | ✓              |               |                   |                   |                      |
| **Information**                     |                   |                 |                    |                  |               |                |               |                   |                   |                      |
| Code Authors                    | James Cramer      | Jason Chavannes | ?                  | Andre Cabrera    | Pete          | Drew           | pokkst        | Jt Freeman        | Calin Culianu     | Jean-Baptiste        |
| Company                         | Electron Cash LLC | memo.cash       | bitcoin.com        | bitcoin.com      | bitcoin.com   | bitcoin.com    | pokkst        | Blockparty-sh     | Electron Cash LLC | HoneyPay             |
| Primary Company Contact         | Jonald Fyookball  | Jason Chavannes |                    |                  |               |                | pokkst        | Jt Freeman        | Jonald Fyookball  |                      |

## Links

### Electron Cash SLP

Open Source Reference Implementation Wallet

[View →](/tooling/ecslp)

### Badger

Open Source Web and Mobile Wallet

[View →](/tooling/badger)

### Mint

Open Source Web Wallet

[View →](/tooling/mint)

### Crescent Cash

Open Source Web and Mobile Wallet

[View →](/tooling/crescentcash)

### Bitcoin.com Wallet

Mobile Wallet

[View →](/tooling/bitcoincomwallet)

### Monarch Wallet

Mobile Wallet

[View →](/tooling/monarch)

### Zapit

Mobile Wallet

[View →](/tooling/zapit)
