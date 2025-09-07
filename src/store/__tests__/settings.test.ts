import { renderHook, act } from '@testing-library/react';
import { useSettingsStore } from '../slices/settings';

describe('Settings Store', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    expect(result.current.wallet.connectedWallets).toEqual([]);
    expect(result.current.wallet.primaryWallet).toBeNull();
    expect(result.current.wallet.autoConnect).toBe(false);
    expect(result.current.wallet.transactionConfirmations).toBe(true);
    expect(result.current.wallet.gasOptimization).toBe(true);
    
    expect(result.current.notifications.email.enabled).toBe(true);
    expect(result.current.notifications.push.enabled).toBe(true);
    expect(result.current.notifications.sms.enabled).toBe(false);
    
    expect(result.current.privacy.profileVisibility).toBe('public');
    expect(result.current.privacy.showBalance).toBe(true);
    expect(result.current.privacy.allowAnalytics).toBe(true);
    expect(result.current.privacy.allowCookies).toBe(true);
    expect(result.current.privacy.dataSharing).toBe(false);
    
    expect(result.current.regional.language).toBe('en');
    expect(result.current.regional.currency).toBe('USD');
    expect(result.current.regional.timezone).toBe('UTC');
    expect(result.current.regional.dateFormat).toBe('MM/DD/YYYY');
    expect(result.current.regional.numberFormat).toBe('en-US');
    
    expect(result.current.security.twoFactorAuth).toBe(false);
    expect(result.current.security.sessionTimeout).toBe(30);
    expect(result.current.security.loginNotifications).toBe(true);
    expect(result.current.security.deviceManagement).toBe(true);
    
    expect(result.current.preferences.theme).toBe('system');
    expect(result.current.preferences.compactMode).toBe(false);
    expect(result.current.preferences.autoSave).toBe(true);
    expect(result.current.preferences.searchHistory).toBe(true);
  });

  it('should update wallet settings', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.updateWalletSettings({
        autoConnect: true,
        transactionConfirmations: false
      });
    });
    
    expect(result.current.wallet.autoConnect).toBe(true);
    expect(result.current.wallet.transactionConfirmations).toBe(false);
  });

  it('should add and remove connected wallets', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    const wallet = {
      id: '1',
      name: 'Test Wallet',
      address: 'test-address',
      type: 'stellar' as const,
      isConnected: true,
      lastUsed: new Date()
    };
    
    act(() => {
      result.current.addConnectedWallet(wallet);
    });
    
    expect(result.current.wallet.connectedWallets).toHaveLength(1);
    expect(result.current.wallet.connectedWallets[0]).toEqual(wallet);
    
    act(() => {
      result.current.removeConnectedWallet('1');
    });
    
    expect(result.current.wallet.connectedWallets).toHaveLength(0);
  });

  it('should set primary wallet', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.setPrimaryWallet('test-wallet-id');
    });
    
    expect(result.current.wallet.primaryWallet).toBe('test-wallet-id');
  });

  it('should update notification settings', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.updateNotificationSettings('email', {
        enabled: false,
        marketing: true
      });
    });
    
    expect(result.current.notifications.email.enabled).toBe(false);
    expect(result.current.notifications.email.marketing).toBe(true);
  });

  it('should update privacy settings', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.updatePrivacySettings({
        profileVisibility: 'private',
        showBalance: false
      });
    });
    
    expect(result.current.privacy.profileVisibility).toBe('private');
    expect(result.current.privacy.showBalance).toBe(false);
  });

  it('should update regional settings', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.updateRegionalSettings({
        language: 'es',
        currency: 'EUR'
      });
    });
    
    expect(result.current.regional.language).toBe('es');
    expect(result.current.regional.currency).toBe('EUR');
  });

  it('should update security settings', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.updateSecuritySettings({
        twoFactorAuth: true,
        sessionTimeout: 60
      });
    });
    
    expect(result.current.security.twoFactorAuth).toBe(true);
    expect(result.current.security.sessionTimeout).toBe(60);
  });

  it('should update preferences', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.updatePreferences({
        theme: 'dark',
        compactMode: true
      });
    });
    
    expect(result.current.preferences.theme).toBe('dark');
    expect(result.current.preferences.compactMode).toBe(true);
  });

  it('should reset to defaults', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    // First, change some settings
    act(() => {
      result.current.updatePreferences({ theme: 'dark' });
      result.current.updatePrivacySettings({ profileVisibility: 'private' });
    });
    
    expect(result.current.preferences.theme).toBe('dark');
    expect(result.current.privacy.profileVisibility).toBe('private');
    
    // Then reset to defaults
    act(() => {
      result.current.resetToDefaults();
    });
    
    expect(result.current.preferences.theme).toBe('system');
    expect(result.current.privacy.profileVisibility).toBe('public');
  });

  it('should handle loading and error states', () => {
    const { result } = renderHook(() => useSettingsStore());
    
    act(() => {
      result.current.setLoading(true);
      result.current.setError('Test error');
    });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe('Test error');
    
    act(() => {
      result.current.setLoading(false);
      result.current.clearError();
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
}); 