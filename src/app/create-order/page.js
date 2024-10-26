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

export default function OrderForm() {
  const [formData, setFormData] = useState({
    buyerName: "",
    product: "",
    country: "",
    brand: "",
    quantity: "",
    price: "",
    deliveryDate: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  const statuses = [
    "Delivered",
    "Pending",
    "Processing",
    "Cancelled",
    "Returned",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

    toast.success("Form data submitted");
    console.log("Form data submitted:", formData);

    setFormData({
      buyerName: "",
      product: "",
      country: "",
      brand: "",
      quantity: "",
      price: "",
      deliveryDate: "",
      status: "",
    });
  };

  return (
    <div className="pt-10">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" gutterBottom className="text-green-500 pb-3">
          Add New Order
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Buyer Name"
                name="buyerName"
                variant="outlined"
                fullWidth
                value={formData.buyerName}
                onChange={handleInputChange}
                error={!!errors.buyerName}
                helperText={errors.buyerName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product"
                name="product"
                variant="outlined"
                fullWidth
                value={formData.product}
                onChange={handleInputChange}
                error={!!errors.product}
                helperText={errors.product}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                name="country"
                variant="outlined"
                fullWidth
                value={formData.country}
                onChange={handleInputChange}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                name="brand"
                variant="outlined"
                fullWidth
                value={formData.brand}
                onChange={handleInputChange}
                error={!!errors.brand}
                helperText={errors.brand}
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
                label="Price"
                name="price"
                variant="outlined"
                fullWidth
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Delivery Date"
                name="deliveryDate"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.deliveryDate}
                onChange={handleInputChange}
                error={!!errors.deliveryDate}
                helperText={errors.deliveryDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Status"
                name="status"
                variant="outlined"
                fullWidth
                select
                value={formData.status}
                onChange={handleInputChange}
                error={!!errors.status}
                helperText={errors.status}
              >
                {statuses.map((status) => (
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
                Submit Order
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </Paper>
    </div>
  );
}
