import React, { useState } from 'react';


export default function LeaveList() {
  const [viewMode, setViewMode] = useState('list');
  const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Approval Status Data
  const approvalStats = {
    requested: 258,
    approved: 184,
    pending: 62,
    rejected: 12,
    total: 516
  };

  // Leave Type Data
  const leaveTypeStats = {
    sickLeave: 42,
    maternityLeave: 22,
    otherLeave: 62,
    total: 126
  };

  // Upcoming Holidays
  const upcomingHolidays = [
    { date: '9', month: 'Aug', name: 'Raksha Bandhan', day: 'Saturday', type: 'Full Day' },
    { date: '15', month: 'Aug', name: 'Independence Day', day: 'Friday', type: 'Full Day' },
    { date: '16', month: 'Aug', name: 'Janmashtami', day: 'Saturday', type: 'Full Day' }
  ];

  // Employees Leave List
  const leaveRequests = [
    {
      id: 1,
      name: 'Samantha Paul',
      designation: 'Sr.UI Developer',
      leaveType: 'Sick Leave',
      reason: 'To support my spouse and care...',
      startDate: 'July 10,2025',
      endDate: 'July 12,2025',
      days: 2,
      status: 'pending',
      avatar: 'SP'
    },
    {
      id: 2,
      name: 'Gray Noal',
      designation: 'React Developer',
      leaveType: 'Casual Leave',
      reason: 'Attending a family function out...',
      startDate: 'July 14,2025',
      endDate: 'July 30,2025',
      days: 15,
      status: 'approved',
      avatar: 'GN'
    },
    {
      id: 3,
      name: 'Cameron Williamson',
      designation: 'Team Lead',
      leaveType: 'Personal Leave',
      reason: 'Need time off to manage some...',
      startDate: 'July 06,2025',
      endDate: 'July 16,2025',
      days: 10,
      status: 'rejected',
      avatar: 'CW'
    },
    {
      id: 4,
      name: 'Ralph Edwards',
      designation: 'Full Stack Developer',
      leaveType: 'Maternity Leave',
      reason: 'Starting maternity leave as per...',
      startDate: 'July 02,2025',
      endDate: 'July 06,2025',
      days: 4,
      status: 'rejected',
      avatar: 'RE'
    },
    {
      id: 5,
      name: 'Annette Black',
      designation: 'Jr.Java Developer',
      leaveType: 'Gifted Leave',
      reason: 'Team leave gifted by managem...',
      startDate: 'August 26,2025',
      endDate: 'August 30,2025',
      days: 4,
      status: 'approved',
      avatar: 'AB'
    },
    {
      id: 6,
      name: 'Marvin McKinney',
      designation: 'Sr.UI Developer',
      leaveType: 'Sick Leave',
      reason: 'Welcoming our second child an...',
      startDate: 'August 05,2025',
      endDate: 'August 06,2025',
      days: 1,
      status: 'pending',
      avatar: 'MM'
    },
    {
      id: 7,
      name: 'Theresa Webb',
      designation: 'React Developer',
      leaveType: 'Casual Leave',
      reason: "Traveling for a friend's wedding.",
      startDate: 'August 14,2025',
      endDate: 'August 16,2025',
      days: 2,
      status: 'pending',
      avatar: 'TW'
    },
    {
      id: 8,
      name: 'Arlene McCoy',
      designation: 'Business Analyst',
      leaveType: 'Personal Leave',
      reason: 'Taking a day off to accompany...',
      startDate: 'August 02,2025',
      endDate: 'August 12,2025',
      days: 10,
      status: 'approved',
      avatar: 'AM'
    }
  ];

  const handleApprove = (id) => {
    console.log('Approve leave:', id);
    alert(`Leave request #${id} approved`);
  };

  const handleReject = (id) => {
    console.log('Reject leave:', id);
    alert(`Leave request #${id} rejected`);
  };

  const handleApproveAll = () => {
    const pendingCount = leaveRequests.filter(req => req.status === 'pending').length;
    alert(`Approving all ${pendingCount} pending leave requests`);
  };

  const handleAddLeave = (e) => {
    e.preventDefault();
    console.log('Add leave:', leaveForm);
    alert('Leave request submitted successfully!');
    setShowAddLeaveModal(false);
    setLeaveForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="leave-list-container">
      {/* Top Bar */}
      <div className="top-bar">
        

        <div className="action-buttons">
          <button className="export-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
          <button className="add-leave-btn" onClick={() => setShowAddLeaveModal(true)}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Leave Request
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stat-card glass-card">
          <div className="card-header">
            <div className="card-icon purple"></div>
            <h3>Approval Status</h3>
          </div>
          <div className="chart-container">
            <div className="donut-chart">
              <svg viewBox="0 0 200 200" className="chart-svg">
                {/* Total center */}
                <circle cx="100" cy="100" r="70" fill="white" />
                
                {/* Requested - Purple (largest segment) */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="30"
                  strokeDasharray={`${(approvalStats.requested / approvalStats.total) * 534} 534`}
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                />
                
                {/* Approved - Green */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="30"
                  strokeDasharray={`${(approvalStats.approved / approvalStats.total) * 534} 534`}
                  strokeDashoffset={-((approvalStats.requested / approvalStats.total) * 534)}
                  transform="rotate(-90 100 100)"
                />
                
                {/* Pending - Orange */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="30"
                  strokeDasharray={`${(approvalStats.pending / approvalStats.total) * 534} 534`}
                  strokeDashoffset={-(((approvalStats.requested + approvalStats.approved) / approvalStats.total) * 534)}
                  transform="rotate(-90 100 100)"
                />
                
                {/* Rejected - Red */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="30"
                  strokeDasharray={`${(approvalStats.rejected / approvalStats.total) * 534} 534`}
                  strokeDashoffset={-(((approvalStats.requested + approvalStats.approved + approvalStats.pending) / approvalStats.total) * 534)}
                  transform="rotate(-90 100 100)"
                />
                
                <text x="100" y="105" textAnchor="middle" className="chart-total">
                  {approvalStats.total}
                </text>
              </svg>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{background: '#6366f1'}}></div>
                <span>Requested</span>
                <strong>{approvalStats.requested}</strong>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#10b981'}}></div>
                <span>Approved</span>
                <strong>{approvalStats.approved}</strong>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#f59e0b'}}></div>
                <span>Pending</span>
                <strong>{approvalStats.pending}</strong>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{background: '#ef4444'}}></div>
                <span>Rejected</span>
                <strong>{approvalStats.rejected}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Leave Type */}
        <div className="stat-card glass-card">
          <div className="card-header">
            <div className="card-icon purple"></div>
            <h3>Leave Type</h3>
          </div>
          <div className="chart-container">
            <div className="donut-chart">
              <svg viewBox="0 0 200 200" className="chart-svg">
                <circle cx="100" cy="100" r="70" fill="white" />
                
                {/* Sick Leave - Orange */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="30"
                  strokeDasharray={`${(leaveTypeStats.sickLeave / leaveTypeStats.total) * 534} 534`}
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                />
                
                {/* Maternity Leave - Green */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="30"
                  strokeDasharray={`${(leaveTypeStats.maternityLeave / leaveTypeStats.total) * 534} 534`}
                  strokeDashoffset={-((leaveTypeStats.sickLeave / leaveTypeStats.total) * 534)}
                  transform="rotate(-90 100 100)"
                />
                
                {/* Other Leave - Purple */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="30"
                  strokeDasharray={`${(leaveTypeStats.otherLeave / leaveTypeStats.total) * 534} 534`}
                  strokeDashoffset={-(((leaveTypeStats.sickLeave + leaveTypeStats.maternityLeave) / leaveTypeStats.total) * 534)}
                  transform="rotate(-90 100 100)"
                />
                
                <text x="100" y="90" textAnchor="middle" className="chart-label">Total Time Off</text>
                <text x="100" y="115" textAnchor="middle" className="chart-total">{leaveTypeStats.total}</text>
              </svg>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span>Sick Leave</span>
                <strong>{leaveTypeStats.sickLeave}</strong>
              </div>
              <div className="legend-item">
                <span>Maternity Leave</span>
                <strong>{leaveTypeStats.maternityLeave}</strong>
              </div>
              <div className="legend-item">
                <span>Other Leave</span>
                <strong>{leaveTypeStats.otherLeave}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="leave-table-section glass-card">
        <div className="table-header">
          <div className="table-title">
            <div className="card-icon purple"></div>
            <h3>Employees Leave List</h3>
          </div>
          <div className="table-actions">
            <button className="approve-all-btn" onClick={handleApproveAll}>
              Approve All
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="leave-table">
            <thead>
              <tr>
                <th>
                  <div className="th-content">
                    Employee
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Designation
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Leave Type
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Reason
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Start Date
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Start Date
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Days
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Action
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div className="employee-cell">
                      <div className="avatar">{request.avatar}</div>
                      <span>{request.name}</span>
                    </div>
                  </td>
                  <td>{request.designation}</td>
                  <td>{request.leaveType}</td>
                  <td>
                    <div className="reason-cell">{request.reason}</div>
                  </td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td><strong>{request.days}</strong></td>
                  <td>
                    {request.status === 'pending' ? (
                      <div className="action-buttons-cell">
                        <button 
                          className="approve-btn-sm"
                          onClick={() => handleApprove(request.id)}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </button>
                        <button 
                          className="reject-btn-sm"
                          onClick={() => handleReject(request.id)}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <span className={`status-badge-table ${request.status}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Leave Modal */}
      {showAddLeaveModal && (
        <div className="modal-overlay" onClick={() => setShowAddLeaveModal(false)}>
          <div className="modal-content glass-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Leave Request</h2>
              <button onClick={() => setShowAddLeaveModal(false)} className="close-button">×</button>
            </div>

            <form onSubmit={handleAddLeave}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Leave Type *</label>
                  <select
                    className="form-input"
                    value={leaveForm.leaveType}
                    onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="personal">Personal Leave</option>
                    <option value="maternity">Maternity Leave</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={leaveForm.startDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={leaveForm.endDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reason *</label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    placeholder="Enter reason for leave..."
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddLeaveModal(false)} className="cancel-button">Cancel</button>
                <button type="submit" className="submit-button">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
