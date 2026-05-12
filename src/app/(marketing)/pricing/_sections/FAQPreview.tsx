export function FAQPreview() {
  const faqs = [
    {
      q: "Can I switch plans later?",
      a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      q: "Is there a setup fee?",
      a: "No, there are no hidden fees or setup costs. You only pay the monthly subscription."
    },
    {
      q: "Do you offer discounts for non-profits?",
      a: "Yes! Please contact our sales team with your organization details to learn about our non-profit pricing."
    },
    {
      q: "What happens to my data if I cancel?",
      a: "Your data belongs to you. You can export all your patient records in standard formats (CSV, JSON, HL7) before canceling."
    }
  ];

  return (
    <div className="py-24 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h4 className="font-bold mb-2">{faq.q}</h4>
              <p className="text-muted-foreground text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
