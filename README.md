# Seaport implementation

[Seaport](https://github.com/ProjectOpenSea/seaport) is a marketplace protocol for safely and efficiently buying and selling NFTs. This is an example implementation for educational purpose.

## Installation

To interact with the protocol you need to have a web3-provider installed, like MetaMask.

First, clone this repository:

```bash
git clone https://github.com/JasperAlexander/seaport-implementation.git
```

Then, in your project, install the dependencies:

```bash
yarn install
# or
npm install
```

## Getting Started

### Hardhat

First, compile the contracts:

```bash
npx hardhat compile
```

Then, spin up an instance of Hardhat Network:

```bash
npx hardhat node
```

Finally, deploy the contracts to the instance of Hardhat Network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Frontend

First, run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome. Feel free to ask questions at the Discussions tab.
