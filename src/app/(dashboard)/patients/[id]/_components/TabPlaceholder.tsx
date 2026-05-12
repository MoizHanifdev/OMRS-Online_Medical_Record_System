export default function PatientPlaceholderTab({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-card border border-border rounded-2xl border-dashed">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-2xl mb-4">
        🚧
      </div>
      <h2 className="text-xl font-bold tracking-tight mb-2">Coming Soon</h2>
      <p className="text-muted-foreground text-center max-w-md">
        This tab will be implemented in a subsequent module. The layout infrastructure is ready.
      </p>
    </div>
  );
}
