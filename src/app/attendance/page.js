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
  TextField,
  Paper,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";

export default function EmployeeAndLabourData() {
  const [employeeData, setEmployeeData] = useState([]);
  const [labourData, setLabourData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("/data/employee.json");
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    const fetchLabourData = async () => {
      try {
        const response = await fetch("/data/labour.json");
        const data = await response.json();
        setLabourData(data);
      } catch (error) {
        console.error("Error fetching labour data:", error);
      }
    };

    fetchEmployeeData();
    fetchLabourData();
  }, []);

  const combinedData = [
    ...employeeData.map((emp) => ({ ...emp, type: "Employee" })),
    ...labourData.map((lab) => ({ ...lab, type: "Labour" })),
  ];

  const filteredData = combinedData.filter(
    (data) =>
      (data.labourId &&
        data.labourId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (data.employeeId &&
        data.employeeId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (data.name && data.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center" className="py-4">
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Search by ID or Name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>SL No.</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              {!isMobile && (
                <>
                  <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Position</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Joining Date
                  </TableCell>
                </>
              )}
              {!isMobile && (
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((data, index) => (
              <TableRow key={data.employeeId || data.labourId}>
                <TableCell>
                  {(index + 1 + (page - 1) * rowsPerPage)
                    .toString()
                    .padStart(2, "0")}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {data.name}
                  </Typography>
                  {isMobile && (
                    <>
                      <Typography variant="caption">
                        ID: {data.employeeId || data.labourId}
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        Type: {data.type}
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        Position: {data.position || "N/A"}
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        Joining Date:{" "}
                        {data.joiningDate
                          ? new Date(data.joiningDate).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                      <br />
                      <Link
                        href={{
                          pathname: "/attendance/make-attendance",
                          query: {
                            id: data.employeeId || data.labourId,
                          },
                        }}
                        passHref
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            alert(`Marking attendance for ${data.name}`)
                          }
                        >
                          Daily Attendance
                        </Button>
                      </Link>
                    </>
                  )}
                </TableCell>
                {!isMobile && (
                  <>
                    <TableCell>{data.employeeId || data.labourId}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    <TableCell>{data.position || "N/A"}</TableCell>
                    <TableCell>
                      {data.joiningDate
                        ? new Date(data.joiningDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={{
                          pathname: "/attendance/make-attendance",
                          query: {
                            id: data.employeeId || data.labourId,
                          },
                        }}
                        passHref
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginTop: "10px" }}
                          onClick={() =>
                            alert(`Marking attendance for ${data.name}`)
                          }
                        >
                          Daily Attendance
                        </Button>
                      </Link>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Grid>
    </div>
  );
}
