import React from "react";

const WorkingFormatChart = () => {
  const totalDays = 418;
  const officePercent = 55;
  const hybridPercent = 35;
  const remotePercent = 10;

  // Ring radii
  const radius1 = 120;
  const radius2 = 90;
  const radius3 = 60;

  // Circumferences
  const circumference1 = 2 * Math.PI * radius1;
  const circumference2 = 2 * Math.PI * radius2;
  const circumference3 = 2 * Math.PI * radius3;

  // Function to calculate stroke-dasharray
  const createStrokeDashArray = (percent, circumference) => {
    const filled = (percent / 100) * circumference;
    const empty = circumference - filled;
    return `${filled} ${empty}`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#121212",
        minHeight: "45vh",
        padding: "1rem",
        borderRadius:"10px",
        paddingTop:"10px"
      }}
    >
      <div
        style={{
          backgroundColor: "#1E1E1E",
          borderRadius: "1rem",
          padding: "1.5rem",
          width: "360px",
          boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
          color: "white",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              color: "#e5e7eb",
              fontSize: "1.125rem",
              fontWeight: 500,
            }}
          >
            Working format
          </h2>
        </div>

        {/* Chart */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <svg width="260" height="260" viewBox="0 0 320 320">
            {/* Base gray rings */}
            <circle cx="160" cy="160" r={radius1} fill="none" stroke="#2E2E2E" strokeWidth="20" />
            <circle cx="160" cy="160" r={radius2} fill="none" stroke="#2E2E2E" strokeWidth="20" />
            <circle cx="160" cy="160" r={radius3} fill="none" stroke="#2E2E2E" strokeWidth="20" />

            {/* Office */}
            <circle
              cx="160"
              cy="160"
              r={radius1}
              fill="none"
              stroke="#5BB9E9"
              strokeWidth="20"
              strokeDasharray={createStrokeDashArray(officePercent, circumference1)}
              strokeDashoffset={circumference1 * 0.25}
              strokeLinecap="round"
              transform="rotate(-90 160 160)"
            />

            {/* Hybrid */}
            <circle
              cx="160"
              cy="160"
              r={radius2}
              fill="none"
              stroke="#2BD9D9"
              strokeWidth="20"
              strokeDasharray={createStrokeDashArray(hybridPercent, circumference2)}
              strokeDashoffset={circumference2 * 0.25}
              strokeLinecap="round"
              transform="rotate(-90 160 160)"
            />

            {/* Remote */}
            <circle
              cx="160"
              cy="160"
              r={radius3}
              fill="none"
              stroke="#77A6F7"
              strokeWidth="20"
              strokeDasharray={createStrokeDashArray(remotePercent, circumference3)}
              strokeDashoffset={circumference3 * 0.25}
              strokeLinecap="round"
              transform="rotate(-90 160 160)"
            />
          </svg>

          {/* Center text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "2.25rem", fontWeight: "bold", color: "white" }}>
              {totalDays}
            </div>
            <div style={{ color: "#9ca3af", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Days
            </div>
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.875rem",
            color: "#d1d5db",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          {/* Office */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "9999px",
                backgroundColor: "#5BB9E9",
                marginBottom: "0.25rem",
              }}
            />
            <span>{officePercent}%</span>
            <span style={{ color: "#6b7280" }}>Office</span>
          </div>

          {/* Hybrid */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "9999px",
                backgroundColor: "#2BD9D9",
                marginBottom: "0.25rem",
              }}
            />
            <span>{hybridPercent}%</span>
            <span style={{ color: "#6b7280" }}>Hybrid</span>
          </div>

          {/* Remote */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "9999px",
                backgroundColor: "#77A6F7",
                marginBottom: "0.25rem",
              }}
            />
            <span>{remotePercent}%</span>
            <span style={{ color: "#6b7280" }}>Remote</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingFormatChart;
