# Solana SPL Token Learning Project

This repository is dedicated to exploring and implementing Solana SPL Token concepts.

- **Initializing a Mint**: Created a script to initialize a new SPL Token mint on the Solana devnet using `@solana/web3.js` and `@solana/spl-token`.
- **Wallet Configuration**: Dynamically loaded the wallet configuration from the `.config/solana/id.json` file for secure and portable access.
- **Connection to Solana Devnet**: Established a connection to the Solana devnet with a `confirmed` commitment level.
- **Mint Creation**: Implemented logic to create a new mint with specified parameters such as mint authority and decimals.

## Key Concepts Covered

- **Mint Account**: Creates and manages token supply.
- **Token Account**: Holds token balances.
- **Associated Token Account (ATA)**: Standard token account derived from wallet address.