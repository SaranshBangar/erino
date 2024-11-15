import React from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContactTable from "./components/ContactTable";
import AddContact from "./components/AddContact";

export default function App() {
  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Contact Manager</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Link to="/add-contact" style={{ textDecoration: "none" }}>
              <Typography variant="body1" color="inherit">
                Add Contact
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Routes>
            <Route path="/" element={<ContactTable />} />
            <Route path="/add-contact" element={<AddContact />} />
          </Routes>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1" align="center">
              Made by{" "}
              <a
                href="https://www.saransh-bangar.xyz/"
                target="_blank"
                className="font-bold"
              >
                Saransh Bangar
              </a>
            </Typography>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}
