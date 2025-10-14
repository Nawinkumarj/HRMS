import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import sampleData from "../data/performance";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const PerformanceChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const labels = sampleData.map((item) => item.month);
      const values = sampleData.map((item) => item.value);
      

      setChartData({
        labels,
        datasets: [
          {
            label: "Performance",
            data: values,
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            fill: true,
            pointBackgroundColor: "#fff",
            pointBorderColor: "rgba(34, 197, 94, 1)",
            pointHoverBackgroundColor: "rgba(34, 197, 94, 1)",
            pointHoverBorderColor: "#fff",
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#555",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        min: 10,
        max: 70,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="performanceChartContainer">
      <div className="chartHeader flex-center">
        <h3>Performance</h3>
        <button>2025</button>
      </div>
      <div className="line"></div>
      <div className="chartInfo flex-center">
        <h3>98%</h3>
        <p> <span>12%</span> vs last years </p>
      </div>
      <div className="chart">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;
