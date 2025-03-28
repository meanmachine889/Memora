# Memora - Web3 NFT Membership Platform

## Overview
This project tokenizes memberships as NFTs, allowing users to own, trade, and transfer their subscriptions without relying on banks or middlemen. Built with **Next.js, Wagmi, ethers.js, and Prisma**, the platform ensures decentralized access control for memberships.

## Features
- **NFT-Based Memberships** – Users can mint, transfer, and trade memberships as NFTs.
- **Seamless Web3 Authentication** – Connect wallet using WalletConnect or MetaMask.
- **On-Chain Verification** – Smart contracts handle membership validation.
- **Decentralized & Permissionless** – No centralized authority; memberships are user-controlled.

## Tech Stack
- **Frontend:** Next.js, React, TailwindCSS, Wagmi
- **Backend:** Prisma, PostgreSQL (NeonDB), Vercel Serverless Functions
- **Blockchain:** Solidity, Ethers.js, Smart Contracts (Ethereum compatible)
- **Hosting:** Vercel

## Installation & Setup
### Prerequisites
- Node.js (v18+)
- MetaMask or WalletConnect-enabled wallet
- PostgreSQL database (NeonDB recommended)
- Ethereum/Solana testnet wallet for contract interactions

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/web3-membership-platform.git
   cd web3-membership-platform
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables** (create a `.env` file)
   ```env
   DATABASE_URL=your_postgres_database_url
   NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_smart_contract_address
   ```
4. **Run Prisma migrations**
   ```sh
   npx prisma migrate dev
   ```
5. **Start the development server**
   ```sh
   npm run dev
   ```

## Smart Contract
The NFT Membership contract is deployed on **Ethereum/Solana** and handles:
- Minting new memberships
- Validating active memberships
- Enabling transfers

Contract Address: `0xYourContractAddress`

## Deployment
Deployed on **Vercel**. If deploying manually, ensure Prisma generates the latest client:
```sh
prisma generate && npm run build
```

## Roadmap
- Add support for more chains (Polygon, Solana, Base)
- Introduce tiered memberships
- Enable on-chain subscription renewals

## Contributing
Feel free to open an issue or a pull request. Always happy to collaborate!

## License
MIT License.

