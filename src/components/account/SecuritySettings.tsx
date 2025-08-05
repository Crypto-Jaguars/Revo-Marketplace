"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Shield, Key, Smartphone, Eye, EyeOff, AlertTriangle, CheckCircle, Trash2, Download } from "lucide-react"
import { toast } from "sonner"

interface SecuritySession {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
}

interface SecurityLog {
  id: string
  action: string
  timestamp: string
  ip: string
  status: "success" | "failed" | "warning"
}

export default function SecuritySettings() {
  const t = useTranslations("Account")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [sessions] = useState<SecuritySession[]>([
    {
      id: "1",
      device: "Chrome on Windows",
      location: "New York, US",
      lastActive: "2024-01-15T10:30:00Z",
      current: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "New York, US",
      lastActive: "2024-01-14T15:20:00Z",
      current: false,
    },
    {
      id: "3",
      device: "Firefox on Linux",
      location: "San Francisco, US",
      lastActive: "2024-01-12T09:15:00Z",
      current: false,
    },
  ])

  const [securityLogs] = useState<SecurityLog[]>([
    {
      id: "1",
      action: "Password changed",
      timestamp: "2024-01-15T10:30:00Z",
      ip: "192.168.1.100",
      status: "success",
    },
    {
      id: "2",
      action: "Failed login attempt",
      timestamp: "2024-01-14T22:45:00Z",
      ip: "203.0.113.42",
      status: "failed",
    },
    {
      id: "3",
      action: "Wallet connected",
      timestamp: "2024-01-14T15:20:00Z",
      ip: "192.168.1.100",
      status: "success",
    },
    {
      id: "4",
      action: "Suspicious login detected",
      timestamp: "2024-01-13T03:15:00Z",
      ip: "198.51.100.25",
      status: "warning",
    },
  ])

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast.success("Password updated successfully")
    } catch (error) {
      toast.error("Failed to update password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTwoFactorToggle = async (enabled: boolean) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setTwoFactorEnabled(enabled)
      toast.success(enabled ? "2FA enabled successfully" : "2FA disabled successfully")
    } catch (error) {
      toast.error("Failed to update 2FA settings")
    } finally {
      setIsLoading(false)
    }
  }

  const terminateSession = async (sessionId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      toast.success("Session terminated successfully")
    } catch (error) {
      toast.error("Failed to terminate session")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-600",
      failed: "bg-red-600",
      warning: "bg-yellow-600",
    }

    return (
      <Badge className={`${variants[status as keyof typeof variants]} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Password Settings */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2 mb-6">
          <Key className="h-5 w-5" />
          <span>Password Settings</span>
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="text-sm text-gray-600">
              Current Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="currentPassword"
                type={showPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-gray-50 border-gray-200 text-gray-900 pr-10"
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPasswords(!showPasswords)}
              >
                {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newPassword" className="text-sm text-gray-600">
                New Password
              </Label>
              <Input
                id="newPassword"
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 bg-gray-50 border-gray-200 text-gray-900"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-sm text-gray-600">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type={showPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 bg-gray-50 border-gray-200 text-gray-900"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-gray-500">
              Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols.
            </div>
            <Button
              onClick={handlePasswordChange}
              disabled={isLoading}
              className="bg-[#375B42] hover:bg-[#2A4632] text-white"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2 mb-6">
          <Smartphone className="h-5 w-5" />
          <span>Two-Factor Authentication</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-semibold">Enable 2FA</p>
              <p className="text-gray-600 text-sm">
                Add an extra layer of security to your account with two-factor authentication
              </p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} disabled={isLoading} />
          </div>

          {twoFactorEnabled && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 text-green-600 mb-2">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">2FA is enabled</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Your account is protected with two-factor authentication using your authenticator app.
              </p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  View Recovery Codes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  Regenerate Codes
                </Button>
              </div>
            </div>
          )}

          {!twoFactorEnabled && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 text-yellow-600 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold">2FA is disabled</span>
              </div>
              <p className="text-gray-600 text-sm">
                Enable two-factor authentication to secure your account with an additional verification step.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2 mb-6">
          <Shield className="h-5 w-5" />
          <span>Active Sessions</span>
        </h3>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-gray-900 font-semibold">{session.device}</p>
                    {session.current && <Badge className="bg-[#375B42] text-white">Current</Badge>}
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{session.location}</p>
                    <p>Last active: {formatDate(session.lastActive)}</p>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => terminateSession(session.id)}
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Terminate
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Activity Log */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security Activity</span>
          </h3>
          <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            <Download className="h-4 w-4 mr-1" />
            Export Log
          </Button>
        </div>
        <div className="space-y-4">
          {securityLogs.map((log) => (
            <div key={log.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="text-gray-900 font-semibold">{log.action}</p>
                    <div className="text-sm text-gray-600">
                      <span>IP: {log.ip}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(log.timestamp)}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(log.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
