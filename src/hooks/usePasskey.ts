import { useCallback, useState } from 'react';
import { usePasskeyStore } from '@/store/slices/passkey';
import { UserRole } from '@/types/waitlist';

export interface PasskeyRegistrationData {
  name: string;
  email: string;
  role?: UserRole;
}

export interface UserRegistrationData {
  name: string;
  email: string;
  password?: string;
  role?: UserRole;
}

export interface StoredUserData {
  id: string;
  name: string;
  email: string;
  role: string;
  hasPasskey: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const usePasskey = () => {
  const { register, isLoading, error, clearError, isConnected, keyId, contractId } =
    usePasskeyStore();
  const [isRegistering, setIsRegistering] = useState(false);

  // Simular registro de usuario (guardar en localStorage)
  const registerUser = useCallback(async (userData: UserRegistrationData) => {
    try {
      setIsRegistering(true);

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verificar si ya existe un usuario con ese email
      const existingUsers = JSON.parse(localStorage.getItem('registered-users') || '[]');
      const existingUser = existingUsers.find(
        (user: StoredUserData) => user.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (existingUser) {
        return {
          success: false,
          error: 'An account with this email already exists',
        };
      }

      // Crear nuevo usuario
      const newUser: StoredUserData = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        role: userData.role || 'consumer',
        hasPasskey: false,
        isEmailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Guardar en localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('registered-users', JSON.stringify(updatedUsers));

      // También guardar datos de sesión actual
      localStorage.setItem('current-user', JSON.stringify(newUser));

      return {
        success: true,
        data: newUser,
        message: 'Account created successfully',
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create account';
      return { success: false, error: errorMessage };
    } finally {
      setIsRegistering(false);
    }
  }, []);

  // Crear passkey y asociarlo con usuario existente
  const createPasskey = useCallback(
    async (registrationData: PasskeyRegistrationData) => {
      try {
        // Primero registrar el passkey usando el store existente
        await register(registrationData.name);

        // Obtener usuarios registrados
        const existingUsers = JSON.parse(localStorage.getItem('registered-users') || '[]');

        // Buscar usuario existente o crear uno nuevo
        let user = existingUsers.find(
          (u: StoredUserData) => u.email.toLowerCase() === registrationData.email.toLowerCase()
        );

        if (!user) {
          // Si no existe, crear usuario nuevo
          user = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: registrationData.name.trim(),
            email: registrationData.email.toLowerCase().trim(),
            role: registrationData.role || 'consumer',
            hasPasskey: true,
            isEmailVerified: true, // Los usuarios con passkey se consideran verificados
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          existingUsers.push(user);
        } else {
          // Actualizar usuario existente
          user.hasPasskey = true;
          user.isEmailVerified = true;
          user.updatedAt = new Date().toISOString();
        }

        // Agregar datos del passkey al usuario
        const userWithPasskey = {
          ...user,
          passkey: {
            keyId,
            contractId,
            createdAt: new Date().toISOString(),
          },
        };

        // Guardar datos actualizados
        localStorage.setItem('registered-users', JSON.stringify(existingUsers));
        localStorage.setItem('current-user', JSON.stringify(userWithPasskey));
        localStorage.setItem(
          'user-passkey-data',
          JSON.stringify({
            keyId,
            contractId,
            userId: user.id,
            createdAt: new Date().toISOString(),
          })
        );

        return {
          success: true,
          data: userWithPasskey,
          message: 'Passkey created and associated with account successfully',
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create passkey';
        return { success: false, error: errorMessage };
      }
    },
    [register, keyId, contractId]
  );

  // Obtener usuario actual
  const getCurrentUser = useCallback((): StoredUserData | null => {
    try {
      const userData = localStorage.getItem('current-user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }, []);

  // Obtener todos los usuarios registrados
  const getRegisteredUsers = useCallback((): StoredUserData[] => {
    try {
      const users = localStorage.getItem('registered-users');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  }, []);

  // Cerrar sesión
  const signOut = useCallback(() => {
    localStorage.removeItem('current-user');
    localStorage.removeItem('user-passkey-data');
    clearError();
  }, [clearError]);

  return {
    // Registro tradicional
    registerUser,
    isRegistering,

    // Registro con passkey
    createPasskey,
    isCreating: isLoading,

    // Estado general
    error,
    clearError,
    isConnected,

    // Datos del passkey
    keyId,
    contractId,

    // Utilidades
    getCurrentUser,
    getRegisteredUsers,
    signOut,
  };
};
