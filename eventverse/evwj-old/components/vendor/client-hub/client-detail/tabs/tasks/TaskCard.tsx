"use client";

import { ClientTask } from "../../../mockClients";
import StatusBadge from "../../../components/StatusBadge";

interface TaskCardProps {
  task: ClientTask;
  onClick?: (task: ClientTask) => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      className="rounded-lg border bg-white dark:bg-slate-800 p-3 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
      onClick={() => onClick?.(task)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold line-clamp-1">{task.title}</h4>
            <StatusBadge status={task.priority} type="priority" />
            <StatusBadge status={task.status} type="task" />
          </div>
          <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
        </div>
      </div>
    </div>
  );
}

