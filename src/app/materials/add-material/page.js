"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

export default function MaterialForm() {
  const [formData, setFormData] = useState({
    materialName: "",
    type: "",
    supplier: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    stockStatus: "",
  });

  const [errors, setErrors] = useState({}); // For tracking errors

  const stockStatuses = ["In Stock", "Out of Stock", "Low Stock"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,

      totalPrice:
        name === "quantity" || name === "unitPrice"
          ? (formData.quantity * formData.unitPrice).toFixed(2)
          : formData.totalPrice,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Form data submitted successfully");
    console.log("Form data submitted:", formData);

    setFormData({
      materialName: "",
      type: "",
      supplier: "",
      quantity: "",
      unitPrice: "",
      totalPrice: "",
      stockStatus: "",
    });
  };

  return (
    <div className="pt-10">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" gutterBottom className="text-green-500 pb-3">
          Add New Material
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Material Name"
                name="materialName"
                variant="outlined"
                fullWidth
                value={formData.materialName}
                onChange={handleInputChange}
                error={!!errors.materialName}
                helperText={errors.materialName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                name="type"
                variant="outlined"
                fullWidth
                value={formData.type}
                onChange={handleInputChange}
                error={!!errors.type}
                helperText={errors.type}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Supplier"
                name="supplier"
                variant="outlined"
                fullWidth
                value={formData.supplier}
                onChange={handleInputChange}
                error={!!errors.supplier}
                helperText={errors.supplier}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                name="quantity"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Unit Price"
                name="unitPrice"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.unitPrice}
                onChange={handleInputChange}
                error={!!errors.unitPrice}
                helperText={errors.unitPrice}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Price"
                name="totalPrice"
                variant="outlined"
                fullWidth
                value={formData.totalPrice}
                disabled
                error={!!errors.totalPrice}
                helperText={errors.totalPrice}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Status"
                name="stockStatus"
                variant="outlined"
                fullWidth
                select
                value={formData.stockStatus}
                onChange={handleInputChange}
                error={!!errors.stockStatus}
                helperText={errors.stockStatus}
              >
                {stockStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="py-4 bg-green-500 hover:bg-green-400"
                fullWidth
              >
                Submit Material
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </Paper>
    </div>
  );
}
