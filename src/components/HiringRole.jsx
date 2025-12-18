import React from "react";

const roles = [
  {
    id: 1,
    title: "Digital Marketing Specialist",
    openings: 2,
    department: "Design & Branding",
    location: "Chengalpattu",
    posted: "2025-09-20",
  },
  {
    id: 2,
    title: "Frontend Developer",
    openings: 4,
    department: "Technology",
    location: "chennai",
    posted: "2025-09-22",
  },
  {
    id: 3,
    title: "Product Manager",
    openings: 1,
    department: "Product Team",
    location: "chennai",
    posted: "2025-09-25",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    openings: 3,
    department: "Design Studio",
    location: "Remote",
    posted: "2025-09-28",
  },
];

export default function HiringRole() {
  const containerStyle = {
    minHeight: "100vh",
    padding: "24px",
    backgroundColor: "#f3f4f6",
    fontFamily: "sans-serif",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "24px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    padding: "20px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "0.3s",
  };

  const cardHover = {
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  };

  const nameText = {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "4px",
  };

  const deptText = {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "12px",
  };

  const infoStyle = {
    fontSize: "14px",
    marginBottom: "6px",
  };

  const labelStyle = {
    fontWeight: 600,
  };

  const buttonWrapper = {
    marginTop: "16px",
    display: "flex",
    justifyContent: "flex-end",
  };

  const buttonStyle = {
    padding: "8px 14px",
    borderRadius: "10px",
    backgroundColor: "#111",
    color: "#fff",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Available Hiring Roles</h1>

      <div style={gridStyle}>
        {roles.map((role) => (
          <div
            key={role.id}
            style={cardStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, cardHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, cardStyle);
            }}
          >
            <h2 style={nameText}>{role.title}</h2>
            <p style={deptText}>{role.department}</p>

            <p style={infoStyle}>
              <span style={labelStyle}>Openings:</span> {role.openings}
            </p>
            <p style={infoStyle}>
              <span style={labelStyle}>Location:</span> {role.location}
            </p>
            <p style={infoStyle}>
              <span style={labelStyle}>Posted On:</span> {role.posted}
            </p>

            <div style={buttonWrapper}>
              <button style={buttonStyle}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}