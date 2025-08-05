"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Sprout, Camera, Save, Bell, Globe, Eye } from "lucide-react"
import type { User as UserType } from "./types"
import { toast } from "sonner"

interface ProfileSettingsProps {
    user: UserType
    onUserUpdate: (user: UserType) => void
}

export default function ProfileSettings({ user, onUserUpdate }: ProfileSettingsProps) {
    const t = useTranslations("Settings")
    const [formData, setFormData] = useState(user)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handlePreferenceChange = (category: string, field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [category]: {
                    ...((prev.preferences[category as keyof typeof prev.preferences] as object) || {}), [field]: value,
                },
            },
        }))
    }

    const handleSave = async () => {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            onUserUpdate(formData)
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("Failed to update profile")
        } finally {
            setIsLoading(false)
        }
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Personal Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Profile Image */}
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage
                                src={formData.profileImage || "/placeholder.svg"}
                                alt={`${formData.firstName} ${formData.lastName}`}
                            />
                            <AvatarFallback className="bg-green-600 text-white text-xl">
                                {getInitials(formData.firstName, formData.lastName)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                                <Camera className="h-4 w-4 mr-2" />
                                Change Photo
                            </Button>
                            <p className="text-gray-600 text-sm mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName" className="text-gray-900">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                className="mt-1 bg-white border-gray-300 text-gray-900"
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName" className="text-gray-900">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                className="mt-1 bg-white border-gray-300 text-gray-900"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email" className="text-gray-900">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="mt-1 bg-white border-gray-300 text-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="phone" className="text-gray-900">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                value={formData.phone || ""}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="mt-1 bg-white border-gray-300 text-gray-900"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                        <div>
                            <Label htmlFor="location" className="text-gray-900">
                                Location
                            </Label>
                            <Input
                                id="location"
                                value={formData.location || ""}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                className="mt-1 bg-white border-gray-300 text-gray-900"
                                placeholder="City, State, Country"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Farm Information */}
            <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                        <Sprout className="h-5 w-5" />
                        <span>Farm Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="farmName" className="text-gray-900">
                                Farm Name
                            </Label>
                            <Input
                                id="farmName"
                                value={formData.farmName || ""}
                                onChange={(e) => handleInputChange("farmName", e.target.value)}
                                className="mt-1 bg-white border-gray-300 text-gray-900"
                                placeholder="Green Valley Farm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="farmType" className="text-gray-900">
                                Farm Type
                            </Label>
                            <Select value={formData.farmType || ""} onValueChange={(value) => handleInputChange("farmType", value)}>
                                <SelectTrigger className="mt-1 bg-white border-gray-300 text-gray-900">
                                    <SelectValue placeholder="Select farm type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="organic">Organic Farm</SelectItem>
                                    <SelectItem value="conventional">Conventional Farm</SelectItem>
                                    <SelectItem value="hydroponic">Hydroponic Farm</SelectItem>
                                    <SelectItem value="livestock">Livestock Farm</SelectItem>
                                    <SelectItem value="mixed">Mixed Farm</SelectItem>
                                    <SelectItem value="specialty">Specialty Crops</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center space-x-2">
                        <Globe className="h-5 w-5" />
                        <span>Preferences</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="language" className="text-gray-900">
                                Language
                            </Label>
                            <Select
                                value={formData.preferences.language}
                                onValueChange={(value) => handlePreferenceChange("language", "", value)}
                            >
                                <SelectTrigger className="mt-1 bg-white border-gray-300 text-gray-900">
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
                            <Label htmlFor="currency" className="text-gray-900">
                                Preferred Currency
                            </Label>
                            <Select
                                value={formData.preferences.currency}
                                onValueChange={(value) => handlePreferenceChange("currency", "", value)}
                            >
                                <SelectTrigger className="mt-1 bg-white border-gray-300 text-gray-900">
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
                        <h3 className="text-gray-900 font-semibold mb-4 flex items-center space-x-2">
                            <Bell className="h-4 w-4" />
                            <span>Notification Preferences</span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Email Notifications</p>
                                    <p className="text-gray-600 text-sm">Receive notifications via email</p>
                                </div>
                                <Switch
                                    checked={formData.preferences.notifications.email}
                                    onCheckedChange={(checked) => handlePreferenceChange("notifications", "email", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Push Notifications</p>
                                    <p className="text-gray-600 text-sm">Receive push notifications in browser</p>
                                </div>
                                <Switch
                                    checked={formData.preferences.notifications.push}
                                    onCheckedChange={(checked) => handlePreferenceChange("notifications", "push", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">SMS Notifications</p>
                                    <p className="text-gray-600 text-sm">Receive notifications via SMS</p>
                                </div>
                                <Switch
                                    checked={formData.preferences.notifications.sms}
                                    onCheckedChange={(checked) => handlePreferenceChange("notifications", "sms", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Marketing Communications</p>
                                    <p className="text-gray-600 text-sm">Receive promotional emails and updates</p>
                                </div>
                                <Switch
                                    checked={formData.preferences.notifications.marketing}
                                    onCheckedChange={(checked) => handlePreferenceChange("notifications", "marketing", checked)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Privacy Preferences */}
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-4 flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span>Privacy Settings</span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Show Profile Publicly</p>
                                    <p className="text-gray-600 text-sm">Allow others to view your profile</p>
                                </div>
                                <Switch
                                    checked={formData.preferences.privacy.showProfile}
                                    onCheckedChange={(checked) => handlePreferenceChange("privacy", "showProfile", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Show Activity</p>
                                    <p className="text-gray-600 text-sm">Display your farming activities publicly</p>
                                </div>
                                <Switch
                                    checked={formData.preferences.privacy.showActivity}
                                    onCheckedChange={(checked) => handlePreferenceChange("privacy", "showActivity", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-900">Show Wallet Info</p>
                                    <p className="text-gray-600 text-sm">Display wallet connection status</p>
                                </div>
                                <Switch
                                    checked={formData.preferences.privacy.showWallet}
                                    onCheckedChange={(checked) => handlePreferenceChange("privacy", "showWallet", checked)}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
