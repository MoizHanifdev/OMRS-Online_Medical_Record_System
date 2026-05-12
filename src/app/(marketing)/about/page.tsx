import { generateMeta } from '@/lib/seo/metadata';

export const metadata = generateMeta({
  title: 'About Us',
  description: 'Our mission is to digitize healthcare, one record at a time.',
  path: '/about',
});

const team = [
  { name: "Dr. Sarah Chen", role: "Chief Executive Officer", avatar: "👩‍⚕️" },
  { name: "Marcus Johnson", role: "Chief Technology Officer", avatar: "👨‍💻" },
  { name: "Dr. Emily Rodriguez", role: "Chief Medical Officer", avatar: "🩺" },
  { name: "David Kim", role: "Head of Design", avatar: "🎨" },
  { name: "Aisha Patel", role: "VP of Engineering", avatar: "👩‍💻" },
  { name: "James Wilson", role: "Head of Security", avatar: "🛡️" }
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
          We&apos;re on a mission to digitize healthcare, one record at a time.
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Founded by a team of doctors and engineers who were tired of watching patient care suffer due to fragmented, paper-based systems. We built OMRS to be the operating system we wished we had.
        </p>
      </div>

      <div className="bg-muted/30 py-24 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { t: "Patient-First", d: "Every engineering decision starts with: How does this improve patient care?" },
              { t: "Security-Obsessed", d: "We treat healthcare data with the extreme reverence it deserves." },
              { t: "Healthcare-Native", d: "Built with an understanding of real clinical workflows, not just tech trends." },
              { t: "Open by Default", d: "Data belongs to patients. We build integrations, not walled gardens." }
            ].map((v, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-2">{v.t}</h3>
                <p className="text-muted-foreground text-sm">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="text-center">
              <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center text-5xl mb-4 border border-border">
                {member.avatar}
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
