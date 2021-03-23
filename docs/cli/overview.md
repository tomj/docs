---
title: Overview
slug: /cli/overview
---

## Overview

Feeless is a feature packed binary including a powerful command-line interface.

A few examples:

```commandline
> feeless wallet new seed --file gak.wallet
2B2B95123A375400F5D29EA03F180884D073B4D5DE06EF7D4674DF7E7DD1382A

> export FEELESS_WALLET_ID=2B2B95123A375400F5D29EA03F180884D073B4D5DE06EF7D4674DF7E7DD1382A
> export FEELESS_WALLET_FILE=gak.wallet
> feeless wallet address
nano_16pypp9o33xd4be8pjcjaneq5sicz7s857n51wc7h8w6s3p5tkihc5jsp6o8

> feeless unit rai nano 12345
0.000000000000000000000000012345
```

## Installation

See the [Installation](/docs/overview/installation) on how to install the Feeless tool.

## Logging  

To enable debug logging, you can set the `RUST_LOG` environment variable:

```commandline
export RUST_LOG=feeless=debug
```

Depending on the command, it will print additional information about its task. Logging is especially useful for the node and packet dump commands.
