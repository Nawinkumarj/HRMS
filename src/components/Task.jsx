import React, { useState } from 'react';

export default function Task() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Work');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: task,
      priority,
      category,
      timestamp: new Date().toLocaleTimeString(),
      completed: false
    };
    
    setTaskList([...taskList, newTask]);
    setTask('');
  };

  const handleDelete = (id) => {
    setTaskList(taskList.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTaskList(taskList.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Work': return '#3b82f6';
      case 'Personal': return '#8b5cf6';
      case 'Learning': return '#ec4899';
      case 'Urgent': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const completedTasks = taskList.filter(task => task.completed).length;
  const totalTasks = taskList.length;

  return (
    <div className="task-container">
      {/* <div className="task-header glass-card">
        <div className="header-content">
          <h1 className="task-title">Daily Task Manager</h1>
          <p className="task-subtitle">Organize your daily tasks efficiently</p>
        </div>
        <div className="task-stats">
          <div className="stat">
            <span className="stat-number">{totalTasks}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat">
            <span className="stat-number">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div> */}

      <div className="task-content">
        <div className="task-form-section glass-card">
          <h3 className="form-title">Add New Task</h3>
          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <textarea
                placeholder="What needs to be done today?"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                rows="4"
                className="task-textarea"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Learning">Learning</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={task.trim() === ''}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </form>
        </div>

        {/* {taskList.length > 0 && (
          <div className="task-list-section">
            <div className="section-header">
              <h3 className="section-title">Today's Tasks</h3>
              <span className="task-count">{taskList.length} tasks</span>
            </div>
            
            <div className="task-list">
              {taskList.map((taskItem) => (
                <div 
                  key={taskItem.id} 
                  className={`task-item glass-card ${taskItem.completed ? 'completed' : ''}`}
                >
                  <div className="task-item-header">
                    <div className="task-meta">
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(taskItem.priority) }}
                      >
                        {taskItem.priority}
                      </span>
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: getCategoryColor(taskItem.category) }}
                      >
                        {taskItem.category}
                      </span>
                      <span className="time-badge">{taskItem.timestamp}</span>
                    </div>
                    
                    <div className="task-actions">
                      <button
                        onClick={() => handleToggleComplete(taskItem.id)}
                        className={`action-btn complete-btn ${taskItem.completed ? 'completed' : ''}`}
                        title={taskItem.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleDelete(taskItem.id)}
                        className="action-btn delete-btn"
                        title="Delete task"
                      >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p className="task-text">{taskItem.text}</p>

                  <div className="task-status">
                    {taskItem.completed && (
                      <span className="completed-indicator">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* {taskList.length === 0 && (
          <div className="empty-state glass-card">
            <div className="empty-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3>No tasks yet</h3>
            <p>Add your first task to get started with your day!</p>
          </div>
        )} */}
      </div>
    </div>
  );
}