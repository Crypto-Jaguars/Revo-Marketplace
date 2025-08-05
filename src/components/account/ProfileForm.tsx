"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, User, TractorIcon as Farm } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function ProfileForm() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Farm Lane",
    city: "Ruralville",
    state: "CA",
    zip: "90210",
    country: "USA",
    farmName: "Green Acres Farm",
    farmSize: "100 acres",
    farmType: "Organic Vegetables",
    establishedDate: new Date("2000-01-01"),
    website: "https://www.greenacresfarm.com",
    bio: "Passionate organic farmer dedicated to sustainable practices.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setProfile((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setProfile((prev) => ({ ...prev, [id]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setProfile((prev) => ({ ...prev, establishedDate: date }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the profile data to a backend API
    console.log("Profile updated:", profile)
    toast.success("Profile updated successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your personal and farm details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#375B42]">
              <User className="h-5 w-5" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={profile.firstName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={profile.lastName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={profile.phone} onChange={handleChange} />(
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={profile.address} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={profile.city} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" value={profile.state} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="zip">Zip / Postal Code</Label>
                <Input id="zip" value={profile.zip} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={profile.country} onChange={handleChange} />
            </div>
          </div>

          {/* Farm Information */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#375B42]">
              <Farm className="h-5 w-5" /> Farm Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmName">Farm Name</Label>
                <Input id="farmName" value={profile.farmName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="farmSize">Farm Size</Label>
                <Input id="farmSize" value={profile.farmSize} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="farmType">Farm Type</Label>
                <Select value={profile.farmType} onValueChange={(value) => handleSelectChange("farmType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select farm type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Organic Vegetables">Organic Vegetables</SelectItem>
                    <SelectItem value="Dairy Farm">Dairy Farm</SelectItem>
                    <SelectItem value="Grain Crops">Grain Crops</SelectItem>
                    <SelectItem value="Fruit Orchard">Fruit Orchard</SelectItem>
                    <SelectItem value="Livestock">Livestock</SelectItem>
                    <SelectItem value="Mixed Farming">Mixed Farming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="establishedDate">Established Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !profile.establishedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {profile.establishedDate ? format(profile.establishedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={profile.establishedDate}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" value={profile.website} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={profile.bio} onChange={handleChange} rows={4} />
            </div>
          </div>

          <Button type="submit" className="bg-[#375B42] hover:bg-[#2A4632] text-white">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
