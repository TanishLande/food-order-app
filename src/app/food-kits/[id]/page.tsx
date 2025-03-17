"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, ChevronRight, Clock, Minus, Plus, ShoppingBag, User } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

// Sample food kits data with ingredients
const foodKits = [
  {
    id: "1",
    name: "Family Dinner Kit",
    description: "Everything you need to prepare 4 delicious family dinners. Perfect for busy weeknights!",
    image: "https://images.unsplash.com/photo-1600585154493-996f26ec7d6e?auto=format&fit=crop&q=80&w=600&h=400",
    price: 89.99,
    servings: 4,
    mealsPerWeek: 4,
    prepTime: "30 min",
    features: [
      "Fresh, pre-portioned ingredients",
      "Step-by-step recipe cards",
      "Nutritionally balanced meals",
      "Customizable protein options",
    ],
    rating: 4.8,
    reviewCount: 256,
    ingredients: [
      { id: "i1", name: "Organic Chicken Breast", quantity: "1.5 lbs", price: 12.99, isRequired: true },
      { id: "i2", name: "Fresh Vegetables Mix", quantity: "2 lbs", price: 8.99, isRequired: true },
      { id: "i3", name: "Whole Grain Rice", quantity: "2 cups", price: 3.99, isRequired: true },
      { id: "i4", name: "Signature Spice Blend", quantity: "2 oz", price: 4.99, isRequired: true },
      { id: "i5", name: "Organic Herbs", quantity: "1 bunch", price: 2.99, isRequired: false },
      { id: "i6", name: "Premium Olive Oil", quantity: "4 oz", price: 5.99, isRequired: false },
      { id: "i7", name: "Artisanal Cheese", quantity: "8 oz", price: 7.99, isRequired: false },
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Season chicken with spice blend and let sit for 10 minutes.",
      "Chop vegetables into uniform pieces for even cooking.",
      "Cook rice according to package instructions.",
      "Sear chicken in a hot pan until golden brown on both sides.",
      "Add vegetables and continue cooking until tender.",
      "Serve chicken and vegetables over rice, garnished with fresh herbs."
    ]
  },
  {
    id: "2",
    name: "Vegetarian Delight Kit",
    description: "A selection of plant-based meals packed with flavor and nutrition. Perfect for vegetarians!",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600&h=400",
    price: 69.99,
    servings: 2,
    mealsPerWeek: 3,
    prepTime: "25 min",
    features: [
      "100% plant-based ingredients",
      "High-protein meat alternatives",
      "Globally inspired recipes",
      "Seasonal organic produce",
    ],
    rating: 4.7,
    reviewCount: 189,
    ingredients: [
      { id: "i8", name: "Plant-Based Protein Mix", quantity: "1 lb", price: 9.99, isRequired: true },
      { id: "i9", name: "Organic Vegetable Medley", quantity: "2 lbs", price: 7.99, isRequired: true },
      { id: "i10", name: "Quinoa", quantity: "1.5 cups", price: 4.99, isRequired: true },
      { id: "i11", name: "Vegan Sauce Pack", quantity: "8 oz", price: 6.99, isRequired: true },
      { id: "i12", name: "Fresh Herbs", quantity: "1 bunch", price: 2.99, isRequired: false },
      { id: "i13", name: "Nutritional Yeast", quantity: "2 oz", price: 3.99, isRequired: false },
      { id: "i14", name: "Organic Avocados", quantity: "2 count", price: 4.99, isRequired: false },
    ],
    instructions: [
      "Rinse quinoa thoroughly and cook according to package instructions.",
      "Prepare plant-based protein according to package directions.",
      "Chop vegetables into bite-sized pieces.",
      "Heat a large pan and sauté vegetables until tender-crisp.",
      "Add cooked protein and sauce, stirring to combine.",
      "Serve over quinoa and garnish with fresh herbs and nutritional yeast.",
      "Add sliced avocado on top if desired."
    ]
  },
  {
    id: "3",
    name: "Quick & Easy Kit",
    description: "Delicious meals ready in 20 minutes or less. Perfect for busy professionals!",
    image: "https://images.unsplash.com/photo-1528736235302-4b8926970b8d?auto=format&fit=crop&q=80&w=600&h=400",
    price: 59.99,
    servings: 2,
    mealsPerWeek: 3,
    prepTime: "15 min",
    features: [
      "Pre-chopped ingredients",
      "One-pot and sheet pan recipes",
      "Minimal cleanup required",
      "No complex cooking techniques",
    ],
    rating: 4.9,
    reviewCount: 312,
    ingredients: [
      { id: "i15", name: "Pre-Cooked Protein Packs", quantity: "12 oz", price: 10.99, isRequired: true },
      { id: "i16", name: "Pre-Cut Vegetable Mix", quantity: "1.5 lbs", price: 6.99, isRequired: true },
      { id: "i17", name: "Instant Grain Pouches", quantity: "3 count", price: 7.99, isRequired: true },
      { id: "i18", name: "Gourmet Sauce Packets", quantity: "6 oz", price: 5.99, isRequired: true },
      { id: "i19", name: "Seasoning Blend", quantity: "1.5 oz", price: 3.99, isRequired: false },
      { id: "i20", name: "Microwave Steamer Bags", quantity: "3 count", price: 2.99, isRequired: false },
      { id: "i21", name: "Garnish Kit", quantity: "1 set", price: 4.99, isRequired: false },
    ],
    instructions: [
      "Heat pre-cooked protein according to package instructions.",
      "Steam vegetables using provided steamer bags or in a microwave-safe dish.",
      "Heat grain pouches according to package directions.",
      "Combine protein, vegetables, and grains in a bowl.",
      "Add sauce and seasoning, mixing well to combine.",
      "Garnish as desired and serve immediately.",
      "Entire meal can be prepared in under 20 minutes!"
    ]
  }
]

