import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p style={{ color: color, margin: "0", fontWeight: "bold" }}>{name}</p>
        <p style={{ margin: "0" }}>Members: {value}</p>
      </div>
    );
  }
  return null;
};

// Custom Legend
const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <div className="custom-legend">
      {payload.map((entry, index) => (
        <div
          key={`legend-item-${index}`}
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <div
            className="legend-design"
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: entry.payload.color,
              marginRight: "8px",
            }}
          />
          <span style={{ fontWeight: "bold" }}>{entry.payload.name}</span>
          <span style={{ marginLeft: "5px", color: "#555" }}>
            ({entry.payload.value})
          </span>
        </div>
      ))}
    </div>
  );
};


const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


// Dynamically assign and persist colors for undefined teams
const getTeamData = (users) => {
  const teamMap = {};
  const savedColors = JSON.parse(localStorage.getItem("teamColors")) || {};

  users.forEach((user) => {
    if (!teamMap[user.team]) {
      if (!savedColors[user.team]) {
        // Assign a new random color and save it
        savedColors[user.team] = getRandomColor();
        localStorage.setItem("teamColors", JSON.stringify(savedColors));
      }

      teamMap[user.team] = {
        name: user.team,
        value: 0,
        color: savedColors[user.team], // Use persisted color
      };
    }
    teamMap[user.team].value += 1;
  });

  return Object.values(teamMap);
};


const CustomDonutChart = ({ users = [], heading }) => {
  const data = getTeamData(users);

  const [activeIndex, setActiveIndex] = useState(null);
  const [tooltipActive, setTooltipActive] = useState(false);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
    setTooltipActive(true);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setTooltipActive(false);
  };

  return (
    <div className="piechart-main">
      <div className="piechart-chart">
        <h1>{heading}</h1>
        <div className="piechart-section">
          {data.length > 0 ? (
            <PieChart width={300} height={340} onMouseLeave={onPieLeave}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className={activeIndex === index ? "active-slice" : ""}
                  />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ display: tooltipActive ? "block" : "none" }}
              />
              <Legend content={<CustomLegend />} />
            </PieChart>
          ) : (
            <p>No data available</p> // Handle case where no data is passed
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDonutChart;
