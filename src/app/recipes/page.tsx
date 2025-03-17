import Image from "next/image"
import Link from "next/link"
import { Clock, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Sample recipes data
const recipes = [
  {
    id: "1",
    title: "Mediterranean Quinoa Bowl",
    description: "A nutritious bowl packed with Mediterranean flavors, perfect for a quick lunch or dinner.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600&h=400", // Updated to a vibrant Mediterranean dish
    prepTime: "20 min",
    cookTime: "15 min",
    difficulty: "Easy",
    servings: 2,
    category: "Lunch",
    tags: ["Vegetarian", "High-Protein", "Mediterranean"],
    author: "Chef Maria",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "2",
    title: "Lemon Herb Grilled Salmon",
    description: "Perfectly grilled salmon with a bright lemon herb marinade, served with roasted vegetables.",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=600&h=400", // Updated to a stunning salmon dish
    prepTime: "15 min",
    cookTime: "20 min",
    difficulty: "Medium",
    servings: 4,
    category: "Dinner",
    tags: ["Seafood", "Gluten-Free", "High-Protein"],
    author: "Chef James",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "3",
    title: "Creamy Mushroom Risotto",
    description: "A comforting Italian classic with arborio rice, mushrooms, and parmesan cheese.",
    image: "https://images.unsplash.com/photo-1600585154526-990d71c4e1f7?auto=format&fit=crop&q=80&w=600&h=400", // Updated to a rich risotto image
    prepTime: "10 min",
    cookTime: "30 min",
    difficulty: "Medium",
    servings: 4,
    category: "Dinner",
    tags: ["Vegetarian", "Italian"],
    author: "Chef Maria",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "4",
    title: "Avocado & Egg Breakfast Toast",
    description: "Start your day with this nutritious and delicious breakfast toast topped with avocado and eggs.",
    image: "https://images.unsplash.com/photo-1528736235302-4b8926970b8d?auto=format&fit=crop&q=80&w=600&h=400", // Updated to a fresh breakfast toast
    prepTime: "5 min",
    cookTime: "10 min",
    difficulty: "Easy",
    servings: 1,
    category: "Breakfast",
    tags: ["Vegetarian", "Quick", "High-Protein"],
    author: "Chef James",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "5",
    title: "Thai Green Curry",
    description: "A fragrant and spicy Thai curry with vegetables and your choice of protein.",
    image: "https://images.unsplash.com/photo-1600585154493-996f26ec7d6e?auto=format&fit=crop&q=80&w=600&h=400", // Updated to a vibrant Thai curry
    prepTime: "15 min",
    cookTime: "25 min",
    difficulty: "Medium",
    servings: 4,
    category: "Dinner",
    tags: ["Thai", "Spicy", "Gluten-Free"],
    author: "Chef Lisa",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    id: "6",
    title: "Berry Smoothie Bowl",
    description: "A refreshing and nutritious smoothie bowl topped with fresh fruits and granola.",
    image: "/bg.jpg", // Updated to a colorful smoothie bowl
    prepTime: "10 min",
    cookTime: "0 min",
    difficulty: "Easy",
    servings: 1,
    category: "Breakfast",
    tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    author: "Chef Maria",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
  },
]

export default function RecipesPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Recipes</h1>
        <p className="max-w-3xl text-muted-foreground">
          Discover delicious recipes created by our expert chefs. From quick weeknight dinners to impressive dishes for
          entertaining, we hasve got you covered.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search recipes..." className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="cursor-pointer">
            All
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Breakfast
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Lunch
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Dinner
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Vegetarian
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Gluten-Free
          </Badge>
          <Badge variant="outline" className="cursor-pointer">
            Quick
          </Badge>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="bg-muted">
                  {recipe.category}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {Number.parseInt(recipe.prepTime) + Number.parseInt(recipe.cookTime)} min
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold">{recipe.title}</h3>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p>
              <div className="mb-3 flex flex-wrap gap-1">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={recipe.authorImage || "/placeholder.svg"}
                    alt={recipe.author}
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm text-muted-foreground">{recipe.author}</span>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button asChild className="w-full">
                <Link href={`/recipes/${recipe.id}`}>View Recipe</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

