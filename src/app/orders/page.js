"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import Link from "next/link";

const orderSummary = [
  { title: "Total Orders", count: 150, color: "bg-indigo-500" },
  { title: "Delivered", count: 85, color: "bg-green-500" },
  { title: "Pending", count: 45, color: "bg-yellow-500" },
  { title: "Processing", count: 20, color: "bg-blue-500" },
];

const statusColors = {
  Delivered: "bg-green-500",
  Pending: "bg-yellow-500",
  Processing: "bg-blue-500",
  Cancelled: "bg-red-500",
  Returned: "bg-orange-500",
};

export default function OrdersPage() {
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/orders.json");
      const data = await response.json();
      setOrderData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = orderData.filter((order) =>
      order.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
    setPage(0);
  }, [searchTerm, orderData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="py-4 space-y-4">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          {" "}
          <TextField
            variant="outlined"
            fullWidth
            label="Search Order by Buyer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </Grid>
        <Grid item xs={12} sm={3} className="text-right sm:text-left">
          <Link href="/orders/create-order" passHref>
            <Button
              variant="contained"
              color="secondary"
              className="rounded-md py-4 px-4 "
              fullWidth
            >
              New Order
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {orderSummary.map((summary, index) => (
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
                <TableCell className="font-bold">Buyer Name</TableCell>
                <TableCell className="font-bold">Product</TableCell>
                <TableCell className="font-bold">Country</TableCell>
                <TableCell className="font-bold">Brand</TableCell>
                <TableCell className="font-bold">Quantity</TableCell>
                <TableCell className="font-bold">Price</TableCell>
                <TableCell className="font-bold">Delivery Date</TableCell>
                <TableCell className="font-bold">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{String(order.id).padStart(2, "0")}</TableCell>
                      <TableCell>{order.buyerName}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.country}</TableCell>
                      <TableCell>{order.brandName}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <span
                          className={`text-white py-1 px-3 rounded ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center" className="py-4">
                    Data not matching
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
          .map((order) => (
            <Card key={order.id} className="shadow-lg rounded-md p-4">
              <CardContent>
                <Typography variant="h6" component="div" className="font-bold">
                  Order ID: {String(order.id).padStart(2, "0")}
                </Typography>
                <Typography>
                  <span className="font-semibold">Buyer Name:</span>{" "}
                  {order.buyerName}
                </Typography>
                <Typography>
                  <span className="font-semibold">Product:</span>{" "}
                  {order.product}
                </Typography>
                <Typography>
                  <span className="font-semibold">Country:</span>{" "}
                  {order.country}
                </Typography>
                <Typography>
                  <span className="font-semibold">Brand:</span>{" "}
                  {order.brandName}
                </Typography>
                <Typography>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {order.quantity}
                </Typography>
                <Typography>
                  <span className="font-semibold">Price:</span> {order.price}
                </Typography>
                <Typography>
                  <span className="font-semibold">Delivery Date:</span>{" "}
                  {order.deliveryDate}
                </Typography>
                <Typography>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`text-white py-1 px-3 rounded ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          ))}
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
    </div>
  );
}
