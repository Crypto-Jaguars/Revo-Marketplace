export interface ConnectedWallet {
  id: string;
  name: string;
  address: string;
  type: 'stellar' | 'ethereum' | 'bitcoin';
  isConnected: boolean;
  lastUsed: Date;
}

export interface WalletSettings {
  connectedWallets: ConnectedWallet[];
  primaryWallet: string | null;
  autoConnect: boolean;
  transactionConfirmations: boolean;
  gasOptimization: boolean;
}

export interface NotificationChannel {
  enabled: boolean;
  orderUpdates: boolean;
  priceAlerts: boolean;
  securityAlerts: boolean;
  marketing: boolean;
}

export interface NotificationSettings {
  email: NotificationChannel;
  push: NotificationChannel;
  sms: NotificationChannel;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showBalance: boolean;
  allowAnalytics: boolean;
  allowCookies: boolean;
  dataSharing: boolean;
}

export interface RegionalSettings {
  language: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  loginNotifications: boolean;
  deviceManagement: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  autoSave: boolean;
  searchHistory: boolean;
}

export interface SettingsState {
  wallet: WalletSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  regional: RegionalSettings;
  security: SecuritySettings;
  preferences: UserPreferences;
  loading: boolean;
  error: string | null;
}

export interface SettingsActions {
  updateWalletSettings: (settings: Partial<WalletSettings>) => void;
  addConnectedWallet: (wallet: ConnectedWallet) => void;
  removeConnectedWallet: (walletId: string) => void;
  setPrimaryWallet: (walletId: string) => void;
  updateNotificationSettings: (type: keyof NotificationSettings, settings: Partial<NotificationChannel>) => void;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;
  updateRegionalSettings: (settings: Partial<RegionalSettings>) => void;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => void;
  updatePreferences: (settings: Partial<UserPreferences>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetToDefaults: () => void;
} 