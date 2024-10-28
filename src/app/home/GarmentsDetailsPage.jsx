"use client";
import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, Divider, useMediaQuery } from "@mui/material";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function GarmentsDetailsPage() {
  const [data, setData] = useState({
    revenue: 0,
    cost: 0,
    loss: 0,
    salesTarget: 0,
    actualSales: 0,
    expenses: {
      electricity: 0,
      machine: 0,
      gas: 0,
      others: 0,
    },
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setData({
      revenue: 50000,
      cost: 30000,
      loss: 5000,
      salesTarget: 60000,
      actualSales: 48000,
      expenses: {
        electricity: 2000,
        machine: 1500,
        gas: 1000,
        others: 500,
      },
    });
  }, []);

  const revenueCostLossData = {
    labels: ["Revenue", "Cost", "Loss"],
    datasets: [
      {
        label: "Amount",
        data: [data.revenue, data.cost, data.loss],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  const expensesData = {
    labels: ["Electricity", "Machine", "Gas", "Others"],
    datasets: [
      {
        label: "Expenses",
        data: Object.values(data.expenses),
        backgroundColor: ["#3f51b5", "#009688", "#ff5722", "#795548"],
      },
    ],
  };

  const salesData = {
    labels: ["Target", "Actual Sales"],
    datasets: [
      {
        label: "Sales",
        data: [data.salesTarget, data.actualSales],
        backgroundColor: ["#4caf50", "#ff9800"],
      },
    ],
  };

  const revenueCostTrendData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Revenue",
        data: [45000, 48000, 47000, 49000, 50000, data.revenue],
        borderColor: "#4caf50",
        fill: false,
      },
      {
        label: "Cost",
        data: [28000, 29000, 30000, 31000, 32000, data.cost],
        borderColor: "#ff9800",
        fill: false,
      },
    ],
  };

  return (
    <div
      className="pt-3  "
      style={{
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: isMobile ? "16px" : "24px", margin: "16px 0" }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          gutterBottom
          className="text-green-500"
        >
          Garments Details
        </Typography>
        <Divider className="my-4" />

        <Grid container spacing={isMobile ? 2 : 3}>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              height: isMobile ? "250px" : "350px",
              padding: isMobile ? "8px" : "12px",
            }}
          >
            <Typography variant="subtitle1">Revenue, Cost & Loss</Typography>
            <Bar
              data={revenueCostLossData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              height: isMobile ? "250px" : "350px",
              padding: isMobile ? "8px" : "12px",
            }}
          >
            <Typography variant="subtitle1">
              Monthly Expenses Breakdown
            </Typography>
            <Doughnut
              data={expensesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              height: isMobile ? "250px" : "350px",
              padding: isMobile ? "8px" : "12px",
            }}
          >
            <Typography variant="subtitle1">Sales Target vs Actual</Typography>
            <Bar
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              height: isMobile ? "250px" : "350px",
              padding: isMobile ? "8px" : "12px",
            }}
          >
            <Typography variant="subtitle1">
              Revenue & Cost Trend (Last 6 Months)
            </Typography>
            <Line
              data={revenueCostTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
