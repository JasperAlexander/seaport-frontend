# Seaport implementation (frontend)

[Seaport](https://github.com/ProjectOpenSea/seaport) is a marketplace protocol for safely and efficiently buying and selling NFTs. This is the frontend of an example implementation for educational purpose.

## Installation

1. Install [seaport-backend](https://github.com/JasperAlexander/seaport-backend).

2. Install a web3-provider, like [MetaMask](https://github.com/MetaMask/metamask-extension).

3. Open a [Command Line Interface (CLI)](https://en.wikipedia.org/wiki/Command-line_interface) and clone this repository:

```bash
git clone https://github.com/JasperAlexander/seaport-implementation.git
```

4. Inside the repository, run the following command to install the dependencies:

```bash
yarn install
```

## Getting Started

### Backend

1. Run [seaport-backend](https://github.com/JasperAlexander/seaport-backend).

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

Contributions are welcome. There are some todos in the code. Feel free to ask questions at the Discussions tab.
