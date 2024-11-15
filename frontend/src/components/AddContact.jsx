import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function AddContact() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/contacts",
        formData,
      );

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("Failed to add contact");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: "",
        jobTitle: "",
      });
      setSnackbarMessage("Contact added successfully!");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Error adding contact: " + error.message);
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  useEffect(() => {
    let timer;
    if (showSnackbar && isFormSubmitted) {
      timer = setTimeout(() => {
        setShowSnackbar(false);
        navigate("/");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showSnackbar, isFormSubmitted, navigate]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="text-center"
      >
        Add New Contact
      </Typography>
      <TextField
        required
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        required
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        required
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        required
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <TextField
        required
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
      />
      <TextField
        required
        label="Job Title"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Contact
      </Button>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
