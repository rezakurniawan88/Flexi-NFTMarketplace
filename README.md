# Flexi : NFT Marketplace

Flexi is a decentralized NFT marketplace built with modern web3 technologies, allowing users to mint, buy, sell, and manage NFTs seamlessly.

![Flexi NFT Marketplace Preview](/public/preview/homepage.png)


## 🚀 Features

- Home Page (List All NFTs)
    - Browse all NFTs in a responsive layout
    - Display NFT metadata: name, image, price, owner, and status

- Wallet Authentication
    - Register/Login using Web3 Wallets via RainbowKit integration
    - Supports MetaMask, Coinbase Wallet, WalletConnect, and more
    - Session management with Next-Auth

- NFT Creation
    - Mint new NFTs with image/file upload using IPFS (Pinata)
    - Custom metadata fields: name, description, attributes
    - ERC-721 standard compliance with preview before minting

- NFT Management
    - Change NFT status (For Sale/Not for Sale)
    - Update listing price with transaction confirmation
    - Owner-only controls with wallet verification

- NFT Purchases
    - Buy NFTs directly with crypto wallet
    - Integrated with Ethers.js and Wagmi for secure transactions


## 💻 Tech Stack

**Core Framework**
- Next.js (App Router) - Full-stack framework

**Blockchain Integration**
- Ethers.js - Smart contract interactions
- Wagmi & Viem - React hooks for Ethereum
- RainbowKit - Wallet connection UI

**Backend & Database**
- Prisma - ORM for database management
- PostgreSQL - Relational database (recommended)

**Web3 Storage**
- Pinata/IPFS - NFT metadata and file storage

**UI & Styling**
- shadcn/ui - Accessible UI components
- Tailwind CSS - Utility-first styling

**State & Data**
- TanStack React Query - Server state management
- Zustand - Client state management

**Authentication**
- Next-Auth - Authentication framework
- Web3 wallet-based sessions

## 🛠️ Installation

1. Clone repository:
   ```bash
   git clone https://github.com/rezakurniawan88/Flexi-NFTMarketplace.git
   cd Flexi-NFTMarketplace
   ```

2. Install dependencies :
   ```bash
   npm install
   ```

3. Env configuration :
    ```bash
    cp .env.example .env
    ```

4. Setup environment variables
    ```bash
    You must have :
    1. Supabase database
    2. Pinata account
    3. Infura account
    ```

5. Database setup :
    ```bash
    npx prisma migrate dev
    ```

6. Run development server :
    ```bash
    npm run dev
    ```

7. Open http://localhost:3000 in your browser to see the application.