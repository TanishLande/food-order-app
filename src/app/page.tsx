"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock, Star, Truck, UtensilsCrossed, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const addCart = () => {
    if(!isSignedIn){
      router.push('/sign-in');
    } else {
      router.push("/menu");
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative mx-auto flex max-w-screen-xl flex-col items-center px-4 py-32 text-center lg:py-48">
          <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20" variant="secondary">
            Premium Meal Delivery Service
          </Badge>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Culinary Excellence,
            <br />
            Delivered to Your Door
          </h1>
          <p className="mb-8 max-w-xl text-lg text-white/90 md:text-xl">
            Experience restaurant-quality dining at home with our premium ingredients and chef-crafted recipes,
            delivered with precision and care.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 cursor-pointer"
              onClick={() => router.push('/menu')}
            >
              Explore Our Menu
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 bg-transparent text-white hover:bg-white/10 cursor-pointer"
              onClick={() => router.push('/food-kits')}
            >
              View Signature Kits
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80"
            alt="Elegant plated dish"
            fill
            priority
            className="object-cover rounded-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-50 dark:bg-zinc-950 py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              The FlavorFusion Difference
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We combine culinary expertise with premium ingredients to deliver an unparalleled dining experience.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group overflow-hidden border-0 shadow-lg">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80"
                  alt="Fresh organic ingredients"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-col items-center p-8 text-center">
                <UtensilsCrossed className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-serif text-2xl font-bold">Artisanal Quality</h3>
                <p className="text-muted-foreground">
                  Hand-selected premium ingredients sourced from local artisans and trusted suppliers.
                </p>
              </CardContent>
            </Card>
            <Card className="group overflow-hidden border-0 shadow-lg">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&q=80"
                  alt="Premium delivery service"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Truck className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-serif text-2xl font-bold">White Glove Delivery</h3>
                <p className="text-muted-foreground">
                  Temperature-controlled delivery ensuring restaurant-quality freshness at your doorstep.
                </p>
              </CardContent>
            </Card>
            <Card className="group overflow-hidden border-0 shadow-lg">
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&q=80"
                  alt="Professional chef service"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-col items-center p-8 text-center">
                <Star className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-serif text-2xl font-bold">Culinary Excellence</h3>
                <p className="text-muted-foreground">
                  Recipes crafted by Michelin-trained chefs, bringing fine dining to your home kitchen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4">Featured Selection</Badge>
            <h2 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">Signature Dishes</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover our most celebrated creations, each dish a perfect harmony of flavor and presentation.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: "1",
                name: "Mediterranean Abundance Bowl",
                description: "House-made hummus, za'atar-spiced falafel, ancient grains, and tahini",
                price: 24.99,
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80",
                prepTime: "20 min",
                category: "Plant-Based",
              },
              {
                id: "2",
                name: "Wild-Caught Salmon",
                description: "Citrus-glazed salmon, seasonal vegetables, herb-infused quinoa",
                price: 32.99,
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80",
                prepTime: "25 min",
                category: "Seafood",
              },
              {
                id: "3",
                name: "Truffle Pesto Pasta",
                description: "Artisanal pasta, black truffle pesto, aged parmesan, pine nuts",
                price: 28.99,
                image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80",
                prepTime: "30 min",
                category: "Pasta",
              },
              {
                id: "4",
                name: "Heritage Grain Toast",
                description: "Organic avocado, heirloom tomatoes, microgreens, poached egg",
                price: 18.99,
                image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80",
                prepTime: "15 min",
                category: "Breakfast",
              },
            ].map((item) => (
              <Card key={item.id} className="group overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
                <div className="aspect-square w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center justify-between dark:text-black">
                    <Badge variant="secondary" className="bg-zinc-100 dark:text-black">
                      {item.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {item.prepTime}
                    </div>
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-bold">{item.name}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                    <Button size="sm" className="bg-black text-white hover:bg-black/90 cursor-pointer" onClick={addCart}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-black/90">
              <Link href="/menu">
                Browse Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-zinc-50 dark:bg-zinc-950 py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">Voices of Satisfaction</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Join our community of food enthusiasts who have discovered the joy of premium home dining.
            </p>
          </div>
          <TestimonialCarousel
            testimonials={[
              {
                name: "Sarah Johnson",
                comment:
                  "The attention to detail in ingredient selection and recipe curation is unmatched. Every meal feels like a fine dining experience.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
              },
              {
                name: "Michael Chen",
                comment:
                  "As a professional chef, I'm impressed by the quality and freshness. FlavorFusion has mastered the art of home delivery dining.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
              },
              {
                name: "Emily Rodriguez",
                comment:
                  "The recipes are innovative yet approachable. I've expanded my culinary horizons while maintaining the comfort of cooking at home.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
              },
              {
                name: "David Wilson",
                comment:
                  "The quality of ingredients and precision of portion control has transformed our family dinners into gourmet experiences.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&q=80"
            alt="Elegant dining setup"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-white bg-white/10 text-white hover:bg-white/20">Limited Time Offer</Badge>
            <h2 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Elevate Your Dining Experience
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Join today and receive a complimentary wine pairing with your first order.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              Start Your Culinary Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}