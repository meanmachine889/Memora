# Memora - Web3 NFT Membership Platform

## Overview

Memora is a decentralized platform that tokenizes memberships as NFTs, allowing users to **own, trade, and transfer subscriptions** without relying on banks or middlemen. Built using **Next.js, Wagmi, ethers.js, and Prisma**, Memora leverages smart contracts to ensure seamless **on-chain membership management** with full user control.

## Steps to Use the Platform

1. **Connect your wallet** – Use MetaMask or WalletConnect.
2. **Go to the Dashboard** – Navigate through the platform.
3. **Go to "My Content" from the sidebar** – Manage your courses.
4. **Add your course** – Enter course details.
   - **Thumbnail and Content expect image URLs** (Unsplash recommended).
5. **Go to your course** – View and manage its details.
6. **Deploy it to the blockchain** – Register your course as an NFT membership.
7. **After deployment, add a new NFT**:
   - Data is uploaded to **IPFS**.
   - Ensure the **image size** isn't too large.
   - **Duration** is the number of days for the membership.
8. **Mint the NFT**:
   - If the receiver field is empty, the NFT will be minted to your wallet.
9. **Logout using sidebar and use the account that received the NFT**:
   - Membership status and **expiry date** will be visible.
   - NFT ID is displayed.
   - To view it in MetaMask wallet, **import the NFT**:
     - Copy the **course contract address**.
     - Enter the **NFT ID**.
10. **Transfer the NFT to another account**:
    - The **remaining membership duration** is transferred.
    - The sender **loses access** to the membership.

## Features

- **NFT-Based Memberships** – Users can mint, own, and transfer memberships as NFTs.
- **Seamless Web3 Authentication** – Wallet connection via MetaMask.
- **On-Chain Verification** – Memberships are validated directly on the blockchain.
- **Decentralized & Permissionless** – No centralized authority; users have full control over their memberships.
- **IPFS-Powered Data Storage** – Content and NFT metadata are stored on IPFS.
- **Transferable Subscriptions** – Users can transfer their NFT to another account, passing on the remaining membership duration.

## Tech Stack

- **Frontend:** Next.js, React, TailwindCSS, Wagmi
- **Backend:** Prisma, PostgreSQL (NeonDB), Vercel Serverless Functions
- **Blockchain:** Solidity, Ethers.js, Smart Contracts (Ethereum compatible, Foundry-based ERC-721 implementation)
- **Hosting:** Vercel

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- MetaMask or WalletConnect-enabled wallet
- PostgreSQL database (NeonDB recommended)
- Ethereum testnet wallet for contract interactions

### Steps

1. **Clone the repository**
   ```sh
   git clone https://github.com/meanmachine889/Memora.git
   cd Memora
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables** (create a `.env` file)
   ```env
   DATABASE_URL=postgresql://your_username:your_password@your_database_url/neondb?sslmode=require
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_API_KEY=your_pinata_secret_api_key
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

The NFT Membership contract is deployed on **Ethereum** and handles:

- Minting new memberships
- Validating active memberships
- Enabling transfers

Contract Address: `0x10Eb33fE55069795b56Fbff78628b9ee7621319c`

## Deployment

Deployed on **Vercel**. If deploying manually, ensure Prisma generates the latest client:

```sh
prisma generate && npm run build
```

