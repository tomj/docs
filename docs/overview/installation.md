---
title: Installation
slug: /overview/installation
---

## Methods

You can use/install feeless by:

- [Downloading and installing a binary.](#binary)
- [Installing via Homebrew (macOS).](#homebrew-macos)
- [Using the Docker image.](#docker)
- [Compiling from source.](#source)

## Binary

The latest release is on the project [Github page under releases](https://github.com/feeless/feeless/releases/).

Download the one appropriate to your operating system and optionally place the binary in your system path.

## Homebrew (macOS)

Install [Homebrew](https://brew.sh/) if you don't already have it, then:

```shell
> brew install feeless/brew/feeless
```

You can see [the Homebrew formula here](https://github.com/feeless/homebrew-brew).

## Docker

There is a [Docker image](https://hub.docker.com/r/feeless/feeless) built for each release specified by the release
version (e.g. `0.1.5`) or `latest` (by default) for the last release.

You can access the cli directly, for example generating a new phrase:

```shell
> docker run feeless/feeless seed new --language ko
교과서 도중 방울 김포공항 미인 부상 금연 상황 식료품 흥분 비율 유난히 차남 분홍색 본부 대낮 안내 평생 어젯밤 당연
히 창고 과정 변화 그늘
```

Running a node in the background with a named instance and open ports, RPC to localhost only:

```shell
> docker run --name feeless -d -p 0.0.0.0:7075:7075 -p 127.0.0.1:7076:7076 feeless/feeless node
```

Then tail the logs:

```shell
> docker logs -f feeless
```

There is also an image released for every commit on the `main` branch for the latest alpha version.

You can see a [list of Docker tags here](https://hub.docker.com/r/feeless/feeless/tags).

## Source

You can install the binary from source using a <a href="https://www.rust-lang.org/">Rust</a> tool called `cargo`.
`cargo` is installed via `rustup`.

1. Install <a href="https://rustup.rs/">rustup</a> (which installs `cargo`).
2. Download or check out the <a href="https://github.com/feeless/feeless/">source code</a>.
3. Go into the directory and run `cargo install`.
4. This will take a while to build, then will be installed in the <a
   href="http://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/second-edition/ch14-04-installing-binaries.html">rust binary path</a>.

In the near future there will be a binary available from the Github releases page.
