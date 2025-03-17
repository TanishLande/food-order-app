"use client"

import { useRouter } from "next/navigation"
import { CheckCircle, Home, UtensilsCrossed } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThankYouPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [showStamp, setShowStamp] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Ensure hydration is complete before rendering
  useEffect(() => {
    setMounted(true)
    // Trigger animations after component mounts
    setTimeout(() => setShowStamp(true), 300)
    setTimeout(() => setShowContent(true), 800)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen items-center justify-center p-4   transition-colors duration-300">
      <Card className="w-full max-w-md border border-gray-200  dark:border-gray-800 bg-slate-50 dark:bg-gray-900 shadow-xl transition-all duration-500">
        <CardHeader className="text-center relative pb-6">
          <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-500 ${showStamp ? 'scale-100' : 'scale-0'}`}>
            <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="h-9 w-9 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className={`mt-6 transform transition-all duration-500 ${showStamp ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Order Confirmed
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
              Your delicious meal from FlavorFusion is on its way
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className={`text-center transform transition-all duration-500 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="mb-6 rounded-lg bg-gray-100 dark:bg-gray-800 p-4 border-l-4 border-green-500 dark:border-green-600">
            <p className="text-md font-medium text-gray-800 dark:text-gray-200">
              Order #12345
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Estimated delivery: 30-45 minutes
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className={`relative ${showContent ? 'animate-bounce-once' : ''}`}>
              <div className="absolute -rotate-12 top-0 left-0 right-0 transform scale-110">
                <div className="text-4xl font-bold uppercase text-green-600/20 dark:text-green-500/20">
                  Thank You!
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 relative">
                We hope you enjoy your meal!
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className={`flex flex-col gap-4 pt-4 pb-6 transform transition-all duration-500 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium py-6 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={() => router.push("/menu")}
          >
            <UtensilsCrossed className="mr-2 h-5 w-5" />
            Browse Menu
          </Button>
          <Button
            variant="outline"
            className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 
                     hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100
                     font-medium py-6 transition-all duration-300"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Add this to your global CSS or a stylesheet
// @keyframes bounce-once {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
// }
// .animate-bounce-once {
//   animation: bounce-once 1s ease-in-out;
// }