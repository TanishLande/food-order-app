"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight, Clock, ShoppingBag, Star } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TestimonialCarousel } from "@/components/testimonial-carousel"

// Sample food kits data with Unsplash images
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
  },
]

export default function FoodKitsPage() {
  // Fallback image in public folder
  const fallbackImage = "/placeholder.jpg"

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-900/90 to-sage-800/70 dark:from-background/80 dark:to-background/60" />
        <div className="relative mx-auto flex max-w-screen-xl flex-col items-center px-4 py-16 text-center text-white md:py-24">
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Meal Kits Delivered to Your Door
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/90 dark:text-muted-foreground/90">
            Everything you need to cook delicious, nutritious meals at home. Fresh ingredients, pre-portioned and ready
            to cook.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1600585154539-6b9e52c3d2e6?auto=format&fit=crop&q=80&w=1600&h=800"
            alt="Fresh meal kit ingredients"
            fill
            priority
            className="object-cover opacity-50"
            onError={(e) => ((e.target as HTMLImageElement).src = fallbackImage)}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Getting started with our meal kits is easy. Just follow these simple steps.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Choose Your Plan",
                description: "Select the meal plan that fits your lifestyle, dietary preferences, and household size.",
                icon: ShoppingBag,
              },
              {
                title: "Receive Your Delivery",
                description: "Your meal kit arrives at your doorstep in eco-friendly packaging with fresh ingredients.",
                icon: Truck,
              },
              {
                title: "Cook & Enjoy",
                description: "Follow our simple recipe cards to prepare delicious meals in 30 minutes or less.",
                icon: UtensilsCrossed,
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="relative overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <CardContent className="flex flex-col items-center p-6 pt-12 text-center">
                  <step.icon className="mb-4 h-12 w-12 text-primary transition-transform duration-300 hover:scale-110" />
                  <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Food Kits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Our Food Kits</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Choose from our selection of carefully curated meal kits, designed to suit different tastes and dietary
              needs.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {foodKits.map((kit) => {
              const [imageLoaded, setImageLoaded] = React.useState(false)
              const handleImageError = () => setImageLoaded(false)

              return (
                <Card
                  key={kit.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={kit.image}
                      alt={kit.name}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={handleImageError}
                      onLoad={() => setImageLoaded(true)}
                      style={{ display: imageLoaded ? "block" : "none" }}
                    />
                    {!imageLoaded && (
                      <Image
                        src={fallbackImage}
                        alt={`${kit.name} fallback`}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge className="bg-primary text-primary-foreground">${kit.price.toFixed(2)}</Badge>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{kit.rating}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({kit.reviewCount})</span>
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{kit.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{kit.description}</p>
                    <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{kit.servings} servings</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{kit.mealsPerWeek} meals/week</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{kit.prepTime} prep</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {kit.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-6">
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href={`/food-kits/${kit.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">What Our Customers Say</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Don’t just take our word for it. Here’s what our satisfied customers have to say about our food kits.
            </p>
          </div>
          <TestimonialCarousel
            testimonials={[
              {
                name: "Emily Johnson",
                comment:
                  "The meal kits have transformed our family dinners. The recipes are easy to follow and my kids love helping out in the kitchen!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
                location: "New York, NY",
              },
              {
                name: "Michael Chen",
                comment:
                  "As a busy professional, these meal kits have been a game-changer. I can now enjoy home-cooked meals without spending hours in the kitchen.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
                location: "San Francisco, CA",
              },
              {
                name: "Sarah Williams",
                comment:
                  "The vegetarian options are amazing! I've discovered so many new flavors and ingredients that I wouldn't have tried otherwise.",
                rating: 4,
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100",
                location: "Chicago, IL",
              },
              {
                name: "James Peterson",
                comment:
                  "The quality of ingredients is exceptional. Everything arrives fresh and the packaging is environmentally friendly too!",
                rating: 5,
                image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=100&h=100",
                location: "Austin, TX",
              },
              {
                name: "Olivia Martinez",
                comment:
                  "I love how the recipe cards include tips and tricks from professional chefs. I've become a much better cook since using FlavorFusion.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100&h=100",
                location: "Miami, FL",
              },
              {
                name: "Daniel Kim",
                comment:
                  "The portion sizes are perfect and there's never any food waste. Plus, the variety keeps mealtime exciting!",
                rating: 4,
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100",
                location: "Seattle, WA",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to Transform Your Meals?</h2>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/90">
              Join thousands of satisfied customers and start enjoying fresh, delicious meals today.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Custom SVG icons (unchanged from your original code)
function Truck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17h4V5H2v12h3" />
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
      <path d="M14 17h1" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}

function UtensilsCrossed(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
      <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
      <path d="m2.1 21.8 6.4-6.3" />
      <path d="m19 5-7 7" />
    </svg>
  )
}

function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function Calendar(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}