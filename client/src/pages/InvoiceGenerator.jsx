import React, { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/system';
import { Container, TextField, Button, Grid, Paper, Typography, Select, MenuItem, Autocomplete, InputAdornment } from '@mui/material';
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
const pName = {
    minWidth: '250px'
}

const InvoiceGenerator = () => {
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const theme = useTheme();
    const [selectedDate, handleDateChange] = useState(new Date());
    const customerNames = ['Date', 'UserId'];
    const [inputValues, setInputValues] = useState({
        Date: "",
        UserId: "",
        senderID: userInfo.userid,
    });

    const handleInputChangeInvoice = (fieldName, value) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    // content for table
    // , batchno: ''
    const [rows, setRows] = useState([
        { id: 1, hsncode: '', batchno: '', productName: '', Quantity: '', Discount: '', Total: '' },
    ]);

    const verifyKeysHaveValues = (array) => {
        for (const obj of array) {
            for (const key in obj) {
                if (!obj[key]) {
                    return false;
                }
            }
        }
        return true;
    };
    const [currentRowId, setCurrentRowId] = useState(null);

    const addRow = () => {
        const result = verifyKeysHaveValues(rows);
        console.log(result);
        if (result) {
            const newRow = { id: rows.length + 1, hsncode: '', batchno: '', productName: '', Quantity: '', Discount: '', Total: '' };
            setRows([...rows, newRow]);
            sethsncodestate('')
            setbatchnostate('')
            setquantitystate('')
            setdiscountstate('')
            setCurrentRowId(newRow.id)
            // alert(currentRowId)
        }
        else {
            alert("Please fill all fields");
        }
        console.log(rows);
    };

    // const currentRowid = useRef();

    // useEffect(()=>{
    //     if (currentRowid.current) {
    //         console.log(currentRowid.current);
    //     }
    // },[currentRowid])
    const deleteRow = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setCurrentRowId((prevRowId) => prevRowId - 1);
        setRows(updatedRows);
    };
    // setCurrentRowId(id);
    // sethsncodestate('')
    // setbatchnostate('')
    // setquantitystate('')
    // setdiscountstate('')
    
    const handleInputChange = (id, column, value) => {
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, [column]: value } : row
        );
        setRows(updatedRows);
        if (column === 'hsncode') {
            sethsncodestate(value)
        }
        if (column === 'batchno') {
            setbatchnostate(value)
        }
        if (column === 'Quantity') {
            setquantitystate(value)
        }
        if (column === 'Discount') {
            setdiscountstate(value)
        }
    };

    const handleSubmit = async () => {
        console.log(rows);
        console.log(inputValues);
        const hasEmptyValue = rows.some(row =>
            Object.values(row).some(value => value === '')
        );
        const hasEmptyReciverId =
            // inputValues.some(inputValues =>
            Object.values(inputValues).some(value => value === '')
        // );
        if (hasEmptyReciverId) {
            alert("Reciver Details can't be Empty");
        } else {
            if (hasEmptyValue) {
                alert('Please fill in all fields in each row before submitting.');
            } else {
                // alert('Success');
                try {
                    const response = await axios.post(`${API_URL}add/invoice`, { invoice: inputValues, invoiceitem: rows });
                    alert(response.data.message);
                    // setPreviewInvoice(response.data.message)
                } catch (error) {
                    console.error('Error sending data:', error);
                }
            }
        }
    }

    // input dropdown options
    const [productList, setproductList] = useState([]);
    const [userNameoptions, setuserNameoptions] = useState([]);
    const [OptionsproductName, setOptionsproductName] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dropDownUserResponse = await axios.post(`${API_URL}get/getUserList`, { inputValues });
                const users = dropDownUserResponse.data.data.map(item => item.email);
                setuserNameoptions(users);
                const dropDownResponse = await axios.post(`${API_URL}get/productList`, { inputValues });
                console.log(dropDownResponse.data.data);
                const productList = dropDownResponse.data.data;
                setproductList(productList)
                const productName = dropDownResponse.data.data.map(item => item.productname);
                // setOptions(productIds);
                setOptionsproductName(productName);
                // const data = {
                //     1: { productid: '1', batchno: '2', productname: 'printers' },
                //     2: { productid: '85672', batchno: '1', productname: 'Phone' },
                //     3: { productid: '564321', batchno: '1', productname: 'caterpillar' },
                //     4: { productid: '4568091', batchno: '1', productname: 'epsilon machine' },
                //     5: { productid: '876231', batchno: '1', productname: 'Inks' },
                // };

            } catch (error) {
                console.error('Error in processing data:', error);
            }
        };

        fetchData();
    }, [inputValues]);

    const [hsncodestate, sethsncodestate] = useState('');
    const [batchnostate, setbatchnostate] = useState('');
    const [quantitystate, setquantitystate] = useState('');
    const [discountstate, setdiscountstate] = useState('');

    const setthirdInput = (id, Enteredhsncode, Enteredbatchno) => {
        console.log("Index:", productList);
        // console.log("id and hsn", id, Enteredhsncode, Enteredbatchno);
        const value = productList
            .filter((product) => product.productid === Enteredhsncode && product.batchno === Enteredbatchno)
            .map((product) => product.productname)[0] || '';

        const updatedRows = rows.map((row) =>
            row.id === id ? {
                ...row, productName: value
            } : row
        );
        setRows(updatedRows);
        console.log(updatedRows);
    }
    const setTotalValue = (id, Enteredhsncode, Enteredbatchno, enteredQuantity = 0, enteredDiscount = 0) => {
        const productPrice = productList
            .filter((product) => product.productid === Enteredhsncode && product.batchno === Enteredbatchno)
            .map((product) => product.priceperitem)[0] || '';
        console.log("price : ", productPrice);
        const updatedRows = rows.map((row) =>
            row.id === id ? {
                ...row, Total: (enteredQuantity * productPrice) - ((enteredQuantity * productPrice) * enteredDiscount / 100)
            } : row
        );
        setRows(updatedRows);
        console.log("fortotal :", updatedRows);
    }


    return (
        <>
            {/* Preview Modal Start */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{ padding: '0px', marginLeft: '-110px' }}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Preview Invoice</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {/* {console.log(rows)} */}
                            <Invoice previewInvoiceprop={rows} />
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
                                        {customerName === 'UserId' ? (
                                            <Autocomplete
                                                options={userNameoptions}
                                                onChange={(e, value) => handleInputChangeInvoice(customerName, value)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label={customerName} variant="outlined" />
                                                )}
                                            />
                                        ) : (
                                            <TextField fullWidth label={customerName}
                                                onChange={(e) => handleInputChangeInvoice(customerName, e.target.value)}
                                                value={inputValues[customerName] || ''}
                                            />
                                        )}
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
                                    <TableCell style={thead}>HSN Code</TableCell>
                                    <TableCell style={thead}>Batch No</TableCell>
                                    <TableCell style={{ ...thead, ...pName }} >Product Name</TableCell>
                                    <TableCell style={thead}>Quantity</TableCell>
                                    <TableCell style={thead}>Discount</TableCell>
                                    <TableCell style={thead}>Total</TableCell>
                                    <TableCell style={thead}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id} 
                                    // ref={currentRowid}
                                    >
                                        <TableCell>
                                            <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                list={`suggestions-${row.id}`}
                                                value={row.col2}
                                                onChange={(e) => handleInputChange(row.id, 'hsncode', e.target.value)}
                                                onBlur={() => setthirdInput(row.id, hsncodestate, batchnostate)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                list={`suggestions-${row.id}`}
                                                value={row.col3}
                                                onChange={(e) => handleInputChange(row.id, 'batchno', e.target.value)}
                                                onBlur={() => setthirdInput(row.id, hsncodestate, batchnostate)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {/* <Autocomplete
                                                options={OptionsproductName}
                                                // getOptionLabel={(option) => option}
                                                // onChange={(e, value) => handleInputChange(row.id, 'productName', value)}
                                                value={thirdInputValues[1]}
                                                // readOnly
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        // label="HSN" 
                                                        variant="outlined"
                                                        value={"hai"}
                                                    // error={isEmptyProductName} // Set error prop based on the empty status
                                                    // helperText={isEmptyProductName ? 'This field is required' : ''}
                                                    />
                                                )}
                                            /> */}
                                            <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                value={row.productName}
                                            // onChange={(e) => handleInputChange(row.id, 'productName', e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                type='number'
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                value={row.col5}
                                                onChange={(e) => handleInputChange(row.id, 'Quantity', e.target.value)}
                                                onBlur={() => setTotalValue(row.id, hsncodestate, batchnostate, quantitystate, discountstate)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type='number'
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                value={row.col6}
                                                onChange={(e) => handleInputChange(row.id, 'Discount', e.target.value)}
                                                onBlur={() => setTotalValue(row.id, hsncodestate, batchnostate, quantitystate, discountstate)}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                value={row.Total}
                                            // onChange={(e) => handleInputChange(row.id, 'Total', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button disabled={currentRowId !== null && row.id !== currentRowId} onClick={() => { if (row.id !== 1) deleteRow(row.id); }} color="secondary">
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

                            <Button variant="outlined" color="primary" onClick={handleSubmit}>
                                Generate Invoice
                            </Button>
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
