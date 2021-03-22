---
slug: 2021-03-23-nano-peer-discovery
title: How does Nano's peer discovery work?
author: gak
author_url: https://github.com/gak
author_image_url: https://avatars0.githubusercontent.com/u/31338?s=400&v=4
tags: []
---

Recently [@gurghet](https://github.com/gurghet) added the [initial peering code](https://github.com/feeless/feeless/pull/15)
(explained below), which previously was a single node
you had to enter in. I was setting it to `localhost` initially when working on the node implementation.

When a Nano node spins up for the first time, it has to work out which peers it connects to. Fortunately there's a domain
nodes look up for the first time called `peering.nano.org`. Presumably the domain is owned by the Nano Foundation.

This domain resolves to multiple `A` records:

```commandline
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

I'm guessing these are nodes controlled by NF, or it could just be hand picked principal representatives, etc.

It looks very well distributed for new nodes to start with. If there's a problem with any of these cloud providers or
country's Internet, a node can easily still start synchronizing with the other nodes.

A neat thing about set up is that the Nano Foundation can easily update any
new initial nodes to their liking without having to create a new node release. They just need to update the DNS record.

Once a node is connected to a peer, and an exchange of handshakes happen, the peer sends more peers to that node via the `Keepalive` message, seen below:

```commandline
feeless.exe node -o 139.180.168.194:7075

Mar 23 09:48:43.999  INFO feeless::node: Spawning a channel to 139.180.168.194:7075
Mar 23 09:48:44.029 DEBUG send_handshake:send: feeless::node::controller: OBJ Header { magic_number: 0x52, network: Live, version_max: V18, version_using: V18, version_min: V18, message_type: Handshake, ext: [Query] }
Mar 23 09:48:44.029 DEBUG send_handshake:send: feeless::node::controller: OBJ HandshakeQuery(Cookie(C3FB9659AAF90E371A1B356B47F8C00A1D50276BC08B6EFD0F75F5C9ABCBA869))
Mar 23 09:48:44.088 DEBUG feeless::node::controller: Handshake { query: Some(HandshakeQuery(Cookie(4FD7DFF75EF17B38490E3526D5D05AD625BDD4324E2AEFC62C7B05A56484BC7F))), response: Some(HandshakeResponse { public: Public(46997A6BB19A196BCC7852DD0DC5CFDD0A8FBBACCD7800607288E0E82BC591F7 nano_1jnshbou58isfh89inpx3q4wzqacjyxtsmdr13i97491x1owd6hqy7wdttdx), signature: B8DD2E74EBF201C1996CF98E20A234244D63B44C5D1E34BE483F4F68A8EC
FE228E9C81F063FEDCD21922EC8E7C748BD4F6C47E1F18F8F1DE9E107CEA4411B40D }) }
Mar 23 09:48:44.090 DEBUG send: feeless::node::controller: OBJ Header { magic_number: 0x52, network: Live, version_max: V18, version_using: V18, version_min: V18, message_type: Handshake, ext: [Response] }
Mar 23 09:48:44.090 DEBUG send: feeless::node::controller: OBJ HandshakeResponse { public: Public(CBE85E50353C700AE846E7F945B96021C73F9F2A0BA16C64E8DF0CE6FC47BEB7 nano_3kzadsa5ch5i3dn6fszsapwp1ag99yhkn4x3fjkgjqrewuy6hhoqyu8ds1sf), signature: 31DF62EB8047D7BDD36446E7510F4CFCDB53057825A99E88818052B1876BE17BA89F692A8A3399A5A6B9E6191FF0C54A4B84148821B79362E0633DBEA0940F05 }
Mar 23 09:48:44.185 DEBUG feeless::node::controller: ConfirmReqByHash([RootHashPair { hash: BlockHash(0C0DA8F4F267366B2AC1F4951F662651DB3A5BDC9AB6958BB578D42069011E4C), root: BlockHash(9A89B4D1E74DE9C6396EC5CB10137A769E3B1DF80235C65E00D4A8ED0FD39BF0) }])
Mar 23 09:48:44.256 DEBUG feeless::node::controller: Keepalive([Peer([::]:7075), Peer([::ffff:67.205.189.200]:7075), Peer([::ffff:139.59.181.118]:7075), Peer([::ffff:66.175.210.21]:7075), Peer([::ffff:161.97.136.129]:7075), Peer([::ffff:159.89.105.75]:7075), Peer([::ffff:192.145.44.231]:7075)])
```

The message sends up to 8 peers back to the node, from there it can keep adding peers and so on.
