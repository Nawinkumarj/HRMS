// Task.js
import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { toast } from "react-toastify";

export default function Task() {

  const { addTask } = useContext(TaskContext);

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Task Added Successfully!");
    if (!task.trim()) return;

    addTask({
      text: task,
      priority,
      category,
      description: task,
    });

    setTask("");
  };

  console.log(task);
  
  
  

  return (
    <div className="task-container">
      <div className="task-content">
        <div className="task-form-section glass-card">
          <h3 className="form-title">Add New Task</h3>

          <form onSubmit={handleSubmit} className="task-form">
            <textarea
              placeholder="What needs to be done today?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              rows="4"
              className="task-textarea"
            />

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Learning</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={!task.trim()}>
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
