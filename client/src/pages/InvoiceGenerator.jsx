import React, { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/system';
import { Container, TextField, Button, Grid, Paper, Typography, Select, MenuItem, Autocomplete, InputAdornment } from '@mui/material';
import { useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import ReactDOMServer from 'react-dom/server'; 
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
import { CancelBtn, SaveBtn } from '../assets/style/cssInlineConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

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
    const navigate = useNavigate();

    const [selectedDate, handleDateChange] = useState(new Date());
    const [loading, setLoading] = useState(false);
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
    const deleteRowFirst = (id) => {
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, hsncode: '', batchno: '', productName: '', Quantity: '', Discount: '', Total: '' } : row
        );
        setRows(updatedRows);
        sethsncodestate('')
        setbatchnostate('')
        setquantitystate('')
        setdiscountstate('')
    };
    // setCurrentRowId(id);

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

    // invoice htm send to server
    const sendDataToServer = async () => {
        try {
            const htmlString = ReactDOMServer.renderToString(
                <div className="InvoiceContainer">
                    Replace with Invoice in Return
                </div>
            );

            const response = await axios.post(`${API_URL}send-email/sendInvoice`, htmlString, {
                headers: {
                    'Content-Type': 'text/html',
                },
            });

            if (response.status === 200) {
                console.log('Mail sent successfully');
            } else {
                console.error('Failed to send data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleSubmit = async () => {
        // console.log(rows);
        console.log(inputValues);
        const hasEmptyValue = rows.some(row =>
            Object.values(row).some(value => value === '')
        );
        const hasEmptyReciverId =
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
                    setLoading(true);
                    const response = await axios.post(`${API_URL}add/invoice`, { invoice: inputValues, invoiceitem: rows , totalValues:totalSum});
                    if(response.data.status){
                        await sendDataToServer();
                        alert(response.data.message);
                    }else{
                        alert(response.data.message);
                    }
                    setLoading(false);
                    // setPreviewInvoice(response.data.message)
                    navigate('/TransactionHistory');
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

            } catch (error) {
                console.error('Error in processing data:', error);
            }
        };

        fetchData();
    }, [inputValues]);

    const [totalSum, setTotalSum] = useState();
    const [totalQuantity, settotalQuantity] = useState();

    useEffect(() => {
        const totalSumValue = rows.map(item => parseFloat(item.Total)).reduce((sum, value) => sum + value, 0);
        setTotalSum(totalSumValue);
        const totalQuantityValue = rows.map(item => parseFloat(item.Quantity)).reduce((sum, value) => sum + value, 0);
        settotalQuantity(totalQuantityValue);
        console.log("total value", totalSumValue);
    }, [rows]); // Include 'rows' in the dependency array


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

        console.log(value);

        const updatedRows = rows.map((row) =>
            row.id === id ? {
                ...row, productName: value
            } : row
        );
        setRows(updatedRows);
        console.log(updatedRows);
    }
    const setTotalValue = (id, Enteredhsncode, Enteredbatchno, enteredQuantity = 0, enteredDiscount = 0) => {
        console.log("productList", id, Enteredhsncode, Enteredbatchno, enteredQuantity);

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
        // console.log("fortotal :", updatedRows);
    }


    // perform a invoice
    const generatePDF = () => {
        const input = document.getElementById('invoiceContent'); // Target the modal
        html2pdf().from(input).save();
    }



    return (
        <>
         {loading &&  <Loader />}
            {/* Preview Modal Start */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{ padding: '0px', marginLeft: '-110px', height: '1300px' }}>
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Preview Invoice</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="invoiceContent" class="modal-body">
                            <Invoice previewInvoiceprop={rows} />
                        </div>
                        <div class="modal-footer gap-4">
                            <CancelBtnComp dataBsDismiss="modal" />
                            <Button variant="outlined" style={SaveBtn} onClick={generatePDF}>PDF</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Preview Modal End */}
            <div className='innercontent'>
                <StyledPaper elevation={3}>
                    {/* <Typography variant="h5" align="center" gutterBottom>
                        Add Invoice
                    </Typography> */}
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
                                                value={row.hsncode}
                                                onChange={(e) => handleInputChange(row.id, 'hsncode', e.target.value)}
                                                onBlur={() => setthirdInput(row.id, hsncodestate, batchnostate)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                list={`suggestions-${row.id}`}
                                                value={row.batchno}
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
                                                value={row.Quantity}
                                                onChange={(e) => handleInputChange(row.id, 'Quantity', e.target.value)}
                                                onBlur={() => setTotalValue(row.id, hsncodestate, batchnostate, quantitystate, discountstate)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type='number'
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                value={row.Discount}
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
                                            <Button disabled={currentRowId !== null && row.id !== currentRowId} onClick={() => (row.id !== 1 ? deleteRow(row.id) : deleteRowFirst(row.id))}
                                                color="secondary">
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
                                    Total Amount: {totalSum ? totalSum : 0}
                                </Typography>
                                <Typography variant="body1" display="inline">
                                    Total Quantity: {totalQuantity ? totalQuantity : 0}
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
