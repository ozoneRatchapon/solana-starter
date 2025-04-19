# Solana Web3 Development Journey

This repository documents my journey through building Web3 applications on Solana. It showcases various implementations from basic wallet interactions to more complex operations with SPL tokens and NFTs.

## Key Components

### SPL Tokens
- **Token Initialization**: Created a new SPL Token mint on Solana devnet with customizable parameters
- **Token Minting**: Implemented token minting functionality to create new token supply
- **Token Transfers**: Built functionality for transferring tokens between wallets
- **Token Metadata**: Added metadata to tokens, enhancing their on-chain representation

### NFTs (Non-Fungible Tokens)
- **Image Upload**: Uploaded NFT images to Irys (formerly Bundlr) for permanent decentralized storage
- **Metadata Creation**: Established proper NFT metadata following Metaplex standards
- **NFT Minting**: Implemented full NFT minting process including creation of master editions

### Vault Operations (WBA Vault Program)
- **Initialization**: Work in progress - Set up to initialize vault storage for assets
- **Deposit & Withdraw**: Framework for managing both SOL and SPL tokens in the vault
- **NFT Management**: Structure for depositing and withdrawing NFTs from the vault

## Technical Implementation

- Used **@solana/web3.js** for core blockchain interactions
- Leveraged **@solana/spl-token** for token operations
- Integrated with **Metaplex** libraries for NFT functionality
- Implemented **Irys** (formerly Bundlr) for decentralized storage
- Utilized **Anchor** framework for program interactions

## Development Progress
- ✅ Successfully created SPL tokens with metadata
- ✅ Successfully minted NFTs with custom images and metadata
- 🔄 Continuing work on vault interactions for asset management

## Security Considerations
- Implemented secure wallet file handling
- Used environment variables and proper path construction for wallet configuration
- Maintained clean separation between different operational aspects

## Repository Structure
The repository is organized into different modules focusing on specific blockchain operations, making it a comprehensive reference for Solana development techniques.
