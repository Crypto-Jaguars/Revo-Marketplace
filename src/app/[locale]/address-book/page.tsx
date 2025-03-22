"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import Bounded from "@/components/Bounded"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  PlusCircle, 
  Home, 
  MapPin, 
  Phone, 
  Edit,
  Trash2, 
  CheckCircle,
  X,
  ChevronLeft
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

// Define the address type
interface Address {
  id: string
  name: string
  phoneNumber: string
  streetAddress: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export default function AddressBookPage() {
  const t = useTranslations("AddressBook")
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  
  // Form schema
  const addressSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phoneNumber: z.string().min(9, "Valid phone number is required"),
    streetAddress: z.string().min(5, "Street address is required"),
    apartment: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State/Province is required"),
    postalCode: z.string().min(3, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
    isDefault: z.boolean().optional()
  })
  
  type AddressFormValues = z.infer<typeof addressSchema>
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      isDefault: false
    }
  })
  
  // Load addresses from localStorage on mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem('addresses')
    if (savedAddresses) {
      try {
        setAddresses(JSON.parse(savedAddresses))
      } catch (error) {
        console.error("Failed to parse saved addresses", error)
      }
    }
  }, [])
  
  // Save addresses to localStorage when they change
  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses))
  }, [addresses])
  
  // Submit handler for add/edit form
  const onSubmit = (data: AddressFormValues) => {
    // Generate a random ID if this is a new address
    const id = editingAddress ? editingAddress.id : Math.random().toString(36).substring(2, 9)
    
    const newAddress: Address = {
      ...data,
      id,
      isDefault: data.isDefault || false
    }
    
    // If this is set as default, update other addresses
    let updatedAddresses: Address[]
    
    if (newAddress.isDefault) {
      updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
      
      // If the address is new (not being edited), add it
      if (!editingAddress) {
        updatedAddresses.push(newAddress)
      } else {
        // Replace the edited address
        const index = updatedAddresses.findIndex(addr => addr.id === id)
        if (index >= 0) {
          updatedAddresses[index] = newAddress
        }
      }
    } else {
      if (editingAddress) {
        // Update existing address
        updatedAddresses = addresses.map(addr => 
          addr.id === id ? newAddress : addr
        )
      } else {
        // Add new address
        updatedAddresses = [...addresses, newAddress]
        
        // If this is the first address, make it default
        if (updatedAddresses.length === 1) {
          updatedAddresses[0].isDefault = true
        }
      }
    }
    
    setAddresses(updatedAddresses)
    
    // Show success toast
    if (editingAddress) {
      toast.success(t("notifications.updated"))
    } else {
      toast.success(t("notifications.added"))
    }
    
    // Reset form and UI state
    reset()
    setShowAddForm(false)
    setEditingAddress(null)
  }
  
  // Handle editing an address
  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setShowAddForm(true)
    
    // Set form values
    Object.entries(address).forEach(([key, value]) => {
      if (key !== 'id') {
        // @ts-ignore
        setValue(key, value)
      }
    })
  }
  
  // Handle deleting an address
  const confirmDelete = (id: string) => {
    const filteredAddresses = addresses.filter(addr => addr.id !== id)
    
    // If we deleted the default address, set a new default if there are addresses left
    if (addresses.find(addr => addr.id === id)?.isDefault && filteredAddresses.length > 0) {
      filteredAddresses[0].isDefault = true
    }
    
    setAddresses(filteredAddresses)
    setDeleteConfirmId(null)
    toast.success(t("notifications.deleted"))
  }
  
  // Handle setting an address as default
  const setAsDefault = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
    
    setAddresses(updatedAddresses)
    toast.success(t("notifications.defaultSet"))
  }
  
  // Cancel form
  const cancelForm = () => {
    reset()
    setShowAddForm(false)
    setEditingAddress(null)
  }
  
  // Get default and non-default addresses
  const defaultAddress = addresses.find(addr => addr.isDefault)
  const additionalAddresses = addresses.filter(addr => !addr.isDefault)
  
  return (
    <Bounded>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-gray-500">
          <Link href={`/${locale}`} className="hover:text-gray-700">
            Home
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2 rotate-180" />
          <Link href={`/${locale}/account`} className="hover:text-gray-700">
            Account
          </Link>
          <ChevronLeft className="w-4 h-4 mx-2 rotate-180" />
          <span className="text-gray-900">Address Book</span>
        </div>
      
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold">{t("title")}</h1>
              <p className="text-gray-500 mt-1">{t("subtitle")}</p>
            </div>
            
            {!showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)} 
                className="bg-[#375B42] hover:bg-[#245842]"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {t("addNewAddress")}
              </Button>
            )}
          </div>
          
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-medium mb-4">
                    {editingAddress ? t("editAddress") : t("form.title")}
                  </h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("form.name")}
                      </label>
                      <Input
                        {...register("name")}
                        placeholder={t("form.name")}
                        className="w-full"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("form.phoneNumber")}
                      </label>
                      <Input
                        {...register("phoneNumber")}
                        placeholder={t("form.phoneNumber")}
                        className="w-full"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("form.streetAddress")}
                      </label>
                      <Input
                        {...register("streetAddress")}
                        placeholder={t("form.streetAddress")}
                        className="w-full"
                      />
                      {errors.streetAddress && (
                        <p className="text-red-500 text-xs">{errors.streetAddress.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("form.apartment")}
                      </label>
                      <Input
                        {...register("apartment")}
                        placeholder={t("form.apartment")}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("form.city")}
                      </label>
                      <Input
                        {...register("city")}
                        placeholder={t("form.city")}
                        className="w-full"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs">{errors.city.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("form.state")}
                      </label>
                      <Input
                        {...register("state")}
                        placeholder={t("form.state")}
                        className="w-full"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs">{errors.state.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("form.postalCode")}
                      </label>
                      <Input
                        {...register("postalCode")}
                        placeholder={t("form.postalCode")}
                        className="w-full"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-xs">{errors.postalCode.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {t("form.country")}
                      </label>
                      <Input
                        {...register("country")}
                        placeholder={t("form.country")}
                        className="w-full"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs">{errors.country.message}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4 md:col-span-2">
                      <Checkbox 
                        id="isDefault" 
                        {...register("isDefault")} 
                      />
                      <label
                        htmlFor="isDefault"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t("form.isDefault")}
                      </label>
                    </div>
                    
                    <div className="md:col-span-2 flex gap-4 mt-6">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-[#375B42] hover:bg-[#245842]"
                      >
                        {isSubmitting ? "..." : t("form.saveAddress")}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={cancelForm}
                      >
                        {t("form.cancel")}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Default Address */}
          {defaultAddress && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <Home className="mr-2 h-5 w-5" />
                {t("defaultAddress")}
              </h2>
              
              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{defaultAddress.name}</p>
                    <div className="mt-1 text-gray-600 space-y-1">
                      <p>{defaultAddress.streetAddress}</p>
                      {defaultAddress.apartment && <p>{defaultAddress.apartment}</p>}
                      <p>
                        {defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}
                      </p>
                      <p>{defaultAddress.country}</p>
                      <p className="flex items-center mt-2">
                        <Phone className="mr-2 h-4 w-4" />
                        {defaultAddress.phoneNumber}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(defaultAddress)}
                      className="h-8"
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      {t("editAddress")}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDeleteConfirmId(defaultAddress.id)}
                      className="h-8 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      {t("deleteAddress")}
                    </Button>
                  </div>
                </div>
                
                {/* Delete confirmation */}
                <AnimatePresence>
                  {deleteConfirmId === defaultAddress.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 bg-red-50 p-3 rounded-lg"
                    >
                      <h4 className="font-medium text-red-700 mb-2">{t("deleteConfirmation.title")}</h4>
                      <p className="text-red-600 text-sm mb-3">{t("deleteConfirmation.message")}</p>
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setDeleteConfirmId(null)}
                          className="h-8"
                        >
                          <X className="mr-1 h-3 w-3" />
                          {t("deleteConfirmation.cancel")}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => confirmDelete(defaultAddress.id)}
                          className="h-8"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          {t("deleteConfirmation.confirm")}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
          
          {/* Additional Addresses */}
          {additionalAddresses.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                {t("additionalAddresses")}
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                {additionalAddresses.map(address => (
                  <div 
                    key={address.id} 
                    className="border border-gray-200 rounded-lg p-5"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{address.name}</p>
                        <div className="mt-1 text-gray-600 space-y-1">
                          <p>{address.streetAddress}</p>
                          {address.apartment && <p>{address.apartment}</p>}
                          <p>
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          <p>{address.country}</p>
                          <p className="flex items-center mt-2">
                            <Phone className="mr-2 h-4 w-4" />
                            {address.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setAsDefault(address.id)}
                        className="h-8"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {t("setAsDefault")}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(address)}
                        className="h-8"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        {t("editAddress")}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setDeleteConfirmId(address.id)}
                        className="h-8 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        {t("deleteAddress")}
                      </Button>
                    </div>
                    
                    {/* Delete confirmation */}
                    <AnimatePresence>
                      {deleteConfirmId === address.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-4 bg-red-50 p-3 rounded-lg"
                        >
                          <h4 className="font-medium text-red-700 mb-2">{t("deleteConfirmation.title")}</h4>
                          <p className="text-red-600 text-sm mb-3">{t("deleteConfirmation.message")}</p>
                          <div className="flex space-x-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setDeleteConfirmId(null)}
                              className="h-8"
                            >
                              <X className="mr-1 h-3 w-3" />
                              {t("deleteConfirmation.cancel")}
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => confirmDelete(address.id)}
                              className="h-8"
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              {t("deleteConfirmation.confirm")}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* No addresses message */}
          {addresses.length === 0 && !showAddForm && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">{t("noAddresses")}</p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-[#375B42] hover:bg-[#245842]"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {t("addNewAddress")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Bounded>
  )
} 