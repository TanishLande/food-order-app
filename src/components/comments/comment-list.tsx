
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { auth } from "@clerk/nextjs/server"
import { getComments } from "@/action/comments"

export default async function CommentList({ recipeId }: { recipeId: string }) {
  const comments = await getComments(recipeId)
  const { userId } = await auth()

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {comments.map((comment: any) => {
        const isCurrentUser = comment.userId === userId

        return (
          <div key={comment.id} className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} gap-4`}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.userImage || ""} alt={comment.userName} />
              <AvatarFallback>{comment.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className={`flex-1 ${isCurrentUser ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block rounded-lg p-4 ${
                  isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="font-medium text-sm text-muted-foreground sm:text-sm mb-1">{comment.userName}</p>
                <p>{comment.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

