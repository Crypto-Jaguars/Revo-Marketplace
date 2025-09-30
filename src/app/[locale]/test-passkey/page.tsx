'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePasskeyStore } from '@/store/slices/passkey';
import { Fingerprint, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function TestPasskeyPage() {
  const { register, isLoading, error, isConnected, keyId, contractId } = usePasskeyStore();
  const [result, setResult] = useState<string | null>(null);
  const [testName, setTestName] = useState('Test User');

  const handleTestPasskey = async () => {
    try {
      setResult(null);
      console.log('🚀 Starting passkey registration test...');

      // Llamar directamente a la función register del store
      await register(testName);

      setResult('✅ Passkey registration successful!');
      console.log('✅ Passkey registration completed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setResult(`❌ Passkey registration failed: ${errorMessage}`);
      console.error('❌ Passkey registration failed:', err);
    }
  };

  const clearResult = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔑 Passkey Test Page</h1>
          <p className="text-gray-600">Test the passkey registration functionality directly</p>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5" />
              Passkey Status
            </CardTitle>
            <CardDescription>Current state of the passkey system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant={isConnected ? 'default' : 'secondary'}>
                  {isConnected ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Disconnected
                    </>
                  )}
                </Badge>
              </div>

              <div className="text-sm">
                <span className="font-medium">Key ID:</span>
                <div className="text-gray-600 font-mono text-xs break-all">{keyId || 'None'}</div>
              </div>

              <div className="text-sm">
                <span className="font-medium">Contract ID:</span>
                <div className="text-gray-600 font-mono text-xs break-all">
                  {contractId || 'None'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
            <CardDescription>Configure and run passkey registration test</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-1">
                Test User Name
              </label>
              <input
                id="testName"
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter test user name"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleTestPasskey} disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Passkey...
                  </>
                ) : (
                  <>
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Test Passkey Registration
                  </>
                )}
              </Button>

              <Button onClick={clearResult} variant="outline" disabled={isLoading}>
                Clear Result
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Result Display */}
        {result && (
          <Alert
            className={`border-green-200 ${result.startsWith('✅') ? 'bg-green-50' : 'bg-red-50'}`}
          >
            {result.startsWith('✅') ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription
              className={result.startsWith('✅') ? 'text-green-800' : 'text-red-800'}
            >
              {result}
            </AlertDescription>
          </Alert>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                1. <strong>Enter a test name</strong> for the passkey registration
              </p>
              <p>
                2. <strong>Click "Test Passkey Registration"</strong> to start the process
              </p>
              <p>
                3. <strong>No browser modal</strong> - runs in mock mode
              </p>
              <p>
                4. <strong>Check the status</strong> above to see if the registration was successful
              </p>
              <p>
                5. <strong>Check the console</strong> for detailed logs
              </p>
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>✅ Mock Mode Active:</strong>
                </p>
                <p className="text-green-700 text-sm mt-1">
                  The passkey registration is now in mock mode - no browser modal will appear, just
                  a simple redirect with simulated data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Loading:</span>
                <span className={isLoading ? 'text-blue-600' : 'text-gray-600'}>
                  {isLoading ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Connected:</span>
                <span className={isConnected ? 'text-green-600' : 'text-gray-600'}>
                  {isConnected ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Has Error:</span>
                <span className={error ? 'text-red-600' : 'text-gray-600'}>
                  {error ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
