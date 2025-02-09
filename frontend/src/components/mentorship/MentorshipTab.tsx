
import { MentorCard } from "./MentorCard";

const sampleMentors = [
  {
    name: "Dr. Lydia Chilton",
    title: "Medical Student Mentor",
    specialty: "Internal Medicine",
    school: "Harvard Medical School",
    imageUrl: "/mentor1.jpg"
  },
  {
    name: "Dr. Jae Woo Lee",
    title: "Admissions Advisor",
    specialty: "Pediatrics",
    school: "Stanford Medicine",
    imageUrl: "/mentor2.jpg"
  },
  {
    name: "Dr. Brian Borowski",
    title: "Research Mentor",
    specialty: "Neurology",
    school: "Johns Hopkins Medicine",
    imageUrl: "/mentor3.jpg"
  }
];

export function MentorshipTab() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Find Your Mentor</h2>
        <p className="text-gray-600">Connect with experienced medical professionals who can guide your journey.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleMentors.map((mentor, index) => (
          <MentorCard key={index} {...mentor} />
        ))}
      </div>
    </div>
  );
}
