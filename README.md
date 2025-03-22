# Revolutionary Farmers Web

**Revolutionary Farmers** is a Next.js project focused on advancing agriculture by providing a platform with escrow services. This project aims to bring innovative solutions to farmers, suppliers, and buyers in the agriculture sector by ensuring secure transactions through escrow as a service.

## ✨ Features

- **Escrow Service:** Secure, blockchain-based transactions for agriculture.
- **User Authentication:** Secure user accounts with form validation and protected routes.
- **Product Listings:** Farmers, suppliers, and buyers can list, browse, and manage agricultural products.
- **Transaction History:** Comprehensive record-keeping for past transactions.
- **Responsive Design:** Optimized for mobile, tablet, and desktop use.

## 📝 Prerequisites

Ensure you have **Node.js** installed (version 18.x or higher).  
To verify the installed version, use the following command:

```bash
  node -v
```

If Node.js is not installed, download it from the official [Node.js website](https://nodejs.org).

## 🚀 Getting Started

1. Clone the Repository:

```bash
  git clone https://github.com/your-username/Revo-Frontend.git
  cd Revo-Frontend
```

2. Install dependencies:

```bash
  npm install
```

3. Run development server:

```bash
  npm run dev
```

4. Open the Application:
Navigate to [http://localhost:3001](http://localhost:3001) in your browser to view the application.

Available Commands:

- `npm run dev` - Start the development server on [http://localhost:3001](http://localhost:3001) with live reload enabled.
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to lint code.
- `npm run format` - Format code with Prettier

## 🛠 Tech Stack

- [Next.js](https://nextjs.org) (v14.2.14) - React framework
- [React](https://reactjs.org) (v18) - JavaScript library for building user interfaces
- [React Hook Form](https://react-hook-form.com) (v7.53.0) - Form handling library
- [Radix UI](https://www.radix-ui.com) - Headless UI components
- [TailwindCSS](https://tailwindcss.com) (v3.4.1) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org) (v5.6.3) - Type-safe JavaScript
- [Styled Components](https://styled-components.com) (v6.1.13) - CSS-in-JS solution
- [Zod](https://zod.dev) (v3.23.8) - Type-safe schema validation
- [Zustand](https://zustand-demo.pmnd.rs) (v5.0.0-rc.2) - Small, fast, and scalable state management
- [Axios](https://axios-http.com) (v1.7.7) - Promise-based HTTP client
- [Lucide React](https://lucide.dev) (v0.447.0) - React icons library
- [clsx](https://github.com/lukeed/clsx) (v2.1.1) - Utility for constructing `className` strings conditionally
- [Prettier](https://prettier.io) (v3.3.3) - Code formatter
- [ESLint](https://eslint.org) (v8.57.1) - Linting tool for JavaScript/TypeScript
- [PostCSS](https://postcss.org) (v8) - CSS tool for transforming styles
- [Freighter API](https://github.com/stellar/freighter) - API for interacting with Stellar blockchain wallets
- [Stellar SDK](https://stellar.github.io/js-stellar-sdk) (v12.3.0) - JavaScript library for Stellar blockchain

## 🌱 Migration from Mono Repository

This repository represents the frontend codebase for the Revolutionary Farmers platform, following its separation from the original [Revolutionary_Farmers](https://github.com/Crypto-Jaguars/Revolutionary_Farmers) mono repository. This migration enables streamlined development, focused improvements, and better maintainability for the user interface and client-side features.

## 👥 Contributors

We welcome contributions to make this platform even better. If you'd like to contribute:

1. Fork the repository.

2. Create a feature branch:

```bash
  git checkout -b feature/your-feature-name
```

3. Commit your changes and push to your branch:

```bash
  git commit -m "Add your message here"
  git push origin feature/your-feature-name
```

4. Open a pull request and provide a detailed description of your changes.

## Development

This project uses pnpm as the package manager. Make sure to have pnpm installed before proceeding.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start
```
