import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeList = ({ viewDetailsLink }) => {
  const [employees] = useState([
    {
      id: 1,
      name: "Bagus Fikri",
      position: "CEO",
      employeeId: "#EMP01",
      department: "Managerial",
      workType: "Fulltime",
      email: "bagusfikri@gmail.com",
      phone: "+62 123 123 123",
      joinDate: "29 Oct, 2020",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "Indizein",
      position: "Illustrator",
      employeeId: "#EMP02",
      department: "Managerial",
      workType: "Fulltime",
      email: "indizein@gmail.com",
      phone: "(40) 268 082 716",
      joinDate: "1 Feb, 2019",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: 3,
      name: "Mufti Hidayat",
      position: "Project Manager",
      employeeId: "#EMP03",
      department: "Managerial",
      workType: "Fulltime",
      email: "muftih@gmail.com",
      phone: "(63) 130 689 256",
      joinDate: "1 Feb, 2021",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    {
      id: 4,
      name: "Fauzan",
      position: "Manager",
      employeeId: "#EMP04",
      department: "Managerial",
      workType: "Fulltime",
      email: "helocaer@gmail.com",
      phone: "(44) 630",
      joinDate: "21 Sep, 2020",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    {
      id: 5,
      name: "Raihan Fikri",
      position: "QC & Research",
      employeeId: "#EMP05",
      department: "Quality Control",
      workType: "Fulltime",
      email: "raihan@gmail.com",
      phone: "+62 123 456 789",
      joinDate: "15 Mar, 2020",
      status: "Invited",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: 6,
      name: "Panji Dwi",
      position: "UI Designer",
      employeeId: "#EMP06",
      department: "Design",
      workType: "Fulltime",
      email: "panji@gmail.com",
      phone: "+62 987 654 321",
      joinDate: "10 Jan, 2021",
      status: "Inactive",
      avatar: "https://i.pravatar.cc/150?img=34",
    },
    {
      id: 7,
      name: "Bagas",
      position: "UI Designer",
      employeeId: "#EMP07",
      department: "Design",
      workType: "Fulltime",
      email: "bagas@gmail.com",
      phone: "+62 555 444 333",
      joinDate: "5 Jul, 2021",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=35",
    },
    {
      id: 8,
      name: "Laoly",
      position: "Product Designer",
      employeeId: "#EMP08",
      department: "Design",
      workType: "Fulltime",
      email: "laoly@gmail.com",
      phone: "+62 111 222 333",
      joinDate: "12 Aug, 2021",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=36",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");

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

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const activeCount = employees.filter((emp) => emp.status === "Active").length;
  const inactiveCount = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

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
          <button className="emp-list-btn-secondary">
            <span className="emp-list-icon">📥</span>
            Import
          </button>
          <button className="emp-list-btn-secondary">
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
          <button className="emp-list-filter-btn">
            <span className="emp-list-filter-icon">👤</span>
            Type
            <span className="emp-list-dropdown-icon">▼</span>
          </button>
          <button className="emp-list-filter-btn">
            <span className="emp-list-filter-icon">✓</span>
            Status
            <span className="emp-list-dropdown-icon">▼</span>
          </button>
          <button className="emp-list-filter-btn">
            <span className="emp-list-filter-icon">👔</span>
            Role
            <span className="emp-list-dropdown-icon">▼</span>
          </button>
          <button className="emp-list-filter-btn">
            <span className="emp-list-filter-icon">⚙</span>
            Advance Filter
            <span className="emp-list-dropdown-icon">▼</span>
          </button>
        </div>
        <button className="emp-list-btn-icon">
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
              <button className="emp-list-card-menu">⋮</button>
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
              <Link to={viewDetailsLink} className="emp-list-view-details-link">
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
