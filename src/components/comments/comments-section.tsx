// comments-section.tsx (Server Component)
import { Suspense } from "react"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CommentForm from "./comment-form"
import CommentList from "./comment-list"

export default function CommentsSection({ recipeId }: { recipeId: string }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      <div className="mb-8">
        <SignedIn>
          <CommentForm recipeId={recipeId} />
        </SignedIn>

        <SignedOut>
          <div className="text-center p-6 border rounded-lg">
            <p className="mb-4 text-muted-foreground">Sign in to leave a comment</p>
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </SignedOut>
      </div>

      <Suspense fallback={<div className="text-center py-8">Loading comments...</div>}>
        <CommentList recipeId={recipeId} />
      </Suspense>
    </div>
  )
}