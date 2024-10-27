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

const labourSummary = [
  { title: "Total Labour", count: 200, color: "bg-indigo-500" },
  { title: "Helpers", count: 70, color: "bg-green-500" },
  { title: "Junior Operators", count: 50, color: "bg-blue-500" },
  { title: "Senior Operators", count: 50, color: "bg-purple-500" },
];

export default function Labour() {
  const [labours, setLabours] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLabour, setSelectedLabour] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 6;
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/labour.json");
        const data = await response.json();
        setLabours(data);
      } catch (error) {
        console.error("Error fetching labour data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (labour) => {
    setSelectedLabour(labour);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedLabour(null);
  };

  const handleDelete = (labourId) => {
    toast.error(`Labour with ID ${labourId} removed!`);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const filteredLabours = labours.filter(
    (labour) =>
      labour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      labour.labourId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedLabours = filteredLabours.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div>
      <Grid container spacing={2} alignItems="center" className="py-4 pb-10">
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            fullWidth
            label="Search by Labour Name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </Grid>
        <Grid item xs={12} sm={3} className="text-right sm:text-left">
          <Link href="/labour/add-labour" passHref>
            <Button
              variant="contained"
              color="secondary"
              className="rounded-md py-4 px-4"
              fullWidth
            >
              Add Labour
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="mb-4">
        {labourSummary.map((summary, index) => (
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
          {paginatedLabours.length > 0 ? (
            paginatedLabours.map((labour) => (
              <Grid item xs={12} key={labour.labourId}>
                <Card
                  variant="outlined"
                  style={{ padding: "16px", marginBottom: "16px" }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Avatar
                        src={labour.image}
                        alt={labour.name}
                        sx={{
                          bgcolor: labour.image ? undefined : "green",
                          width: 60,
                          height: 60,
                        }}
                      >
                        {!labour.image && labour.name.slice(0, 2).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h6">{labour.name}</Typography>
                      <Typography>Labour ID: {labour.labourId}</Typography>
                      <Typography>Position: {labour.position}</Typography>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenModal(labour)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton color="secondary">
                          <Link href="/labour/edit-labour" passHref>
                            <Edit />
                          </Link>
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(labour.labourId)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Data not found
              </Typography>
            </Grid>
          )}
        </Grid>
      ) : (
        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>SL No.</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Image</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Labour Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Labour ID</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Position</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Experience (Years)
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLabours.length > 0 ? (
                paginatedLabours.map((labour, index) => (
                  <TableRow key={labour.labourId}>
                    <TableCell>
                      {((page - 1) * rowsPerPage + index + 1)
                        .toString()
                        .padStart(2, "0")}
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={labour.image}
                        alt={labour.name}
                        sx={{ bgcolor: labour.image ? undefined : "green" }}
                      >
                        {!labour.image && labour.name.slice(0, 2).toUpperCase()}
                      </Avatar>
                    </TableCell>
                    <TableCell>{labour.name}</TableCell>
                    <TableCell>{labour.labourId}</TableCell>
                    <TableCell>{labour.position}</TableCell>
                    <TableCell>{labour.experienceYears}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(labour)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton color="secondary">
                        <Link href="/labour/edit-labour" passHref>
                          <Edit />
                        </Link>
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(labour.labourId)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="h6">Data not found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {filteredLabours.length > rowsPerPage && (
        <Pagination
          count={Math.ceil(filteredLabours.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{ marginTop: 2 }}
        />
      )}

      {selectedLabour && (
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
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
                  src={selectedLabour.image}
                  alt={selectedLabour.name}
                  sx={{
                    bgcolor: selectedLabour.image ? undefined : "green",
                    width: 80,
                    height: 80,
                    fontSize: 36,
                  }}
                >
                  {!selectedLabour.image &&
                    selectedLabour.name.slice(0, 2).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">{selectedLabour.name}</Typography>
                <Typography>Labour ID: {selectedLabour.labourId}</Typography>
                <Typography>Position: {selectedLabour.position}</Typography>
                <Typography>
                  Joining Date:{" "}
                  {new Date(selectedLabour.joiningDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  Experience: {selectedLabour.experienceYears} Years
                </Typography>
                <Typography>
                  Salary: ${selectedLabour.salary.toLocaleString()}
                </Typography>
                <Typography>
                  Overtime: {selectedLabour.overtimeHours} Hours
                </Typography>
                <Typography>
                  Total Salary: ${selectedLabour.totalSalary.toLocaleString()}
                </Typography>

                <div style={{ marginTop: "15px", width: "100%" }}>
                  <Button
                    onClick={handleCloseModal}
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
      <ToastContainer />
    </div>
  );
}
