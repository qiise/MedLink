import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function MentorProfile({ mentor }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={mentor.image} alt={mentor.name} />
          <AvatarFallback>{mentor.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{mentor.name}</h3>
          <p className="text-sm text-muted-foreground">{mentor.specialty}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{mentor.bio}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Connect</Button>
      </CardFooter>
    </Card>
  )
}

