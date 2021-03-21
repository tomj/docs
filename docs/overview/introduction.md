---
title: Introduction
slug: /
---

## What is Feeless?

**Feeless** is a **Nano** cryptocurrency node, wallet, tools, and Rust crate. This is not the official project for Nano,
only an implementation written in Rust. The official Nano node
implementation [lives here](https://github.com/nanocurrency/nano-node).

🚸 This is a work in progress. The API will probably change without notice until `v0.2`. 🚸

I decided to start this project as a personal adventure of understanding Nano. I give no promises about my future
motivation to complete this project 🤐.

## Features

### Overview

* Rai units and conversions
* Mnemonic phrases
* Seeds
* Private keys
* Public keys
* Addresses
* Wallet
* Proof of work

### Command-line interface

Feeless is a feature packed binary including a powerful command-line interface.

* Manipulate/generate seeds, keys, addresses.
* Convert between rai units, e.g. Nano to MicroNano. 
* A wallet that supports private keys, seeds and mnemonic phrases.
* Decode and print network capture (pcapng) files.
* RPC client. (WIP)

### Rust crate

Feeless can be used by developers as a Rust crate.

* Please see the [Rust crate documentation](https://docs.rs/feeless/) for information.

### Nano node

This is a work in progress.

Can connect and communicate. No voting, storage, chain validation, etc.

| Feature | Progress | Notes |
| --- | --- | --- |
| Node | 20% | Can connect and communicate. No voting, storage, chain validation, etc. |

<sup>1. `feeless pcap [file.pcapng]` can dump a capture file and dissect the packets. There are additional arguments you
can see with `--help`. To do this as successfully as possible, capture with Wireshark, set the filter to `nano`
, `File -> Export Specified Packets`, make sure `Displayed` is selected.
</sup>


## What is Nano?

**Nano** is digital money that significantly improves on **Bitcoin** and other cryptocurrencies.

The main features of **Nano** are:

* No transaction fees.
* Extremely fast to send money—less than 1 second for 100% confirmation.

  <sup>
    Bitcoin takes 10 minutes on average for ~80%<sup>1</sup> confirmation.
    Nano is more asynchronous than Bitcoin—individual transactions are voted on separately from the rest of the network.
  </sup>
* Highly decentralized.

  <sup>Using the Nakamoto coefficient measurement, it is more decentralized than Bitcoin<sup>2 3</sup>.</sup>
* No inflation.
* Green—Massively less energy use than Bitcoin.

For more information on what Nano is, see the Nano documentation: https://docs.nano.org/what-is-nano/overview/

Nano is also known as: Nano cryptocurrency, Nano coin, RaiBlocks.

<sup>
1. The Bitcoin white paper, under section 11 "Calculations" explains there's a ~80% chance for an attacker with 10% mining power to overtake the longest chain. https://bitcoin.org/bitcoin.pdf
2. Measuring Decentralization in Bitcoin and Ethereum using Multiple Metrics and Granularities https://arxiv.org/pdf/2101.10699.pdf
3. List of representative nodes showing a Nakamoto coefficient of 8 at the time of writing (2021-02) https://nanocharts.info/

</sup>
