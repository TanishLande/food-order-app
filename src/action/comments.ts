"use server"

import { PrismaClient } from "@prisma/client"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

// Create a singleton instance to avoid connection issues
const client = new PrismaClient()

export async function addComment(recipeId: string, content: string) {
  console.log("Adding comment:", { recipeId, contentLength: content.length })

  try {
    const { userId } = await auth()
    console.log("Auth userId:", userId)

    if (!userId) {
      return { error: "You must be logged in to comment" }
    }

    if (!content.trim()) {
      return { error: "Comment cannot be empty" }
    }

    try {
      // Get the current user to access their email
      const user = await currentUser()
      
      // Extract username from email (part before @)
      let userName = userId
      if (user?.emailAddresses && user.emailAddresses.length > 0) {
        const email = user.emailAddresses[0].emailAddress
        userName = email.split('@')[0]
      }

      const comment = await client.comment.create({
        data: {
          content,
          recipeId,
          userId,
          userName,
          userImage: null,
        },
      })

      console.log("Comment created:", comment.id)
      revalidatePath(`/recipes/${recipeId}`)

      return { success: true, comment }
    } catch (error) {
      console.error("Database error:", error)
      return { error: "Failed to create comment in database" }
    }
  } catch (error) {
    console.error("Error adding comment:", error)
    return { error: "Failed to add comment: " + (error instanceof Error ? error.message : String(error)) }
  }
}

export async function getComments(recipeId: string) {
  console.log("Fetching comments for recipe:", recipeId)

  try {
    const comments = await client.comment.findMany({
      where: {
        recipeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    console.log(`Found ${comments.length} comments`)
    return comments
  } catch (error) {
    console.error("Error fetching comments:", error)
    return []
  }
}