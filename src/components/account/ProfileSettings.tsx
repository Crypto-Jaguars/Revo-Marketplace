"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Globe, DollarSign, Lock } from "lucide-react"
import { toast } from "sonner"

export function ProfileSettings() {
  const [settings, setSettings] = useState({
    language: "en",
    currency: "USD",
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    privacyPublicProfile: true,
  })

  const handleSelectChange = (id: string, value: string) => {
    setSettings((prev) => ({ ...prev, [id]: value }))
    toast.success(`${id.replace(/([A-Z])/g, " $1").toLowerCase()} updated to ${value}!`)
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }))
    toast.success(`${id.replace(/([A-Z])/g, " $1").toLowerCase()} ${checked ? "enabled" : "disabled"}!`)
  }

  const handleSaveSettings = () => {
    console.log("Settings saved:", settings)
    toast.success("All settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      {/* General Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>General Preferences</CardTitle>
          <CardDescription>Configure your language, currency, and display settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language" className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4" /> Language
              </Label>
              <Select value={settings.language} onValueChange={(value) => handleSelectChange("language", value)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency" className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4" /> Preferred Currency
              </Label>
              <Select value={settings.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - United States Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="XLM">XLM - Stellar Lumens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="flex items-center gap-2">
              Dark Mode
            </Label>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSwitchChange("darkMode", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Email Notifications
            </Label>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="smsNotifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> SMS Notifications
            </Label>
            <Switch
              id="smsNotifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control your profile visibility.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="privacyPublicProfile" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Public Profile
            </Label>
            <Switch
              id="privacyPublicProfile"
              checked={settings.privacyPublicProfile}
              onCheckedChange={(checked) => handleSwitchChange("privacyPublicProfile", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveSettings} className="bg-[#375B42] hover:bg-[#2A4632] text-white">
        Save All Settings
      </Button>
    </div>
  )
}
