import React, { useState, useRef, useEffect } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Text Inputs for Design System",
    desc: "Search for inspiration to provide a rich conten...",
    labels: ["Today", "To-do"],
    date: "Aug 04",
    checked: false,
  },
  {
    id: 2,
    title: "Meeting with Arthur Taylor",
    desc: "Discuss the MVP version of Apex Mobile and...",
    labels: ["Today", "Meeting"],
    date: "Aug 04",
    checked: true,
  },
  {
    id: 3,
    title: "Check neutral and state colors",
    desc: "Button components will be revised and design...",
    labels: ["Yesterday", "Important"],
    date: "Aug 03",
    checked: true,
  }
];

const LABEL_PRESETS = [
  { label: "Today", className: "label-today" },
  { label: "To-do", className: "label-todo" },
  { label: "Meeting", className: "label-meeting" },
  { label: "Important", className: "label-important" },
  { label: "Yesterday", className: "label-yesterday" },
];

// Converts a YYYY-MM-DD to "Mon DD"
function formatDisplayDate(isoString) {
  if (!isoString) return "";
  const dateObj = new Date(isoString);
  if (isNaN(dateObj)) return "";
  const mon = dateObj.toLocaleString('en', { month: 'short' });
  const d = dateObj.getDate().toString().padStart(2, "0");
  return `${mon} ${d}`;
}

// Returns YYYY-MM-DD for today's date
function getDefaultDateValue() {
  const today = new Date();
  return today.toISOString().slice(0,10);
}

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [adding, setAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
    labels: [],
    date: getDefaultDateValue(),
  });

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (adding && titleInputRef.current) titleInputRef.current.focus();
  }, [adding]);

  const toggleCheck = (id) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleStartAdd = () => {
    setAdding(true);
    setNewTask({
      title: "",
      desc: "",
      labels: [],
      date: getDefaultDateValue(),
    });
  };

  const handleCancelAdd = () => {
    setAdding(false);
    setNewTask({
      title: "",
      desc: "",
      labels: [],
      date: getDefaultDateValue(),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleLabelToggle = (label) => {
    setNewTask((prev) => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter((l) => l !== label)
        : [...prev.labels, label],
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setTasks([
      {
        id: Date.now(),
        title: newTask.title.trim(),
        desc: newTask.desc.substring(0, 80),
        labels: newTask.labels,
        date: formatDisplayDate(newTask.date),
        checked: false
      },
      ...tasks
    ]);
    setAdding(false);
    setNewTask({
      title: "",
      desc: "",
      labels: [],
      date: getDefaultDateValue(),
    });
  };

  return (
    <div className="task-container">
      <div className="task-header">
        <span className="task-title">My Tasks</span>
        <button className="add-task-btn" onClick={handleStartAdd}>
          + Add Task
        </button>
      </div>
      {adding && (
        <form className="task-add-form" onSubmit={handleAdd}>
          <input
            className="input"
            name="title"
            maxLength={50}
            placeholder="Task Title (required)"
            required
            value={newTask.title}
            onChange={handleInputChange}
            ref={titleInputRef}
          />
          <input
            className="input"
            name="desc"
            maxLength={80}
            placeholder="Description"
            value={newTask.desc}
            onChange={handleInputChange}
          />
          <div className="add-labels-area">
            {LABEL_PRESETS.map(({ label, className }) => (
              <span
                key={label}
                className={
                  `label ${className} ${newTask.labels.includes(label) ? "selected highlight" : ""}`
                }
                onClick={() => handleLabelToggle(label)}
                tabIndex={0}
                role="button"
                aria-pressed={newTask.labels.includes(label)}
              >
                {label}
              </span>
            ))}
          </div>
          <input
            className="input"
            name="date"
            type="date"
            value={newTask.date}
            onChange={handleInputChange}
          />
          <div className="form-btn-row">
            <button
              className="add-confirm-btn"
              type="submit"
              disabled={!newTask.title.trim()}
            >
              Add
            </button>
            <button
              className="add-cancel-btn"
              type="button"
              onClick={handleCancelAdd}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-item${task.checked ? " completed" : ""}`}>
            <div className="task-checkbox">
              <input
                type="checkbox"
                checked={task.checked}
                aria-label={`Mark ${task.title} as complete`}
                onChange={() => toggleCheck(task.id)}
              />
            </div>
            <div className="task-details">
              <span className="t-title">{task.title}</span>
              <span className="t-desc">{task.desc}</span>
              <div className="t-labels">
                {task.labels.map((label, idx) => {
                  const preset = LABEL_PRESETS.find((lp) => lp.label === label);
                  return (
                    <span
                      key={idx}
                      className={`label ${preset ? preset.className : ""}`}
                    >
                      {label}
                    </span>
                  );
                })}
                <span className="task-date">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="calendar-icon" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="4.5" width="11" height="8" rx="1" stroke="#C0C0C0"/><path d="M5 2V5" stroke="#C0C0C0" strokeLinecap="round"/><path d="M11 2V5" stroke="#C0C0C0" strokeLinecap="round"/></svg>
                  {task.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
