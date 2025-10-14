import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router

const hiringData = [
  {
    id: 1,
    name: 'Harper Lee',
    location: 'France',
    role: 'Creative Lead',
    roleColor: 'purple',
    image: '/harper.jpg',
    jd: 'Looking for a Creative Lead with 5+ years experience in brand strategy, visual design, and team leadership. Must have portfolio of successful campaigns.',
    experience: '5+ years',
    skills: ['Brand Strategy', 'Visual Design', 'Team Leadership', 'Adobe Creative Suite'],
    salary: '€60,000 - €80,000',
    appliedDate: '2025-10-01'
  },
  {
    id: 2,
    name: 'Francis Degas',
    location: 'USA',
    role: 'Front End Developer',
    roleColor: 'green',
    image: '/francis.jpg',
    jd: 'Seeking Front End Developer proficient in React, Next.js, and modern JavaScript. Experience with responsive design and performance optimization required.',
    experience: '3+ years',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    salary: '$80,000 - $100,000',
    appliedDate: '2025-10-03'
  },
  {
    id: 3,
    name: 'Leonora Carington',
    location: 'USA',
    role: 'Product Manager',
    roleColor: 'blue',
    image: '/leonora.jpg',
    jd: 'Product Manager needed to drive product strategy, roadmap planning, and cross-functional team coordination. Strong analytical and communication skills essential.',
    experience: '4+ years',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research', 'Jira'],
    salary: '$90,000 - $120,000',
    appliedDate: '2025-10-05'
  },
  {
    id: 4,
    name: 'Andrew Hunt. M',
    location: 'USA',
    role: 'Creative Lead',
    roleColor: 'purple',
    image: '/andrew.jpg',
    jd: 'Creative Lead position for innovative thinker with strong portfolio in digital design, branding, and creative direction. Agency experience preferred.',
    experience: '6+ years',
    skills: ['Creative Direction', 'Branding', 'Digital Design', 'Figma', 'Team Management'],
    salary: '$85,000 - $110,000',
    appliedDate: '2025-10-07'
  }
];

export default function Hiring() {
  const navigate = useNavigate();
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewAll = () => {
    navigate('/employee/Work');
  };

  const handleApplicantClick = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplicant(null);
  };

  const handleRefer = () => {
    console.log('Referring candidate:', selectedApplicant);
    // Add your refer logic here (API call, etc.)
  };

  return (
    <div className="hiring-container">
      {/* Header */}
      <div className="hiring-header">
        <h1 className="hiring-title">Hiring Applications</h1>
        <button onClick={handleViewAll} className="share-button">
          Share
        </button>
      </div>

      {/* Applications List */}
      <div className="applications-list">
        {hiringData.map((applicant) => (
          <div
            key={applicant.id}
            onClick={() => handleApplicantClick(applicant)}
            className="application-item"
          >
            <div className="applicant-info">
              {/* Avatar */}
              <div className="avatar">
                <img
                  src={applicant.image}
                  alt={applicant.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${applicant.name}&background=random`;
                  }}
                />
              </div>
              
              {/* Name and Location */}
              <div className="applicant-details">
                <h3 className="applicant-name">{applicant.name}</h3>
                <p className="applicant-location">{applicant.location}</p>
              </div>
            </div>

            {/* Role Badge */}
            <span className={`role-badge role-${applicant.roleColor}`}>
              {applicant.role}
            </span>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="view-all-container">
        <button onClick={handleViewAll} className="view-all-link">
          View All Applications →
        </button>
      </div>

      {/* Modal for Applicant Details */}
      {showModal && selectedApplicant && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Application Details</h2>
              <button onClick={closeModal} className="close-button">
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Applicant Header */}
              <div className="modal-applicant-header">
                <div className="modal-avatar">
                  <img
                    src={selectedApplicant.image}
                    alt={selectedApplicant.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${selectedApplicant.name}&background=random`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="modal-applicant-name">{selectedApplicant.name}</h3>
                  <p className="modal-applicant-location">{selectedApplicant.location}</p>
                  <span className={`role-badge role-${selectedApplicant.roleColor} modal-role-badge`}>
                    {selectedApplicant.role}
                  </span>
                </div>
              </div>

              {/* Job Description */}
              <div className="detail-section">
                <h4 className="detail-heading">Job Description</h4>
                <p className="detail-text">{selectedApplicant.jd}</p>
              </div>

              {/* Experience */}
              <div className="detail-section">
                <h4 className="detail-heading">Required Experience</h4>
                <p className="detail-text">{selectedApplicant.experience}</p>
              </div>

              {/* Skills */}
              <div className="detail-section">
                <h4 className="detail-heading">Required Skills</h4>
                <div className="skills-container">
                  {selectedApplicant.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="detail-section">
                <h4 className="detail-heading">Salary Range</h4>
                <p className="detail-text">{selectedApplicant.salary}</p>
              </div>

              {/* Applied Date */}
              <div className="detail-section">
                <h4 className="detail-heading">Applied Date</h4>
                <p className="detail-text">{selectedApplicant.appliedDate}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button onClick={closeModal} className="cancel-button">
                Close
              </button>
              <button onClick={handleRefer} className="refer-button">
                Refer Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
