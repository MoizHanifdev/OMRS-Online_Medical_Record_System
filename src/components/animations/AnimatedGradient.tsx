export function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute -inset-[10%] opacity-50 animate-gradient gradient-mesh blur-3xl" />
    </div>
  );
}
