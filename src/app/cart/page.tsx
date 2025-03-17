"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const shipping = 4.99
  const discount = isPromoApplied ? totalPrice * 0.1 : 0
  const total = totalPrice + shipping - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setIsPromoApplied(true)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center md:px-6 md:py-24">
        <div className="mb-4 rounded-full bg-muted p-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Looks like you have not added any items to your cart yet. Browse our menu to find delicious meals.
        </p>
        <Button asChild size="lg">
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link
          href="/menu"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Continue Shopping
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Your Cart</h1>
        <p className="text-muted-foreground">
          You have {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {items.map((item: any) => (
                <div key={item.id} className="mb-6 flex flex-col sm:flex-row">
                  <div className="mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-md border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="promo-code">Promo Code</Label>
                <div className="mt-1 flex gap-2">
                  <Input
                    id="promo-code"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e: any) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromo} disabled={isPromoApplied || !promoCode}>
                    Apply
                  </Button>
                </div>
                {isPromoApplied && <p className="mt-2 text-sm text-green-600">Promo code applied successfully!</p>}
                {promoCode && !isPromoApplied && (
                  <p className="mt-2 text-sm text-muted-foreground">Try code: &posWELCOME10&pos for 10% off</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t p-6">
              <Button className="w-full" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

