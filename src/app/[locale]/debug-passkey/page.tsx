import PasskeyDebug from '@/components/debug/PasskeyDebug';

export default function DebugPasskeyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Passkey Debug Panel</h1>
          <p className="text-gray-600">
            This page helps debug the passkey authentication system and localStorage data.
          </p>
        </div>
        <PasskeyDebug />
      </div>
    </div>
  );
}
