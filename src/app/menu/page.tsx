"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Filter, Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/components/cart-provider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

// Enhanced menu data with better images and descriptions
const menuItems = [
  {
    id: "1",
    name: "Mediterranean Abundance Bowl",
    description: "House-made hummus, za'atar-spiced falafel, ancient grains, fresh vegetables, and tahini drizzle",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80",
    prepTime: "20 min",
    category: "Bowls",
    dietary: ["Vegetarian", "Vegan"],
    featured: true,
  },
  {
    id: "2",
    name: "Wild-Caught Citrus Salmon",
    description: "Sustainably sourced salmon, citrus-herb glaze, seasonal vegetables, quinoa pilaf",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80",
    prepTime: "25 min",
    category: "Mains",
    dietary: ["Gluten-Free", "High-Protein"],
    featured: true,
  },
  {
    id: "3",
    name: "Truffle Pesto Pasta",
    description: "Artisanal pasta, black truffle pesto, aged parmesan, toasted pine nuts, fresh basil",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80",
    prepTime: "25 min",
    category: "Pasta",
    dietary: ["Vegetarian"],
  },
  {
    id: "4",
    name: "Heritage Grain Avocado Toast",
    description: "Organic avocado, heirloom tomatoes, poached egg, microgreens on artisanal sourdough",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80",
    prepTime: "15 min",
    category: "Breakfast",
    dietary: ["Vegetarian"],
  },
  {
    id: "5",
    name: "Ancient Grain Quinoa Bowl",
    description: "Tri-color quinoa, roasted vegetables, feta, pomegranate seeds, citrus vinaigrette",
    price: 23.99,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80",
    prepTime: "20 min",
    category: "Bowls",
    dietary: ["Vegetarian", "Gluten-Free"],
  },
  {
    id: "6",
    name: "Grass-Fed Beef Tenderloin",
    description: "Premium beef, truffle butter, roasted root vegetables, red wine reduction",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&q=80",
    prepTime: "30 min",
    category: "Mains",
    dietary: ["High-Protein"],
    featured: true,
  },
  {
    id: "7",
    name: "Garden Fresh Wrap",
    description: "Spinach tortilla, grilled vegetables, house-made hummus, quinoa, herb dressing",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80",
    prepTime: "15 min",
    category: "Wraps",
    dietary: ["Vegetarian", "Vegan"],
  },
  {
    id: "8",
    name: "Artisanal Acai Bowl",
    description: "Organic acai, seasonal berries, banana, house-made granola, honey drizzle",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80",
    prepTime: "10 min",
    category: "Breakfast",
    dietary: ["Vegetarian", "Gluten-Free"],
  },
]

const categories = ["All", "Breakfast", "Bowls", "Mains", "Pasta", "Wraps"]
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "High-Protein"]

export default function MenuPage() {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const { isSignedIn } = useAuth();
  const router =  useRouter();

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesDietary = selectedDietary.length === 0 || selectedDietary.every((diet) => item.dietary.includes(diet))

    return matchesSearch && matchesCategory && matchesDietary
  })

  // Sort menu items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "prep-time") return Number.parseInt(a.prepTime) - Number.parseInt(b.prepTime)
    // For recommended, show featured items first
    if (sortBy === "recommended") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    return 0
  })

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    if(!isSignedIn){
      router.push("/sign-in");
      return;
    }
    
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
  }

  const toggleDietaryFilter = (diet: string) => {
    setSelectedDietary((prev) => (prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]))
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-12">
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">Curated Menu</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Discover our chef-crafted selection of premium dishes, featuring locally sourced ingredients and innovative
          culinary techniques. Each dish is thoughtfully prepared to deliver an exceptional dining experience.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4 rounded-xl bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search our menu..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Recommended</span>
                </div>
              </SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="prep-time">Preparation Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1 text-sm">
            <Filter className="h-3 w-3" /> Dietary Preferences
          </Badge>
          {dietaryOptions.map((diet) => (
            <Badge
              key={diet}
              variant={selectedDietary.includes(diet) ? "default" : "outline"}
              className="cursor-pointer transition-colors hover:bg-primary/90"
              onClick={() => toggleDietaryFilter(diet)}
            >
              {diet}
            </Badge>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="mb-4 flex w-full flex-wrap justify-start gap-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Menu Items Grid */}
      {sortedItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-0 bg-card shadow-md transition-all hover:shadow-xl dark:shadow-lg dark:hover:shadow-xl dark:hover:shadow-primary/5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.featured && (
                  <Badge className="absolute right-2 top-2 bg-primary/90 text-primary-foreground">
                    <Sparkles className="mr-1 h-3 w-3" /> Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {item.category}
                  </Badge>
                  {item.dietary.map((diet) => (
                    <Badge key={diet} variant="outline" className="text-xs">
                      {diet}
                    </Badge>
                  ))}
                </div>
                <div className="mb-2 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {item.prepTime}
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold">{item.name}</h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card p-12 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-secondary p-3">
            <Search className="h-6 w-6 text-secondary-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-medium">No matches found</h3>
          <p className="mb-6 max-w-md text-muted-foreground">
            We could not find any dishes matching your criteria. Try adjusting your filters or search term.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("All")
              setSelectedDietary([])
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}