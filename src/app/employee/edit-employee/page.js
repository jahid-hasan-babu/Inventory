"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditEmployee({ employeeId }) {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    position: "",
    joiningDate: "",
    yearsOfExperience: "",
    salary: "",
    overtime: "",
    totalSalary: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch employee details by ID (placeholder logic)
    const fetchEmployeeData = async () => {
      // Placeholder: replace with actual fetch request
      const data = {
        employeeName: "John Doe",
        employeeId: "12345",
        position: "Manager",
        joiningDate: "2021-05-20",
        yearsOfExperience: 5,
        salary: 50000,
        overtime: 10,
        totalSalary: 55000,
      };
      setFormData(data);
    };
    fetchEmployeeData();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.employeeName) tempErrors.employeeName = "Name is required.";
    if (!formData.employeeId) tempErrors.employeeId = "ID is required.";
    if (!formData.position) tempErrors.position = "Position is required.";
    if (!formData.salary) tempErrors.salary = "Salary is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    toast.success("Employee details updated successfully!");
  };

  return (
    <div className="pt-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" gutterBottom className="text-green-500">
          Edit Employee Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee Name"
                name="employeeName"
                variant="outlined"
                fullWidth
                value={formData.employeeName}
                onChange={handleInputChange}
                error={!!errors.employeeName}
                helperText={errors.employeeName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee ID"
                name="employeeId"
                variant="outlined"
                fullWidth
                value={formData.employeeId}
                onChange={handleInputChange}
                error={!!errors.employeeId}
                helperText={errors.employeeId}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Position"
                name="position"
                variant="outlined"
                fullWidth
                value={formData.position}
                onChange={handleInputChange}
                error={!!errors.position}
                helperText={errors.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Joining Date"
                name="joiningDate"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.joiningDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Years of Experience"
                name="yearsOfExperience"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Salary"
                name="salary"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.salary}
                onChange={handleInputChange}
                error={!!errors.salary}
                helperText={errors.salary}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Overtime"
                name="overtime"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.overtime}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Salary"
                name="totalSalary"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.totalSalary}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="py-4 bg-green-500 hover:bg-green-400"
                fullWidth
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
