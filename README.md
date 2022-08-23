![openfish-logo-1](https://user-images.githubusercontent.com/84851956/186010813-a67bc95d-11f7-4af9-a907-806b9159618d.png)

# Seaport implementation (frontend)

[Seaport](https://github.com/ProjectOpenSea/seaport) is a marketplace protocol for safely and efficiently buying and selling NFTs. This is the frontend of an example implementation for educational purpose. The implementation also includes a [backend](https://github.com/JasperAlexander/seaport-backend).

The frontend is written in [Typescript](https://github.com/microsoft/TypeScript) and uses [Next.js](https://github.com/vercel/next.js) as framework. The packages that are being used include [Hardhat](https://github.com/NomicFoundation/hardhat) (Ethereum development environment), [Vanilla-extract](https://github.com/seek-oss/vanilla-extract) (styling), [Zustand](https://github.com/pmndrs/zustand) (global state management), [SWR](https://github.com/vercel/swr) (database fetching) and [Wagmi](https://github.com/wagmi-dev/wagmi) (blockchain fetching).

## Installation

1. Install [seaport-backend](https://github.com/JasperAlexander/seaport-backend).

2. Install a web3-provider, like [MetaMask](https://github.com/MetaMask/metamask-extension).

3. Open a [Command Line Interface (CLI)](https://en.wikipedia.org/wiki/Command-line_interface) and clone this repository:

```bash
git clone https://github.com/JasperAlexander/seaport-frontend.git
```

4. Inside the repository, run the following command to install the dependencies:

```bash
yarn install
```

## Getting Started

1. Run [seaport-backend](https://github.com/JasperAlexander/seaport-backend).

2. Open a new CLI. Compile the Seaport marketplace contracts:

```bash
npx hardhat compile
```

3. Spin up an instance of Hardhat Network:

```bash
npx hardhat node
```

4. Open a new CLI. Deploy the contracts to the instance of Hardhat Network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

5. Run the development server:

```bash
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the example implementation of the Seaport marketplace protocol.

## Contributing

Contributions are very welcome. Feel free to ask questions at the Discussions tab or reach out to one of the contributors.
