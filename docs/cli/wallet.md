---
title: Wallet
slug: /cli/wallet
---

## Introduction

**WARNING**: There is no file locking currently, so two processes writing to it at the same time will cause unpredictable results.

A wallet file is a collection of wallets. Wallets are accessed using a [wallet ID](#specific-wallet-ids) or a [default wallet](#default-wallets).

Feeless supports three different wallet types:
* A single private key.
* A mnemonic phrase.
* A seed.

You can use [environment variables](#environment-variables) to make your life easier.

The file [storage is JSON](#file-store).

## Environment variables

Feeless wallets support two environment variables to save typing out the same arguments over and over again:

* `FEELESS_WALLET_FILE` which is the name of the file.
* `FEELESS_WALLET_ID` which specifies the wallet ID.

For example, these two commands are equivalent:

```bash
> feeless wallet address --file gak.wallet --id 2B2B95123A375400F5D29EA03F180884D073B4D5DE06EF7D4674DF7E7DD1382A
nano_16pypp9o33xd4be8pjcjaneq5sicz7s857n51wc7h8w6s3p5tkihc5jsp6o8

> export FEELESS_WALLET_ID=2B2B95123A375400F5D29EA03F180884D073B4D5DE06EF7D4674DF7E7DD1382A
> export FEELESS_WALLET_FILE=gak.wallet
> feeless wallet address
nano_16pypp9o33xd4be8pjcjaneq5sicz7s857n51wc7h8w6s3p5tkihc5jsp6o8
```

## Wallet IDs

### Specific Wallet IDs

A wallet file can contain multiple wallets, represented by a **wallet ID** which is a hex string:

```bash
> export FEELESS_WALLET_FILE=gak.wallet
> feeless wallet new seed
4C1C205DE15BAF6376AA5C6849E3083F2C59B0B8BE728229EE1B654DDEBE194C
```

Wallet IDs are not the private key or seed, these are just an identifier for the wallet itself.

### Default wallets

If you only need to work with one wallet, you can use a default wallet which is just a zero value.

```bash
> export FEELESS_WALLET_FILE=gak.wallet
> feeless wallet new seed --default
0000000000000000000000000000000000000000000000000000000000000000
```

Please note that if a wallet ID already exists, it can't be created again.

When you don't specify the wallet ID in further commands, it will assume the default key.

```bash
> feeless wallet address
nano_16pypp9o33xd4be8pjcjaneq5sicz7s857n51wc7h8w6s3p5tkihc5jsp6o8
```

## Generating addresses

You can generate multiple addresses depending on your wallet type. Private wallets can only generate one address.

```commandline
> export FEELESS_WALLET_FILE=gak.wallet
> export FEELESS_WALLET_ID=`feeless wallet new seed`
> feeless address 42
nano_3oj6wooecsyhypdm6s3q5p4xetfd6ypbkpshfqkbb6wc3i57wgsg5nuyxu1o
> feeless address 43
nano_3pfhpq3e4bfjw8c4ag7xuso4s7g5faqwsseuwritoyo9ad4jhczdzh75hxha

# Create a new private wallet.
> export FEELESS_WALLET_ID=`feeless wallet new private`
> feeless address 42
ERROR feeless: Exiting because of an error: There is only one private key in this wallet. Only use index 0.
```

## File store

Wallets are stored as JSON files currently, and look like this:

```json
{
  "wallets": {
    "6DC07716363835A21D9B31909A8900D67E91590605AB82149FC28846BD84E825": {
      "Seed": "27C8DCFB31F72323EBD06E396596AA0BF498B612F47AA7B49EE1B466B4A16F54"
    },
    "1E3F5B21B58EF79FCB33F1E44594B970D349F203CAF6D0B7B53BC2EE77015B64": {
      "Phrase": {
        "language": "English",
        "entropy": "0C1149CB18CC1EAE0B62730A5497D40F0B1386323EB3D340DBB2D69489133E8A"
      }
    }
  }
}
```

You can create and remove entries yourself if required.