import Image from "next/image"
import { Award, Leaf, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-900/90 to-sage-800/70" />
        <div className="relative mx-auto flex max-w-screen-xl flex-col items-center px-4 py-16 text-center md:py-24">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">Our Story</h1>
          <p className="mb-8 max-w-2xl text-lg text-white/90">
            FlavorFusion Food Bliss was founded with a simple mission: to make healthy, delicious meals accessible to
            everyone, while supporting sustainable food practices.
          </p>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Our kitchen team"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
              <p className="mb-6 text-muted-foreground">
                At FlavorFusion, we believe that good food should be accessible to everyone. Our mission is to provide
                fresh, nutritious meals that are easy to prepare and delicious to eat.
              </p>
              <p className="mb-6 text-muted-foreground">
                We work directly with local farmers and suppliers to source the freshest ingredients, ensuring that
                every meal kit and recipe we provide is of the highest quality.
              </p>
              <p className="text-muted-foreground">
                Our team of expert chefs carefully crafts each recipe to be both nutritionally balanced and bursting
                with flavor, making healthy eating a joy rather than a chore.
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Fresh ingredients"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-muted/30 py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              These core principles guide everything we do at FlavorFusion Food Bliss.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Quality",
                description:
                  "We never compromise on the quality of our ingredients. From farm to table, we ensure that only the best makes it to your kitchen.",
                icon: Award,
              },
              {
                title: "Sustainability",
                description:
                  "We're committed to sustainable practices, from eco-friendly packaging to supporting local farmers who use responsible growing methods.",
                icon: Leaf,
              },
              {
                title: "Transparency",
                description:
                  "We believe in being open about where our food comes from and how it's prepared. No hidden ingredients, no surprises.",
                icon: ShieldCheck,
              },
            ].map((value, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <value.icon className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              The passionate people behind FlavorFusion Food Bliss who make it all happen.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Chef Maria Rodriguez",
                role: "Executive Chef",
                bio: "With over 15 years of experience in fine dining, Maria brings her culinary expertise to create our delicious recipes.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "James Chen",
                role: "Nutrition Specialist",
                bio: "James ensures that all our meals are nutritionally balanced while never compromising on taste.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Sarah Johnson",
                role: "Sourcing Director",
                bio: "Sarah works directly with local farmers to source the freshest, highest-quality ingredients for our meal kits.",
                image: "/placeholder.svg?height=400&width=400",
              },
              {
                name: "Michael Brown",
                role: "Operations Manager",
                bio: "Michael ensures that your orders are processed efficiently and delivered to your door on time, every time.",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square w-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="mb-1 text-lg font-bold">{member.name}</h3>
                  <p className="mb-2 text-sm font-medium text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="bg-muted/30 py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Journey</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From a small kitchen to a nationwide service, here is how FlavorFusion Food Bliss has grown.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              {[
                {
                  year: "2015",
                  title: "The Beginning",
                  description:
                    "FlavorFusion started as a small meal prep service operating out of a tiny kitchen, serving just 20 customers a week.",
                },
                {
                  year: "2017",
                  title: "Expanding Our Reach",
                  description:
                    "We moved to a larger facility and expanded our delivery area, reaching more customers with our fresh meal kits.",
                },
                {
                  year: "2019",
                  title: "Sustainability Focus",
                  description:
                    "We implemented eco-friendly packaging and strengthened our partnerships with local, sustainable farms.",
                },
                {
                  year: "2021",
                  title: "Digital Transformation",
                  description:
                    "We launched our new website and mobile app, making it easier than ever for customers to order and customize their meals.",
                },
                {
                  year: "2023",
                  title: "Nationwide Service",
                  description:
                    "We expanded our operations to serve customers across the country, bringing fresh, delicious meals to more homes than ever.",
                },
              ].map((milestone, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {index + 1}
                    </div>
                    {index < 4 && <div className="h-full w-0.5 bg-border" />}
                  </div>
                  <div className="pb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-muted-foreground">{milestone.year}</span>
                      <h3 className="text-xl font-bold">{milestone.title}</h3>
                    </div>
                    <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Join Our Culinary Journey</h2>
            <p className="mb-8 text-lg text-primary-foreground/90">
              Experience the FlavorFusion difference today. Fresh ingredients, delicious recipes, and a healthier
              lifestyle await.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Browse Our Menu
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn About Food Kits
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

