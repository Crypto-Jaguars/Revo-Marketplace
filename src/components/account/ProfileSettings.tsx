"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, Globe, Eye, Save } from "lucide-react"
import { toast } from "sonner"

interface UserPreferences {
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

export default function ProfileSettings() {
    const t = useTranslations("Account")
    const [isLoading, setIsLoading] = useState(false)

    // Mock preferences data
    const [preferences, setPreferences] = useState<UserPreferences>({
        language: "en",
        currency: "USD",
        notifications: {
            email: true,
            push: true,
            sms: false,
            marketing: true,
        },
        privacy: {
            showProfile: true,
            showActivity: true,
            showWallet: false,
        },
    })

    const handlePreferenceChange = (category: string, field: string, value: any) => {
        setPreferences((prev) => {
            const existingCategory = prev[category as keyof typeof prev];
            return {
                ...prev,
                [category]: {
                    ...(typeof existingCategory === 'object' && existingCategory !== null ? existingCategory : {}),
                    [field]: value,
                },
            };
        });
    }

    const handleSave = async () => {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast.success("Settings updated successfully")
        } catch (error) {
            toast.error("Failed to update settings")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Preferences */}
            <div className="border p-6 border-gray-200 rounded-sm">
                <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2 mb-6">
                    <Globe className="h-5 w-5" />
                    <span>General Preferences</span>
                </h3>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="language" className="text-sm text-gray-600">
                                Language
                            </Label>
                            <Select
                                value={preferences.language}
                                onValueChange={(value) => handlePreferenceChange("language", "", value)}
                            >
                                <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 text-gray-900">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Español</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                    <SelectItem value="de">Deutsch</SelectItem>
                                    <SelectItem value="pt">Português</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="currency" className="text-sm text-gray-600">
                                Preferred Currency
                            </Label>
                            <Select
                                value={preferences.currency}
                                onValueChange={(value) => handlePreferenceChange("currency", "", value)}
                            >
                                <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 text-gray-900">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD ($)</SelectItem>
                                    <SelectItem value="EUR">EUR (€)</SelectItem>
                                    <SelectItem value="GBP">GBP (£)</SelectItem>
                                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                                    <SelectItem value="USDT">USDT</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Notification Preferences */}
                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4 flex items-center space-x-2">
                            <Bell className="h-4 w-4" />
                            <span>Notification Preferences</span>
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Email Notifications</p>
                                    <p className="text-gray-600 text-sm">Receive notifications via email</p>
                                </div>
                                <Switch
                                    checked={preferences.notifications.email}
                                    onCheckedChange={(checked) => handlePreferenceChange("notifications", "email", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Push Notifications</p>
                                    <p className="text-gray-600 text-sm">Receive push notifications in browser</p>
                                </div>
                                <Switch
                                    checked={preferences.notifications.push}
                                    onCheckedChange={(checked) => handlePreferenceChange("notifications", "push", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">SMS Notifications</p>
                                    <p className="text-gray-600 text-sm">Receive notifications via SMS</p>
                                </div>
                                <Switch
                                    checked={preferences.notifications.sms}
                                    onCheckedChange={(checked) => handlePreferenceChange("notifications", "sms", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Marketing Communications</p>
                                    <p className="text-gray-600 text-sm">Receive promotional emails and updates</p>
                                </div>
                                <Switch
                                    checked={preferences.notifications.marketing}
                                    onCheckedChange={(checked) => handlePreferenceChange("notifications", "marketing", checked)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Privacy Preferences */}
                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4 flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>Privacy Settings</span>
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Show Profile Publicly</p>
                                    <p className="text-gray-600 text-sm">Allow others to view your profile</p>
                                </div>
                                <Switch
                                    checked={preferences.privacy.showProfile}
                                    onCheckedChange={(checked) => handlePreferenceChange("privacy", "showProfile", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Show Activity</p>
                                    <p className="text-gray-600 text-sm">Display your farming activities publicly</p>
                                </div>
                                <Switch
                                    checked={preferences.privacy.showActivity}
                                    onCheckedChange={(checked) => handlePreferenceChange("privacy", "showActivity", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Show Wallet Info</p>
                                    <p className="text-gray-600 text-sm">Display wallet connection status</p>
                                </div>
                                <Switch
                                    checked={preferences.privacy.showWallet}
                                    onCheckedChange={(checked) => handlePreferenceChange("privacy", "showWallet", checked)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-[#375B42] hover:bg-[#2A4632] text-white font-semibold px-8"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Settings
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
