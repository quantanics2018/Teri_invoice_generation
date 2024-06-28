import React, { useEffect, useRef } from 'react';
import { styled, useTheme } from '@mui/system';
import { Container, TextField, Button, Grid, Paper, Typography, Select, MenuItem, Autocomplete, InputAdornment } from '@mui/material';
import { useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import ReactDOMServer from 'react-dom/server';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { df } from '../../assets/style/mailInlineCss';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { CancelBtnComp } from '../common/AddUserBtn';
import axios from 'axios';
import { API_URL } from '../../config/config';
import SplitButton from '../invoice_component/SplitButton';
import Invoice from '../invoice_component/Invoice';
import { CancelBtn, SaveBtn } from '../../assets/style/cssInlineConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import QrCode from '../invoice_component/QrCode';
import { invoicecontent } from '../../assets/style/mailInlineCss';
import SpringModal, { modalStyle, style } from '../invoice_component/BasicModal';
import BasicModal from '../invoice_component/BasicModal';

import '../../assets/style/Order_modal.css';

// import Autocomplete from '@material-ui/lab/Autocomplete';
let gag = 55;

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
        // Date: "",
        Date: new Date().toISOString().split('T')[0],
        Buyer: "",
        senderID: userInfo.userid,
    });
    const [ReciverIdRes, setReciverIdRes] = useState([{}]);

    const handleInputChangeInvoice = (fieldName, value) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
       
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
        // console.log(array);
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
        // console.log(result);
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



    // invoice htm send to server
    // console.log(inputValues.UserId);
    const sendDataToServer = async (invoiceid) => {
        alert("yes");
        console.log("yess");
        try {
            const htmlString = ReactDOMServer.renderToString(
                <div className="InvoiceContainer">
                    {/* <Invoice previewInvoiceprop={rows} /> */}
                    <Invoice
                        previewInvoiceprop={rows}
                        ReciverInvoiceProp={ReciverIdRes}
                        SenderInvoiceProp={senderIdRes}
                        // totalSum={totalSum}
                        totalQuantity={totalQuantity}
                        inputValuesAboveRows={inputValues}
                        productList={productList}
                        invoiceid={invoiceid}
                        generateInvoice={true}
                    />
                </div>
            );
            // console.log("hai invoiceid log :",invoiceid)
            console.log("inputValues.UserId : ", inputValues.Buyer);
            const response = await axios.post(`${API_URL}send-email/sendInvoice`
                , { htmlString: htmlString, Buyer: inputValues.Buyer }
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

    const [performInvoiceToggele, setperformInvoiceToggele] = useState(false)
    const checkforPerfomInvoice = () => {
        const hasEmptyReciverId = Object.values(inputValues).some(value => value === '')
        if (hasEmptyReciverId) {
            return setperformInvoiceToggele(true)
        } else {
            return setperformInvoiceToggele(false)
        }
    }
    useEffect(() => {
        checkforPerfomInvoice()
    }, [performInvoiceToggele])



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
                const users = dropDownUserResponse.data.data.map(item => item.organizationname);
                setuserNameoptions(users);
                // console.log(users);
               

                const checkForUndefined = users.includes(undefined);
                if (checkForUndefined) {
                    console.log(checkForUndefined);
                    console.log('State is not properly Set!');
                    setReciverIdRes([{}]);
                    // alert('Internet connection is not Stable!')
                }

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

    let productHsn = productList.map(item => item.productid);
    productHsn = [...new Set(productHsn)];
    let productBatchno = productList.map(item => item.batchno);
    productBatchno = [...new Set(productBatchno)];
    const [batchnoOption, setbatchnoOption] = useState(productBatchno);
  
    const handleInputChange = (id, column, value) => {
        // console.log("id, column, value :", id, column, value);
        const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, [column]: value } : row
        );
        setRows(updatedRows);
        // console.log("updatedRows : ",updatedRows);
        if (column === 'hsncode' || column === 'batchno') {
            // if (rows[id-1].hsncode !=='' && rows[id-1].batchno !=='') {
            const value = productList
                .filter((product) => product.productid === String(updatedRows[id - 1].hsncode) && product.batchno === String(updatedRows[id - 1].batchno))
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
        // console.log("handle change : ", updatedRows[id - 1].hsncode);
        productBatchno = productList.filter(item => item.productid === updatedRows[id - 1].hsncode).map(item => item.batchno);
        setbatchnoOption(productBatchno);
        // console.log(productBatchno);

       
    };
 
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
          

            console.log("id, column, value :", id, columnName, Enteredhsncode);
            const updatedRows = rows.map((row) =>
                row.id === id ? { ...row, [columnName]: Enteredhsncode } : row
            );
            setRows(updatedRows);

          
            console.log("updaterow after1 : ", updatedRows);
        }
        if (columnName === 'batchno') {
            console.log("updated rows rich : ", rows);
            console.log("Enetered batch", Enteredbatchno)
           
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

       
    }

  

    const setTotalValue = (id, Enteredhsncode, Enteredbatchno, enteredQuantity = 0, enteredDiscount = 0) => {
       
        const productPrice = productList
            .filter((product) => product.productid === String(rows[id - 1].hsncode) && product.batchno === String(rows[id - 1].batchno))
            .map((product) => product.priceperitem)[0] || '';

        // console.log("productPrice : ", productPrice);

        const availableQuantity = productList
            .filter((product) => product.productid === String(rows[id - 1].hsncode) && product.batchno === String(rows[id - 1].batchno))
            .map((product) => product.quantity)[0] || '';
        // console.log("availableQuantity :", availableQuantity);
        if (availableQuantity < rows[id - 1].Quantity) {
            const updatedRows = [...rows];
            // Update the Quantity of the specific row
            updatedRows[id - 1] = { ...updatedRows[id - 1], Quantity: '' };
            // Update the state with the new array
            setRows(updatedRows);
            alert("Insufficient Quantity");
        } else {
            // console.log("fine");
            const getcgst = productList
                .filter((product) => product.productid === String(rows[id - 1].hsncode) && product.batchno === String(rows[id - 1].batchno))
                .map((product) => product.cgst)[0] || '';

            // console.log("getcgst : ", getcgst);

            const getsgst = productList
                .filter((product) => product.productid === String(rows[id - 1].hsncode) && product.batchno === String(rows[id - 1].batchno))
                .map((product) => product.sgst)[0] || '';

            // console.log("getsgst : ", getsgst);

          
            const updatedRows = rows.map((row) =>
                row.id === id ? {
                    ...row, Total: ((rows[id - 1].Quantity * productPrice) - ((rows[id - 1].Quantity * productPrice) * rows[id - 1].Discount / 100))
                } : row
            );

            // console.log("updatedRows : ", rows);
            setRows(updatedRows);
        }

    }


    // perform a invoice
   

    const getuserDetial = (customerName, value) => {
        // console.log(inputValues.UserId);
        // console.log("get : ", customerName, value);
        const getReciverData = async () => {
            const getReciverDataRequest = await axios.post(`${API_URL}get/ReciverDataInvoiceAddress`, { reciverid: value });
            // console.log(getReciverDataRequest.data.status);
            if (getReciverDataRequest.data.status) {
                const reciveridObj = getReciverDataRequest.data.data;
                setReciverIdRes(reciveridObj);
                // console.log(reciveridObj);
            } else {
                // alert("ahi")
                console.log("err");
                setReciverIdRes([{}]);
            }
        }
        // console.log("hiii 2 ---- ",inputValues.Buyer);
        if (inputValues.Buyer !== '') {
            getReciverData();
            checkforPerfomInvoice();

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

    const hasEmptyValue = rows.some(row =>
        Object.values(row).some(value => value === '' || value === null),
    );
    const hasEmptyReciverId = Object.values(inputValues).some(value => value === '' || value === null)
    const [diability, setdiability] = useState(true);


    useEffect(() => {
        if (hasEmptyValue || hasEmptyReciverId) {
            setdiability(true);
        } else {
            setdiability(false)
        }
        // console.log("diability : ", diability);

    }, [diability, hasEmptyValue, hasEmptyReciverId])

    // const isSignaturePresent = (userInfo.signature == null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [SignExistanceDB, setSignExistanceDB] = useState(false);
    useEffect(() => {
        const getSign = async () => {
            const currentUserVar = userInfo.userid;
            // console.log(currentUser);
            try {
                // Assuming `axios` is properly imported
                const SignRes = await axios.post(`${API_URL}get/getSignExistance`, { currentUser: currentUserVar });
                // console.log(SignRes.data.status);

                if (SignRes.data.status) {
                    setSignExistanceDB(true);
                    setOpen(false);
                } else {
                    setSignExistanceDB(false)
                    setOpen(true);
                }
                // Handle response data here
            } catch (error) {
                console.error('Error fetching sign:', error);
                // Handle error here
            }
        };
        getSign();
    }, [])

    const navigateProfilePage = () => {
        setOpen(false);
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('style', 'display: none');
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.remove();
                document.body.style.overflow = 'auto';
            }
        }
        navigate('/ProfilePage');
    }
    const [dataFromChild, setDataFromChild] = useState(false);
    const handleDataFromChild = (data) => {
        setDataFromChild(data);
    };
    return (
        <>
            {loading && <Loader />}
            {/* <BasicModal /> */}
            {/* Signature Alert Modal start */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={style}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Signature Update
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Efficiently update signatures to Performa and seamlessly generate invoices
                        </Typography>
                        <br />
                        <div className="updatebtn" style={{ ...df, justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={navigateProfilePage}>Update Sign</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
            {/* Signature Alert Modal End */}
            {/* Preview Modal Start */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content order_modal_responsive" >
                        <div class="modal-header" style={{ padding: 0 }}>
                            <h5 class="modal-title" id="staticBackdropLabel">Preview Invoice</h5>
                            <button type="button" class="btn-close" disabled={dataFromChild} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="invoiceContent" class="modal-body pdf-height">
                            <Invoice
                                previewInvoiceprop={rows}
                                ReciverInvoiceProp={ReciverIdRes}
                                SenderInvoiceProp={senderIdRes}
                                totalSum={totalSum}
                                totalQuantity={totalQuantity}
                                inputValuesAboveRows={inputValues}
                                productList={productList}
                                generateInvoice={false}
                                buyercompany={inputValues.Buyer}
                                setOpen={setOpen}
                                SignExistanceDB={SignExistanceDB}
                                sendDataToParent={handleDataFromChild}
                            />

                        </div>

                        
                    </div>
                </div>
            </div>
            {/* Preview Modal End */}
            {/* Generate Modal Start */}
            <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content order_modal_responsive">
                        <div class="modal-header" style={{ padding: 0 }}>
                            <h5 class="modal-title" id="staticBackdropLabel">Preview Invoice</h5>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            <button type="button" class="btn-close" disabled={dataFromChild} data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <div id="invoiceContent" class="modal-body pdf-height">
                            <Invoice
                                previewInvoiceprop={rows}
                                ReciverInvoiceProp={ReciverIdRes}
                                SenderInvoiceProp={senderIdRes}
                                totalSum={totalSum}
                                totalQuantity={totalQuantity}
                                inputValuesAboveRows={inputValues}
                                productList={productList}
                                generateInvoice={true}
                                buyercompany={inputValues.Buyer}
                                setOpen={setOpen}
                                SignExistanceDB={SignExistanceDB}
                                sendDataToParent={handleDataFromChild}
                            />
                        </div>
                       
                    </div>
                </div>
            </div>
            {/* Generate Modal End */}
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
                                    {/* {console.log("test : ", inputValues.Buyer)} */}
                                    {/* {console.log("customerName : ", userNameoptions)} */}
                                    <Grid item xs={6}>
                                        {customerName.tittle === 'UserId' ? (
                                            <Autocomplete
                                                options={userNameoptions}
                                                // value={inputValues.Buyer}
                                                onChange={(e, value) => handleInputChangeInvoice(customerName.name, value)}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                        value={inputValues.Buyer}
                                                        label={customerName.name}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            className: 'required-label',
                                                            required: true
                                                        }}
                                                    />
                                                )}
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
                                                value={inputValues[customerName.name] || new Date().toISOString().split('T')[0]}
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
                    <TableContainer component={Paper} style={{ userSelect: 'none' }}>
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
                                           
                                            <Autocomplete
                                                options={productHsn}
                                              
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
                                           
                                            <Autocomplete
                                                // options={productBatchno}
                                                options={batchnoOption}
                                                value={row.batchno}
                                                onChange={(e, value) => handleInputChange(row.id, 'batchno', value)}
                                               
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined"
                                                       
                                                        disabled={currentRowId !== null && row.id !== currentRowId}
                                                    />
                                                )}

                                            />
                                        </TableCell>
                                        <TableCell>
                                           
                                            <TextField
                                                disabled={currentRowId !== null && row.id !== currentRowId}
                                                value={row.productName}
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
                                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                                    endAdornment: <InputAdornment position="end"></InputAdornment>,
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
                            {/* <input type='text' disabled={performInvoiceToggele} /> */}
                            <SplitButton performInvoiceToggele={performInvoiceToggele} diability={diability} />
                            
                        </Grid>
                        <Grid item>
                            <div>
                                
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
export { gag }
