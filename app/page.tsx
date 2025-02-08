import { forumPosts } from "@/lib/mockData"
import ForumPost from "@/components/ForumPost"
import NewPostForm from "@/components/NewPostForm"

export default function ForumPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Forum</h1>
      <NewPostForm />
      <div className="space-y-4">
        {forumPosts.map((post) => (
          <ForumPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

