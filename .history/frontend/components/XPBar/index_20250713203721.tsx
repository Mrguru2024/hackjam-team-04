interface XPBarProps {
  currentXP: number;
  targetXP: number;
  message?: string;
}

export default function XPBar({ currentXP, targetXP, message }: XPBarProps) {
  const progress = Math.min((currentXP / targetXP) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-caption">Progress</span>
        <span className="text-sm font-medium text-caption">
          {currentXP} / {targetXP} XP
        </span>
      </div>

      <div className="w-full bg-surface-subtle dark:bg-surface-default rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-default to-primary-lighter h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 text-center">
        <span className="text-xs text-caption">
          {message
            ? message
            : progress >= 100
              ? "Level Up!"
              : `${Math.round(progress)}% complete`}
        </span>
      </div>
    </div>
  );
}
