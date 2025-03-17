"use client"

import { useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { ChevronLeft, CreditCard, MapPin, ShoppingBag, Truck } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-provider"

export default function CheckoutPage() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    additionalInfo: ""
  })
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [deliveryOption, setDeliveryOption] = useState("standard")

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in")
    }
  }, [isSignedIn, router])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = deliveryOption === "standard" ? 4.99 : 7.99
  const tax = subtotal * 0.07
  const total = subtotal + shippingFee + tax

  const handleAddressChange = (e: any) => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
  }

  const sendOrderEmails = async () => {
    const orderDetails = {
      customerEmail: user?.primaryEmailAddress?.emailAddress,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      address,
      total,
      paymentMethod,
      deliveryOption,
      deliveryTime: deliveryOption === "standard" ? "45-60 minutes" : "30 minutes"
    }

    try {
      const response = await fetch('/api/order-mailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      })

      if (!response.ok) {
        throw new Error('Failed to send order emails')
      }
    } catch (error) {
      console.error('Email error:', error)
      toast.error("Failed to send order confirmation email")
    }
  }

  const handleCheckout = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Send order confirmation emails
      await sendOrderEmails()
      
      toast.success("Order placed successfully!")
      clearCart()
      router.push("/order-confirmation")
    } catch (error) {
      toast.error("An error occurred while processing your order", {error})
    } finally {
      setLoading(false)
    }
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="container py-8 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/menu">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Menu
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="mb-4 space-y-3">
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shippingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Complete Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckout}>
                <div className="mb-6">
                  <h3 className="mb-4 flex items-center text-lg font-medium">
                    <MapPin className="mr-2 h-5 w-5" />
                    Delivery Address
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="street" className="mb-2">Street Address</Label>
                      <Input 
                        id="street" 
                        name="street" 
                        value={address.street} 
                        onChange={handleAddressChange} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="mb-2">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={address.city} 
                        onChange={handleAddressChange} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="mb-2">State</Label>
                      <Input 
                        id="state" 
                        name="state" 
                        value={address.state} 
                        onChange={handleAddressChange} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="mb-2">ZIP Code</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode" 
                        value={address.zipCode} 
                        onChange={handleAddressChange} 
                        required 
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="additionalInfo" className="mb-2">Additional Information (optional)</Label>
                      <Textarea 
                        id="additionalInfo" 
                        name="additionalInfo" 
                        value={address.additionalInfo} 
                        onChange={handleAddressChange} 
                        placeholder="Apartment number, delivery instructions, etc."
                        className="resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-4 flex items-center text-lg font-medium">
                    <Truck className="mr-2 h-5 w-5" />
                    Delivery Options
                  </h3>
                  <RadioGroup 
                    value={deliveryOption} 
                    onValueChange={setDeliveryOption} 
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="font-medium">Standard Delivery</div>
                        <div className="text-sm text-muted-foreground">Delivery within 45-60 minutes</div>
                      </Label>
                      <span>$4.99</span>
                    </div>
                    <div className="flex items-center space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="font-medium">Express Delivery</div>
                        <div className="text-sm text-muted-foreground">Delivery within 30 minutes</div>
                      </Label>
                      <span>$7.99</span>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mb-8">
                  <h3 className="mb-4 flex items-center text-lg font-medium">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Method
                  </h3>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod} 
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="cursor-pointer">
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading || items.length === 0}
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}