import React, { useState } from 'react';
import Payslip from '../../components/paySlip';
import { toast } from 'react-toastify';

export default function Salary() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [showReimbursementModal, setShowReimbursementModal] = useState(false);
  const [reimbursementForm, setReimbursementForm] = useState({
    type: '',
    amount: '',
    description: '',
    date: '',
    billFile: null,
    billFileName: ''
  });

  // Current salary details
  const salaryDetails = {
    employeeName: 'John Doe',
    employeeId: 'EMP12345',
    designation: 'Senior Developer',
    department: 'Engineering',
    bankAccount: 'XXXX XXXX XXXX 4567',
    panNumber: 'ABCDE1234F',
    dateOfJoining: '2023-01-15',
    basicSalary: 50000,
    hra: 20000,
    specialAllowance: 10000,
    conveyanceAllowance: 1600,
    medicalAllowance: 1250,
    otherAllowance: 2000,
    providentFund: 6000,
    professionalTax: 200,
    incomeTax: 5000,
    otherDeductions: 500
  };

  // Calculate totals
  const grossSalary =
    salaryDetails.basicSalary +
    salaryDetails.hra +
    salaryDetails.specialAllowance +
    salaryDetails.conveyanceAllowance +
    salaryDetails.medicalAllowance +
    salaryDetails.otherAllowance;

  const totalDeductions =
    salaryDetails.providentFund +
    salaryDetails.professionalTax +
    salaryDetails.incomeTax +
    salaryDetails.otherDeductions;

  const netSalary = grossSalary - totalDeductions;

  const payslipHistory = [
    { month: 'September', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-09-30' },
    { month: 'August', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-08-31' },
    { month: 'July', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-07-31' },
    { month: 'June', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-06-30' },
    { month: 'May', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-05-31' },
    { month: 'April', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-04-30' },
    { month: 'March', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-03-31' },
    { month: 'February', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-02-28' },
    { month: 'January', year: 2025, netPay: 73300, status: 'Paid', paidDate: '2025-01-31' },
    { month: 'December', year: 2024, netPay: 73300, status: 'Paid', paidDate: '2024-12-31' },
    { month: 'November', year: 2024, netPay: 73300, status: 'Paid', paidDate: '2024-11-30' },
    { month: 'October', year: 2024, netPay: 73300, status: 'Paid', paidDate: '2024-10-31' },
  ];

  const [reimbursements, setReimbursements] = useState([
    {
      id: 1,
      type: 'Travel',
      amount: 5000,
      date: '2025-09-15',
      status: 'Approved',
      approvedDate: '2025-09-18',
      description: 'Client visit to Mumbai',
      billAttached: true
    },
    {
      id: 2,
      type: 'Medical',
      amount: 3500,
      date: '2025-08-22',
      status: 'Approved',
      approvedDate: '2025-08-25',
      description: 'Medical checkup expenses',
      billAttached: true
    },
    {
      id: 3,
      type: 'Internet',
      amount: 1500,
      date: '2025-10-01',
      status: 'Pending',
      approvedDate: '-',
      description: 'Monthly internet bill',
      billAttached: true
    },
    {
      id: 4,
      type: 'Food',
      amount: 2000,
      date: '2025-09-28',
      status: 'Rejected',
      approvedDate: '2025-10-02',
      description: 'Team lunch expenses',
      billAttached: false
    },
  ]);

  const taxSummary = {
    ytdGross: grossSalary * 9, // Year to date (9 months)
    ytdTax: salaryDetails.incomeTax * 9,
    ytdPF: salaryDetails.providentFund * 9,
    projectedAnnual: grossSalary * 12
  };

  const handleDownloadPayslip = (month, year) => {
    console.log(`Downloading payslip for ${month} ${year}`);
    // Implement PDF download logic here


    toast.success(`Payslip for ${month} ${year} will be downloaded`);
  };

 const handleReimbursementSubmit = (e) => {
  e.preventDefault();

  const newReimbursement = {
    id: Date.now(),
    type: reimbursementForm.type,
    amount: Number(reimbursementForm.amount),
    date: reimbursementForm.date,
    description: reimbursementForm.description,
    status: "Pending",
    approvedDate: "-",
    billAttached: reimbursementForm.billFile ? true : false,
    billFile: reimbursementForm.billFile
  };
  setReimbursements((prev) => [...prev, newReimbursement]);

  toast.success("Reimbursement request submitted successfully!");

  setShowReimbursementModal(false);

  // RESET FORM
  setReimbursementForm({
    type: '',
    amount: '',
    description: '',
    date: '',
    billFile: null,
    billFileName: ''
  });
};


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReimbursementForm({
        ...reimbursementForm,
        billFile: file,
        billFileName: file.name
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleClickReimbursement = () => {
    console.log("clicked");

  }

  return (
    <div className="salary-container">
      {/* Header */}
      <div className="salary-header">
        <h1 className="salary-title">Salary & Payroll</h1>
        <div className="header-buttons">
          <button onClick={() => setShowPayslipModal(true)} className="download-btn">
            <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Payslip
          </button>
          <button onClick={() => {
            setShowReimbursementModal(true)
            handleClickReimbursement()
          }} className="reimbursement-btn">
            <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Request Reimbursement
          </button>
        </div>
      </div>

      {/* Current Salary Overview */}
      <div className="salary-overview">
        <div className="overview-card primary">
          <div className="overview-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="overview-content">
            <p className="overview-label">Net Salary</p>
            <h2 className="overview-amount">{formatCurrency(netSalary)}</h2>
            <p className="overview-subtitle">Per Month</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon green">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="overview-content">
            <p className="overview-label">Gross Salary</p>
            <h2 className="overview-amount">{formatCurrency(grossSalary)}</h2>
            <p className="overview-subtitle">Before Deductions</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon red">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </div>
          <div className="overview-content">
            <p className="overview-label">Total Deductions</p>
            <h2 className="overview-amount">{formatCurrency(totalDeductions)}</h2>
            <p className="overview-subtitle">Monthly</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon purple">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="overview-content">
            <p className="overview-label">Annual CTC</p>
            <h2 className="overview-amount">{formatCurrency(grossSalary * 12)}</h2>
            <p className="overview-subtitle">Projected</p>
          </div>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="salary-breakdown-section">
        <h2 className="section-title">Salary Breakdown</h2>
        <div className="breakdown-grid">
          {/* Earnings */}
          <div className="breakdown-card earnings">
            <div className="breakdown-header">
              <h3 className="breakdown-title">Earnings</h3>
              <span className="breakdown-total">{formatCurrency(grossSalary)}</span>
            </div>
            <div className="breakdown-list">
              <div className="breakdown-item">
                <span>Basic Salary</span>
                <span>{formatCurrency(salaryDetails.basicSalary)}</span>
              </div>
              <div className="breakdown-item">
                <span>HRA</span>
                <span>{formatCurrency(salaryDetails.hra)}</span>
              </div>
              <div className="breakdown-item">
                <span>Special Allowance</span>
                <span>{formatCurrency(salaryDetails.specialAllowance)}</span>
              </div>
              <div className="breakdown-item">
                <span>Conveyance Allowance</span>
                <span>{formatCurrency(salaryDetails.conveyanceAllowance)}</span>
              </div>
              <div className="breakdown-item">
                <span>Medical Allowance</span>
                <span>{formatCurrency(salaryDetails.medicalAllowance)}</span>
              </div>
              <div className="breakdown-item">
                <span>Other Allowance</span>
                <span>{formatCurrency(salaryDetails.otherAllowance)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="breakdown-card deductions">
            <div className="breakdown-header">
              <h3 className="breakdown-title">Deductions</h3>
              <span className="breakdown-total">{formatCurrency(totalDeductions)}</span>
            </div>
            <div className="breakdown-list">
              <div className="breakdown-item">
                <span>Provident Fund (PF)</span>
                <span>{formatCurrency(salaryDetails.providentFund)}</span>
              </div>
              <div className="breakdown-item">
                <span>Income Tax (TDS)</span>
                <span>{formatCurrency(salaryDetails.incomeTax)}</span>
              </div>
              <div className="breakdown-item">
                <span>Professional Tax</span>
                <span>{formatCurrency(salaryDetails.professionalTax)}</span>
              </div>
              <div className="breakdown-item">
                <span>Other Deductions</span>
                <span>{formatCurrency(salaryDetails.otherDeductions)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Summary */}
      <div className="tax-summary-section">
        <h2 className="section-title">Tax Summary (FY 2025-26)</h2>
        <div className="tax-cards">
          <div className="tax-card">
            <p className="tax-label">YTD Gross Income</p>
            <p className="tax-amount">{formatCurrency(taxSummary.ytdGross)}</p>
          </div>
          <div className="tax-card">
            <p className="tax-label">YTD Tax Deducted</p>
            <p className="tax-amount">{formatCurrency(taxSummary.ytdTax)}</p>
          </div>
          <div className="tax-card">
            <p className="tax-label">YTD PF Contribution</p>
            <p className="tax-amount">{formatCurrency(taxSummary.ytdPF)}</p>
          </div>
          <div className="tax-card">
            <p className="tax-label">Projected Annual Income</p>
            <p className="tax-amount">{formatCurrency(taxSummary.projectedAnnual)}</p>
          </div>
        </div>
      </div>

      {/* Reimbursement Section */}
      <div className="reimbursement-section">
        <h2 className="section-title">Reimbursement Requests</h2>
        <div className="history-table-container">
          <table className="payslip-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
                <th>Bill</th>
                <th>Status</th>
                <th>Approved Date</th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map((reimbursement) => (
                <tr key={reimbursement.id}>
                  <td>
                    <span className="reimbursement-type-badge">{reimbursement.type}</span>
                  </td>
                  <td className="amount-cell">{formatCurrency(reimbursement.amount)}</td>
                  <td>{reimbursement.date}</td>
                  <td>{reimbursement.description}</td>
                  <td>
                    {reimbursement.billAttached ? (
                      <button className="view-bill-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                    ) : (
                      <span className="no-bill">No Bill</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${reimbursement.status.toLowerCase()}`}>
                      {reimbursement.status}
                    </span>
                  </td>
                  <td>{reimbursement.approvedDate}</td>
                </tr>
              ))}      
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip History */}
      <div className="payslip-history-section">
        <h2 className="section-title">Payslip History</h2>
        <div className="history-table-container">
          <table className="payslip-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Net Pay</th>
                <th>Status</th>
                <th>Paid Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payslipHistory.map((payslip, index) => (
                <tr key={index}>
                  <td>{payslip.month}</td>
                  <td>{payslip.year}</td>
                  <td className="amount-cell">{formatCurrency(payslip.netPay)}</td>
                  <td>
                    <span className="status-badge paid">{payslip.status}</span>
                  </td>
                  <td>{payslip.paidDate}</td>
                  <td>
                    <button
                      onClick={() => handleDownloadPayslip(payslip.month, payslip.year)}
                      className="table-download-btn"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Payslip Modal */}
      {showPayslipModal && (
        <div className="modal-overlay" onClick={() => setShowPayslipModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Download Payslip</h2>
              <button onClick={() => setShowPayslipModal(false)} className="close-button">
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Select Month</label>
                <select
                  className="form-input"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  required
                >
                  <option value="">Choose Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Year</label>
                <select
                  className="form-input"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  required
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowPayslipModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedMonth) {
                    handleDownloadPayslip(selectedMonth, selectedYear);
                    setShowPayslipModal(false);
                  } else {
                    alert('Please select a month');
                  }
                }}
                className="refer-button"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Reimbursement Request Modal */}
      {showReimbursementModal && (
        <div className="modal-overlay" onClick={() => setShowReimbursementModal(false)}>
          <div className="modal-content reimbursement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Request Reimbursement</h2>
              <button onClick={() => setShowReimbursementModal(false)} className="close-button">
                ×
              </button>
            </div>

            <form onSubmit={handleReimbursementSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Reimbursement Type *</label>
                  <select
                    className="form-input"
                    value={reimbursementForm.type}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, type: e.target.value })}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Travel">Travel</option>
                    <option value="Medical">Medical</option>
                    <option value="Food">Food</option>
                    <option value="Internet">Internet</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Education">Education</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Amount *</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Enter amount"
                      value={reimbursementForm.amount}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, amount: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={reimbursementForm.date}
                      onChange={(e) => setReimbursementForm({ ...reimbursementForm, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-input form-textarea"
                    value={reimbursementForm.description}
                    onChange={(e) => setReimbursementForm({ ...reimbursementForm, description: e.target.value })}
                    rows="3"
                    placeholder="Enter description of expense..."
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">Attach Bill/Invoice *</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="billFile"
                      className="file-input"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required
                    />
                    <label htmlFor="billFile" className="file-upload-label">
                      <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>
                        {reimbursementForm.billFileName || 'Choose file or drag here'}
                      </span>
                      <span className="file-format">PDF, JPG, PNG (Max 5MB)</span>
                    </label>
                  </div>
                  {reimbursementForm.billFileName && (
                    <div className="file-preview">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{reimbursementForm.billFileName}</span>
                      <button
                        type="button"
                        onClick={() => setReimbursementForm({ ...reimbursementForm, billFile: null, billFileName: '' })}
                        className="remove-file-btn"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                <div className="info-box">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="info-title">Important Information</p>
                    <ul className="info-list">
                      <li>Original bill/invoice must be attached</li>
                      <li>Reimbursement will be processed within 7-10 working days</li>
                      <li>Amount will be credited with next month's salary</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setShowReimbursementModal(false)}
                  className="cancel-button"
                >
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
      <div>
        <paySlip/>
      </div>
    </div>
  );
}
