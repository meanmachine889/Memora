# Web3 NFT Membership Platform

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
- **Blockchain:** Solidity, Ethers.js, Smart Contracts (Ethereum/Solana compatible)
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

