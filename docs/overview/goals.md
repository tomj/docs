---
title: Goals
slug: /overview/goals
---

## General

* Correctness before performance.
* Well documented.

## Rust crate

* A complete library that a Rust developer can use to handle wallets, keys, blocks, signing, proof of work, etc.

## Tools

* A command line tool for particular actions, e.g. generating seeds, conversions between keys, addresses, etc.
* A command line client for the official Nano RPC server.

## Nano node

* A functional Nano node with business logic from the official C++ implementation.
* Correct rebroadcasting rules
* Representative voting
* Bootstrapping
* It has to perform well enough to help the network. I don't want Nano to slow down if people start using this! 🤦‍♀️

## Non-goals

* Only support protocol v18+ (Maybe only v19+ depending on timing)
* No UDP support
* No user interface
