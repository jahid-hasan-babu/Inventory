"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";

const materialsSummary = [
  { title: "Total Materials", count: 500, color: "bg-indigo-500" },
  { title: "In Stock", count: 350, color: "bg-green-500" },
  { title: "Out of Stock", count: 50, color: "bg-red-500" },
  { title: "Low Stock", count: 100, color: "bg-yellow-500" },
];

const stockStatusColors = {
  "In Stock": "bg-green-500",
  "Out of Stock": "bg-red-500",
  "Low Stock": "bg-yellow-500",
};

export default function Material() {
  const [materialData, setMaterialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/materials.json");
      const data = await response.json();
      setMaterialData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = materialData.filter((material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
    setPage(0);
  }, [searchTerm, materialData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="py-4 space-y-4 ">
      <TextField
        variant="outlined"
        fullWidth
        label="Search by Material Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />

      <Grid container spacing={4}>
        {materialsSummary.map((summary, index) => (
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

      <div className="hidden lg:block">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">ID</TableCell>
                <TableCell className="font-bold">Material Name</TableCell>
                <TableCell className="font-bold">Type</TableCell>
                <TableCell className="font-bold">Supplier</TableCell>
                <TableCell className="font-bold">Quantity</TableCell>
                <TableCell className="font-bold">Unit Price</TableCell>
                <TableCell className="font-bold">Total Price</TableCell>
                <TableCell className="font-bold">Stock Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((material) => (
                    <TableRow key={material.id}>
                      <TableCell>
                        {String(material.id).padStart(2, "0")}
                      </TableCell>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell>{material.supplier}</TableCell>
                      <TableCell>{material.quantity}</TableCell>
                      <TableCell>{material.unitPrice}</TableCell>
                      <TableCell>{material.totalPrice}</TableCell>
                      <TableCell>
                        <span
                          className={`text-white py-1 px-3 rounded ${
                            stockStatusColors[material.stockStatus]
                          }`}
                        >
                          {material.stockStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" className="py-4">
                    No materials found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[8]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          className="overflow-auto"
        />
      </div>

      <div className="lg:hidden space-y-4">
        {filteredData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((material) => (
            <Card key={material.id} className="shadow-lg rounded-md p-4">
              <CardContent>
                <Typography variant="h6" component="div" className="font-bold">
                  Material ID: {String(material.id).padStart(2, "0")}
                </Typography>
                <Typography>
                  <span className="font-semibold">Name:</span> {material.name}
                </Typography>
                <Typography>
                  <span className="font-semibold">Type:</span> {material.type}
                </Typography>
                <Typography>
                  <span className="font-semibold">Supplier:</span>{" "}
                  {material.supplier}
                </Typography>
                <Typography>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {material.quantity}
                </Typography>
                <Typography>
                  <span className="font-semibold">Unit Price:</span>{" "}
                  {material.unitPrice}
                </Typography>
                <Typography>
                  <span className="font-semibold">Total Price:</span>{" "}
                  {material.totalPrice}
                </Typography>
                <Typography>
                  <span className="font-semibold">Stock Status:</span>{" "}
                  <span
                    className={`text-white py-1 px-3 rounded ${
                      stockStatusColors[material.stockStatus]
                    }`}
                  >
                    {material.stockStatus}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          ))}
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          className="overflow-auto"
        />
      </div>
    </div>
  );
}
