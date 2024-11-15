import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contacts");
      setContacts(response.data);
    } catch (error) {
      setSnackbarMessage("Error fetching contacts: " + error.message);
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      console.error("Error fetching contacts:", error);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleEditSubmit = async () => {
    if (editingContact) {
      try {
        await axios.put(
          `http://localhost:3000/contacts/${editingContact.id}`,
          editingContact,
        );
        setEditingContact(null);
        fetchContacts();
        setSnackbarMessage("Contact updated successfully!");
        setSnackbarSeverity("success");
        setShowSnackbar(true);
      } catch (error) {
        setSnackbarMessage("Error updating contact: " + error.message);
        setSnackbarSeverity("error");
        setShowSnackbar(true);
        console.error("Error updating contact:", error);
      }
    }
  };

  const handleEditChange = (e) => {
    setEditingContact({ ...editingContact, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`);
      setContacts(contacts.filter((c) => c.id !== id));
      setSnackbarMessage("Contact deleted successfully!");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Error deleting contact: " + error.message);
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      console.error("Error deleting contact:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedContacts = contacts.slice().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedContacts = sortedContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", my: 4 }}>
      {paginatedContacts.length === 0 && (
        <p className="text-black/40 text-center pt-4">
          No contacts found. Please add a new contact.
        </p>
      )}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "firstName",
                "lastName",
                "email",
                "phoneNumber",
                "company",
                "jobTitle",
              ].map((field) => (
                <TableCell key={field}>
                  <TableSortLabel
                    active={sortColumn === field}
                    direction={sortColumn === field ? sortDirection : "asc"}
                    onClick={() => handleSort(field)}
                  >
                    <strong>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </strong>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(contact)}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(contact.id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedContacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      {editingContact && (
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 300,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            zIndex: 5,
          }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={editingContact.firstName}
            onChange={handleEditChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={editingContact.lastName}
            onChange={handleEditChange}
          />
          <TextField
            label="Email"
            name="email"
            value={editingContact.email}
            onChange={handleEditChange}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={editingContact.phoneNumber}
            onChange={handleEditChange}
          />
          <TextField
            label="Company"
            name="company"
            value={editingContact.company}
            onChange={handleEditChange}
          />
          <TextField
            label="Job Title"
            name="jobTitle"
            value={editingContact.jobTitle}
            onChange={handleEditChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleEditSubmit();
              setEditingContact(null);
            }}
          >
            Save
          </Button>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ m: 2 }}
        href="/add-contact"
      >
        Add New Contact
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
    </Paper>
  );
};

export default ContactTable;
