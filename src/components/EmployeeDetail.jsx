import React, { useState } from 'react';

const EmployeeDetails = () => {
  const [formData, setFormData] = useState({
    firstName: 'Russel',
    lastName: 'Sims',
    email: 'russel@mycompany.com',
    phone: '+1 255 28354690',
    position: 'iOS Developer',
    role: 'Employee',
    manager: 'Kole Middleton',
    hrManager: 'Kirk Mittohn',
    lead: 'Eugene Hummel',
    startsOn: '21.05.2022',
    onboardingRequired: true,
    officeTour: true,
    managementIntroductory: false,
    workTools: true,
    meetYourColleagues: true,
    dutiesJournal: true,
    requestsHandling: true,
    activityTracking: true,
    onboardingProgress: 35,
    officeTourProgress: 100,
    workToolsProgress: 20,
    meetColleaguesProgress: 0,
    dutiesJournalProgress: 0,
    requestsHandlingProgress: 0,
    activityTrackingProgress: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    console.log('Saving changes:', formData);
    // Add your save logic here
  };

  const handleCancel = () => {
    console.log('Cancelled');
    // Add your cancel logic here
  };

  const handleDelete = () => {
    console.log('Delete user');
    // Add your delete logic here
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="emp-detail-container">
      <div className="emp-detail-header">
        <button className="emp-detail-back-btn">←</button>
        <img 
          src="/api/placeholder/40/40" 
          alt="Profile" 
          className="emp-detail-header-avatar"
        />
        <h1 className="emp-detail-header-name">Russel Sims</h1>
        <div className="emp-detail-header-right">
          <span className="emp-detail-added-date">Added on: 21.04.2022</span>
          <button className="emp-detail-delete-btn" onClick={handleDelete}>
            🗑️ Delete
          </button>
        </div>
      </div>

      <div className="emp-detail-content">
        {/* Left Column */}
        <div className="emp-detail-left-column">
          {/* Profile Image Section */}
          <div className="emp-detail-section">
            <label className="emp-detail-label">PROFILE IMAGE</label>
            <div className="emp-detail-profile-image-container">
              <img 
                src="/api/placeholder/160/200" 
                alt="Profile" 
                className="emp-detail-profile-image"
              />
              <button className="emp-detail-change-image-btn">
                🖼️ Change Profile Image
              </button>
            </div>
          </div>

          {/* Employee Details Section */}
          <div className="emp-detail-section">
            <label className="emp-detail-label">EMPLOYEE DETAILS</label>
            
            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="emp-detail-input"
              />
            </div>

            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="emp-detail-input"
              />
            </div>

            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">Email Address</label>
              <div className="emp-detail-input-with-icon">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="emp-detail-input"
                />
                <button 
                  className="emp-detail-copy-btn"
                  onClick={() => copyToClipboard(formData.email)}
                >
                  📋
                </button>
              </div>
            </div>

            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">Phone Number</label>
              <div className="emp-detail-input-with-icon">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="emp-detail-input"
                />
                <button 
                  className="emp-detail-copy-btn"
                  onClick={() => copyToClipboard(formData.phone)}
                >
                  📋
                </button>
              </div>
            </div>

            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="emp-detail-input"
              />
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="emp-detail-middle-column">
          {/* Role Section */}
          <div className="emp-detail-section">
            <label className="emp-detail-label">ROLE</label>
            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="emp-detail-select"
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Team Section */}
          <div className="emp-detail-section">
            <label className="emp-detail-label">TEAM</label>
            
            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">HR</label>
              <div className="emp-detail-select-with-avatar">
                <img 
                  src="/api/placeholder/24/24" 
                  alt="Manager" 
                  className="emp-detail-avatar-small"
                />
                <select
                  name="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                  className="emp-detail-select"
                >
                  <option value="Kole Middleton">Kole Middleton</option>
                </select>
              </div>
            </div>

            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">Manager</label>
              <div className="emp-detail-select-with-avatar">
                <img 
                  src="/api/placeholder/24/24" 
                  alt="HR Manager" 
                  className="emp-detail-avatar-small"
                />
                <select
                  name="hrManager"
                  value={formData.hrManager}
                  onChange={handleInputChange}
                  className="emp-detail-select"
                >
                  <option value="Kirk Mittohn">Kirk Mittohn</option>
                </select>
              </div>
            </div>

            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">Lead</label>
              <div className="emp-detail-select-with-avatar">
                <img 
                  src="/api/placeholder/24/24" 
                  alt="Lead" 
                  className="emp-detail-avatar-small"
                />
                <select
                  name="lead"
                  value={formData.lead}
                  onChange={handleInputChange}
                  className="emp-detail-select"
                >
                  <option value="Eugene Hummel">Eugene Hummel</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="emp-detail-right-column">
          {/* Onboarding Section */}
          <div className="emp-detail-section">
            <label className="emp-detail-label">ONBOARDING</label>
            
            <div className="emp-detail-form-group">
              <label className="emp-detail-field-label">Starts on</label>
              <div className="emp-detail-input-with-icon">
                <input
                  type="text"
                  name="startsOn"
                  value={formData.startsOn}
                  onChange={handleInputChange}
                  className="emp-detail-input"
                />
                <span className="emp-detail-calendar-icon">📅</span>
              </div>
            </div>

            <div className="emp-detail-toggle-item">
              <label className="emp-detail-toggle-label">
                <input
                  type="checkbox"
                  checked={formData.onboardingRequired}
                  onChange={() => handleToggleChange('onboardingRequired')}
                  className="emp-detail-toggle-input"
                />
                <span className="emp-detail-toggle-slider"></span>
              </label>
              <span className="emp-detail-toggle-text">Onboarding required</span>
            </div>

            <div className="emp-detail-status-section">
              <div className="emp-detail-status-header">
                <span className="emp-detail-status-label">Current Status</span>
              </div>
              <div className="emp-detail-status-badge">
                <span className="emp-detail-status-text">Onboarding</span>
                <div className="emp-detail-progress-bar">
                  <div 
                    className="emp-detail-progress-fill"
                    style={{ width: `${formData.onboardingProgress}%` }}
                  ></div>
                </div>
                <span className="emp-detail-progress-percent">{formData.onboardingProgress}%</span>
              </div>
              <button className="emp-detail-view-answers-btn">View Answers</button>
            </div>

            <div className="emp-detail-checklist">
              <label className="emp-detail-field-label">Onboarding Scripts</label>
              
              <div className="emp-detail-checklist-item">
                <label className="emp-detail-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.officeTour}
                    onChange={() => handleToggleChange('officeTour')}
                    className="emp-detail-toggle-input"
                  />
                  <span className="emp-detail-toggle-slider"></span>
                </label>
                <span className="emp-detail-checklist-text">Office Tour</span>
                <span className="emp-detail-checklist-percent">{formData.officeTourProgress}%</span>
              </div>

              <div className="emp-detail-checklist-item">
                <label className="emp-detail-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.managementIntroductory}
                    onChange={() => handleToggleChange('managementIntroductory')}
                    className="emp-detail-toggle-input"
                  />
                  <span className="emp-detail-toggle-slider"></span>
                </label>
                <span className="emp-detail-checklist-text">Management Introductory</span>
              </div>

              <div className="emp-detail-checklist-item">
                <label className="emp-detail-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.workTools}
                    onChange={() => handleToggleChange('workTools')}
                    className="emp-detail-toggle-input"
                  />
                  <span className="emp-detail-toggle-slider"></span>
                </label>
                <span className="emp-detail-checklist-text">Work Tools</span>
                <span className="emp-detail-checklist-percent">{formData.workToolsProgress}%</span>
              </div>

              <div className="emp-detail-checklist-item">
                <label className="emp-detail-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.meetYourColleagues}
                    onChange={() => handleToggleChange('meetYourColleagues')}
                    className="emp-detail-toggle-input"
                  />
                  <span className="emp-detail-toggle-slider"></span>
                </label>
                <span className="emp-detail-checklist-text">Meet Your Colleagues</span>
                <span className="emp-detail-checklist-percent">{formData.meetColleaguesProgress}%</span>
              </div>

              <div className="emp-detail-checklist-item">
                <label className="emp-detail-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.dutiesJournal}
                    onChange={() => handleToggleChange('dutiesJournal')}
                    className="emp-detail-toggle-input"
                  />
                  <span className="emp-detail-toggle-slider"></span>
                </label>
                <span className="emp-detail-checklist-text">Duties Journal</span>
                <span className="emp-detail-checklist-percent">{formData.dutiesJournalProgress}%</span>
              </div>

              <div className="emp-detail-checklist-item">
                <label className="emp-detail-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.requestsHandling}
                    onChange={() => handleToggleChange('requestsHandling')}
                    className="emp-detail-toggle-input"
                  />
                  <span className="emp-detail-toggle-slider"></span>
                </label>
                <span className="emp-detail-checklist-text">Requests Handling</span>
                <span className="emp-detail-checklist-percent">{formData.requestsHandlingProgress}%</span>
              </div>

              <div className="emp-detail-checklist-item">
                <label className="emp-detail-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.activityTracking}
                    onChange={() => handleToggleChange('activityTracking')}
                    className="emp-detail-toggle-input"
                  />
                  <span className="emp-detail-toggle-slider"></span>
                </label>
                <span className="emp-detail-checklist-text">Activity Tracking</span>
                <span className="emp-detail-checklist-percent">{formData.activityTrackingProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="emp-detail-footer">
        <button className="emp-detail-save-btn" onClick={handleSave}>
          Save Changes
        </button>
        <button className="emp-detail-cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
