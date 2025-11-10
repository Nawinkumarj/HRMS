import React, { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeesContext";

const EmployeeList = ({ viewDetailsLink }) => {
  const { employees, importEmployees, updateEmployee } = useEmployees();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const fileInputRef = useRef(null);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "emp-list-status-active";
      case "inactive":
        return "emp-list-status-inactive";
      case "invited":
        return "emp-list-status-invited";
      default:
        return "";
    }
  };

  const filteredEmployees = useMemo(() => employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || emp.status === filterStatus;
    const matchesType = !filterType || emp.workType === filterType;
    const matchesRole = !filterRole || emp.position === filterRole;
    return matchesSearch && matchesStatus && matchesType && matchesRole;
  }), [employees, searchTerm, filterStatus, filterType, filterRole]);

  const activeCount = employees.filter((emp) => emp.status === "Active").length;
  const inactiveCount = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  const exportData = () => {
    const blob = new Blob([JSON.stringify(employees, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      importEmployees(data);
    } catch (err) {
      alert('Failed to import employees. Ensure it\'s a valid JSON file.');
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="emp-list-container">
      <div className="emp-list-header">
        <div className="emp-list-title-section">
          <h1 className="emp-list-title">Employee</h1>
          <div className="emp-list-stats">
            <span className="emp-list-stat-item">● Active {activeCount}</span>
            <span className="emp-list-stat-item">
              ● Inactive {inactiveCount}
            </span>
          </div>
        </div>
        <div className="emp-list-actions">
          <input ref={fileInputRef} type="file" accept="application/json" style={{display:'none'}} onChange={onImportFile} />
          <button className="emp-list-btn-secondary" onClick={() => fileInputRef.current?.click()}>
            <span className="emp-list-icon">📥</span>
            Import
          </button>
          <button className="emp-list-btn-secondary" onClick={exportData}>
            <span className="emp-list-icon">📤</span>
            Export
          </button>
        </div>
      </div>

      <div className="emp-list-filters">
        <div className="emp-list-search">
          <span className="emp-list-search-icon">🔍</span>
          <input
            type="text"
            className="emp-list-search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="emp-list-filter-group">
          <label className="emp-list-filter-btn">
            <span className="emp-list-filter-icon">👤</span>
            Type
            <select className="emp-detail-select" value={filterType} onChange={(e)=>setFilterType(e.target.value)}>
              <option value=''>All</option>
              <option value='Fulltime'>Fulltime</option>
              <option value='Part-time'>Part-time</option>
              <option value='Contractor'>Contractor</option>
            </select>
          </label>
          <label className="emp-list-filter-btn">
            <span className="emp-list-filter-icon">✓</span>
            Status
            <select className="emp-detail-select" value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
              <option value=''>All</option>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
              <option value='Invited'>Invited</option>
            </select>
          </label>
          <label className="emp-list-filter-btn">
            <span className="emp-list-filter-icon">👔</span>
            Role
            <select className="emp-detail-select" value={filterRole} onChange={(e)=>setFilterRole(e.target.value)}>
              <option value=''>All</option>
              {[...new Set(employees.map(e=>e.position))].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <button className="emp-list-filter-btn" onClick={()=>{setFilterType('');setFilterStatus('');setFilterRole('');setSearchTerm('')}}>
            <span className="emp-list-filter-icon">⚙</span>
            Clear Filters
          </button>
        </div>
        <button className="emp-list-btn-icon" onClick={() => {
          const dept = prompt('Enter new department for current filtered employees:');
          if (!dept) return;
          filteredEmployees.forEach(emp => updateEmployee(emp.id, { department: dept }));
        }}>
          <span className="emp-list-icon">👥</span>
          Transfer
        </button>
      </div>

      <div className="emp-list-grid">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="emp-list-card">
            <div className="emp-list-card-header">
              <span
                className={`emp-list-status-badge ${getStatusClass(
                  employee.status
                )}`}
              >
                ● {employee.status}
              </span>
              <button className="emp-list-card-menu" onClick={()=>navigate(`${viewDetailsLink}/${employee.id}`)}>⋮</button>
            </div>

            <div className="emp-list-card-body">
              <div className="emp-list-avatar">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="emp-list-avatar-img"
                />
              </div>
              <h3 className="emp-list-employee-name">{employee.name}</h3>
              <p className="emp-list-employee-position">{employee.position}</p>

              <div className="emp-list-details">
                <div className="emp-list-detail-row">
                  <span className="emp-list-detail-icon">#</span>
                  <span className="emp-list-detail-text">
                    {employee.employeeId}
                  </span>
                </div>
                <div className="emp-list-detail-row">
                  <span className="emp-list-detail-icon">👤</span>
                  <span className="emp-list-detail-text">
                    {employee.department}
                  </span>
                  <span className="emp-list-detail-separator">●</span>
                  <span className="emp-list-detail-text">
                    {employee.workType}
                  </span>
                </div>
                <div className="emp-list-detail-row">
                  <span className="emp-list-detail-icon">✉</span>
                  <span className="emp-list-detail-text emp-list-email">
                    {employee.email}
                  </span>
                </div>
                <div className="emp-list-detail-row">
                  <span className="emp-list-detail-icon">📞</span>
                  <span className="emp-list-detail-text emp-list-phone">
                    {employee.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="emp-list-card-footer">
              <span className="emp-list-join-date">
                Joined at {employee.joinDate}
              </span>
              <Link to={`${viewDetailsLink}/${employee.id}`} className="emp-list-view-details-link">
                <button className="emp-list-view-details">
                  View details
                  <span className="emp-list-arrow">→</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
