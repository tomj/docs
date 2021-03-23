---
title: Introduction
slug: /
---

## What is Feeless?

**Feeless** is a **Nano** cryptocurrency node, wallet, tools, and Rust crate. This is not the official project for Nano,
only an implementation written in Rust.

🚸 This is a work in progress. The API will probably change without notice until `v0.2`. 🚸

I decided to start this project as a personal adventure of understanding Nano. I give no promises about my future
motivation to complete this project 🤐.

* [What is Nano?](/docs/overview/what-is-nano)
* [Official Nano implementation](https://github.com/nanocurrency/nano-node)

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
* Convert between rai units, e.g. nano to micronano. 
* A wallet that supports private keys, seeds and mnemonic phrases.
* Decode and print network capture (pcapng) files.
* RPC client. (WIP)

### Rust crate

Feeless can be used by developers as a Rust crate.

Please see the [Rust crate documentation](https://docs.rs/feeless/) for information.

### Nano node

This is a work in progress.

Can connect and communicate. No voting, storage, chain validation, etc.
