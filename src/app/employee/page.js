"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  Modal,
  Typography,
  Paper,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";

const employeeSummary = [
  { title: "Total Employees", count: 500, color: "bg-indigo-500" },
  { title: "Active Employees", count: 350, color: "bg-green-500" },
  { title: "Inactive Employees", count: 50, color: "bg-red-500" },
  { title: "Pending Verification", count: 100, color: "bg-yellow-500" },
];

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 6;
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/employee.json");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleDelete = (employeeId) => {
    toast.error(`Employee with ID ${employeeId} removed!`);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div>
      <Grid container spacing={2} alignItems="center" className="py-4 pb-10">
        <Grid item xs={12} sm={9}>
          {" "}
          <TextField
            variant="outlined"
            fullWidth
            label="Search by Material Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </Grid>
        <Grid item xs={12} sm={3} className="text-right sm:text-left">
          <Link href="/employee/add-employee" passHref>
            <Button
              variant="contained"
              color="secondary"
              className="rounded-md py-4 px-4 "
              fullWidth
            >
              Add Employee
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="mb-4">
        {employeeSummary.map((summary, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className={`shadow-lg rounded-md ${summary.color}`}>
              <CardContent className="flex flex-col items-center text-white text-center">
                <Typography variant="h6" component="div" className="font-bold">
                  {summary.title}
                </Typography>
                <Typography variant="h6" component="div">
                  {summary.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {isMobile ? (
        <Grid container spacing={2}>
          {paginatedEmployees.map((emp) => (
            <Grid item xs={12} key={emp.employeeId}>
              <Card
                variant="outlined"
                style={{ padding: "16px", marginBottom: "16px" }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <Avatar
                      src={emp.image}
                      alt={emp.name}
                      sx={{
                        bgcolor: emp.image ? undefined : "green",
                        width: 60,
                        height: 60,
                      }}
                    >
                      {!emp.image && emp.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6">{emp.name}</Typography>
                    <Typography>Employee ID: {emp.employeeId}</Typography>
                    <Typography>Position: {emp.position}</Typography>
                    <Typography>
                      Joining Date:{" "}
                      {new Date(emp.joiningDate).toLocaleDateString()}
                    </Typography>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(emp)}
                      >
                        <Visibility />
                      </IconButton>

                      <IconButton color="secondary">
                        <Link href="/employee/edit-employee" passHref>
                          <Edit />
                        </Link>
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(emp.employeeId)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>SL No.</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Image</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Employee Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Employee ID
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Position</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Joining Date
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Experience (Years)
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Salary</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Overtime (Hours)
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Total Salary
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEmployees.map((emp, index) => (
                <TableRow key={emp.employeeId}>
                  <TableCell>
                    {((page - 1) * rowsPerPage + index + 1)
                      .toString()
                      .padStart(2, "0")}
                  </TableCell>

                  <TableCell>
                    <Avatar
                      src={emp.image}
                      alt={emp.name}
                      sx={{ bgcolor: emp.image ? undefined : "green" }}
                    >
                      {!emp.image && emp.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.employeeId}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>
                    {new Date(emp.joiningDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{emp.yearsOfExperience}</TableCell>
                  <TableCell>${emp.salary.toLocaleString()}</TableCell>
                  <TableCell>{emp.overtime}</TableCell>
                  <TableCell>${emp.totalSalary.toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenModal(emp)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton color="secondary">
                      <Link href="/employee/edit-employee" passHref>
                        <Edit />
                      </Link>
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(emp.employeeId)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Pagination
        count={Math.ceil(filteredEmployees.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />

      <ToastContainer position="top-right" autoClose={3000} />
      {selectedEmployee && (
        <Modal
          open={open}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropProps={{ timeout: 500 }}
        >
          <Paper
            style={{
              padding: "20px",
              maxWidth: isMobile ? "90%" : "500px",
              width: isMobile ? "90%" : "500px",
              maxHeight: "80%",
              margin: "auto",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Avatar
                  src={selectedEmployee.image}
                  alt={selectedEmployee.name}
                  sx={{
                    bgcolor: selectedEmployee.image ? undefined : "green",
                    width: 80,
                    height: 80,
                    fontSize: 36,
                  }}
                >
                  {!selectedEmployee.image &&
                    selectedEmployee.name.slice(0, 2).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">{selectedEmployee.name}</Typography>
                <Typography>
                  Employee ID: {selectedEmployee.employeeId}
                </Typography>
                <Typography>Position: {selectedEmployee.position}</Typography>
                <Typography>
                  Joining Date:{" "}
                  {new Date(selectedEmployee.joiningDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  Experience: {selectedEmployee.yearsOfExperience} Years
                </Typography>
                <Typography>
                  Salary: ${selectedEmployee.salary.toLocaleString()}
                </Typography>
                <Typography>
                  Overtime: {selectedEmployee.overtime} Hours
                </Typography>
                <Typography>
                  Total Salary: ${selectedEmployee.totalSalary.toLocaleString()}
                </Typography>

                <div style={{ marginTop: "15px", width: "100%" }}>
                  <Button
                    onClick={() => {
                      // Place any action before closing, if necessary
                      handleCloseModal();
                    }}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Close
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      )}
    </div>
  );
}
