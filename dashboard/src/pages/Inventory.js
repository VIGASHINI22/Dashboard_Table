import React from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Sidenav from "../Sidenav"
import Navbar from "../Navbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './inventory.css';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, CardMedia } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import MuiGrid from '@mui/material/Grid';
import './style1.css';

export default function Inventory() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalPages = Math.ceil(product.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = product.slice(startIndex, endIndex);
  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Products: '',
    Buying_Price: '',
    Quantity: '',
    Threshold_Value: '',
    Expiry_Date: '',
  });


  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const submitNewProduct = () => {
    // Update your product state with the new product data
    setProduct([...product, newProduct]);

    // Close the modal
    closeAddProductModal();
  };

  const handleNextPage = () => {
    const lastPage = Math.ceil(product.length / rowsPerPage) - 1;
    if (page < lastPage) {
      setPage(page + 1);
    }
  };

  const downloadCSV = () => {
    const csvRows = [
      ['Products', 'Buying Price', 'Quantity', 'Threshold Value', 'Expiry Date']
    ];

    product.forEach(item => {
      csvRows.push([
        item.Products,
        item.Buying_Price,
        item.Quantity,
        item.Threshold_Value,
        item.Expiry_Date
      ]);
    });

    const csvData = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'inventory.csv';
    downloadLink.click();
  };
  const getProductData = async () => {
    try {
      const data = await axios.get("http://localhost:3004/Table_details")
      console.log(data.data);
      setProduct(data.data);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getProductData()
  }, [])
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={50} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container Spacing={2} >
              <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                  <Card sx={{ minWidth: 1200, maxHeight: 150 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Overall Inventory
                      </Typography>
                      <div className="flex-container">
                        <div className="flex-container">
                          <div className="flex-item">
                            <div className="category">
                              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Categories</Typography>
                            </div>
                            <div>
                              <Typography>14</Typography>
                            </div>
                            <div>
                              <Typography variant="body2"  sx={{ color: 'text.secondary' }}>Last 7 days</Typography>
                            </div>
                          </div>
                        </div>
                        <div className="divider"  />

                        <div style={{ display: 'flex', alignItems: 'center' }} >
                          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                            <div className="category">
                              <Typography variant="h6" sx={{ color: 'warning.main', fontWeight: 'bold' }}>Total Products</Typography>
                            </div>
                            <div style={{ alignSelf: 'start' }}>
                              <Typography>868</Typography>
                            </div>
                            <div style={{ alignSelf: 'start' }}>
                              <Typography variant="body2"  sx={{ color: 'text.secondary' }}>Last 7 days</Typography>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px',marginTop:'40px' }}>
                            <div style={{ alignSelf: 'end' }}>
                              <Typography>25000</Typography>
                            </div>
                            <div style={{ alignSelf: 'end' }}>
                              <Typography variant="body2"  sx={{ color: 'text.secondary' }}>Revenue</Typography>
                            </div>
                          </div>
                        </div>

                        <div className="divider" />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                            <div className="category">
                              <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>Top Selling</Typography>
                            </div>
                            <div style={{ alignSelf: 'start' }}>
                              <Typography>5</Typography>
                            </div>
                            <div style={{ alignSelf: 'start' }}>
                              <Typography variant="body2"  sx={{ color: 'text.secondary' }}>Last 7 days</Typography>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px',marginTop:'40px' }}>
                            <div style={{ alignSelf: 'end' }}>
                              <Typography>2500</Typography>
                            </div>
                            <div style={{ alignSelf: 'end' }}>
                              <Typography variant="body2"  sx={{ color: 'text.secondary' }}>Cost</Typography>
                            </div>
                          </div>
                        </div>
                        <div className="divider" />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                            <div className="category">
                              <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 'bold' }}>Low Stocks</Typography>
                            </div>
                            <div style={{ alignSelf: 'start' }}>
                              <typography >12</typography>
                            </div>
                            <div style={{ alignSelf: 'start' }}>
                              <Typography variant="body2"  sx={{ color: 'text.secondary' }}>Ordered</Typography>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' ,marginTop:'40px'}}>
                            <div style={{ alignSelf: 'end' }}>
                              <Typography>2</Typography>
                            </div>
                            <div style={{ alignSelf: 'end' }}>
                              <Typography variant="body2"  sx={{ color: 'text.secondary' }}>Not in Stock</Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={18} />
            <Grid container Spacing={1} >
              <Grid item xs={12}>
                <Card sx={{ maxWidth: 1200, height: 64 + "vh" }}>
                  <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ marginRight: 'auto' }}>
                      <Typography gutterBottom variant="h5" component="div">Products</Typography>
                    </div>
                    <Button variant="contained" onClick={openAddProductModal}>Add Products</Button>
                    <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }}><FilterListIcon />Filters</Button>

                    <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }} onClick={downloadCSV}>Download All</Button>
                  </CardActions>
                  <Modal
                    open={isAddProductModalOpen}
                    onClose={closeAddProductModal}
                    aria-labelledby="add-product-modal"
                  >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
                      <Typography variant="h6">Add Product</Typography>
                      <TextField name="Products" label="Product" fullWidth onChange={handleInputChange} />
                      <TextField name="Buying_Price" label="Buying Price" fullWidth onChange={handleInputChange} />
                      <TextField name="Quantity" label="Quantity" fullWidth onChange={handleInputChange} />
                      <TextField name="Threshold_Value" label="Threshold Value" fullWidth onChange={handleInputChange} />
                      <TextField name="Expiry_Date" label="Expiry Date" fullWidth onChange={handleInputChange} />
                      <Button variant="contained" onClick={submitNewProduct}>Add</Button>
                      <Button onClick={closeAddProductModal}>Cancel</Button>
                    </Box>
                  </Modal>

                  <CardContent>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Products</TableCell>
                            <TableCell align="left">Buying Price</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Threshold Value</TableCell>
                            <TableCell align="left">Expiry Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            displayedData.map((item) => {
                              return (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row">{item.Products}</TableCell>
                                  <TableCell align="left">{item.Buying_Price}</TableCell>
                                  <TableCell align="left">{item.Quantity}</TableCell>
                                  <TableCell align="left">{item.Threshold_Value}</TableCell>
                                  <TableCell align="left">{item.Expiry_Date}</TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <CardMedia >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }} onClick={handlePreviousPage} disabled={page === 0}>
                          Previous
                        </Button>
                        <Typography align='center' >Page {page + 1} of {totalPages} </Typography>
                        <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }} onClick={handleNextPage}>
                          Next
                        </Button>
                      </div>
                    </CardMedia>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  )
}







