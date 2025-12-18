// TaskContext.js
import React, { createContext, useState } from "react";

export const TaskContext = createContext();

const initialDailyTasks = [
  {
    id: 1,
    title: "Implement",
    assignedBy: "Sarah Johnson (Team Lead)",
    assignedDate: "2025-10-13",
    dueDate: "2025-10-15",
    priority: "High",
    status: "In Progress",
    description:
      "Develop and integrate JWT-based authentication system with login, signup, and password reset functionality.",
    requirements: [],
    progress: 60,
    category: "Work",
  },
  {
    id: 1,
    title: "Implement User Authentication Module",
    assignedBy: "Sarah Johnson (Team Lead)",
    assignedDate: "2025-10-13",
    dueDate: "2025-10-15",
    priority: "High",
    status: "In Progress",
    description:
      "Develop and integrate JWT-based authentication system with login, signup, and password reset functionality. Include OAuth integration for Google and GitHub.",
    requirements: [
      "JWT token generation and validation",
      "Password hashing with bcrypt",
      "OAuth 2.0 integration",
      "Session management",
      "Error handling",
    ],
    progress: 60,
    category: "Work",
  },
  {
    id: 2,
    title: "Fix Payment Gateway Bug",
    assignedBy: "Sarah Johnson (Team Lead)",
    assignedDate: "2025-10-13",
    dueDate: "2025-10-13",
    priority: "Critical",
    status: "Pending",
    description:
      "Investigate and resolve the payment processing failure occurring in production. Users are unable to complete transactions using credit cards.",
    requirements: [
      "Debug Stripe API integration",
      "Check webhook configurations",
      "Review transaction logs",
      "Test with multiple payment methods",
      "Deploy hotfix to production",
    ],
    progress: 0,
    category: "Work",
  },
  {
    id: 3,
    title: "Update API Documentation",
    assignedBy: "Sarah Johnson (Team Lead)",
    assignedDate: "2025-10-12",
    dueDate: "2025-10-14",
    priority: "Medium",
    status: "In Progress",
    description:
      "Update the API documentation with recent endpoint changes and new features. Include request/response examples and error codes.",
    requirements: [
      "Document new endpoints",
      "Add code examples",
      "Update authentication section",
      "Review with backend team",
      "Publish to developer portal",
    ],
    progress: 40,
    category: "Work",
  },
  {
    id: 4,
    title: "Code Review - Dashboard Redesign",
    assignedBy: "Sarah Johnson (Team Lead)",
    assignedDate: "2025-10-13",
    dueDate: "2025-10-13",
    priority: "Medium",
    status: "Completed",
    description:
      "Review the pull request for the new dashboard redesign. Check for code quality, performance issues, and UI/UX consistency.",
    requirements: [
      "Review React components",
      "Check responsive design",
      "Test performance metrics",
      "Verify accessibility standards",
      "Approve or request changes",
    ],
    progress: 100,
    category: "Work",
  },
];

export function TaskProvider({ children }) {
  const [dailyTask, setDailyTask] = useState(initialDailyTasks);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      title: task.text || task.title || "Untitled Task",
      description: task.description || "",
      assignedBy: "Self",
      assignedDate: new Date().toISOString().split("T")[0],
      dueDate: task.dueDate || "",
      priority: task.priority || "Medium",
      status: "Pending",
      requirements: [],
      progress: 0,
      category: task.category || "Personal",
    };
    

    setDailyTask((prev) => [...prev, newTask]);
  };


  const deleteTask = (id) => {
    setDailyTask((prev) => prev.filter((t) => t.id !== id));
  };

const updateTask = (updatedTask) => {
  setDailyTask(prev =>
    prev.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    )
  );
};


  console.log("dailyTask State:", dailyTask);

  return (
    <TaskContext.Provider
      value={{
        dailyTask,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
