"use client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ type = "bar" }) {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: type === "bar" ? "Inventory Value" : "Monthly Sales",
        data: [
          20000, 25000, 22000, 27000, 30000, 24000, 26000, 28000, 29000, 31000,
          32000, 34000,
        ],
        backgroundColor:
          type === "bar"
            ? "rgba(75, 192, 192, 0.6)"
            : "rgba(54, 162, 235, 0.2)",
        borderColor:
          type === "bar" ? "rgba(75, 192, 192, 1)" : "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        tension: type === "line" ? 0.3 : 0, // Smoothing for line chart
        fill: type === "line", // Fill area below line chart
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: type === "bar" ? "Monthly Inventory Value" : "Monthly Sales Data",
      },
    },
  };

  return (
    <div className="w-full h-full">
      {type === "bar" ? (
        <Bar data={data} options={options} />
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
}
