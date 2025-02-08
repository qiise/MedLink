import { mentors } from "@/lib/mockData"
import MentorProfile from "@/components/MentorProfile"

export default function MentorshipPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mentorship</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <MentorProfile key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  )
}

