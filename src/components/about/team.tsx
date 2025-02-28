import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"

const teamMembers = [
  {
    name: "Team Member 1",
    position: "Position",
    github: "https://github.com/member1",
    image: "/placeholder.svg"
  },
  {
    name: "Team Member 2",
    position: "Position",
    github: "https://github.com/member2",
    image: "/placeholder.svg"
  },
  {
    name: "Team Member 3",
    position: "Position",
    github: "https://github.com/member3",
    image: "/placeholder.svg"
  }
]

export default function Team() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-16">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full max-w-6xl">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center space-y-4">
                <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.position}</p>
                  <Link
                    href={member.github}
                    className="inline-flex items-center space-x-2 text-sm hover:text-primary"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}