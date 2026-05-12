import { generateMeta } from '@/lib/seo/metadata';
import { FeatureBento } from './_sections/FeatureBento';
import { FinalCTA } from './_sections/FinalCTA';

export const metadata = generateMeta({
  title: 'Features',
  description: 'Deep dive into the features that make OMRS the modern choice for medical records.',
  path: '/features',
});

const featureDeepDives = [
  {
    title: "Centralized Patient Records",
    subtitle: "One unified view of the patient's entire medical history.",
    desc: "No more hunting through paper files or disconnected systems. OMRS aggregates demographics, vitals, labs, notes, and medications into a single, cohesive patient profile.",
    bullets: ["Chronological history timeline", "Flagged critical alerts", "Customizable summary views", "Instant record export"],
    img: "🗂️"
  },
  {
    title: "Smart Clinical Search",
    subtitle: "Find anything in milliseconds.",
    desc: "Our global search doesn't just look at names. It indexes clinical notes, lab results, and OCR-scanned legacy documents to find exactly what you need.",
    bullets: ["Fuzzy matching for medical terms", "Filter by date, author, or data type", "Search within specific patient charts", "Sub-200ms response times"],
    img: "🔍"
  },
  {
    title: "Clinical Documentation",
    subtitle: "Write notes faster with smart templates.",
    desc: "Our rich text editor supports specialized medical templates, dictation integration, and macro expansions to significantly reduce documentation time.",
    bullets: ["SOAP, H&P, and custom templates", "Auto-save and draft management", "Co-authoring for care teams", "Cryptographic digital signatures"],
    img: "📝"
  }
];

export default function FeaturesPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">Built for the reality of healthcare</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Every feature in OMRS was designed alongside practicing clinicians to ensure it actually saves time rather than adding administrative burden.
        </p>
      </div>

      <FeatureBento />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {featureDeepDives.map((feat, idx) => (
          <div key={idx} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">{feat.title}</h2>
              <p className="text-xl font-medium text-primary">{feat.subtitle}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">{feat.desc}</p>
              <ul className="space-y-3 pt-4">
                {feat.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">✓</span>
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-video lg:aspect-square bg-muted/30 rounded-3xl border border-border flex items-center justify-center p-12">
              <div className="text-[120px] opacity-80 filter drop-shadow-2xl">{feat.img}</div>
            </div>
          </div>
        ))}
      </div>

      <FinalCTA />
    </div>
  );
}
