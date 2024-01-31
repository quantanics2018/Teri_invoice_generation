import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/system';
import { Container, TextField, Button, Grid, Paper, Typography, Select, MenuItem, Autocomplete } from '@mui/material';
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { CancelBtnComp } from '../components/AddUserBtn';
import axios from 'axios';
import { API_URL } from '../config';
import SplitButton from '../components/SplitButton';
import Invoice from '../components/Invoice';
import { CancelBtn } from '../assets/style/cssInlineConfig';
// import Autocomplete from '@material-ui/lab/Autocomplete';


const StyledPaper = styled(Paper)({
    padding: '20px',
    margin: '20px',
});

const thead = {
    textAlign: "center",
    color: "white"
}

const InvoiceGenerator = () => {
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const theme = useTheme();
    const customerNames = ['Date','UserId'];
    const [inputValues, setInputValues] = useState({
        recieverid: "",
        senderID: userInfo.userid,
    });

    const handleInputChangeInvoice = (fieldName, value) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    // content for table
    const [rows, setRows] = useState([
        { id: 1, productid: '', productName: '', Quantity: '', Discount: '', Total: '' },
    ]);

    const addRow = () => {
        const newRow = { id: rows.length + 1, productid: '', batchno: '', productName: '', Quantity: '', Discount: '', Total: '' };
        setRows([...rows, newRow]);
    };

    const deleteRow = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
    };
    const handleInputChange = (id, column, value) => {
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, [column]: value } : row
        );
        setRows(updatedRows);
        // console.log(updatedRows);
    };

    const [errorMessage, setErrorMessage] = useState('');
    const suggestionsArray = ['INK', 'Catterpiller', 'Printer', 'Pen', 'Paper'];
    const handleBlur = (rowId, fieldName, value) => {
        // alert(value)
        if (!suggestionsArray.includes(value)) {
            setErrorMessage('Invalid product name');
        } else {
            setErrorMessage('');
        }
    };
    const [previewInvoice, setPreviewInvoice] = useState([
        { productid: '1', productname: 'printers' },
        { productid: '85672', productname: 'Phone' },
        { productid: '564321', productname: 'caterpiller' },
        { productid: '4568091', productname: 'epsilon machine' },
        { productid: '876231', productname: 'Inks' }
    ]);
    const handleSubmit = async () => {
        console.log(rows);
        console.log(inputValues);
        try {
            const response = await axios.post(`${API_URL}add/invoice`, { invoice: inputValues, invoiceitem: rows });
            alert(response.data.message);
            setPreviewInvoice(response.data.message)
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    // input dropdown options
    const [options, setOptions] = useState([]);
    const [OptionsproductName, setOptionsproductName] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dropDownResponse = await axios.post(`${API_URL}get/productList`, { inputValues });
                console.log(dropDownResponse.data.data);
                const productIds = dropDownResponse.data.data.map(item => item.productid);
                const productName = dropDownResponse.data.data.map(item => item.productname);
                setOptions(productIds);
                setOptionsproductName(productName);
            } catch (error) {
                console.error('Error in processing data:', error);
            }
        };

        fetchData();
    }, [inputValues]);
    // console.log(options);


    return (
        <>
            {/* Preview Modal Start */}
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button> */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{ padding: '0px', marginLeft: '-110px' }}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Preview Invoice</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {console.log(previewInvoice)}
                            <Invoice previewInvoiceprop={previewInvoice} />
                        </div>
                        <div class="modal-footer">
                            <CancelBtnComp dataBsDismiss="modal" />
                            {/* <button type="button" class="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Preview Modal End */}
            <div className='innercontent'>
                <StyledPaper elevation={3}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Add Invoice
                    </Typography>
                    <form>
                        <Grid container spacing={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {customerNames.map((customerName, index) => (
                                <React.Fragment key={index}>
                                    <Grid item xs={4}>
                                        <Typography variant="body1" align="left">
                                            {customerName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label={customerName}
                                            onChange={(e) => handleInputChangeInvoice(customerName, e.target.value)}
                                            value={inputValues[customerName] || ''}
                                        />
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>

                    </form>
                </StyledPaper>
                {/* Table content */}
                <StyledPaper>
                    <div className="addrow" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0.5rem' }}>
                        <Button onClick={addRow} variant="contained" color="primary">
                            Add Row
                        </Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell style={thead}>HSN Code</TableCell> */}
                                    <TableCell style={thead}>Product Name</TableCell>
                                    <TableCell style={thead}>Batch No</TableCell>
                                    <TableCell style={thead}>Quantity</TableCell>
                                    <TableCell style={thead}>Discount</TableCell>
                                    <TableCell style={thead}>Total</TableCell>
                                    <TableCell style={thead}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            {/* <Autocomplete
                                            options={options}
                                            // getOptionLabel={(option) => option}
                                            onChange={(e, value) => handleInputChange(row.id, 'productid', value)}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    // label="HSN" 
                                                    variant="outlined" />
                                            )}
                                        /> */}
                                            <Autocomplete
                                                options={OptionsproductName}
                                                // getOptionLabel={(option) => option}
                                                onChange={(e, value) => handleInputChange(row.id, 'productName', value)}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        // label="HSN" 
                                                        variant="outlined" />
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                list={`suggestions-${row.id}`}
                                                value={row.col2}
                                                onChange={(e) => handleInputChange(row.id, 'batchno', e.target.value)}
                                                onBlur={(e) => handleBlur(row.id, 'Batch No', e.target.value)}
                                            />
                                        </TableCell>

                                        {/* <TableCell>
                                        <TextField
                                            list={`suggestions-${row.id}`}
                                            value={row.col2}
                                            onChange={(e) => handleInputChange(row.id, 'productName', e.target.value)}
                                            onBlur={(e) => handleBlur(row.id, 'productName', e.target.value)}
                                        />
                                        <datalist id={`suggestions-${row.id}`}
                                            style={{ position: 'absolute', zIndex: 1, border: '1px solid #ccc', background: '#fff' }}
                                        >
                                            {suggestionsArray.map((suggestion, index) => (
                                                <option key={index} value={suggestion} />
                                            ))}
                                        </datalist>
                                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                    </TableCell> */}
                                        {/* <TableCell>
                                        <Autocomplete
                                            freeSolo
                                            options={suggestionsArray}
                                            value={row.col2}
                                            onChange={(event, newValue) => handleInputChange(row.id, 'productName', newValue)}
                                            onBlur={(e) => handleBlur(row.id, 'productName', e.target.value)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Product Name" margin="normal" variant="outlined" />
                                            )}
                                        />
                                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                    </TableCell> */}
                                        <TableCell>
                                            <TextField
                                                type='number'
                                                value={row.col3}
                                                onChange={(e) => handleInputChange(row.id, 'Quantity', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={row.col4}
                                                onChange={(e) => handleInputChange(row.id, 'Discount', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={row.col5}
                                                onChange={(e) => handleInputChange(row.id, 'Total', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => deleteRow(row.id)} color="secondary">
                                                ❌
                                                {/* ✔ */}
                                                {/* <DeleteIcon /> */}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </StyledPaper>

                <br /><br /><br /><br />




                <footer>
                    <Grid container justifyContent="space-between" alignItems="center" style={{ width: "80%" }}>
                        <Grid item className='gap-4 d-flex'>
                            <CancelBtnComp />

                            {/* <Button variant="outlined" color="primary" onClick={handleSubmit}>
                                Generate Invoice
                            </Button> */}
                            <SplitButton />
                        </Grid>
                        <Grid item>
                            <div>
                                <Typography variant="body1" display="inline" style={{ marginRight: theme.spacing(2) }}>
                                    Total Amount: $1000
                                </Typography>
                                <Typography variant="body1" display="inline">
                                    Total Quantity: 10
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </footer>


            </div>
        </>
    );
};

export default InvoiceGenerator;
