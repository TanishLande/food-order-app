"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChefHat, Menu, X } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { CartSheet } from "./cart-sheet"

const routes = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Recipes", path: "/recipes" },
  { name: "Food Kits", path: "/food-kits" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { isSignedIn } = useAuth()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ChefHat className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">FlavorFusion</span>
        </Link>

        <nav className="hidden md:flex gap-6 lg:gap-10">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.path ? "text-primary" : "text-muted-foreground"
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {/* Conditionally render CartSheet only if authenticated */}
          {isSignedIn && <CartSheet />}
          {/* Conditionally render UserButton or Login button */}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm transition-all duration-200 hover:shadow-md md:px-6 md:py-2 md:text-base"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 pr-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ChefHat className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold">FlavorFusion</span>
                  </Link>
                  <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4 ">
                  {routes.map((route) => (
                    <SheetClose asChild key={route.path}>
                      <Link
                        href={route.path}
                        className={cn(
                          "text-base font-medium transition-colors hover:text-primary",
                          pathname === route.path ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {route.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}