import { Analytics, Project } from "./types";

export const MOCK_ANALYTICS: Analytics = {
  activeProjects: 3,
  totalValue: 19500,
  dueThisWeek: 3,
  atRisk: 1,
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    eventType: "Wedding",
    eventDate: "20/01/2026",
    totalValue: 5000,
    status: "on track",
    currentStage: "Menu Planning & Tasting",
    currentStageProgress: 60,
    overallProgress: 35,
    nextTask: "Tasting Session",
    nextTaskDue: "11/12/2025",
    newMessages: 2,
  },
  {
    id: "2",
    clientName: "Elite Events Inc",
    eventType: "Corporate Gala",
    eventDate: "05/01/2026",
    totalValue: 12000,
    status: "on track",
    currentStage: "Final Preparations",
    currentStageProgress: 80,
    overallProgress: 75,
    nextTask: "Staff Briefing",
    nextTaskDue: "08/12/2025",
  },
  {
    id: "3",
    clientName: "Thompson Family",
    eventType: "Anniversary",
    eventDate: "15/01/2026",
    totalValue: 2500,
    status: "at risk",
    currentStage: "Menu Finalization",
    currentStageProgress: 40,
    overallProgress: 25,
    nextTask: "Client Approval",
    nextTaskDue: "10/12/2025",
  },
];

