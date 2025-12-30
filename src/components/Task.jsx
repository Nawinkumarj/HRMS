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
    if (!task.trim()) return;

    addTask({
      text: task,
      priority,
      category,
      description: task,
    });

    toast.success("Task Added Successfully!");
    setTask("");
  };

  return (
    <section className="task-create">
      <div>
        <div className="task-create__card">
          <h3 className="task-create__title">Add New Task</h3>

          <form onSubmit={handleSubmit} className="task-create__form">
            {/* Task Input */}
            <textarea
              className="task-create__textarea"
              placeholder="What needs to be done today?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              rows={4}
            />

            {/* Select Row */}
            <div className="task-create__row">
              <div className="task-create__field">
                <label className="task-create__label">Priority</label>
                <select
                  className="task-create__select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="task-create__field">
                <label className="task-create__label">Category</label>
                <select
                  className="task-create__select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Learning">Learning</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="task-create__submit"
              disabled={!task.trim()}
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
