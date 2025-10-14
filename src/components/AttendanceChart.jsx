import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Group A", Absent: 20, Present: 30, Total: 50 },
  { name: "Group B", Absent: 40, Present: 10, Total: 50 },
  { name: "Group C", Absent: 10, Present: 20, Total: 50 },
  { name: "Group D", Absent: 30, Present: 10, Total: 50 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h4 style={{ margin: 0, color: "#333" }}>{label}</h4>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{
              margin: "5px 0",
              color: entry.color,
              fontWeight: 500,
            }}
          >
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const EmployeeAttendanceBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
    <BarChart
    
      data={data}
      layout="vertical"
    >
      <XAxis
        type="number"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12 }}
      />

      <YAxis
        type="category"
        axisLine={false}
        tickLine={false}
        dataKey="name"
        tick={{ fontSize: 12 }}
      />

     
      <Tooltip content={<CustomTooltip />} />

      <Bar
        dataKey="Absent"
        stackId="a"
        fill="#FF8042"
        name="Absent"
        // stroke="#000"
        strokeWidth={1}
        radius={[20, 0, 0, 20]} 
      >
      </Bar>
      <Bar
        dataKey="Present"
        stackId="a"
        fill="#00C49F"
        name="Present"
        radius={[0, 20, 20, 0]}
      >
      </Bar>

      <Bar
        dataKey="Total"
        fill="#8884d8"
        name="Total Employees"
        radius={[20, 20, 20, 20]} 
      >
      </Bar>
      </BarChart>
      </ResponsiveContainer>
  );
};

export default EmployeeAttendanceBarChart;
