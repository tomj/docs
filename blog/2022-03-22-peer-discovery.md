---
slug: 2021-03-22-welcome
title: How does peer discovery work?
author: gak
author_url: https://github.com/gak
author_image_url: https://avatars0.githubusercontent.com/u/31338?s=400&v=4
tags: []
---

When a Nano node spins up for the first time, it has to work out which peers it connects to.

Fortunately there's a domain
nodes look up for the first time called `peering.nano.org`. Presumably it is owned by the Nano Foundation.

This domain resolves to multiple A records:

```asm
peering.nano.org.       0       IN      A       139.59.31.249
peering.nano.org.       0       IN      A       95.217.104.44
peering.nano.org.       0       IN      A       45.79.207.119
peering.nano.org.       0       IN      A       31.171.245.217
peering.nano.org.       0       IN      A       174.138.4.198
peering.nano.org.       0       IN      A       172.105.228.96
peering.nano.org.       0       IN      A       37.120.187.138
peering.nano.org.       0       IN      A       139.180.168.194
```

Each one of these are a Nano node. Looking into these IP addresses, they belong to several different ISPs: Digital Ocean, Hetzner, Linode, CloudSigma, netcup and Choopa.
On top of that they are located all around the world: India, Finland, United States, Switzerland, Netherlands, Japan, Germany and Australia.

It looks very well distributed for new nodes to start with.

The nice thing about this set up is that the Nano Foundation can easily update any
new initial nodes to their liking without having to create a new node release.
