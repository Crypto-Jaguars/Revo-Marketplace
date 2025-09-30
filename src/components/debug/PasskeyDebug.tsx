'use client';

import { useState, useEffect } from 'react';
import { usePasskey } from '@/hooks/usePasskey';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RedirectTest from './RedirectTest';
import Link from 'next/link';

export default function PasskeyDebug() {
  const { getCurrentUser, getRegisteredUsers, signOut, isConnected, keyId, contractId } =
    usePasskey();

  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [localStorageData, setLocalStorageData] = useState({});

  const refreshData = () => {
    setCurrentUser(getCurrentUser());
    setRegisteredUsers(getRegisteredUsers());

    // Mostrar datos raw del localStorage
    const rawData = {
      'current-user': localStorage.getItem('current-user'),
      'registered-users': localStorage.getItem('registered-users'),
      'user-passkey-data': localStorage.getItem('user-passkey-data'),
      'passkey-storage': localStorage.getItem('passkey-storage'),
    };
    setLocalStorageData(rawData);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSignOut = () => {
    signOut();
    refreshData();
  };

  const clearAllData = () => {
    localStorage.removeItem('current-user');
    localStorage.removeItem('registered-users');
    localStorage.removeItem('user-passkey-data');
    localStorage.removeItem('passkey-storage');
    refreshData();
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔑 Passkey Debug Panel
            <Badge variant={isConnected ? 'default' : 'secondary'}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </CardTitle>
          <CardDescription>Debug information for passkey authentication system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={refreshData} variant="outline">
              Refresh Data
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
            <Button onClick={clearAllData} variant="destructive">
              Clear All Data
            </Button>
            <Link href="/test-passkey">
              <Button variant="outline" className="bg-blue-50 hover:bg-blue-100">
                🧪 Test Passkey
              </Button>
            </Link>
          </div>

          {/* Passkey Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Passkey Status</h4>
              <p className="text-sm text-blue-700">Connected: {isConnected ? 'Yes' : 'No'}</p>
              <p className="text-sm text-blue-700">Key ID: {keyId || 'None'}</p>
              <p className="text-sm text-blue-700">Contract ID: {contractId || 'None'}</p>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Current User</h4>
              {currentUser ? (
                <div className="text-sm text-green-700">
                  <p>Name: {currentUser.name}</p>
                  <p>Email: {currentUser.email}</p>
                  <p>Role: {currentUser.role}</p>
                  <p>Has Passkey: {currentUser.hasPasskey ? 'Yes' : 'No'}</p>
                  <p>Verified: {currentUser.isEmailVerified ? 'Yes' : 'No'}</p>
                </div>
              ) : (
                <p className="text-sm text-green-700">No user logged in</p>
              )}
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">Registered Users</h4>
              <p className="text-sm text-purple-700">Total: {registeredUsers.length}</p>
              {registeredUsers.length > 0 && (
                <div className="text-sm text-purple-700">
                  <p>With Passkey: {registeredUsers.filter((u) => u.hasPasskey).length}</p>
                  <p>Verified: {registeredUsers.filter((u) => u.isEmailVerified).length}</p>
                </div>
              )}
            </div>
          </div>

          {/* Raw localStorage Data */}
          <div className="space-y-4">
            <h4 className="font-medium">LocalStorage Raw Data</h4>
            {Object.entries(localStorageData).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">{key}</h5>
                <pre className="text-xs text-gray-700 overflow-x-auto">
                  {value ? JSON.stringify(JSON.parse(value), null, 2) : 'null'}
                </pre>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Redirect Test Component */}
      <RedirectTest />
    </div>
  );
}
