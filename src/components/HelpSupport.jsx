import React from 'react';
import CompanyFooter from './Footer';

export default function HelpSupport() {
  return (
    <>
    
    

      <section className="hs-container">
        <div className="hs-wrapper">
          <h1 className="hs-title">Help & Support</h1>
          <p className="hs-subtitle">
            We're here to assist you with any queries.
          </p>

          <div className="hs-grid">

            {/* Support Categories */}
            <div className="hs-card">
              <h2 className="hs-card-title">Support Categories</h2>
              <ul className="hs-list">
                <li>Payroll and Salary Queries</li>
                <li>Attendance & Leave Issues</li>
                <li>Account or Login Help</li>
                <li>Technical & Access Errors</li>
                <li>General HR Queries</li>
              </ul>
            </div>

            {/* Contact Support Form */}
            <div className="hs-card">
              <h2 className="hs-card-title">Raise a Support Ticket</h2>
              <p className="hs-text">
                Submit your issue below. Our HR Helpdesk will review and reply within 24 hours.
              </p>

              <form className="hs-form">
                <input type="text" placeholder="Employee Name" className="hs-input" />
                <input type="email" placeholder="Corporate Email" className="hs-input" />
                <textarea rows="4" placeholder="Describe your issue" className="hs-textarea" />
                <button type="submit" className="hs-btn">Submit Request</button>
              </form>
            </div>

            {/* FAQ */}
            <div className="hs-card">
              <h2 className="hs-card-title">FAQs</h2>
              <p className="hs-text">
                Before raising a ticket, quickly see if your question is already answered.
              </p>
              <button className="hs-btn">View FAQs</button>
            </div>

            {/* HR Contact Information */}
            <div className="hs-card">
              <h2 className="hs-card-title">HR Helpdesk</h2>
              <p className="hs-contact">
                📍 Office Location: Chennai<br />
                ⏱ Support Hours: Mon–Fri, 9 AM – 6 PM<br />
                📧 Email: vcraftyucompany.com<br />
                📞 Contact: +91 9840488033
              </p>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
