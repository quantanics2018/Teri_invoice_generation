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
import QrCode from '../components/QrCode';
import { invoicecontent } from '../assets/style/mailInlineCss';

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

    // const [selectedDate, handleDateChange] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        // Handle selected date, e.g., update state, send to parent component, etc.
    };

    const customerNames1 = ['Date', 'UserId'];
    const customerNames = [{ name: "Date", tittle: "Date" }, { name: "Buyer", tittle: "UserId" }];
    const [inputValues, setInputValues] = useState({
        Date: "",
        UserId: "",
        senderID: userInfo.userid,
    });
    const [ReciverIdRes, setReciverIdRes] = useState([{}]);

    const handleInputChangeInvoice = (fieldName, value) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
        // alert(inputValues.UserId)
        // if (fieldName === "UserId") {
        //     const getReciverData = async () => {
        //         const getReciverDataRequest = await axios.post(`${API_URL}get/ReciverDataInvoiceAddress`, { reciverid: inputValues.UserId });
        //         console.log("getReciverDataRequest : ", getReciverDataRequest.data.data);
        //         const reciveridObj = getReciverDataRequest.data.data;
        //         console.log("reciveridObj : ",reciveridObj);
        //         if (getReciverDataRequest.data.status) {
        //             setReciverIdRes(reciveridObj);
        //         }
        //     }
        //     getReciverData();
        // }
    };

    // content for table
    // , batchno: ''
    const [rows, setRows] = useState([
        {
            id: 1,
            hsncode: '',
            batchno: '',
            productName: '',
            Quantity: '',
            Discount: '',
            Total: ''
        },
    ]);
    // console.log("program : ");
    const verifyKeysHaveValues = (array) => {
        console.log(array);
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
        // console.log(rows);
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
        console.log("id, column, value :", id, column, value);
        console.log('richrow :', rows);
        console.log("event : ", value);
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, [column]: value } : row
        );
        setRows(updatedRows);
        console.log("handle change : ",rows[id-1]);
        if (column === 'hsncode' ||  column ==='batchno') {
            // if (rows[id-1].hsncode !=='' && rows[id-1].batchno !=='') {
                const value = productList
                    .filter((product) => product.productid === String(updatedRows[id-1].hsncode) && product.batchno === String(updatedRows[id-1].batchno))
                    .map((product) => product.productname)[0] || '';
    
                // console.log("value : ",value);
    
                const getproductbyfilter = updatedRows.map((row) =>
                    row.id === id ? {
                        ...row, productName: value
                    } : row
                );
                setRows(getproductbyfilter);
            // }
        }
        
        // if (column === 'hsncode') {
        //     // alert(value)
        //     sethsncodestate(value)
        // }
        // if (column === 'batchno') {
        //     setbatchnostate(value)
        // }
        // if (column === 'Quantity') {
        //     // console.log("yes : ",value)
        //     setquantitystate(value);
        //     // setTotalValue(id, hsncodestate, batchnostate,value, discountstate);
        // }
        // if (column === 'Discount') {
        //     setdiscountstate(value)
        // }
    };

    // invoice htm send to server
    // console.log(inputValues.UserId);
    const sendDataToServer = async () => {
        try {
            const htmlString = ReactDOMServer.renderToString(
                <div className="InvoiceContainer">
                    {/* <Invoice previewInvoiceprop={rows} /> */}
                    <Invoice
                        previewInvoiceprop={rows}
                        ReciverInvoiceProp={ReciverIdRes}
                        SenderInvoiceProp={senderIdRes}
                        totalSum={totalSum}
                        totalQuantity={totalQuantity}
                    />
                </div>
            );
            const response = await axios.post(`${API_URL}send-email/sendInvoice`
                , { htmlString: htmlString, email: inputValues.UserId }
                , {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                // alert("success")
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
                    const response = await axios.post(`${API_URL}add/invoice`, { invoice: inputValues, invoiceitem: rows, totalValues: totalSum });
                    if (response.data.status) {
                        await sendDataToServer();
                        alert(response.data.message);
                    } else {
                        alert(response.data.message);
                    }
                    setLoading(false);
                    if (response.data.status) {
                        navigate('/TransactionHistory');
                    }
                    // setPreviewInvoice(response.data.message)
                } catch (error) {
                    console.error('Error sending data:', error);
                }
            }
        }
    }

    const [senderIdRes, setsenderIdRes] = useState([{}]);
    useEffect(() => {
        const senderid = userInfo.userid;
        const reciverid = inputValues.UserId;
        const getSenderData = async () => {
            const getSenderDataRequest = await axios.post(`${API_URL}get/SenderDataInvoiceAddress`, { senderid: senderid });
            const senderidObj = getSenderDataRequest.data.data;
            // console.log("senderidObj : ", senderidObj);
            setsenderIdRes(senderidObj);
        }
        // const getReciverData = async () => {
        //     const getReciverDataRequest = await axios.post(`${API_URL}get/ReciverDataInvoiceAddress`, { reciverid: reciverid });
        //     console.log("getReciverDataRequest : ", getReciverDataRequest.data.data);
        //     const reciveridObj = getReciverDataRequest.data.data;
        //     console.log("reciveridObj : ", reciveridObj);
        //     setReciverIdRes(reciveridObj);
        // }
        getSenderData();
        // getReciverData();
    }, [inputValues.UserId])

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
                const productList = dropDownResponse.data.data;
                setproductList(productList)
                // console.log("productList : ", productList);
                const productName = dropDownResponse.data.data.map(item => item.productname);
                // setOptions(productIds);
                setOptionsproductName(productName);

            } catch (error) {
                console.error('Error in processing data:', error);
            }
        };
        fetchData();
    }, [inputValues]);
    const productIDs = productList.map(item => item.productid);

    const [totalSum, setTotalSum] = useState();
    const [totalQuantity, settotalQuantity] = useState();

    useEffect(() => {
        const totalSumValue = rows.map(item => parseFloat(item.Total)).reduce((sum, value) => sum + value, 0);
        setTotalSum(totalSumValue);
        const totalQuantityValue = rows.map(item => parseFloat(item.Quantity)).reduce((sum, value) => sum + value, 0);
        settotalQuantity(totalQuantityValue);
        // console.log("total value", totalSumValue);
    }, [rows]); // Include 'rows' in the dependency array
    


    const [hsncodestate, sethsncodestate] = useState('');
    const [batchnostate, setbatchnostate] = useState('');
    const [quantitystate, setquantitystate] = useState('');
    const [discountstate, setdiscountstate] = useState('');

    const setthirdInput = (id, Enteredhsncode, Enteredbatchno, columnName) => {
        sethsncodestate(Enteredhsncode);
        setbatchnostate(Enteredbatchno);
        console.log("hsn : ", Enteredhsncode);
        console.log("batch : ", Enteredbatchno);
        console.log("columnName : ", columnName);

        if (columnName === 'hsncode') {
            // console.log("Entered hsn", Enteredhsncode)
            // const updatedRow = rows.map((row) =>
            //     row.id === id ? { ...row, [columnName]: Enteredhsncode } : row
            // );

            console.log("id, column, value :", id, columnName, Enteredhsncode);
            const updatedRows = rows.map((row) =>
                row.id === id ? { ...row, [columnName]: Enteredhsncode } : row
            );
            setRows(updatedRows);

            // setRows(prevRows => {
            //     const updatedRow = prevRows.map(row =>
            //         row.id === id ? { ...row, [columnName]: Enteredhsncode } : row
            //     );
            //     return updatedRow;
            // });
            console.log("updaterow after1 : ", updatedRows);
        }
        if (columnName === 'batchno') {
            console.log("updated rows rich : ", rows);
            console.log("Enetered batch", Enteredbatchno)
            // const updaterows = rows.map((row) =>
            //     row.id === id ? { ...row, [columnName]: Enteredbatchno } : row
            // );
            setRows(prevRows => {
                const updatedRows = prevRows.map(row =>
                    row.id === id ? { ...row, [columnName]: Enteredbatchno } : row
                );
                return updatedRows;
            });
            // console.log("updaterow after2: ", updatedRows);
        }
        // console.log("rows final result : ", rows);

        const value = productList
            .filter((product) => product.productid === String(Enteredhsncode) && product.batchno === String(Enteredbatchno))
            .map((product) => product.productname)[0] || '';

        // console.log("value : ",value);

        const updatedRows = rows.map((row) =>
            row.id === id ? {
                ...row, productName: value
            } : row
        );
        setRows(updatedRows);



        // const value = productList
        //     .filter((product) => product.productid === Enteredhsncode && product.batchno === Enteredbatchno)
        //     .map((product) => product.productname)[0] || '';

        // // console.log(value);

        // const updatedRows = rows.map((row) =>
        //     row.id === id ? {
        //         ...row, productName: value
        //     } : row
        // );
        // setRows(updatedRows);
    }

    const setthirdInput1 = (id, Enteredhsncode, Enteredbatchno, columnName) => {
        // console.log("Index:", productList);
        // console.log("id and hsn", id);
        sethsncodestate(Enteredhsncode);
        setbatchnostate(Enteredbatchno);
        console.log("hsn : ", Enteredhsncode);
        console.log("batch : ", Enteredbatchno);

        const updatedRows1 = rows.map((row) =>
            row.id === id ? { ...row, [columnName]: value } : row
        );
        setRows(updatedRows1);



        const value = productList
            .filter((product) => product.productid === String(Enteredhsncode) && product.batchno === String(Enteredbatchno))
            .map((product) => product.productname)[0] || '';

        console.log("value : ", value);
        console.log("rows : ", rows);

        const updatedRows = rows.map((row) =>
            row.id === id ? {
                ...row, productName: value
            } : row
        );
        setRows(updatedRows);

        // const value = productList
        //     .filter((product) => product.productid === Enteredhsncode && product.batchno === Enteredbatchno)
        //     .map((product) => product.productname)[0] || '';

        // // console.log(value);

        // const updatedRows = rows.map((row) =>
        //     row.id === id ? {
        //         ...row, productName: value
        //     } : row
        // );
        // setRows(updatedRows);
    }

    // const setthirdInput1 = (id, Enteredhsncode, Enteredbatchno) => {
    //     console.log("hsncodestate : ", hsncodestate);
    //     console.log("batchnostate : ", batchnostate);
    //     const value = productList
    //         .filter((product) => product.productid === Enteredhsncode && product.batchno === Enteredbatchno)
    //         .map((product) => product.productname)[0] || '';
    //     const updatedRows = rows.map((row) =>
    //         row.id === id ? {
    //             ...row, productName: value
    //         } : row
    //     );
    //     setRows(updatedRows);
    // }

    const setTotalValue = (id, Enteredhsncode, Enteredbatchno, enteredQuantity = 0, enteredDiscount = 0) => {
        console.log("productList", id);
        // console.log("Enteredhsncode : ", Enteredhsncode);
        // console.log("Enteredbatchno : ", Enteredbatchno);
        // console.log("enteredQuantity : ", enteredQuantity);
        // console.log("enteredDiscount : ", enteredDiscount);
        console.log("hsncode : ",rows[id-1].hsncode,typeof rows[id-1].hsncode);
        console.log("batchno : ",rows[id-1].batchno,typeof String(rows[id-1].batchno));

        // console.log("Quantity : ",rows[id-1].Quantity);
        // console.log("discount : ",rows[id-1].Discount);

        // const productPrice = productList
        //     .filter((product) => product.productid === rows[id-1].hsncode && product.batchno === String(rows[id-1].batchno))
        //     .map((product) => product.priceperitem)[0] || '';

        const productPrice = productList
            .filter((product) => product.productid === String(rows[id-1].hsncode) && product.batchno === String(rows[id-1].batchno))
            .map((product) => product.priceperitem)[0] || '';

        console.log("productPrice : ", productPrice);

        const getcgst = productList
            .filter((product) => product.productid === String(rows[id-1].hsncode) && product.batchno === String(rows[id-1].batchno))
            .map((product) => product.cgst)[0] || '';

        console.log("getcgst : ", getcgst);

        const getsgst = productList
            .filter((product) => product.productid === String(rows[id-1].hsncode) && product.batchno === String(rows[id-1].batchno))
            .map((product) => product.sgst)[0] || '';

        console.log("getsgst : ", getsgst);


        const updatedRows = rows.map((row) =>
            row.id === id ? {
                ...row, Total: ((rows[id-1].Quantity * productPrice) - ((rows[id-1].Quantity * productPrice) * rows[id-1].Discount / 100))+(productPrice*(getcgst/100))+(productPrice*(getsgst/100))
            } : row
        );
        
        console.log("updatedRows : ", rows);
        setRows(updatedRows);
    }


    // perform a invoice
    const generatePDF = () => {
        const invoicecontent = document.getElementById('invoiceContent');
        html2pdf().from(invoicecontent).save();
    }

    const getuserDetial = (customerName, value) => {
        // console.log(inputValues.UserId);
        console.log("get : ", customerName, value);
        const getReciverData = async () => {
            const getReciverDataRequest = await axios.post(`${API_URL}get/ReciverDataInvoiceAddress`, { reciverid: value });
            console.log("getReciverDataRequest : ", getReciverDataRequest.data.data);
            const reciveridObj = getReciverDataRequest.data.data;
            console.log("reciveridObj  rich : ", reciveridObj);
            if (getReciverDataRequest.data.status) {
                setReciverIdRes(reciveridObj);
            }
        }

        if (value !== '') {
            getReciverData();
        }
        else {
            console.log("Enter data");
        }
    }
    // useEffect(()=>{
    //     getuserDetial()
    // },[inputValues.UserId])
    function formatTotal(total) {
        const formattedTotal = parseFloat(total).toFixed(2); // Ensure there are always two digits after the decimal point
        return formattedTotal;
    }
    // console.log(inputValues);
    return (
        <>
            {loading && <Loader />}
            {/* Preview Modal Start */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{ paddingLeft: '1.5rem', paddingTop: '1.5rem', paddingRight: '1.5rem', marginLeft: '-110px', }}>
                        <div class="modal-header" style={{ padding: 0 }}>
                            <h5 class="modal-title" id="staticBackdropLabel">Preview Invoice</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="invoiceContent" class="modal-body">
                            <Invoice
                                previewInvoiceprop={rows}
                                ReciverInvoiceProp={ReciverIdRes}
                                SenderInvoiceProp={senderIdRes}
                                totalSum={totalSum}
                                totalQuantity={totalQuantity}
                                inputValuesAboveRows={inputValues}
                            />
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
                                            {customerName.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {customerName.tittle === 'UserId' ? (
                                            <Autocomplete
                                                options={userNameoptions}
                                                onChange={(e, value) => handleInputChangeInvoice(customerName.name, value)}
                                                renderInput={(params) => (
                                                    <TextField {...params} label={`${customerName.name}`} variant="outlined"
                                                        InputLabelProps={{
                                                            className: 'required-label',
                                                            required: true
                                                        }}
                                                    />
                                                )}
                                                // onBlur={(e) => const value = e.target.value;getuserDetial(customerName, value)}
                                                onBlur={(e) => {
                                                    const value = e.target.value; // Accessing the value
                                                    getuserDetial(customerName.name, value);
                                                }}
                                            />
                                        ) : (
                                            <TextField fullWidth
                                                // label={customerName}
                                                type='date'
                                                onChange={(e) => handleInputChangeInvoice(customerName.name, e.target.value)}
                                                value={inputValues[customerName.name] || ''}
                                            />
                                            // <GoogleCalendarPicker
                                            //     onDateSelect={handleDateSelect}
                                            //     // Pass authentication details as props
                                            //     clientId="YOUR_CLIENT_ID"
                                            //     apiKey="YOUR_API_KEY"
                                            //     scope={['https://www.googleapis.com/auth/calendar.events.readonly']}
                                            // />
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
                                            {/* <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                list={`suggestions-${row.id}`}
                                                value={row.hsncode}
                                                onChange={(e) => handleInputChange(row.id, 'hsncode', e.target.value)}
                                                onBlur={() => setthirdInput(row.id, hsncodestate, batchnostate)}
                                            /> */}
                                            <Autocomplete
                                                options={productIDs}
                                                // onChange={(event, value) => {
                                                //     setthirdInput(row.id, value, batchnostate, 'hsncode');
                                                // }}
                                                value={row.hsncode}
                                                onChange={(e, value) => handleInputChange(row.id, 'hsncode', value)}
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined"
                                                        // onBlur={() => alert(JSON.stringify(row.hsncode))}
                                                        // setthirdInput(row.id, hsncodestate, batchnostate)
                                                        disabled={currentRowId !== null && row.id !== currentRowId}
                                                    />
                                                )}

                                            />
                                        </TableCell>
                                        <TableCell>
                                            {/* <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                list={`suggestions-${row.id}`}
                                                value={row.batchno}
                                                onChange={(e) => handleInputChange(row.id, 'batchno', e.target.value)}
                                                onBlur={() => setthirdInput(row.id, hsncodestate, batchnostate)}
                                            /> */}
                                            <Autocomplete
                                                options={[1, 2, 3]}
                                                value={row.batchno}
                                                onChange={(e, value) => handleInputChange(row.id, 'batchno', value)}
                                                // onChange={(event, value) => {
                                                //     setthirdInput(row.id, hsncodestate, value, 'batchno');
                                                // }}
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined"
                                                        // onBlur={() => alert(JSON.stringify(row.hsncode))}
                                                        // setthirdInput(row.id, hsncodestate, batchnostate)
                                                        disabled={currentRowId !== null && row.id !== currentRowId}
                                                    />
                                                )}

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
                                                // onChange={(e) => handleInputChange(row.id, 'Quantity', e.target.value);setTotalValue(row.id, hsncodestate, batchnostate, quantitystate, discountstate)}
                                                onChange={(e) => {
                                                    handleInputChange(row.id, 'Quantity', e.target.value);
                                                    // setTotalValue(row.id, hsncodestate, batchnostate, e.target.value, discountstate);
                                                }}
                                                // onChange={(event, value) => {
                                                //     // setthirdInput(row.id, hsncodestate, value);
                                                //     handleInputChange(row.id, 'Quantity', value);
                                                //     // setTotalValue(row.id, hsncodestate, batchnostate, value, discountstate);
                                                // }}
                                                onBlur={() => setTotalValue(row.id, hsncodestate, batchnostate, quantitystate, discountstate)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type='number'
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                value={row.Discount}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
                                                        handleInputChange(row.id, 'Discount', value);
                                                    }
                                                }}
                                                // onChange={(e) => handleInputChange(row.id, 'Discount', e.target.value)}
                                                onBlur={() => setTotalValue(row.id, hsncodestate, batchnostate, quantitystate, discountstate)}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                value={row.Total !== '' ? formatTotal(row.Total) : ''}
                                                // value={200}
                                                // value={row.Total}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">₹</InputAdornment>,
                                                }}
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
                            <SplitButton />
                            <Button variant="outlined" color="primary" onClick={handleSubmit}>
                                Generate Invoice
                            </Button>
                        </Grid>
                        <Grid item>
                            <div>
                                <Typography variant="body1" display="inline" style={{ marginRight: theme.spacing(2) }}>
                                    Total Amount: {totalSum ? formatTotal(totalSum) : 0}
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
