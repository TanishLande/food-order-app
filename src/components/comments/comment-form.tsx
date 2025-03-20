"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { addComment } from "@/action/comments"
import { useRouter } from "next/navigation"

export default function CommentForm({ recipeId }: { recipeId: string }) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isSignedIn } = useAuth()
  const router = useRouter();

  // Add this near the top of your component
  console.log("Auth state:", { isSignedIn, recipeId })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSignedIn) {
        toast.error("Authentication required")
    
      return
    }

    if (!content.trim()) {
        toast.error("Empty comment")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await addComment(recipeId, content)

      if (result.error) {
        console.error("Comment error:", result.error)
        toast.error("Error!!");
      } else {
        setContent("")
        toast.success("sucess!");
      }
    } catch (error) {
      console.error("Comment submission error:", error)
      toast.error("Error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Share your thoughts on this recipe..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      {!isSignedIn ? (
          <Button type="submit" onClick={() => router.push("/sign-in")}>
          Sign in
        </Button>
      ) : (
        <Button type="submit" disabled={isSubmitting || !content.trim()}>
        {isSubmitting ? "Posting..." : "Post Comment"}
      </Button>
      )
    }
      
    </form>
  )
}

