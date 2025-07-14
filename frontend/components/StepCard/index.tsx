interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export default function StepCard({
  number,
  title,
  description,
  icon,
}: StepCardProps) {
  return (
    <div className="bg-white dark:bg-surface-default rounded-2xl p-6 shadow-lg border border-border-default hover:shadow-xl transition-all duration-200">
      <div className="flex items-center mb-4">
        <div className="bg-primary-default text-text-negative rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
          {number}
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-title mb-3">{title}</h3>
      <p className="text-body leading-relaxed">{description}</p>
    </div>
  );
}
