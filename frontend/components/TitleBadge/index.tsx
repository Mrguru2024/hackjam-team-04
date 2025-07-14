interface TitleBadgeProps {
  title: string;
}

export default function TitleBadge({ title }: TitleBadgeProps) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-subtle border border-primary-default">
      <span className="text-xs font-medium text-primary-default">
        {title}
      </span>
    </div>
  );
} 