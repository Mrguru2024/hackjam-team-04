interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-surface-default rounded-2xl p-6 shadow-lg border border-border-default hover:shadow-xl transition-all duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-title mb-3">{title}</h3>
      <p className="text-body leading-relaxed">{description}</p>
    </div>
  );
} 