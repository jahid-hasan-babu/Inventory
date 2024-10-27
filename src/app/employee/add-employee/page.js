"use client";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AttendanceSheet() {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    position: "",
    joiningDate: "",
    yearsOfExperience: "",
    salary: "",
    overtime: "",
    totalSalary: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); 
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setFormErrors({ ...formErrors, image: "" });
  };

  const validateForm = () => {
    let errors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field] && field !== "image" && field !== "overtime") {
        errors[field] = `${field.split(/(?=[A-Z])/).join(" ")} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setEmployees([...employees, { ...formData, id: Date.now() }]);
    setFormData({
      employeeName: "",
      employeeId: "",
      position: "",
      joiningDate: "",
      yearsOfExperience: "",
      salary: "",
      overtime: "",
      totalSalary: "",
      image: null,
    });
    toast.success("Employee added successfully!");
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="pt-10">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" gutterBottom className="text-green-500">
          Employee Attendance Sheet
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
                required
                error={!!formErrors.employeeName}
                helperText={formErrors.employeeName}
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
                required
                error={!!formErrors.employeeId}
                helperText={formErrors.employeeId}
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
                required
                error={!!formErrors.position}
                helperText={formErrors.position}
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
                required
                error={!!formErrors.joiningDate}
                helperText={formErrors.joiningDate}
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
                required
                error={!!formErrors.yearsOfExperience}
                helperText={formErrors.yearsOfExperience}
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
                required
                error={!!formErrors.salary}
                helperText={formErrors.salary}
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
                required
                error={!!formErrors.totalSalary}
                helperText={formErrors.totalSalary}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                onChange={handleFileChange}
                error={!!formErrors.image}
                helperText={formErrors.image}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="py-4 bg-green-500 hover:bg-green-400"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </Paper>
    </div>
  );
}
