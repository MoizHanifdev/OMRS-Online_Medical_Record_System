'use client';

export function FeatureBento() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-card border border-border rounded-3xl p-8 flex flex-col justify-end min-h-[300px]">
          <h3 className="text-2xl font-bold mb-2">Smart Workflows</h3>
          <p className="text-muted-foreground">Automate routine tasks and let your clinical team focus on patient care.</p>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col justify-end min-h-[300px]">
          <h3 className="text-xl font-bold text-primary mb-2">Secure</h3>
          <p className="text-sm text-primary/80">End-to-end encrypted and HIPAA compliant by default.</p>
        </div>
        <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-end min-h-[300px]">
          <h3 className="text-xl font-bold mb-2">Fast</h3>
          <p className="text-sm text-muted-foreground">Sub-200ms interactions keep you in flow.</p>
        </div>
        <div className="md:col-span-2 bg-card border border-border rounded-3xl p-8 flex flex-col justify-end min-h-[300px]">
          <h3 className="text-2xl font-bold mb-2">Interoperable</h3>
          <p className="text-muted-foreground">Built on FHIR standards to connect with the rest of the healthcare ecosystem.</p>
        </div>
      </div>
    </div>
  );
}
