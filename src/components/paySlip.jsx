import React, { useState } from 'react';

export default function Payslip() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isDownloading, setIsDownloading] = useState(false);

  // Mock payslip data
  const payslipData = {
    '2024-03': {
      employeeId: 'EMP-23456',
      employeeName: 'John Doe',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      joinDate: '2022-06-15',
      bankAccount: 'XXXX XXXX 4567',
      basicSalary: 75000,
      houseRentAllowance: 37500,
      specialAllowance: 45000,
      medicalAllowance: 1250,
      travelAllowance: 8000,
      performanceBonus: 15000,
      overtime: 5000,
      totalEarnings: 181750,
      providentFund: 6000,
      professionalTax: 200,
      incomeTax: 18000,
      healthInsurance: 1500,
      otherDeductions: 0,
      totalDeductions: 25700,
      netSalary: 156050,
      workingDays: 22,
      paidDays: 22,
      leaveTaken: 0,
      payDate: '2024-03-31',
      status: 'Paid'
    },
    '2024-02': {
      employeeId: 'EMP-23456',
      employeeName: 'John Doe',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      joinDate: '2022-06-15',
      bankAccount: 'XXXX XXXX 4567',
      basicSalary: 75000,
      houseRentAllowance: 37500,
      specialAllowance: 45000,
      medicalAllowance: 1250,
      travelAllowance: 8000,
      performanceBonus: 12000,
      overtime: 3000,
      totalEarnings: 178750,
      providentFund: 6000,
      professionalTax: 200,
      incomeTax: 17500,
      healthInsurance: 1500,
      otherDeductions: 0,
      totalDeductions: 25200,
      netSalary: 153550,
      workingDays: 20,
      paidDays: 19,
      leaveTaken: 1,
      payDate: '2024-02-29',
      status: 'Paid'
    },
    '2024-01': {
      employeeId: 'EMP-23456',
      employeeName: 'John Doe',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      joinDate: '2022-06-15',
      bankAccount: 'XXXX XXXX 4567',
      basicSalary: 75000,
      houseRentAllowance: 37500,
      specialAllowance: 45000,
      medicalAllowance: 1250,
      travelAllowance: 8000,
      performanceBonus: 10000,
      overtime: 2000,
      totalEarnings: 176750,
      providentFund: 6000,
      professionalTax: 200,
      incomeTax: 17000,
      healthInsurance: 1500,
      otherDeductions: 0,
      totalDeductions: 24700,
      netSalary: 152050,
      workingDays: 23,
      paidDays: 23,
      leaveTaken: 0,
      payDate: '2024-01-31',
      status: 'Paid'
    }
  };

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const years = [2024, 2023, 2022];

  const currentPayslip = payslipData[`${selectedYear}-${selectedMonth}`];

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate PDF download
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`Payslip for ${months.find(m => m.value === selectedMonth)?.label} ${selectedYear} downloaded successfully!`);
    setIsDownloading(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getMonthName = (monthValue) => {
    return months.find(m => m.value === monthValue)?.label || '';
  };

  return (
    <div className="payslip-container">
      <div className="payslip-header glass-card">
        <div className="header-content">
          <h1 className="payslip-title">Employee Payslip</h1>
          <p className="payslip-subtitle">View and download your monthly salary slips</p>
        </div>
        <div className="header-actions">
          {currentPayslip && (
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="download-btn"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
          )}
        </div>
      </div>

      {/* Month Selection */}
      <div className="selection-section glass-card">
        <h3 className="section-title">Select Pay Period</h3>
        <div className="selection-filters">
          <div className="filter-group">
            <label className="filter-label">Year</label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Month</label>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="filter-select"
              disabled={!selectedYear}
            >
              <option value="">Select Month</option>
              {months.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Payslip Display */}
      {currentPayslip ? (
        <div className="payslip-display">
          {/* Payslip Header */}
          <div className="payslip-card glass-card">
            <div className="payslip-company-header">
              <div className="company-info">
                <h2>TechCorp Solutions</h2>
                <p>123 Business Park, Sector 45</p>
                <p>Gurgaon, Haryana - 122001</p>
              </div>
              <div className="payslip-title-section">
                <h1>Salary Payslip</h1>
                <div className={`status-badge ${currentPayslip.status.toLowerCase()}`}>
                  {currentPayslip.status}
                </div>
              </div>
            </div>

            {/* Employee Details */}
            <div className="employee-details">
              <div className="detail-row">
                <div className="detail-group">
                  <label>Employee ID</label>
                  <span>{currentPayslip.employeeId}</span>
                </div>
                <div className="detail-group">
                  <label>Employee Name</label>
                  <span>{currentPayslip.employeeName}</span>
                </div>
                <div className="detail-group">
                  <label>Designation</label>
                  <span>{currentPayslip.designation}</span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-group">
                  <label>Department</label>
                  <span>{currentPayslip.department}</span>
                </div>
                <div className="detail-group">
                  <label>Bank Account</label>
                  <span>{currentPayslip.bankAccount}</span>
                </div>
                <div className="detail-group">
                  <label>Pay Date</label>
                  <span>{new Date(currentPayslip.payDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Salary Breakdown */}
            <div className="salary-sections">
              {/* Earnings */}
              <div className="salary-section earnings-section">
                <h3 className="section-heading">Earnings</h3>
                <div className="salary-items">
                  <div className="salary-item">
                    <span>Basic Salary</span>
                    <span>{formatCurrency(currentPayslip.basicSalary)}</span>
                  </div>
                  <div className="salary-item">
                    <span>House Rent Allowance</span>
                    <span>{formatCurrency(currentPayslip.houseRentAllowance)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Special Allowance</span>
                    <span>{formatCurrency(currentPayslip.specialAllowance)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Medical Allowance</span>
                    <span>{formatCurrency(currentPayslip.medicalAllowance)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Travel Allowance</span>
                    <span>{formatCurrency(currentPayslip.travelAllowance)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Performance Bonus</span>
                    <span>{formatCurrency(currentPayslip.performanceBonus)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Overtime</span>
                    <span>{formatCurrency(currentPayslip.overtime)}</span>
                  </div>
                  <div className="salary-item total">
                    <span>Total Earnings</span>
                    <span>{formatCurrency(currentPayslip.totalEarnings)}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div className="salary-section deductions-section">
                <h3 className="section-heading">Deductions</h3>
                <div className="salary-items">
                  <div className="salary-item">
                    <span>Provident Fund</span>
                    <span>{formatCurrency(currentPayslip.providentFund)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Professional Tax</span>
                    <span>{formatCurrency(currentPayslip.professionalTax)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Income Tax</span>
                    <span>{formatCurrency(currentPayslip.incomeTax)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Health Insurance</span>
                    <span>{formatCurrency(currentPayslip.healthInsurance)}</span>
                  </div>
                  <div className="salary-item">
                    <span>Other Deductions</span>
                    <span>{formatCurrency(currentPayslip.otherDeductions)}</span>
                  </div>
                  <div className="salary-item total">
                    <span>Total Deductions</span>
                    <span>{formatCurrency(currentPayslip.totalDeductions)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Salary */}
            <div className="net-salary-section">
              <div className="net-salary-card">
                <div className="net-salary-content">
                  <div className="net-salary-label">
                    <h3>Net Salary</h3>
                    <p>Amount transferred to your bank account</p>
                  </div>
                  <div className="net-salary-amount">
                    {formatCurrency(currentPayslip.netSalary)}
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="attendance-summary">
              <h3 className="section-heading">Attendance Summary</h3>
              <div className="attendance-items">
                <div className="attendance-item">
                  <span>Working Days</span>
                  <span>{currentPayslip.workingDays}</span>
                </div>
                <div className="attendance-item">
                  <span>Paid Days</span>
                  <span>{currentPayslip.paidDays}</span>
                </div>
                <div className="attendance-item">
                  <span>Leave Taken</span>
                  <span>{currentPayslip.leaveTaken}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="empty-state glass-card">
          <div className="empty-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3>No Payslip Selected</h3>
          <p>Please select a month and year to view your payslip</p>
        </div>
      )}

      {/* Recent Payslips */}
      <div className="recent-payslips-section">
        <h3 className="section-title">Recent Payslips</h3>
        <div className="recent-payslips-grid">
          {Object.entries(payslipData).map(([key, payslip]) => {
            const [year, month] = key.split('-');
            return (
              <div 
                key={key}
                className="recent-payslip-card glass-card"
                onClick={() => {
                  setSelectedYear(year);
                  setSelectedMonth(month);
                }}
              >
                <div className="payslip-month">
                  {getMonthName(month)} {year}
                </div>
                <div className="payslip-amount">
                  {formatCurrency(payslip.netSalary)}
                </div>
                <div className="payslip-status">
                  <span className={`status-dot ${payslip.status.toLowerCase()}`}></span>
                  {payslip.status}
                </div>
                <div className="payslip-date">
                  Paid on {new Date(payslip.payDate).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}