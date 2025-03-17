// lib/hooks/useMenuLogic.ts
"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Hardcoded menu items (could be fetched from an API in a real app)
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
];

const categories = ["All", "Breakfast", "Bowls", "Mains", "Pasta", "Wraps"];
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "High-Protein"];

export function useMenuLogic() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesDietary =
      selectedDietary.length === 0 || selectedDietary.every((diet) => item.dietary.includes(diet));

    return matchesSearch && matchesCategory && matchesDietary;
  });

  // Sort menu items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - b.price;
    if (sortBy === "prep-time") return Number.parseInt(a.prepTime) - Number.parseInt(b.prepTime);
    if (sortBy === "recommended") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  // Add to cart (using API instead of direct Prisma)
  const addToCart = async (itemId: string) => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItemId: itemId }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      toast.success("Item added to cart!", {
        description: `${menuItems.find((item) => item.id === itemId)?.name} has been added.`,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add item to cart", {
        description: "Please try again later.",
      });
    }
  };

  const toggleDietaryFilter = (diet: string) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDietary([]);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDietary,
    setSortBy,
    sortBy,
    sortedItems,
    addToCart,
    toggleDietaryFilter,
    clearFilters,
    categories,
    dietaryOptions,
  };
}