import React, { useState } from 'react';

const Holiday = () => {
  const [activeTab, setActiveTab] = useState('balance');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCompOffModal, setShowCompOffModal] = useState(false);

  // Leave Balance
  const leaveBalance = {
    casual: { total: 12, used: 3, available: 9 },
    sick: { total: 10, used: 2, available: 8 },
    earned: { total: 15, used: 5, available: 10 },
    compOff: { total: 0, used: 0, available: 3 }
  };

  // Leave History
  const leaveHistory = [
    { id: 1, type: 'Casual Leave', from: '2025-09-15', to: '2025-09-16', days: 2, status: 'Approved', reason: 'Personal work' },
    { id: 2, type: 'Sick Leave', from: '2025-09-22', to: '2025-09-22', days: 1, status: 'Approved', reason: 'Fever' },
    { id: 3, type: 'Earned Leave', from: '2025-10-10', to: '2025-10-14', days: 5, status: 'Pending', reason: 'Vacation' },
  ];

  // Comp Off
  const compOffRecords = [
    { id: 1, date: '2025-09-02', reason: 'Weekend deployment', status: 'Approved', expiryDate: '2026-03-02' },
    { id: 2, date: '2025-09-23', reason: 'Emergency support', status: 'Approved', expiryDate: '2026-03-23' },
    { id: 3, date: '2025-10-05', reason: 'Client presentation', status: 'Pending', expiryDate: '-' },
  ];

  const [leaveForm, setLeaveForm] = useState({
    type: 'casual',
    from: '',
    to: '',
    reason: ''
  });

  const [compOffForm, setCompOffForm] = useState({
    date: '',
    reason: ''
  });

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    console.log('Leave application:', leaveForm);
    setShowApplyModal(false);
    setLeaveForm({ type: 'casual', from: '', to: '', reason: '' });
  };

  const handleCompOffSubmit = (e) => {
    e.preventDefault();
    console.log('Comp off request:', compOffForm);
    setShowCompOffModal(false);
    setCompOffForm({ date: '', reason: '' });
  };

  return (
    <div className="leave-management-container">
      <div className="leave-header">
        <h1 className="leave-title">Leave Management</h1>
        <div className="header-buttons">
          <button onClick={() => setShowApplyModal(true)} className="apply-leave-btn">
            Apply Leave
          </button>
          <button onClick={() => setShowCompOffModal(true)} className="comp-off-btn">
            Request Comp Off
          </button>
        </div>
      </div>
      <div className="leave-tabs">
        <button
          className={`tab-button ${activeTab === 'balance' ? 'active' : ''}`}
          onClick={() => setActiveTab('balance')}
        >
          Leave Balance
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Leave History
        </button>
        <button
          className={`tab-button ${activeTab === 'compoff' ? 'active' : ''}`}
          onClick={() => setActiveTab('compoff')}
        >
          Comp Off
        </button>
      </div>
      {activeTab === 'balance' && (
        <div className="tab-content">
          <div className="balance-grid">
            <div className="balance-card casual">
              <div className="balance-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="balance-type">Casual Leave</h3>
              <div className="balance-numbers">
                <div className="balance-main">{leaveBalance.casual.available}</div>
                <div className="balance-label">Available</div>
              </div>
              <div className="balance-details">
                <span>Used: {leaveBalance.casual.used}</span>
                <span>Total: {leaveBalance.casual.total}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill casual-fill"
                  style={{ width: `${(leaveBalance.casual.used / leaveBalance.casual.total) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="balance-card sick">
              <div className="balance-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="balance-type">Sick Leave</h3>
              <div className="balance-numbers">
                <div className="balance-main">{leaveBalance.sick.available}</div>
                <div className="balance-label">Available</div>
              </div>
              <div className="balance-details">
                <span>Used: {leaveBalance.sick.used}</span>
                <span>Total: {leaveBalance.sick.total}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill sick-fill"
                  style={{ width: `${(leaveBalance.sick.used / leaveBalance.sick.total) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="balance-card earned">
              <div className="balance-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="balance-type">Earned Leave</h3>
              <div className="balance-numbers">
                <div className="balance-main">{leaveBalance.earned.available}</div>
                <div className="balance-label">Available</div>
              </div>
              <div className="balance-details">
                <span>Used: {leaveBalance.earned.used}</span>
                <span>Total: {leaveBalance.earned.total}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill earned-fill"
                  style={{ width: `${(leaveBalance.earned.used / leaveBalance.earned.total) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="balance-card compoff">
              <div className="balance-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="balance-type">Comp Off</h3>
              <div className="balance-numbers">
                <div className="balance-main">{leaveBalance.compOff.available}</div>
                <div className="balance-label">Available</div>
              </div>
              <div className="balance-details">
                <span>Used: {leaveBalance.compOff.used}</span>
                <span>Total: {leaveBalance.compOff.total}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill compoff-fill" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'history' && (
        <div className="tab-content">
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.type}</td>
                    <td>{leave.from}</td>
                    <td>{leave.to}</td>
                    <td>{leave.days}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <span className={`status-badge ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === 'compoff' && (
        <div className="tab-content">
          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date Worked</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {compOffRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.reason}</td>
                    <td>
                      <span className={`status-badge ${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                    <td>{record.expiryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showApplyModal && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="modal-content leave-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Apply for Leave</h2>
              <button onClick={() => setShowApplyModal(false)} className="close-button">×</button>
            </div>

            <form onSubmit={handleLeaveSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Leave Type</label>
                  <select
                    className="form-input"
                    value={leaveForm.type}
                    onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                    required
                  >
                    <option value="casual">Casual Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="earned">Earned Leave</option>
                    <option value="compoff">Comp Off</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">From Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={leaveForm.from}
                      onChange={(e) => setLeaveForm({ ...leaveForm, from: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">To Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={leaveForm.to}
                      onChange={(e) => setLeaveForm({ ...leaveForm, to: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reason</label>
                  <textarea
                    className="form-input form-textarea"
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    rows="4"
                    placeholder="Enter reason for leave..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowApplyModal(false)} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="refer-button">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showCompOffModal && (
        <div className="modal-overlay" onClick={() => setShowCompOffModal(false)}>
          <div className="modal-content leave-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Request Comp Off</h2>
              <button onClick={() => setShowCompOffModal(false)} className="close-button">×</button>
            </div>

            <form onSubmit={handleCompOffSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Date Worked</label>
                  <input
                    type="date"
                    className="form-input"
                    value={compOffForm.date}
                    onChange={(e) => setCompOffForm({ ...compOffForm, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Reason</label>
                  <textarea
                    className="form-input form-textarea"
                    value={compOffForm.reason}
                    onChange={(e) => setCompOffForm({ ...compOffForm, reason: e.target.value })}
                    rows="4"
                    placeholder="Explain why you worked on this day (e.g., weekend deployment, emergency support)..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowCompOffModal(false)} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="refer-button">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holiday;
