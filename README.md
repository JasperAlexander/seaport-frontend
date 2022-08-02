![seaport-implementation-explore](https://user-images.githubusercontent.com/84851956/179821158-75fc5c8b-7338-42e2-80b4-1cf2ac6a2fba.png)

![seaport-implementation-profile](https://user-images.githubusercontent.com/84851956/179821174-1e4b4b37-8e90-412c-867f-be8c6ead34a5.png)

# Seaport implementation

[Seaport](https://github.com/ProjectOpenSea/seaport) is a marketplace protocol for safely and efficiently buying and selling NFTs. This is an example implementation for educational purpose.

## Installation

1. Install a web3-provider, like [MetaMask](https://github.com/MetaMask/metamask-extension).

2. Open a [Command Line Interface (CLI)](https://en.wikipedia.org/wiki/Command-line_interface) and clone this repository:

```bash
git clone https://github.com/JasperAlexander/seaport-implementation.git
```

3. Inside the repository, run the following command to install the dependencies:

```bash
yarn install
```

## Getting Started

### Hardhat

1. Compile the Seaport marketplace contracts:

```bash
npx hardhat compile
```

2. Spin up an instance of Hardhat Network:

```bash
npx hardhat node
```

3. Open a new CLI. Deploy the contracts to the instance of Hardhat Network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Frontend

1. Run the development server:

```bash
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the example implementation of the Seaport marketplace protocol.

## Contributing

Contributions are welcome. Feel free to ask questions at the Discussions tab.

## To do

- [ ] Clean the code
- [ ] Add event based asset state
- [ ] Add auctions
- [ ] Add lazy minting
- [ ] More...
