export interface Project {
  id: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  totalValue: number;
  status: "on track" | "at risk" | "delayed";
  currentStage: string;
  currentStageProgress: number;
  overallProgress: number;
  nextTask: string;
  nextTaskDue: string;
  newMessages?: number;
}

export interface Analytics {
  activeProjects: number;
  totalValue: number;
  dueThisWeek: number;
  atRisk: number;
}

