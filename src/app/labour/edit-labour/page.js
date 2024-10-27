"use client";
import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditLabour({ labourId }) {
  const [formData, setFormData] = useState({
    labourName: "",
    labourId: "",
    position: "",
    joiningDate: "",
    yearsOfExperience: "",
    salary: "",
    overtime: "",
    totalSalary: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch labour details by ID (placeholder logic)
    const fetchLabourData = async () => {
      // Placeholder: replace with actual fetch request
      const data = {
        labourName: "Jane Smith",
        labourId: "54321",
        position: "Laborer",
        joiningDate: "2022-01-15",
        yearsOfExperience: 2,
        salary: 30000,
        overtime: 5,
        totalSalary: 32000,
      };
      setFormData(data);
    };
    fetchLabourData();
  }, [labourId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.labourName) tempErrors.labourName = "Name is required.";
    if (!formData.labourId) tempErrors.labourId = "ID is required.";
    if (!formData.position) tempErrors.position = "Position is required.";
    if (!formData.salary) tempErrors.salary = "Salary is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Placeholder: Add your logic to update the labour data
    toast.success("Labour details updated successfully!");
  };

  return (
    <div className="pt-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" gutterBottom className="text-green-500">
          Edit Labour Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Labour Name"
                name="labourName"
                variant="outlined"
                fullWidth
                value={formData.labourName}
                onChange={handleInputChange}
                error={!!errors.labourName}
                helperText={errors.labourName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Labour ID"
                name="labourId"
                variant="outlined"
                fullWidth
                value={formData.labourId}
                onChange={handleInputChange}
                error={!!errors.labourId}
                helperText={errors.labourId}
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
