"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Sprout,
  Camera,
  Save,
  MapPin,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  Wallet,
  History,
  FileText,
  DollarSign,
} from "lucide-react"
import { useWalletStore } from "@/store"
import { useStellarWallet } from "@/hooks/useStellarWallet"
import { toast } from "sonner"

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  profileImage?: string
  phone?: string
  location?: string
  farmName?: string
  farmType?: string
  joinedDate: string
  isVerified: boolean
}

export function ProfileForm() {
  const t = useTranslations("Account")
  const { address } = useWalletStore()
  const { balances, transactions } = useStellarWallet(address)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Mock user data - in real app this would come from your user store/API
  const [formData, setFormData] = useState<UserProfile>({
    id: "user_123",
    email: "john.farmer@example.com",
    firstName: "John",
    lastName: "Farmer",
    profileImage: "/placeholder.svg?height=100&width=100&text=JF",
    phone: "+1 (555) 123-4567",
    location: "California, USA",
    farmName: "Green Valley Organic Farm",
    farmType: "organic",
    joinedDate: "2023-06-15T00:00:00Z",
    isVerified: true,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In real app, you would call your API here
      // await updateUserProfile(formData)

      toast.success("Profile updated successfully")
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTotalBalance = () => {
    const xlmBalance = balances.find((b) => b.asset_type === "native")?.balance || "0"
    return Number.parseFloat(xlmBalance).toFixed(2)
  }

  const getTransactionCount = () => {
    return transactions.length
  }

  // Mock data for farming activities and contracts
  const getFarmingActivitiesCount = () => 12
  const getContractCount = () => 3

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={formData.profileImage || "/placeholder.svg?height=100&width=100&text=Profile"}
                alt={`${formData.firstName} ${formData.lastName}`}
              />
              <AvatarFallback className="bg-[#375B42] text-white text-2xl">
                {getInitials(formData.firstName, formData.lastName)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 bg-[#375B42] hover:bg-[#2A4632] text-white p-2 rounded-full transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {formData.firstName} {formData.lastName}
              </h1>
              {formData.isVerified && (
                <Badge className="bg-[#375B42] text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{formData.email}</span>
              </div>

              {formData.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{formData.phone}</span>
                </div>
              )}

              {formData.farmName && (
                <div className="flex items-center space-x-2">
                  <Sprout className="h-4 w-4" />
                  <span>{formData.farmName}</span>
                  {formData.farmType && (
                    <Badge variant="outline" className="text-gray-600 border-gray-400">
                      {formData.farmType}
                    </Badge>
                  )}
                </div>
              )}

              {formData.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{formData.location}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Member since {formatDate(formData.joinedDate)}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-[#375B42] hover:bg-[#2A4632] text-white">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-[#375B42] hover:bg-[#2A4632] text-white"
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
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2 mb-6">
          <User className="h-5 w-5" />
          <span>Personal Information</span>
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm text-gray-600">
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-200 text-gray-900"
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm text-gray-600">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-200 text-gray-900"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm text-gray-600">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1 bg-gray-50 border-gray-200 text-gray-900"
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-sm text-gray-600">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-200 text-gray-900"
                placeholder="+1 (555) 123-4567"
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-sm text-gray-600">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-200 text-gray-900"
                placeholder="City, State, Country"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Farm Information */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2 mb-6">
          <Sprout className="h-5 w-5" />
          <span>Farm Information</span>
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="farmName" className="text-sm text-gray-600">
                Farm Name
              </Label>
              <Input
                id="farmName"
                value={formData.farmName || ""}
                onChange={(e) => handleInputChange("farmName", e.target.value)}
                className="mt-1 bg-gray-50 border-gray-200 text-gray-900"
                placeholder="Green Valley Farm"
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="farmType" className="text-sm text-gray-600">
                Farm Type
              </Label>
              <Select
                value={formData.farmType || ""}
                onValueChange={(value) => handleInputChange("farmType", value)}
                disabled={!isEditing}
              >
                <SelectTrigger className="mt-1 bg-gray-50 border-gray-200 text-gray-900">
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
        </div>
      </div>

      {/* Wallet Summary */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2 mb-6">
          <Wallet className="h-5 w-5" />
          <span>Wallet Summary</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border p-4 border-gray-200 rounded-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-[#375B42] p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Balance</p>
                <p className="text-gray-900 font-bold text-xl">{getTotalBalance()} XLM</p>
              </div>
            </div>
          </div>

          <div className="border p-4 border-gray-200 rounded-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-3 rounded-full">
                <History className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Transactions</p>
                <p className="text-gray-900 font-bold text-xl">{getTransactionCount()}</p>
              </div>
            </div>
          </div>

          <div className="border p-4 border-gray-200 rounded-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-3 rounded-full">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Farm Activities</p>
                <p className="text-gray-900 font-bold text-xl">{getFarmingActivitiesCount()}</p>
              </div>
            </div>
          </div>

          <div className="border p-4 border-gray-200 rounded-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-3 rounded-full">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Contracts</p>
                <p className="text-gray-900 font-bold text-xl">{getContractCount()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
