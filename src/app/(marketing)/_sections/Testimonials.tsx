'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const testimonials = [
  {
    quote: "OMRS gave me back hours every week. The interaction checks alone have prevented two near-misses already.",
    author: "Dr. Aisha Khan",
    role: "Cardiologist",
    hospital: "Aga Khan Hospital",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    quote: "Recording vitals takes seconds. The integration with care plans is seamless.",
    author: "Hina Malik",
    role: "Head Nurse",
    hospital: "Shaukat Khanum",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    quote: "The single most impactful tech upgrade we've made in a decade.",
    author: "Dr. James Park",
    role: "Family Medicine",
    hospital: "Singapore General",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "Setup was frictionless. My receptionist learned the workflow in 15 minutes.",
    author: "Dr. Sarah Jenkins",
    role: "Chief of Medicine",
    hospital: "City Central",
    avatar: "https://i.pravatar.cc/150?img=20"
  },
  {
    quote: "Finally, a system that doesn't feel like it was built in 1995. The UI is gorgeous.",
    author: "Michael Chang",
    role: "IT Director",
    hospital: "Valley Health",
    avatar: "https://i.pravatar.cc/150?img=33"
  }
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 6000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section className="py-24 bg-muted/30 border-y border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          What healthcare professionals say
        </h2>
      </div>

      <div className="relative max-w-[100vw]">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex cursor-grab active:cursor-grabbing">
            {testimonials.map((t, idx) => (
              <div key={idx} className="embla__slide flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0 pl-4 md:pl-6">
                <div className={`h-full bg-card p-8 rounded-3xl border border-border shadow-xl transition-opacity duration-300 ${idx === selectedIndex ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="flex gap-1 mb-6 text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xl md:text-2xl font-serif italic text-foreground mb-8 leading-snug">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover border border-border" />
                    <div>
                      <p className="font-bold text-foreground flex items-center gap-1">
                        {t.author}
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      </p>
                      <p className="text-sm text-muted-foreground">{t.role}, {t.hospital}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
