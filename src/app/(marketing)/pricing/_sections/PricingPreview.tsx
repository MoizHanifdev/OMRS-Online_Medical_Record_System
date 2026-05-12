export function PricingPreview() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-2">Basic</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">$49</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">Perfect for solo practitioners just starting out.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Up to 500 patients</li>
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Basic notes & charting</li>
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Email support</li>
          </ul>
          <button className="w-full py-2 border border-border rounded-lg font-semibold hover:bg-muted transition-colors">Get Started</button>
        </div>
        
        <div className="bg-card border-2 border-primary rounded-3xl p-8 shadow-md relative scale-105 z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
          <h3 className="text-xl font-bold mb-2">Professional</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">$149</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">For established clinics needing advanced tools.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Unlimited patients</li>
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> E-prescribing & Labs</li>
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Telemedicine integration</li>
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Priority support</li>
          </ul>
          <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm">Start Free Trial</button>
        </div>
        
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-2">Enterprise</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">Custom</span>
          </div>
          <p className="text-muted-foreground text-sm mb-6">For large hospitals and multi-location networks.</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Everything in Pro</li>
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Advanced analytics</li>
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Custom integrations (HL7/FHIR)</li>
            <li className="flex items-center gap-2 text-sm"><span className="text-primary">✓</span> Dedicated account manager</li>
          </ul>
          <button className="w-full py-2 border border-border rounded-lg font-semibold hover:bg-muted transition-colors">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}
