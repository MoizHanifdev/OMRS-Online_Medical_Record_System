'use client';

export function Integrations() {
  const logos = [
    "Roche", "Abbott", "GE Healthcare", "Siemens",
    "Epic", "Cerner", "Twilio", "SendGrid",
    "Stripe", "AWS", "Azure", "Google Cloud",
    "Zoom", "HL7", "FHIR", "Mailchimp"
  ];

  return (
    <section className="py-24 bg-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Plays nicely with the tools you already use
        </h2>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center opacity-70">
          {logos.map((logo, idx) => (
            <div key={idx} className="h-12 flex items-center justify-center font-bold font-serif text-lg text-muted-foreground hover:text-foreground transition-colors cursor-default">
              {logo}
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-muted-foreground">
          Don&apos;t see your tool? We build custom integrations.{' '}
          <a href="/contact" className="text-primary hover:underline font-medium">Contact us</a>
        </p>
      </div>
    </section>
  );
}
