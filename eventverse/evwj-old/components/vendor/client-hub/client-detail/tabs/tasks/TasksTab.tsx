"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import { Client, ClientTask } from "../../../mockClients";
import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import TabHeader from "../../../components/TabHeader";
import EmptyState from "../../../components/EmptyState";

interface TasksTabProps {
  client: Client;
  selectedEventId?: string | null;
  selectedProjectId?: string | null;
}

export default function TasksTab({ client, selectedEventId, selectedProjectId }: TasksTabProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ClientTask | null>(null);
  
  // Filter tasks based on selected event/project
  const filteredTasks = useMemo(() => {
    const allTasks = client.tasks || [];
    
    if (!selectedEventId && !selectedProjectId) {
      return allTasks; // Show all tasks
    }
    
    // Filter by specific project
    if (selectedProjectId) {
      return allTasks.filter(
        (task) => task.projectId === selectedProjectId
      );
    }
    
    // Filter by event (show all tasks for projects in that event)
    if (selectedEventId) {
      return allTasks.filter(
        (task) => task.eventId === selectedEventId
      );
    }
    
    return allTasks;
  }, [client.tasks, selectedEventId, selectedProjectId]);
  
  const [tasks, setTasks] = useState<ClientTask[]>(filteredTasks);

  // Update tasks when filter changes
  useEffect(() => {
    setTasks(filteredTasks);
  }, [filteredTasks]);

  const handleCreateTask = (newTask: ClientTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleViewTask = (task: ClientTask) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleUpdateTask = (updatedTask: ClientTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    // Update selected task to reflect changes
    setSelectedTask(updatedTask);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by due date, then by priority
    const dateA = new Date(a.dueDate.split("/").reverse().join("-"));
    const dateB = new Date(b.dueDate.split("/").reverse().join("-"));
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-6">
      <TabHeader
        title="Client Tasks"
        actionLabel="New Task"
        actionIcon={Plus}
        onAction={() => setIsCreateModalOpen(true)}
      />

      {/* Tasks List */}
      <div className="space-y-3">
        {sortedTasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            description="Create your first task to get started"
          />
        ) : (
          sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={handleViewTask} />
          ))
        )}
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        client={client}
        onSuccess={handleCreateTask}
      />

      {/* View Task Modal */}
      <ViewTaskModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        task={selectedTask}
        client={client}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
}

