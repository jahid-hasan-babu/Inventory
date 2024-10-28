"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";

export default function AttendancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [id, setId] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [date, setDate] = useState("");
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = dayjs().subtract(i, "day");
    return {
      date: date.format("YYYY-MM-DD"),
      dayName: date.format("dddd"),
    };
  });

  useEffect(() => {
    const storedAttendanceData = localStorage.getItem("attendanceData");
    if (storedAttendanceData) {
      setAttendanceData(JSON.parse(storedAttendanceData));
    }

    const empId = searchParams.get("id");
    if (empId) {
      setId(empId);
      fetchData(empId);
    }
  }, [searchParams]);

  const fetchData = async (id) => {
    try {
      const [employeeResponse, labourResponse] = await Promise.all([
        fetch("/data/employee.json"),
        fetch("/data/labour.json"),
      ]);
      const [employeeData, labourData] = await Promise.all([
        employeeResponse.json(),
        labourResponse.json(),
      ]);

      const employee = employeeData.find((emp) => emp.employeeId === id);
      const labour = labourData.find((lab) => lab.labourId === id);

      if (employee) {
        setEmployeeId(employee.employeeId);
        setEmployeeName(employee.name);
        setEmployeePosition(employee.position);
      } else if (labour) {
        setEmployeeId(labour.labourId);
        setEmployeeName(labour.name);
        setEmployeePosition(labour.position);
      } else {
        console.warn("Employee or labour not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddAttendance = () => {
    if (
      !employeeId ||
      !employeeName ||
      !employeePosition ||
      !date ||
      !inTime ||
      !outTime
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    const newAttendance = {
      employeeId,
      employeeName,
      employeePosition,
      date,
      dayName: last30Days.find((day) => day.date === date)?.dayName || "",
      inTime,
      outTime,
    };

    const updatedAttendanceData = [...attendanceData, newAttendance];
    setAttendanceData(updatedAttendanceData);
    localStorage.setItem(
      "attendanceData",
      JSON.stringify(updatedAttendanceData)
    );

    setEmployeeId("");
    setEmployeeName("");
    setEmployeePosition("");
    setDate("");
    setInTime("");
    setOutTime("");

    toast.success("Attendance recorded successfully!");
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendanceData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(attendanceData.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pt-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" gutterBottom className="text-green-500">
          Attendance Management
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Employee ID"
              variant="outlined"
              fullWidth
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Employee Name"
              variant="outlined"
              fullWidth
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Position"
              variant="outlined"
              fullWidth
              value={employeePosition}
              onChange={(e) => setEmployeePosition(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Date"
              variant="outlined"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
            >
              {last30Days.map((day) => (
                <MenuItem key={day.date} value={day.date}>
                  {day.date} - {day.dayName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="In Time"
              variant="outlined"
              fullWidth
              type="time"
              value={inTime}
              onChange={(e) => setInTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Out Time"
              variant="outlined"
              fullWidth
              type="time"
              value={outTime}
              onChange={(e) => setOutTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              className="py-4 bg-green-500 hover:bg-green-400"
              fullWidth
              onClick={handleAddAttendance}
            >
              Record Attendance
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} className="p-6 mt-4">
        <Typography variant="h6" gutterBottom className="text-green-500">
          Recorded Attendance
        </Typography>
        {currentRecords.length > 0 ? (
          <>
            <ul>
              {currentRecords.map((attendance, index) => (
                <li key={index}>
                  {attendance.date} ({attendance.dayName}) -{" "}
                  {attendance.employeeName} ({attendance.inTime} -{" "}
                  {attendance.outTime})
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <Button
                variant="contained"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Typography>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <Typography>No attendance recorded yet.</Typography>
        )}
      </Paper>
    </div>
  );
}
