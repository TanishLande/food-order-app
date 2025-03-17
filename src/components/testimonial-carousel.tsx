"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Testimonial = {
  name: string
  comment: string
  rating: number
  image: string
  location?: string
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  // Duplicate testimonials to create a seamless loop
  const allTestimonials = [...testimonials, ...testimonials]
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Set initial position
    container.style.transform = "translateX(0)"

    const animateScroll = () => {
      // Get container width
      const containerWidth = container.scrollWidth / 2
      let currentTranslate = 0
      let startTime: number | null = null

      // Animation duration (30 seconds to scroll through all testimonials)
      const duration = 30000

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime

        // Calculate how far to scroll based on elapsed time
        currentTranslate = (elapsed / duration) * containerWidth

        // Reset when we've scrolled through all testimonials
        if (currentTranslate >= containerWidth) {
          startTime = timestamp
          currentTranslate = 0
        }

        container.style.transform = `translateX(-${currentTranslate}px)`
        animationRef.current = requestAnimationFrame(step)
      }

      const animationRef = { current: requestAnimationFrame(step) }

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }

    const cleanup = animateScroll()

    return () => {
      if (cleanup) cleanup()
    }
  }, [testimonials.length])

  return (
    <div className="relative overflow-hidden w-full">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent"></div>
      <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent"></div>

      {/* Testimonial container */}
      <div
        ref={containerRef}
        className="flex transition-transform duration-1000 ease-linear"
        style={{ width: `${allTestimonials.length * 100}%` }}
      >
        {allTestimonials.map((testimonial, index) => (
          <div key={index} className="px-4" style={{ width: `${100 / allTestimonials.length}%` }}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 flex-1 text-muted-foreground">{testimonial.comment}</p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location || "Verified Customer"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

