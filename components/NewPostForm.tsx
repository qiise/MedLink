"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewPostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the new post to your backend
    console.log("New post:", { title, content })
    setTitle("")
    setContent("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Post</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

