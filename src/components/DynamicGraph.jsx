import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components from chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DynamicGraph = () => {
  // Example data (this can be dynamic based on your props or state)
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Staked Value",
        data: [200, 250, 230, 260, 240, 256.50], // Sample dynamic data
        borderColor: "rgba(147, 51, 234)", // Purple color
        backgroundColor: "rgba(147, 51, 234, 0.2)", // Light purple background
        tension: 0.4, // Curve the line
        fill: true, // Fill the area under the line
        borderWidth: 2,
        pointRadius: 0, // Remove points
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove the gridlines
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false, // Hide the Y-axis labels
        },
      },
    },
    maintainAspectRatio: false, // Allows custom height
  };

  return (
    <div className="w-[200px] h-[100px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default DynamicGraph;