// Define props type for params
type FoodKitDetailPageProps = {
  params: { id: string }
}

export default function FoodKitDetailPage({ params }: FoodKitDetailPageProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, boolean>>({})
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      additionalInfo: "" // Optional field, no validation required
    },
    paymentMethod: "credit-card" as const,
    deliveryOption: "standard" as "standard" | "express"
  })
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Find the food kit with the matching ID
  const foodKit = foodKits.find(kit => kit.id === params.id)
  
  // Handle case where food kit is not found
  if (!foodKit) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Food Kit Not Found</h1>
        <p className="mt-4 text-muted-foreground">The food kit you are looking for does not exist or has been removed.</p>
        <Button asChild className="mt-8">
          <Link href="/food-kits">Back to Food Kits</Link>
        </Button>
      </div>
    )
  }

  // Initialize selected ingredients if not already done
  if (Object.keys(selectedIngredients).length === 0 && foodKit.ingredients.length > 0) {
    const initialIngredients: Record<string, boolean> = {}
    foodKit.ingredients.forEach(ingredient => {
      initialIngredients[ingredient.id] = ingredient.isRequired
    })
    setSelectedIngredients(initialIngredients)
  }

  // Calculate total price based on selected ingredients
  const calculateTotal = () => {
    let total = 0
    foodKit.ingredients.forEach(ingredient => {
      if (selectedIngredients[ingredient.id]) {
        total += ingredient.price
      }
    })
    return total * quantity
  }

  const handleIngredientToggle = (ingredientId: string) => {
    const ingredient = foodKit.ingredients.find(i => i.id === ingredientId)
    
    // Don't allow deselecting required ingredients
    if (ingredient?.isRequired) return
    
    setSelectedIngredients(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId]
    }))
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setCustomerInfo(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Validation for required fields
    const { email, address } = customerInfo
    const requiredFields = {
      "Email": email,
      "Street Address": address.street,
      "City": address.city,
      "State": address.state,
      "Zip Code": address.zipCode
    }

    // Check for empty required fields
    for (const [fieldName, value] of Object.entries(requiredFields)) {
      if (!value.trim()) {
        toast.error(`${fieldName} is required. Please fill it out.`)
        setIsSubmitting(false)
        return
      }
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.")
      setIsSubmitting(false)
      return
    }

    // Basic zip code validation (assuming 5 digits for simplicity)
    const zipRegex = /^\d{5,}$/
    if (!zipRegex.test(address.zipCode)) {
      toast.error("Zip Code must be a 5-digit number.")
      setIsSubmitting(false)
      return
    }

    try {
      // Prepare order items from selected ingredients
      const items = foodKit.ingredients
        .filter(ingredient => selectedIngredients[ingredient.id])
        .map(ingredient => ({
          name: ingredient.name,
          quantity: quantity,
          price: ingredient.price
        }))

      // Calculate delivery time based on option
      const deliveryTime = customerInfo.deliveryOption === 'express' ? '1-2 hours' : '2-3 days'
      
      // Prepare order request
      const orderRequest = {
        customerEmail: customerInfo.email,
        items,
        address: customerInfo.address,
        total: calculateTotal(),
        paymentMethod: customerInfo.paymentMethod,
        deliveryOption: customerInfo.deliveryOption,
        deliveryTime
      }

      // Send order to API
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderRequest)
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      // Show success message and redirect
      toast.success("Order Placed Successfully!")
      router.push('/order-confirmation')
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error("Error placing order.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6 flex items-center gap-1">
        <Link href="/food-kits">
          <ArrowLeft className="h-4 w-4" />
          Back to Food Kits
        </Link>
      </Button>
      
      {step === 1 ? (
        <>
          {/* Food Kit Details */}
          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={foodKit.image || "/placeholder.svg"}
                alt={foodKit.name}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {foodKit.servings} servings • {foodKit.mealsPerWeek} meals/week
                </Badge>
                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{foodKit.name}</h1>
                <p className="mb-6 text-lg text-muted-foreground">{foodKit.description}</p>
                
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                    <Clock className="mb-1 h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Prep Time</span>
                    <span className="font-medium">{foodKit.prepTime}</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                    <User className="mb-1 h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Servings</span>
                    <span className="font-medium">{foodKit.servings}</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                    <ShoppingBag className="mb-1 h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Meals</span>
                    <span className="font-medium">{foodKit.mealsPerWeek}/week</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold">Features</h3>
                  <ul className="space-y-2">
                    {foodKit.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 text-green-500 dark:text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">Total Price</span>
                  <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setStep(2)}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Ingredients Selection */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Customize Your Ingredients</h2>
            <p className="mb-6 text-muted-foreground">
              Select the ingredients you want included in your food kit. Required ingredients cannot be deselected.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {foodKit.ingredients.map((ingredient) => (
                <Card key={ingredient.id} className={`border ${selectedIngredients[ingredient.id] ? 'border-primary' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id={ingredient.id}
                        checked={selectedIngredients[ingredient.id] || false}
                        onCheckedChange={() => handleIngredientToggle(ingredient.id)}
                        disabled={ingredient.isRequired}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor={ingredient.id}
                          className="flex cursor-pointer items-center justify-between font-medium"
                        >
                          <span>{ingredient.name}</span>
                          <span>${ingredient.price.toFixed(2)}</span>
                        </Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {ingredient.quantity}
                          {ingredient.isRequired && (
                            <Badge variant="outline" className="ml-2 bg-primary/10 text-xs">Required</Badge>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Cooking Instructions */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Cooking Instructions</h2>
            <ol className="space-y-4">
              {foodKit.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {index + 1}
                  </span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : (
        <>
          {/* Checkout Form */}
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-center text-3xl font-bold">Complete Your Order</h1>
            
            <div className="mb-8 rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <div className="mb-4 space-y-2">
                {foodKit.ingredients
                  .filter(ingredient => selectedIngredients[ingredient.id])
                  .map(ingredient => (
                    <div key={ingredient.id} className="flex items-center justify-between">
                      <span>{ingredient.name} ({ingredient.quantity})</span>
                      <span>${(ingredient.price * quantity).toFixed(2)}</span>
                    </div>
                  ))}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address <span className="text-red-500">*</span></Label>
                  <Input 
                    id="street" 
                    name="address.street" 
                    placeholder="123 Main St" 
                    value={customerInfo.address.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                    <Input 
                      id="city" 
                      name="address.city" 
                      placeholder="City" 
                      value={customerInfo.address.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                    <Input 
                      id="state" 
                      name="address.state" 
                      placeholder="State" 
                      value={customerInfo.address.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code <span className="text-red-500">*</span></Label>
                  <Input 
                    id="zipCode" 
                    name="address.zipCode" 
                    placeholder="12345" 
                    value={customerInfo.address.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                  <Textarea 
                    id="additionalInfo" 
                    name="address.additionalInfo" 
                    placeholder="Apartment number, delivery instructions, etc." 
                    value={customerInfo.address.additionalInfo}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup 
                    defaultValue={customerInfo.paymentMethod}
                    onValueChange={(value) => handleRadioChange('paymentMethod', value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label>Delivery Option</Label>
                  <RadioGroup 
                    defaultValue={customerInfo.deliveryOption}
                    onValueChange={(value) => handleRadioChange('deliveryOption', value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard Delivery (2-3 days)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">Express Delivery (1-2 hours)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="gap-4">
                <div className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full mb-4"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}