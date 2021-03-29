---
slug: 2021-03-29-send-block-lifecycle
title: Send block lifecycle
author: gurghet
author_url: https://github.com/gurghet
author_image_url: https://avatars.githubusercontent.com/u/420735?v=4
tags: [reference]
---

## How does a send block get memorized in the Nano network
> A bystander look at the C++ reference implementation

I've spent some time looking at the Nano current reference implementation. The codebase is huge so it wasn't an easy task. I wanted to focus on a precise question: what is the lifecycle of a send block? These are my findings.

### Conception
Since this piece will be about a send block, everything about creating a new chain is out of scope. Let's imagine a user wants to send some raws. My node will create a message with a header similar to this:
```
...
network: live
protocol version: 19
message type: publish
extensions:
  block type: send
```
I will pretend a random user with a balance of 700 raw wants to send 10 raw.
If we drill into the block information we'll find something like this:
```
previous: BBE55A35F79F887...
link/destination: 9A2726664A18FE5...
balance: 690
work: 14b3bc748f2c8e93
signature: B421B88AFBEDFC...
```
The balance is 690 raw because it was 700 and I'm sending 10 raw.
The node then will send this message to its peers. 
### Another node receive the message
For each peer there is an already established TCP connection and after a message is processed a new message listener is created.
This is how the listener is installed in `bootstrap_server.cpp:151`

``` c++
void nano::bootstrap_server::receive ()
{
    // ...
	socket->async_read (receive_buffer, 8, [this_l](boost::system::error_code const & ec, size_t size_a) {
		// ...
		// Receive header
		this_l->receive_header_action (ec, size_a);
	});
}
```

Which will put whatever we receive through the TCP connection into the `receive_buffer`.
The function `receive_header_action` is immediately after and reads like this

``` c++
void nano::bootstrap_server::receive_header_action (boost::system::error_code const & ec, size_t size_a)
{
	if (!ec)
	{
		// ...
		nano::bufferstream type_stream (receive_buffer->data (), size_a);
		auto error (false);
		nano::message_header header (error, type_stream);
		if (!error)
		{
			auto this_l (shared_from_this ());
			switch (header.type) {...}
		}
	}
	else
	{
		 // error management ...
	}
}
```

What happens above is that the head of the `receive_buffer` is assigned to `type_stream` and `type_stream` is used to instanciate a `message_header` class. The logic in the constructor will deserialize the stream and, in particular, will fill the `header.type` attribute. This is because, provided no error happened, the next thing we do will depend on the `header.type` (the switch construct). Let's see the case for a publish message.
``` c++
case nano::message_type::publish:
{
	socket->async_read (receive_buffer, header.payload_length_bytes (), [this_l, header](boost::system::error_code const & ec, size_t size_a) {
		this_l->receive_publish_action (ec, size_a, header);
	});
	break;
}
```
It's installing another listener, on the same buffer. The handler will call the `receive_publish_action` function in the same file, which validates the work in the carried block. It then adds the message to the `requests` deque. This will be ultimately processed by the `request_response_visitor` which in turn puts the message into the `entries` deque of the `tcp_message_manager`.
### Processing message entries
At this point the `network` class enters the stage. When initialized, this class runs the `process_messages` loop at `tcp.cpp:279`.
``` c++
void nano::transport::tcp_channels::process_messages ()
{
	while (!stopped) // while we are not shutting down the node
	{
		auto item (node.network.tcp_message_manager.get_message ());
		if (item.message != nullptr)
		{
			process_message (*item.message, item.endpoint, item.node_id, item.socket, item.type);
		}
	}
}
```
Internally the `process_message`, makes sure we have a channel open with the message originator. Then it creates a `network_message_visitor` relative to the channel and processes the publish message according to the following function in `network.cpp`:
``` c++
void publish (nano::publish const & message_a) override
{
	// ... logging and monitoring logic ...
	if (!node.block_processor.full ())
	{
		node.process_active (message_a.block);
	}
	// ...
}
```
where `process_active` adds the block inside the message to both the `block_arrival` and the `block_processor`. The latter is responsible for putting the block into the `block` dequeue.
### Block processing
Whenever a `node` class is instantiated it spawns a block processor thread. This thread has an infinite loop in `blockprocessor.cpp` inside the function `process_blocks`. This starts a transaction that, after acquiring various locks, processes a batch of blocks. The processing of a single block is defined in the `process_one` function and relies on a `ledger_processor` defined in `ledger.cpp`, at least for the send block we're interested in.

The full logic can be found in `ledger.cpp` in the `send_block` function. At its core it's a pyramid of ifs which try to account for all possible things that might go wrong. For example if the work of of the block is sufficient (note that we already checked this when we received the block from another node).

At the top of the pyramid we finally execute the instruction
``` c++
ledger.store.block_put (transaction, hash, block_a);
```

which physically adds the block to the permanent storage.

### Conclusion

This is not the end of the life of this block. In fact it would terminate when the block is cemented. Cementing is a different process that involves consensus, thus the block could be even be deleted if, for example was detected as a double spend. I'll write about this in another article.
