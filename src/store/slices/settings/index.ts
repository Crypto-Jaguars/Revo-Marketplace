import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SettingsState, SettingsActions } from './types';

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set, get) => ({
      // Initial state
      wallet: {
        connectedWallets: [],
        primaryWallet: null,
        autoConnect: false,
        transactionConfirmations: true,
        gasOptimization: true,
      },
      notifications: {
        email: {
          enabled: true,
          orderUpdates: true,
          priceAlerts: true,
          securityAlerts: true,
          marketing: false,
        },
        push: {
          enabled: true,
          orderUpdates: true,
          priceAlerts: true,
          securityAlerts: true,
          marketing: false,
        },
        sms: {
          enabled: false,
          orderUpdates: false,
          priceAlerts: false,
          securityAlerts: true,
          marketing: false,
        },
      },
      privacy: {
        profileVisibility: 'public',
        showBalance: true,
        allowAnalytics: true,
        allowCookies: true,
        dataSharing: false,
      },
      regional: {
        language: 'en',
        currency: 'USD',
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        numberFormat: 'en-US',
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: 30,
        loginNotifications: true,
        deviceManagement: true,
      },
      preferences: {
        theme: 'system',
        compactMode: false,
        autoSave: true,
        searchHistory: true,
      },
      loading: false,
      error: null,

      // Actions
      updateWalletSettings: (settings) =>
        set((state) => ({
          wallet: { ...state.wallet, ...settings },
        })),

      addConnectedWallet: (wallet) =>
        set((state) => ({
          wallet: {
            ...state.wallet,
            connectedWallets: [...state.wallet.connectedWallets, wallet],
          },
        })),

      removeConnectedWallet: (walletId) =>
        set((state) => ({
          wallet: {
            ...state.wallet,
            connectedWallets: state.wallet.connectedWallets.filter(
              (w) => w.id !== walletId
            ),
          },
        })),

      setPrimaryWallet: (walletId) =>
        set((state) => ({
          wallet: {
            ...state.wallet,
            primaryWallet: walletId,
          },
        })),

      updateNotificationSettings: (type, settings) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [type]: { ...state.notifications[type], ...settings },
          },
        })),

      updatePrivacySettings: (settings) =>
        set((state) => ({
          privacy: { ...state.privacy, ...settings },
        })),

      updateRegionalSettings: (settings) =>
        set((state) => ({
          regional: { ...state.regional, ...settings },
        })),

      updateSecuritySettings: (settings) =>
        set((state) => ({
          security: { ...state.security, ...settings },
        })),

      updatePreferences: (settings) =>
        set((state) => ({
          preferences: { ...state.preferences, ...settings },
        })),

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Reset all settings to defaults
      resetToDefaults: () =>
        set({
          wallet: {
            connectedWallets: [],
            primaryWallet: null,
            autoConnect: false,
            transactionConfirmations: true,
            gasOptimization: true,
          },
          notifications: {
            email: {
              enabled: true,
              orderUpdates: true,
              priceAlerts: true,
              securityAlerts: true,
              marketing: false,
            },
            push: {
              enabled: true,
              orderUpdates: true,
              priceAlerts: true,
              securityAlerts: true,
              marketing: false,
            },
            sms: {
              enabled: false,
              orderUpdates: false,
              priceAlerts: false,
              securityAlerts: true,
              marketing: false,
            },
          },
          privacy: {
            profileVisibility: 'public',
            showBalance: true,
            allowAnalytics: true,
            allowCookies: true,
            dataSharing: false,
          },
          regional: {
            language: 'en',
            currency: 'USD',
            timezone: 'UTC',
            dateFormat: 'MM/DD/YYYY',
            numberFormat: 'en-US',
          },
          security: {
            twoFactorAuth: false,
            sessionTimeout: 30,
            loginNotifications: true,
            deviceManagement: true,
          },
          preferences: {
            theme: 'system',
            compactMode: false,
            autoSave: true,
            searchHistory: true,
          },
        }),
    }),
    {
      name: 'user-settings',
      partialize: (state) => ({
        wallet: state.wallet,
        notifications: state.notifications,
        privacy: state.privacy,
        regional: state.regional,
        security: state.security,
        preferences: state.preferences,
      }),
    }
  )
); 