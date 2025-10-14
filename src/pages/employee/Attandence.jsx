import React, { useState } from 'react';

export default function Attendance() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showRegularizationModal, setShowRegularizationModal] = useState(false);
  const [regularizationForm, setRegularizationForm] = useState({
    date: '',
    type: '',
    checkIn: '',
    checkOut: '',
    reason: '',
    attachment: null,
    attachmentName: ''
  });

  // Attendance stats
  const attendanceStats = {
    totalWorkingDays: 261,
    totalLeaves: 27,
    weekOffs: 104,
    daysLeft: 77,
    present: 184,
    absent: 3,
    wfh: 45,
    hybrid: 32,
    leaveTaken: 12,
    attendancePercentage: 98.5,
    pendingRegularization: 2
  };

  // Sample attendance data
  const attendanceData = {
    '2025-10-01': { type: 'present', checkIn: '09:15 AM', checkOut: '06:30 PM' },
    '2025-10-02': { type: 'present', checkIn: '09:00 AM', checkOut: '06:15 PM' },
    '2025-10-03': { type: 'wfh', checkIn: '09:30 AM', checkOut: '06:45 PM' },
    '2025-10-04': { type: 'weekoff' },
    '2025-10-05': { type: 'weekoff' },
    '2025-10-06': { type: 'weekoff' },
    '2025-10-07': { type: 'present', checkIn: '08:45 AM', checkOut: '06:00 PM' },
    '2025-10-08': { type: 'hybrid', checkIn: '10:00 AM', checkOut: '07:00 PM' },
    '2025-10-09': { type: 'present', checkIn: '09:10 AM', checkOut: '06:20 PM' },
    '2025-10-10': { type: 'leave', reason: 'Casual Leave' },
    '2025-10-11': { type: 'weekoff' },
    '2025-10-12': { type: 'weekoff' },
    '2025-10-13': { type: 'present', checkIn: '09:05 AM', checkOut: 'Ongoing' },
  };

  // Regularization requests
  const regularizationRequests = [
    {
      id: 1,
      date: '2025-10-01',
      type: 'Missing Check-out',
      reason: 'System issue - forgot to check out',
      status: 'Pending',
      submittedDate: '2025-10-02'
    },
    {
      id: 2,
      date: '2025-09-28',
      type: 'Missing Check-in',
      reason: 'Power outage in the morning',
      status: 'Approved',
      submittedDate: '2025-09-29',
      approvedDate: '2025-09-30'
    },
    {
      id: 3,
      date: '2025-09-15',
      type: 'Both Missing',
      reason: 'Network connectivity issues',
      status: 'Rejected',
      submittedDate: '2025-09-16',
      rejectedDate: '2025-09-17',
      rejectionReason: 'No valid proof provided'
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const getAttendanceForDate = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateKey = `${year}-${month}-${dayStr}`;
    return attendanceData[dateKey] || null;
  };

  const getDayClass = (day) => {
    const attendance = getAttendanceForDate(day);
    if (!attendance) return 'calendar-day';
    
    switch (attendance.type) {
      case 'present': return 'calendar-day day-present';
      case 'wfh': return 'calendar-day day-wfh';
      case 'hybrid': return 'calendar-day day-hybrid';
      case 'leave': return 'calendar-day day-leave';
      case 'weekoff': return 'calendar-day day-weekoff';
      default: return 'calendar-day';
    }
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const handleDayClick = (day) => {
    const attendance = getAttendanceForDate(day);
    if (attendance) {
      setSelectedDate({ day, ...attendance });
    }
  };

  const handleRegularizationSubmit = (e) => {
    e.preventDefault();
    console.log('Regularization request:', regularizationForm);
    alert('Regularization request submitted successfully!');
    setShowRegularizationModal(false);
    setRegularizationForm({
      date: '',
      type: '',
      checkIn: '',
      checkOut: '',
      reason: '',
      attachment: null,
      attachmentName: ''
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRegularizationForm({
        ...regularizationForm,
        attachment: file,
        attachmentName: file.name
      });
    }
  };

  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="attendance-container">
      {/* Header */}
      <div className="attendance-header glass-card">
        <div>
          <h1 className="attendance-title">Attendance Tracker</h1>
          <p className="attendance-subtitle">Monitor your work attendance and performance</p>
        </div>
        <button 
          onClick={() => setShowRegularizationModal(true)} 
          className="regularization-btn"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Request Regularization
        </button>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stats-row">
          <div className="stat-card glass-card">
            <div className="stat-icon present-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Present</p>
              <h3 className="stat-value">{attendanceStats.present}</h3>
              <p className="stat-subtitle">Days</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon absent-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Absent</p>
              <h3 className="stat-value">{attendanceStats.absent}</h3>
              <p className="stat-subtitle">Days</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon wfh-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Work From Home</p>
              <h3 className="stat-value">{attendanceStats.wfh}</h3>
              <p className="stat-subtitle">Days</p>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon hybrid-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Hybrid</p>
              <h3 className="stat-value">{attendanceStats.hybrid}</h3>
              <p className="stat-subtitle">Days</p>
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card glass-card wide-card">
            <div className="stat-icon working-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Working Days</p>
              <h3 className="stat-value">{attendanceStats.totalWorkingDays}</h3>
              <p className="stat-subtitle">In Year</p>
            </div>
          </div>

          <div className="stat-card glass-card wide-card">
            <div className="stat-icon leave-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Leave Taken / Total</p>
              <h3 className="stat-value">{attendanceStats.leaveTaken} / {attendanceStats.totalLeaves}</h3>
              <p className="stat-subtitle">{attendanceStats.totalLeaves - attendanceStats.leaveTaken} Remaining</p>
            </div>
          </div>

          <div className="stat-card glass-card performance-card-att">
            <div className="stat-icon performance-icon-att">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Attendance Rate</p>
              <h3 className="stat-value">{attendanceStats.attendancePercentage}%</h3>
              <div className="performance-bar-att">
                <div 
                  className="performance-fill-att" 
                  style={{ width: `${attendanceStats.attendancePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="calendar-section">
        <div className="calendar-card glass-card">
          <div className="calendar-header">
            <h2 className="calendar-title">{monthYear}</h2>
            <div className="calendar-controls">
              <button onClick={goToPreviousMonth} className="calendar-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={goToToday} className="calendar-btn today-btn">
                Today
              </button>
              <button onClick={goToNextMonth} className="calendar-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="calendar-legend">
            <div className="legend-item">
              <span className="legend-dot present-dot"></span>
              <span>Office</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot wfh-dot"></span>
              <span>WFH</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot hybrid-dot"></span>
              <span>Hybrid</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot leave-dot"></span>
              <span>Leave</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot weekoff-dot"></span>
              <span>Week Off</span>
            </div>
          </div>

          <div className="calendar-weekdays">
            <div className="weekday">Sun</div>
            <div className="weekday">Mon</div>
            <div className="weekday">Tue</div>
            <div className="weekday">Wed</div>
            <div className="weekday">Thu</div>
            <div className="weekday">Fri</div>
            <div className="weekday">Sat</div>
          </div>

          <div className="calendar-grid">
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} className="calendar-day empty"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const attendance = getAttendanceForDate(day);
              
              return (
                <div
                  key={day}
                  className={`${getDayClass(day)} ${isToday(day) ? 'today' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <span className="day-number">{day}</span>
                  {attendance && (
                    <div className="day-indicator">
                      {attendance.type === 'present' && '🏢'}
                      {attendance.type === 'wfh' && '🏠'}
                      {attendance.type === 'hybrid' && '🔄'}
                      {attendance.type === 'leave' && '✈️'}
                      {attendance.type === 'weekoff' && '🌴'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Regularization Requests */}
      <div className="regularization-section">
        <div className="section-header">
          <h2 className="section-title-reg">Regularization Requests</h2>
          {attendanceStats.pendingRegularization > 0 && (
            <span className="pending-badge">
              {attendanceStats.pendingRegularization} Pending
            </span>
          )}
        </div>
        <div className="requests-list glass-card">
          {regularizationRequests.map((request) => (
            <div key={request.id} className="request-item">
              <div className="request-content">
                <div className="request-header-item">
                  <h4 className="request-title">{request.type}</h4>
                  <span className={`request-status ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </div>
                <div className="request-details">
                  <div className="request-meta">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Date: {request.date}</span>
                  </div>
                  <p className="request-reason">Reason: {request.reason}</p>
                  <p className="request-submitted">Submitted: {request.submittedDate}</p>
                  {request.approvedDate && (
                    <p className="request-approved">Approved: {request.approvedDate}</p>
                  )}
                  {request.rejectedDate && (
                    <p className="request-rejected">
                      Rejected: {request.rejectedDate} - {request.rejectionReason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Date Detail Modal */}
      {selectedDate && (
        <div className="modal-overlay" onClick={() => setSelectedDate(null)}>
          <div className="modal-content glass-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                Attendance Details - {currentMonth.toLocaleDateString('en-US', { month: 'long' })} {selectedDate.day}
              </h2>
              <button onClick={() => setSelectedDate(null)} className="close-button">
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h4 className="detail-heading">Status</h4>
                <span className={`status-badge-large ${selectedDate.type}`}>
                  {selectedDate.type === 'present' && '🏢 Office'}
                  {selectedDate.type === 'wfh' && '🏠 Work From Home'}
                  {selectedDate.type === 'hybrid' && '🔄 Hybrid'}
                  {selectedDate.type === 'leave' && '✈️ On Leave'}
                  {selectedDate.type === 'weekoff' && '🌴 Week Off'}
                </span>
              </div>

              {selectedDate.checkIn && (
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Check In</span>
                    <span className="detail-value">{selectedDate.checkIn}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Check Out</span>
                    <span className="detail-value">{selectedDate.checkOut}</span>
                  </div>
                </div>
              )}

              {selectedDate.reason && (
                <div className="detail-section">
                  <h4 className="detail-heading">Reason</h4>
                  <p className="detail-text">{selectedDate.reason}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedDate(null)} className="modal-action-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regularization Modal */}
      {showRegularizationModal && (
        <div className="modal-overlay" onClick={() => setShowRegularizationModal(false)}>
          <div className="modal-content regularization-modal glass-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Request Attendance Regularization</h2>
              <button onClick={() => setShowRegularizationModal(false)} className="close-button">
                ×
              </button>
            </div>

            <form onSubmit={handleRegularizationSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={regularizationForm.date}
                    onChange={(e) => setRegularizationForm({ ...regularizationForm, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Issue Type *</label>
                  <select
                    className="form-input"
                    value={regularizationForm.type}
                    onChange={(e) => setRegularizationForm({ ...regularizationForm, type: e.target.value })}
                    required
                  >
                    <option value="">Select Issue Type</option>
                    <option value="missing-checkin">Missing Check-in</option>
                    <option value="missing-checkout">Missing Check-out</option>
                    <option value="both-missing">Both Missing</option>
                    <option value="wrong-time">Wrong Time Recorded</option>
                    <option value="system-issue">System Issue</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Actual Check-in Time *</label>
                    <input
                      type="time"
                      className="form-input"
                      value={regularizationForm.checkIn}
                      onChange={(e) => setRegularizationForm({ ...regularizationForm, checkIn: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Actual Check-out Time *</label>
                    <input
                      type="time"
                      className="form-input"
                      value={regularizationForm.checkOut}
                      onChange={(e) => setRegularizationForm({ ...regularizationForm, checkOut: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reason for Regularization *</label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    placeholder="Explain why you need regularization (e.g., system issue, forgot to check-in/out, network problem, etc.)"
                    value={regularizationForm.reason}
                    onChange={(e) => setRegularizationForm({ ...regularizationForm, reason: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Supporting Document (Optional)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="regularizationFile"
                      className="file-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="regularizationFile" className="file-upload-label">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>{regularizationForm.attachmentName || 'Upload screenshot or proof (PDF, JPG, PNG)'}</span>
                    </label>
                  </div>
                  {regularizationForm.attachmentName && (
                    <div className="file-preview-reg">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{regularizationForm.attachmentName}</span>
                      <button
                        type="button"
                        onClick={() => setRegularizationForm({ ...regularizationForm, attachment: null, attachmentName: '' })}
                        className="remove-file"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                <div className="info-box-reg">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="info-title-reg">Important Notes</p>
                    <ul className="info-list-reg">
                      <li>Regularization requests should be raised within 7 days</li>
                      <li>Manager approval is required for all requests</li>
                      <li>Multiple pending requests may affect approval</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowRegularizationModal(false)}
                  className="cancel-button-reg"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button-reg">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
