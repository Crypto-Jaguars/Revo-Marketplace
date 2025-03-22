# Revolutionary Farmers Marketplace

**Revolutionary Farmers** is a Next.js-powered marketplace platform designed to revolutionize agricultural transactions using Stellar blockchain technology. Our platform connects farmers directly with buyers, ensuring secure, transparent, and efficient transactions through USDC payments and escrow services.

![Revolutionary Farmers](public/images/logo-dark.svg)

## ✨ Key Features

- **Blockchain-Powered Marketplace:** Secure transactions using Stellar blockchain and USDC stablecoin
- **Multi-Payment Options:** Pay with USDC via MoonPay, Stellar wallet connection, or QR code
- **Address Book Management:** Save and manage multiple shipping addresses
- **Order Management:** Complete tracking from placement to delivery
- **Multi-language Support:** Fully localized for English and Spanish users
- **Responsive Design:** Optimized for all devices from mobile to desktop

## 📝 Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (preferred package manager)

Verify your Node.js version:
```bash
node -v
```

Install pnpm if not already installed:
```bash
npm install -g pnpm
```

## 🚀 Getting Started

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/Revo-Marketplace.git
cd Revo-Marketplace
```

2. **Install Dependencies:**
```bash
pnpm install
```

3. **Run Development Server:**
```bash
pnpm dev
```

4. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Available Commands

- `pnpm dev` - Start development server with hot reloading
- `pnpm build` - Build production-ready application
- `pnpm start` - Run production build
- `pnpm lint` - Run ESLint to check code quality
- `pnpm format` - Format code with Prettier

## 🛠️ Technology Stack

### Core Framework
- **Next.js 14+** - React framework with App Router and Server Components
- **TypeScript** - Type-safe JavaScript development
- **React 18** - UI library with hooks and concurrent rendering

### UI Components & Styling
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled components
- **Lucide React** - Modern icon library
- **Framer Motion** - Animation library
- **Styled Components** - CSS-in-JS solution

### State Management & Form Handling
- **Zustand** - Lightweight state management
- **React Hook Form** - Form validation and handling
- **Zod** - TypeScript-first schema validation

### Internationalization & Localization
- **next-intl** - Complete i18n solution for Next.js

### Blockchain Integration
- **Stellar SDK** - JavaScript SDK for Stellar blockchain
- **Freighter API** - API for Stellar wallet integration

### API & Utilities
- **Axios** - Promise-based HTTP client
- **Sonner** - Toast notification library
- **clsx/tw-merge** - Utility for conditional class names

## 🌐 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Locale-specific routes
│   │   ├── address-book/   # Address management
│   │   ├── checkout/       # Checkout flow
│   │   ├── orders/         # Order history and details
│   │   └── products/       # Product listings and details
├── components/             # Reusable UI components
├── contexts/               # React contexts
├── lib/                    # Utility functions
├── store/                  # Zustand store definitions
└── types/                  # TypeScript type definitions
```

## 🌱 Blockchain Integration

Revolutionary Farmers leverages the Stellar blockchain for secure payments and escrow services:

- **USDC Payments** - Accept payments in USDC stablecoin
- **Smart Contracts** - Automated escrow and payment release
- **Wallet Integration** - Connect with Stellar wallets (Freighter, Albedo)

## 👥 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your descriptive message"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a pull request with detailed description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- The Stellar Development Foundation for blockchain infrastructure
- All contributors who have helped shape this platform

---

© 2024 Revolutionary Farmers. All rights reserved.
