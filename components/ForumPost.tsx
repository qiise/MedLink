import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ForumPost({ post }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reply</Button>
        <span className="text-sm text-muted-foreground">{post.replies.length} replies</span>
      </CardFooter>
    </Card>
  )
}

