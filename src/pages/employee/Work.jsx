import React, { useState } from "react";

export default function Work() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    to: "manager@company.com",
    cc: "hr@company.com",
    subject: "",
    message: "",
    attachments: [],
  });

  // Daily Tasks from Team Lead
  const dailyTasks = [
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
    },
  ];

  const weeklyStats = {
    completed: 12,
    assigned: 18,
    pending: 6,
    performance: 85,
  };

  // Recent Updates/POCs sent
  const recentUpdates = [
    {
      id: 1,
      subject: "Daily Status Update - Oct 12",
      date: "2025-10-12",
      status: "Sent",
    },
    {
      id: 2,
      subject: "POC: New Feature Implementation",
      date: "2025-10-11",
      status: "Sent",
    },
    {
      id: 3,
      subject: "Weekly Progress Report",
      date: "2025-10-09",
      status: "Sent",
    },
  ];

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleNeedHelp = (task) => {
    alert(`Help requested for task: ${task.title}`);
    // Implement help request logic here
  };

  const handleMarkComplete = (task) => {
    alert(`Task marked as complete: ${task.title}`);
    // Implement complete task logic here
  };

  const handleSendUpdate = (e) => {
    e.preventDefault();
    console.log("Sending update:", updateForm);
    alert("Daily update sent successfully!");
    setShowUpdateModal(false);
    setUpdateForm({
      to: "manager@company.com",
      cc: "hr@company.com",
      subject: "",
      message: "",
      attachments: [],
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUpdateForm({
      ...updateForm,
      attachments: [...updateForm.attachments, ...files],
    });
  };

  const removeAttachment = (index) => {
    const newAttachments = updateForm.attachments.filter((_, i) => i !== index);
    setUpdateForm({ ...updateForm, attachments: newAttachments });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "priority-critical";
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "In Progress":
        return "status-progress";
      case "Pending":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="work-container">
      <div className="work-header glass-card">
        <div>
          <h1 className="work-title">Work Dashboard</h1>
          <p className="work-subtitle">Manage your daily tasks and updates</p>
        </div>
        <button onClick={() => setShowUpdateModal(true)} className="update-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Send Daily Update
        </button>
      </div>
      <div className="performance-section">
        <h2 className="section-title">Weekly Performance</h2>
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon completed-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Work Completed</p>
              <h3 className="stat-value">{weeklyStats.completed}</h3>
              <p className="stat-subtitle">This Week</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon assigned-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Work Assigned</p>
              <h3 className="stat-value">{weeklyStats.assigned}</h3>
              <p className="stat-subtitle">Total Tasks</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon pending-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Work Pending</p>
              <h3 className="stat-value">{weeklyStats.pending}</h3>
              <p className="stat-subtitle">To Be Done</p>
            </div>
          </div>

          <div className="stat-card glass-card performance-card">
            <div className="stat-icon performance-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Performance Score</p>
              <h3 className="stat-value">{weeklyStats.performance}%</h3>
              <div className="performance-bar">
                <div
                  className="performance-fill"
                  style={{ width: `${weeklyStats.performance}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Tasks Section */}
      <div className="tasks-section">
        <h2 className="section-title">Daily Tasks</h2>
        <div className="tasks-grid">
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              className="task-card glass-card"
              onClick={() => handleTaskClick(task)}
            >
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span
                  className={`priority-badge ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <p className="task-description">{task.description}</p>

              <div className="task-meta">
                <div className="meta-item">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{task.assignedBy}</span>
                </div>
                <div className="meta-item">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Due: {task.dueDate}</span>
                </div>
              </div>

              <div className="task-progress">
                <div className="progress-header">
                  <span
                    className={`status-badge ${getStatusColor(task.status)}`}
                  >
                    {task.status}
                  </span>
                  <span className="progress-text">{task.progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="task-actions">
                {task.status !== "Completed" && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkComplete(task);
                      }}
                      className="action-btn complete-btn"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Complete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNeedHelp(task);
                      }}
                      className="action-btn help-btn"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Need Help
                    </button>
                  </>
                )}
                {task.status === "Completed" && (
                  <button className="action-btn completed-btn" disabled>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="recent-updates-section">
        <h2 className="section-title">Recent Updates Sent</h2>
        <div className="updates-list glass-card">
          {recentUpdates.map((update) => (
            <div key={update.id} className="update-item">
              <div className="update-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="update-content">
                <h4>{update.subject}</h4>
                <p>{update.date}</p>
              </div>
              <span className="update-status">{update.status}</span>
            </div>
          ))}
        </div>
      </div>

      {showTaskModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div
            className="modal-content glass-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">{selectedTask.title}</h2>
              <button
                onClick={() => setShowTaskModal(false)}
                className="close-button"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="task-detail-header">
                <span
                  className={`priority-badge ${getPriorityColor(
                    selectedTask.priority
                  )}`}
                >
                  {selectedTask.priority}
                </span>
                <span
                  className={`status-badge ${getStatusColor(
                    selectedTask.status
                  )}`}
                >
                  {selectedTask.status}
                </span>
              </div>

              <div className="detail-section">
                <h4 className="detail-heading">Description</h4>
                <p className="detail-text">{selectedTask.description}</p>
              </div>

              <div className="detail-section">
                <h4 className="detail-heading">Requirements</h4>
                <ul className="requirements-list">
                  {selectedTask.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Assigned By</span>
                  <span className="detail-value">
                    {selectedTask.assignedBy}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Assigned Date</span>
                  <span className="detail-value">
                    {selectedTask.assignedDate}
                  </span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Due Date</span>
                  <span className="detail-value">{selectedTask.dueDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Progress</span>
                  <span className="detail-value">{selectedTask.progress}%</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedTask.status !== "Completed" && (
                <>
                  <button
                    onClick={() => {
                      handleNeedHelp(selectedTask);
                      setShowTaskModal(false);
                    }}
                    className="modal-action-btn help-btn"
                  >
                    Need Help
                  </button>
                  <button
                    onClick={() => {
                      handleMarkComplete(selectedTask);
                      setShowTaskModal(false);
                    }}
                    className="modal-action-btn complete-btn"
                  >
                    Mark as Complete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* poc */}
      {showUpdateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowUpdateModal(false)}
        >
          <div
            className="modal-content email-modal glass-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Send Daily Update</h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="close-button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendUpdate}>
              <div className="modal-body">
                <div className="email-field">
                  <label className="email-label">To:</label>
                  <input
                    type="email"
                    className="email-input"
                    value={updateForm.to}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, to: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="email-field">
                  <label className="email-label">CC:</label>
                  <input
                    type="email"
                    className="email-input"
                    value={updateForm.cc}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, cc: e.target.value })
                    }
                  />
                </div>

                <div className="email-field">
                  <label className="email-label">Subject:</label>
                  <input
                    type="text"
                    className="email-input"
                    placeholder="Daily Status Update - Oct 13, 2025"
                    value={updateForm.subject}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, subject: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="email-field">
                  <label className="email-label">Message:</label>
                  <textarea
                    className="email-textarea"
                    rows="12"
                    placeholder="Dear Team,
                    
Here's my daily progress update:

Best regards"
                    value={updateForm.message}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, message: e.target.value })
                    }
                    required
                  ></textarea>
                </div>

                <div className="email-attachments">
                  <label className="email-label">Attachments:</label>
                  <div className="attachment-upload">
                    <input
                      type="file"
                      id="emailAttachment"
                      multiple
                      onChange={handleFileUpload}
                      className="file-input"
                    />
                    <label
                      htmlFor="emailAttachment"
                      className="upload-btn-label"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      Attach Files
                    </label>
                  </div>

                  {updateForm.attachments.length > 0 && (
                    <div className="attachments-list">
                      {updateForm.attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="remove-attachment"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="modal-action-btn cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="modal-action-btn send-btn">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
