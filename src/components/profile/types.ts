export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  profileImage?: string
  phone?: string
  location?: string
  farmName?: string
  farmType?: string
  joinedDate: string
  isVerified: boolean
  preferences: UserPreferences
}

export interface UserPreferences {
  language: string
  currency: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    marketing: boolean
  }
  privacy: {
    showProfile: boolean
    showActivity: boolean
    showWallet: boolean
  }
}

export interface WalletConfig {
  address: string
  network: "PUBLIC" | "TESTNET"
  balance: {
    available: string
    escrow: string
  }
  isConnected: boolean
  publicKey?: string
}

export interface StellarBalance {
  asset_type: string
  asset_code?: string
  asset_issuer?: string
  balance: string
  limit?: string
}

export interface Transaction {
  id: string
  hash: string
  type: "payment" | "create_account" | "manage_offer" | "path_payment"
  amount: string
  asset: string
  from: string
  to: string
  timestamp: string
  status: "success" | "pending" | "failed"
  memo?: string
  fee: string
}

export interface FarmingActivity {
  id: string
  type: "harvest" | "planting" | "sale" | "purchase" | "contract"
  title: string
  description: string
  amount?: string
  currency?: string
  date: string
  status: "completed" | "pending" | "cancelled"
  relatedTransaction?: string
}

export interface EscrowContract {
  id: string
  buyerAddress: string
  sellerAddress: string
  amount: string
  asset: string
  status: "active" | "completed" | "disputed" | "cancelled"
  createdAt: string
  expiresAt: string
  description: string
}
