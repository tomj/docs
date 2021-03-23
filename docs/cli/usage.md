---
title: Usage
slug: /cli/usage
---

## Help

Help output shows all the main commands. 

```
> feeless --help

A Nano (cryptocurrency) node and utilities such as nano addresses, hashing blocks, signing, etc.

USAGE:
    feeless [FLAGS] <SUBCOMMAND>

FLAGS:
    -h, --help        Prints help information
        --no-color    Don't use ANSI colour codes when logging
    -V, --version     Prints version information

SUBCOMMANDS:
    address    Address conversion
    debug      Debugging and experimental tools
    help       Prints this message or the help of the given subcommand(s)
    node       Launches a node
    pcap       Tool to analyse network capture dumps for Nano packets
    phrase     Word mnemonic phrase generation and conversion
    private    Private key generation and conversion
    public     Public key conversion
    seed       64 bit seed generation and conversion
    unit       Conversion between units, e.g. Rai to Nano
    wallet     Manage wallet files
```

You can see extra help for each command:

```
> feeless wallet --help

Manage wallet files

USAGE:
    feeless wallet <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    address    Output the address of a wallet
    help       Prints this message or the help of the given subcommand(s)
    import     Import an existing wallet. If the wallet file doesn't exist, it will be created
    new        Create a new wallet. If the wallet file doesn't exist, it will be created
    private    Output the private key of a wallet
    public     Output the public address of a wallet
```

## Generate new keys

You can generate new seeds, phrases and private keys:

```
> feeless phrase new --language ja --words 12
たおす むろん だじゃれ のせる よさん ておくれ こあくま しゅくはく たいき りりく しゃりん ひだり

> feeless private new
DC44DE34F003F3F4F44ED0557BEE848128E7DF8CB6095DD554F271DFE173BDC6

> feeless seed new
BA6481E2F4143C99F47EFA540E5E2DCCA1D265519CD15E7A031380CB01298165
```

## Working with keys

Convert between seeds, private, public and addresses.

```
> feeless private to-public DC44DE34F003F3F4F44ED0557BEE848128E7DF8CB6095DD554F271DFE173BDC6
10527826C408322E511DF03953FA5A509858CE46B137C3483BAA8E632E0A0168

> feeless public to-address 10527826C408322E511DF03953FA5A509858CE46B137C3483BAA8E632E0A0168
nano_164kh1mea43k7sajuw3schx7nn6rd596febqrf65qcngeeq1n1dazxajsnri

> feeless address to-public nano_164kh1mea43k7sajuw3schx7nn6rd596febqrf65qcngeeq1n1dazxajsnri
10527826C408322E511DF03953FA5A509858CE46B137C3483BAA8E632E0A0168

> feeless phrase to-public "average gaze report acquire inch act uphold spice snake scatter uphold mass"
AF63ADF8109E75E6297F202DA27E7D9F431A6B653BF470A6819F2BC4A6DAE21F

> feeless phrase to-address "average gaze report acquire inch act uphold spice snake scatter uphold mass"
nano_3du5oqw339mowrnqya3fnbz9u9t55bopcgzng4ma59sdrkmforizi8m7uhr4
```

## Unit conversion

Some unit conversions, using the newly proposed units.

These will be:
 * `rai` instead of `raw`
 * `nano` instead of `Mnano` (or uppercase `Nano`)
 * `micronano` instead of the existing lower case `nano`.

See the PR and discussion around this:
* https://github.com/nanocurrency/nano-docs/pull/466
* https://forum.nano.org/t/discussion-regarding-unit-names/108

```

> feeless unit rai nano 12345
0.000000000000000000000000012345

# Micro is the new set of units 
> feeless unit nano micro 1
1000000

# Convert straight back using pipes
> feeless unit rai nano 1 | feeless nano rai -
1
```

## Wallets

See the [wallet](/docs/cli/wallet) section for more details.

```
> feeless wallet new seed --file gak.wallet
2B2B95123A375400F5D29EA03F180884D073B4D5DE06EF7D4674DF7E7DD1382A

# The wallet id is not the seed. You can set environment variables to not have to use arguments every time
> export FEELESS_WALLET_ID=2B2B95123A375400F5D29EA03F180884D073B4D5DE06EF7D4674DF7E7DD1382A
> export FEELESS_WALLET_FILE=gak.wallet
> feeless wallet address
nano_16pypp9o33xd4be8pjcjaneq5sicz7s857n51wc7h8w6s3p5tkihc5jsp6o8
```
