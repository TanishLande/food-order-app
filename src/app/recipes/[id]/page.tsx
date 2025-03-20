import { CardFooter } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import CommentsSection from "@/components/comments/comments-section"

// Extended sample recipes data with ingredients and instructions
const recipes = [
  {
    id: "1",
    title: "Mediterranean Quinoa Bowl",
    description: "A nutritious bowl packed with Mediterranean flavors, perfect for a quick lunch or dinner.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600&h=400",
    prepTime: "20 min",
    cookTime: "15 min",
    difficulty: "Easy",
    servings: 2,
    category: "Lunch",
    tags: ["Vegetarian", "High-Protein", "Mediterranean"],
    author: "Chef Maria",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    ingredients: [
      "1 cup cooked quinoa",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, thinly sliced",
      "1/2 cup kalamata olives, pitted",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup fresh parsley, chopped",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "1 clove garlic, minced",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook quinoa according to package instructions and let it cool.",
      "In a large bowl, combine cooled quinoa, cucumber, tomatoes, red onion, olives, and feta cheese.",
      "In a small bowl, whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper to make the dressing.",
      "Pour the dressing over the quinoa mixture and toss to combine.",
      "Garnish with fresh parsley before serving.",
      "Can be served immediately or refrigerated for up to 2 days.",
    ],
    video: "https://youtu.be/UjnDpcgJXvA?si=PTI2dulbGL9_WGPu",
    nutrition: {
      calories: 420,
      protein: "15g",
      carbs: "45g",
      fat: "22g",
      fiber: "8g",
    },
  },
  {
    id: "2",
    title: "Lemon Herb Grilled Salmon",
    description: "Perfectly grilled salmon with a bright lemon herb marinade, served with roasted vegetables.",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=600&h=400",
    prepTime: "15 min",
    cookTime: "20 min",
    difficulty: "Medium",
    servings: 4,
    category: "Dinner",
    tags: ["Seafood", "Gluten-Free", "High-Protein"],
    author: "Chef James",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "2 tbsp olive oil",
      "3 tbsp fresh lemon juice",
      "2 cloves garlic, minced",
      "1 tbsp fresh dill, chopped",
      "1 tbsp fresh parsley, chopped",
      "1 tsp lemon zest",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
      "Lemon wedges for serving",
    ],
    instructions: [
      "In a small bowl, whisk together olive oil, lemon juice, garlic, dill, parsley, lemon zest, oregano, salt, and pepper.",
      "Place salmon fillets in a shallow dish and pour the marinade over them. Cover and refrigerate for 30 minutes.",
      "Preheat grill to medium-high heat (about 375°F to 400°F).",
      "Remove salmon from marinade and place on the grill, skin-side down.",
      "Grill for 4-6 minutes per side, or until the salmon flakes easily with a fork.",
      "Serve immediately with lemon wedges and your choice of roasted vegetables.",
    ],
    video: "https://example.com/videos/lemon-herb-grilled-salmon.mp4",
    nutrition: {
      calories: 320,
      protein: "34g",
      carbs: "2g",
      fat: "18g",
      fiber: "0g",
    },
  },
  {
    id: "3",
    title: "Creamy Mushroom Risotto",
    description: "A comforting Italian classic with arborio rice, mushrooms, and parmesan cheese.",
    image: "https://images.unsplash.com/photo-1600585154526-990d71c4e1f7?auto=format&fit=crop&q=80&w=600&h=400",
    prepTime: "10 min",
    cookTime: "30 min",
    difficulty: "Medium",
    servings: 4,
    category: "Dinner",
    tags: ["Vegetarian", "Italian"],
    author: "Chef Maria",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    ingredients: [
      "1 1/2 cups arborio rice",
      "6 cups vegetable broth, kept warm",
      "1 lb mixed mushrooms (cremini, shiitake, oyster), sliced",
      "1 small onion, finely diced",
      "3 cloves garlic, minced",
      "1/2 cup dry white wine",
      "1/2 cup grated Parmesan cheese, plus more for serving",
      "2 tbsp butter",
      "2 tbsp olive oil",
      "2 tbsp fresh thyme leaves",
      "Salt and pepper to taste",
      "2 tbsp fresh parsley, chopped, for garnish",
    ],
    instructions: [
      "In a large pot, heat the vegetable broth and keep it warm over low heat.",
      "In a large, heavy-bottomed pan, heat 1 tbsp olive oil over medium heat. Add mushrooms and cook until browned, about 5 minutes. Remove and set aside.",
      "In the same pan, heat the remaining olive oil. Add onion and cook until translucent, about 3 minutes. Add garlic and cook for 30 seconds more.",
      "Add arborio rice and stir to coat with oil. Toast for 1-2 minutes until the edges become translucent.",
      "Pour in the white wine and stir until absorbed.",
      "Add 1 ladle of warm broth to the rice and stir constantly until the liquid is absorbed. Continue adding broth, 1 ladle at a time, stirring until each addition is absorbed before adding more.",
      "After about 20 minutes, when the rice is creamy and al dente, stir in the cooked mushrooms, Parmesan cheese, butter, and thyme. Season with salt and pepper.",
      "Remove from heat, cover, and let stand for 2 minutes.",
      "Serve immediately, garnished with fresh parsley and additional Parmesan cheese.",
    ],
    video: "https://example.com/videos/creamy-mushroom-risotto.mp4",
    nutrition: {
      calories: 450,
      protein: "12g",
      carbs: "65g",
      fat: "15g",
      fiber: "3g",
    },
  },
  {
    id: "4",
    title: "Avocado & Egg Breakfast Toast",
    description: "Start your day with this nutritious and delicious breakfast toast topped with avocado and eggs.",
    image: "https://images.unsplash.com/photo-1528736235302-4b8926970b8d?auto=format&fit=crop&q=80&w=600&h=400",
    prepTime: "5 min",
    cookTime: "10 min",
    difficulty: "Easy",
    servings: 1,
    category: "Breakfast",
    tags: ["Vegetarian", "Quick", "High-Protein"],
    author: "Chef James",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    ingredients: [
      "2 slices whole grain bread",
      "1 ripe avocado",
      "2 eggs",
      "1 tbsp olive oil",
      "1/2 lemon, juiced",
      "Red pepper flakes (optional)",
      "Salt and pepper to taste",
      "Fresh herbs (such as chives or cilantro) for garnish",
    ],
    instructions: [
      "Toast the bread slices until golden brown.",
      "While the bread is toasting, heat olive oil in a non-stick pan over medium heat.",
      "Crack the eggs into the pan and cook to your preference (sunny-side up, over-easy, or scrambled).",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
      "Add lemon juice, salt, and pepper to the avocado and mash with a fork to your desired consistency.",
      "Spread the mashed avocado evenly on the toasted bread slices.",
      "Top each slice with a cooked egg.",
      "Sprinkle with red pepper flakes (if using), additional salt and pepper to taste, and fresh herbs.",
      "Serve immediately.",
    ],
    video: "https://example.com/videos/avocado-egg-toast.mp4",
    nutrition: {
      calories: 380,
      protein: "15g",
      carbs: "30g",
      fat: "22g",
      fiber: "8g",
    },
  },
  {
    id: "5",
    title: "Thai Green Curry",
    description: "A fragrant and spicy Thai curry with vegetables and your choice of protein.",
    image: "https://images.unsplash.com/photo-1600585154493-996f26ec7d6e?auto=format&fit=crop&q=80&w=600&h=400",
    prepTime: "15 min",
    cookTime: "25 min",
    difficulty: "Medium",
    servings: 4,
    category: "Dinner",
    tags: ["Thai", "Spicy", "Gluten-Free"],
    author: "Chef Lisa",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100",
    ingredients: [
      "2 tbsp vegetable oil",
      "3 tbsp green curry paste (adjust to taste)",
      "1 lb protein of choice (chicken, tofu, or shrimp)",
      "1 can (14 oz) coconut milk",
      "1 cup vegetable or chicken broth",
      "1 tbsp fish sauce (or soy sauce for vegetarian)",
      "1 tbsp brown sugar",
      "1 red bell pepper, sliced",
      "1 zucchini, sliced",
      "1 cup snap peas",
      "1 small eggplant, cubed",
      "1/2 cup Thai basil leaves",
      "2 kaffir lime leaves (optional)",
      "1 lime, juiced",
      "Steamed jasmine rice for serving",
    ],
    instructions: [
      "Heat oil in a large pot or wok over medium heat.",
      "Add green curry paste and stir-fry for 1 minute until fragrant.",
      "If using chicken or shrimp, add it now and cook until nearly done. If using tofu, add it later with the vegetables.",
      "Pour in coconut milk and broth, then add fish sauce and brown sugar. Stir to combine.",
      "Bring to a simmer and add the vegetables and tofu (if using). Cook for 5-7 minutes until vegetables are tender-crisp.",
      "Add Thai basil leaves, kaffir lime leaves (if using), and lime juice. Stir to combine.",
      "Taste and adjust seasoning as needed with more fish sauce, sugar, or lime juice.",
      "Serve hot over steamed jasmine rice.",
    ],
    video: "https://example.com/videos/thai-green-curry.mp4",
    nutrition: {
      calories: 420,
      protein: "25g",
      carbs: "18g",
      fat: "28g",
      fiber: "4g",
    },
  },
  {
    id: "6",
    title: "Berry Smoothie Bowl",
    description: "A refreshing and nutritious smoothie bowl topped with fresh fruits and granola.",
    image: "/bg.jpg",
    prepTime: "10 min",
    cookTime: "0 min",
    difficulty: "Easy",
    servings: 1,
    category: "Breakfast",
    tags: ["Vegetarian", "Vegan", "Gluten-Free"],
    author: "Chef Maria",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    ingredients: [
      "1 cup frozen mixed berries (strawberries, blueberries, raspberries)",
      "1 frozen banana",
      "1/4 cup plant-based milk (almond, oat, or coconut)",
      "1 tbsp nut butter (optional)",
      "1 tsp honey or maple syrup (optional)",
      "Toppings: fresh berries, sliced banana, granola, chia seeds, coconut flakes",
    ],
    instructions: [
      "Add frozen berries, frozen banana, plant-based milk, and nut butter (if using) to a blender.",
      "Blend until smooth and creamy. The mixture should be thick enough to eat with a spoon.",
      "If the mixture is too thick, add a little more milk. If it's too thin, add more frozen fruit.",
      "Taste and add honey or maple syrup if needed for sweetness.",
      "Pour the smoothie into a bowl.",
      "Arrange toppings artfully on top of the smoothie.",
      "Serve immediately and enjoy with a spoon.",
    ],
    video: "https://example.com/videos/berry-smoothie-bowl.mp4",
    nutrition: {
      calories: 320,
      protein: "5g",
      carbs: "65g",
      fat: "8g",
      fiber: "12g",
    },
  },
]

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  // Find the recipe with the matching ID
  const recipe = recipes.find((r) => r.id === params.id)

  // Handle case where recipe is not found
  if (!recipe) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Recipe Not Found</h1>
        <p className="mt-4 text-muted-foreground">The recipe you are looking for does not exist or has been removed.</p>
        <Button asChild className="mt-8">
          <Link href="/recipes">Back to Recipes</Link>
        </Button>
      </div>
    )
  }

  // Calculate total time
  const totalTime = Number.parseInt(recipe.prepTime) + Number.parseInt(recipe.cookTime)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6 flex items-center gap-1">
        <Link href="/recipes">
          <ArrowLeft className="h-4 w-4" />
          Back to Recipes
        </Link>
      </Button>

      {/* Recipe header */}
      <div className="mb-8 grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            width={800}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-muted">
                {recipe.category}
              </Badge>
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{recipe.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground">{recipe.description}</p>

            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                <Clock className="mb-1 h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Prep Time</span>
                <span className="font-medium">{recipe.prepTime}</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                <Clock className="mb-1 h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Cook Time</span>
                <span className="font-medium">{recipe.cookTime}</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                <Clock className="mb-1 h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Time</span>
                <span className="font-medium">{totalTime} min</span>
              </div>
              <div className="flex flex-col items-center rounded-lg border p-3 text-center">
                <Users className="mb-1 h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Servings</span>
                <span className="font-medium">{recipe.servings}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={recipe.authorImage || "/placeholder.svg"}
                alt={recipe.author}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{recipe.author}</p>
              <p className="text-sm text-muted-foreground">Recipe Creator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition information */}
      {recipe.nutrition && (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Nutrition Information</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="rounded-lg border p-3 text-center">
              <p className="text-sm text-muted-foreground">Calories</p>
              <p className="font-medium">{recipe.nutrition.calories}</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p className="text-sm text-muted-foreground">Protein</p>
              <p className="font-medium">{recipe.nutrition.protein}</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p className="text-sm text-muted-foreground">Carbs</p>
              <p className="font-medium">{recipe.nutrition.carbs}</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p className="text-sm text-muted-foreground">Fat</p>
              <p className="font-medium">{recipe.nutrition.fat}</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p className="text-sm text-muted-foreground">Fiber</p>
              <p className="font-medium">{recipe.nutrition.fiber}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recipe content */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Ingredients */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {index + 1}
                </span>
                <p>{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Video Tutorial */}
      {
      recipe.video && (
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Video Tutorial</h2>
          <div className="overflow-hidden rounded-lg">
            <iframe
              src={
                recipe.video
                  .replace("youtu.be/", "youtube.com/embed/")
                  .replace("youtube.com/watch?v=", "youtube.com/embed/")
                  .split("&")[0]
              }
              className="w-full aspect-video"
              title={`${recipe.title} Video Tutorial`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
              Your browser does not support the video tag.
            </iframe>
          </div>
        </div>
      )
    }

      {/* Comments Section */}
      <CommentsSection recipeId={recipe.id} />

      <Separator className="my-12" />

      {/* Related recipes */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes
            .filter(
              (r) =>
                r.id !== recipe.id &&
                (r.category === recipe.category || r.tags.some((tag) => recipe.tags.includes(tag))),
            )
            .slice(0, 3)
            .map((relatedRecipe) => (
              <Card key={relatedRecipe.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={relatedRecipe.image || "/placeholder.svg"}
                    alt={relatedRecipe.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-xl font-bold">{relatedRecipe.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{relatedRecipe.description}</p>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button asChild className="w-full">
                    <Link href={`/recipes/${relatedRecipe.id}`}>View Recipe</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}

