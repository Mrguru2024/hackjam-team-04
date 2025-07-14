interface Task {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  xp: number;
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'career':
        return '💼';
      case 'learning':
        return '📚';
      case 'community':
        return '👥';
      default:
        return '📝';
    }
  };

  return (
    <div className="bg-white dark:bg-surface-default rounded-lg p-4 border border-border-default hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="text-2xl">{getTypeIcon(task.type)}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm font-medium text-caption uppercase tracking-wide">
                {task.type}
              </span>
              <span className="text-xs text-caption">
                {formatDate(task.createdAt)}
              </span>
            </div>
            <p className="text-body leading-relaxed">{task.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <span className="text-sm font-bold text-primary-default">+{task.xp} XP</span>
        </div>
      </div>
    </div>
  );
} 