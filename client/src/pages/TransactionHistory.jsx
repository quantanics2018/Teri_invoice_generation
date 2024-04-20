import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Button, Pagination, Skeleton, TableCell, TextField ,FormControl,InputLabel,MenuItem,Select} from '@mui/material';
import Loader from '../components/Loader';
import { API_URL } from '../config';

import PDFInvoice from '../pages/common/PDFInvoice';

const TransactionHistory = () => {
    const [data, setData] = useState([])
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const [loading, setLoading] = useState(false);
    const [rawdata,setrawdata] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}get/transactionHistory`, {
                userid: userInfo.userid,
            });
            if (response.data.status) {
                setLoading(false);
                setData(response.data.data);
                
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Failed to Fetch Transaction History:', error.message);
        }
    };
    useEffect(() => {

        fetchData();
        fetch_drp_data();


    }, [userInfo.userid]);

    const isTransactionId = (textVal) => {
        const isValidInput = typeof textVal === 'string' && textVal.trim() !== '';
        return isValidInput;
    }
    const UpdateStatusFromReciver = async (invoiceId, textVal) => {
        // const isValidInput = textVal.trim() !== '';
        if (isTransactionId(textVal)) {
            try {
                console.log(invoiceId, textVal);
                const response = await axios.put(`${API_URL}update/reciverStatus`, {
                    invoiceId: invoiceId,
                    textVal: textVal
                });
                console.log('Response from server:', response.data.qos);
                if (response.data.qos === 'success') {
                    fetchData();
                    alert(response.data.message);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error while sending data to server:', error);
                // Handle error, show appropriate message to the user
            }
        }
        else {
            alert("Enter The Input  Field")
        }
    }
    const SenderConformation = async (invoiceId, textVal, belongsto, transactionID) => {
        let checkState = false;
        if (transactionID && (userInfo.positionid === '2' || userInfo.positionid === '5')) {
            try {
                const response = await axios.put(`${API_URL}update/reciverStatus`, {
                    invoiceId: invoiceId,
                    textVal: transactionID
                })
                if (response.data.qos === 'success') {
                    checkState = false;
                } else {
                    checkState = true;
                }
            } catch (error) {
                checkState = true;
            }
        }
        if ((textVal || userInfo.positionid === '2' || userInfo.positionid === '5') && checkState === false) {
            try {
                const response = await axios.put(`${API_URL}update/senderStatus`, {
                    invoiceId: invoiceId, belongsto
                });
                console.log('Response from server:', response.data.qos);
                if (response.data.qos === 'success') {
                    fetchData();
                    alert(response.data.message);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error while sending data to server:', error);
                // Handle error, show appropriate message to the user
            }
        }
        else {
            alert("Confirm that the receiver has completed the transaction")
        }
    }

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(4);

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
    const currentPageIndex = currentPage - 1;

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // Text field
    // const [textFieldValues, setTextFieldValues] = useState(Array(Math.ceil(data.length / rowsPerPage)).fill(Array(rowsPerPage).fill('')));
    const [textFieldValues, setTextFieldValues] = useState({});
    const handleTextFieldChange = (pageIndex, index, value) => {
        setTextFieldValues(prevState => ({
            ...prevState,
            [index]: value
        }));
    };


    // console.log(data);

    const formatDate = (timestamp) => {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var formattedDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
        return formattedDate;
    }
    // console.log("userInfo",userInfo);
    let belongsto;
    // console.log(userInfo.positionid);
    if (userInfo.positionid == 4 || userInfo.positionid == 5) {
        belongsto = userInfo.adminid;
    } else {
        belongsto = userInfo.userid;
    }
    // console.log(belongsto);

    // invoice generation function
   
    const downloadinvoice = async(invoiceid) =>{
        console.log("clicked invoice id");
        console.log(invoiceid);
        const invoice_data = await axios.post(`${API_URL}getinvoice_data`,{invoiceId:invoiceid});
        console.log("after click voice data");
        console.log(invoice_data.data.data);
        setrawdata(invoice_data.data.data);
    }

    const [drp_pname,set_drp_pname] = useState([]);
    const [drp_val,setdrp_val] = useState({
        product_id:'',
        product_price:'',
        cgst:'',
        sgst:'',
        no_of_product:'',
        total_price_amount:'',

    });
    const fetch_drp_data = async() =>{
        const product_Data = await axios.get(`${API_URL}getproduct_data`);
        console.log("product data is ");
        console.log(product_Data.data.data);
        set_drp_pname(product_Data.data.data);
       
        
    }

   

    const handlechange_value = async(productval)=>{
        console.log("selected product id");
        console.log(productval);
        drp_pname.map((item,index)=>{
            if(productval===item.productid){
               setdrp_val((prevValues)=>({
                ...prevValues,
                cgst:item.cgst,
                product_id:productval,
                sgst:item.sgst,
                product_price:item.priceperitem,
               }));
            }
        });
    }

    const calculate_gst = (total_amount,gst)=>{
        let gst_amount = (parseInt(total_amount)*parseInt(gst))/100;
        return gst_amount;
    }
    // onchange in quantity input
    const calculate_total = async (quantity)=>{
        console.log("total quantity:\t"+quantity);
        let total_amount = drp_val.product_price*quantity;
        let cgst = calculate_gst(total_amount,drp_val.cgst);
        let sgst = calculate_gst(total_amount,drp_val.sgst);
        let total_price_amount = parseInt(total_amount)+parseInt(cgst)+parseInt(sgst);
        console.log("total quantity:\t"+cgst);
        setdrp_val((prevValues)=>({
            ...prevValues,
            no_of_product:quantity,
            total_price_amount:total_price_amount,
        }));

    }
     console.log("final use state result");
    console.log(drp_pname);
    console.log("product drp val");
    console.log(drp_val);
    return (
        <>
            {/* {loading && <Loader />} */}
            <div className="row_with_count_status">
                <span className='module_tittle'>Transactions Details</span>
            </div>
            <div className="container ">
                    <button className='btn btn-md border border-2 border-success rounded text-success mt-4' data-bs-target='#order_selection_modal'  data-bs-toggle='modal'>Order Now</button>
                    <br /><br />
                    <div className="row">
                        <div className="col-12 mb-3 mb-lg-5">
                            <div className="position-relative card table-nowrap table-card">
                                <div className="card-header align-items-center">
                                    <h5 className="mb-0">Latest Transactions</h5>
                                    <p className="mb-0 small bg-tint-warning text-warning">{data.filter(item => item.senderstatus === 0).length} Pending</p>
                                </div>
                                <div className="table-responsive scroll_div" style={{ height: 'calc(78vh - 200px)' }}>
                                    <table className="table mb-0">
                                        <thead className="small text-uppercase bg-body text-muted text-center"style={{ position: 'sticky', top: '-1px',zIndex:'1' }}>
                                            <tr>
                                                <th>Invoice ID</th>
                                                {
                                                    (userInfo.positionid != '3')? <th>Transaction ID</th> : null
                                                }
                                                
                                                <th>Date</th>
                                                <th>Name</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {loading && <div>
                                            <Box sx={{ width: 1100 }}>
                                                <Skeleton />
                                                <Skeleton animation="wave" />
                                                <Skeleton animation="wave" />
                                                <Skeleton animation="wave" />
                                                <Skeleton animation="wave" />
                                            </Box>
                                        </div>}
                                        <tbody className='text-center'>
                                            {data.map((item, index) => (
                                                <tr key={index} className="align-middle text-center">
                                                    {/* {console.log(item)} */}
                                                    <td className='text-center'  data-bs-target='#invoice_pdf_generator'  data-bs-toggle='modal' onClick={(e)=>downloadinvoice(e.target.textContent)} data_id=
                                                        {item.invoiceid}>{item.invoiceid}</td>
                                                    {
                                                        (userInfo.positionid == '3') ?
                                                        null :
                                                        (
                                                            item.transactionid ? (<td className='text-center'>{item.transactionid}</td>) : (
                                                                <td className='text-center'>
                                                                    <TextField variant="standard"
                                                                        // disabled={belongsto === item.senderid}
                                                                        disabled = {userInfo.positionid != '2' && userInfo.positionid != '5'}
                                                                        style={{ marginTop: '10px' }}
                                                                        id="outlined-size-small"
                                                                        size="small"
                                                                        value={textFieldValues[index]}
                                                                        onChange={(e) => handleTextFieldChange(currentPageIndex, index, e.target.value)}
                                                                    />
                                                                </td>
                                                            )
                                                        )
                                                    }
                                                    <td className='text-center'>{formatDate(item.invoicedate)}</td>
                                                    <td className='text-center'>{item.email}</td>
                                                    <td className='text-center'>
                                                        {item.total}
                                                    </td>
                                                    <td className='text-center'>
                                                        <span className={`badge fs-6 fw-normal ${item.status === 1 ? 'bg-tint-success text-success' : 'bg-tint-warning text-warning'}`}>
                                                            {(item.senderstatus === 0) && <td className='text-center'>Pending</td>}
                                                            {(item.senderstatus === 1) && <td className='text-center' style={{ color: 'green' }}>Completed</td>}
                                                        </span>
                                                    </td>
                                                    <td className='text-center actionTrans'>
                                                        {/* onClick={() => deleteRow(row.id)}  */}
                                                        {/* {console.log("values :", textFieldValues[index], index)} */}
                                                        <Button color="secondary">
                                                            {(item.transactionid && belongsto === item.senderid) ? '🟢' : (belongsto === item.senderid && '🔴')}
                                                        </Button>
                                                        {/* {console.log("hello", item)} */}
                                                        <Button color="secondary"
                                                            disabled={item.senderstatus === 1 || (userInfo.userid === item.receiverid && item.transactionid)}
                                                            onClick={() => belongsto === item.senderid ? SenderConformation(item.invoiceid, item.transactionid, item.email, textFieldValues[index]) : UpdateStatusFromReciver(item.invoiceid, textFieldValues[index])}>
                                                            ✔
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer text-end">
                                    <div className="btn btn-gray">
                                        Recent Transactions
                                    </div>
                                </div>
                            </div>
                            {/* <Pagination
                            count={Math.ceil(data.length / rowsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                        /> */}
                        </div>
                    </div>
                
            </div>


             {/* Preview Modal Start */}
            <div class="modal fade" id="invoice_pdf_generator" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{ paddingLeft: '1.5rem', paddingTop: '1.5rem', paddingRight: '1.5rem', marginLeft: '-110px' }}>
                        <div class="modal-header" style={{ padding: 0 }}>
                            <h5 class="modal-title" id="staticBackdropLabel">Preview Invoice</h5>
                            <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="invoiceContent" class="modal-body pdf-height">
                            {console.log(Object.keys(rawdata).length)}
                            {
                              Object.keys(rawdata).length>0 && 
                              <PDFInvoice invoice_data={rawdata} />
                              
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* Preview Modal End */}

            {/* order now button click open the modal select the refill product */}
            <div class="modal fade" id="order_selection_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                <div class="modal-dialog modal-md">
                    <div class="modal-content" style={{ paddingLeft: '1.5rem', paddingTop: '1.5rem', paddingRight: '1.5rem', marginLeft: '-110px' }}>
                        <div class="modal-header" style={{ padding: 0 }}>
                            <h5 class="modal-title" id="staticBackdropLabel">Ordering Products</h5>
                            <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="invoiceContent" class="modal-body pdf-height">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <Box sx={{direction:'row',alignItems:'center',justifyContent:'start'}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Product" name='product_name' onChange={(e)=>handlechange_value(e.target.value)}>
                                                  
                                                {drp_pname.map((item,index)=>
                                                    <MenuItem value={item.productid}>{item.productname}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-6">
                                    <TextField id="outlined-basic" label="No of Product" name='no_of_product' variant="outlined" onChange={(e)=>calculate_total(e.target.value)} fullWidth/>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-lg-6 d-flex flex-row">
                                    <span>Product Price : <span>{drp_val.product_price}</span></span>
                                </div>
                                <div className="col-lg-6 d-flex flex-row">
                                    <span>Product CGST : <span>{drp_val.cgst}</span></span>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-lg-6 d-flex flex-row">
                                    <span>Product SGST : <span>{drp_val.sgst}</span></span>
                                </div>
                                <div className="col-lg-6 d-flex flex-row">
                                    <span>Total Amount : <span>{drp_val.total_price_amount}</span></span>
                                </div>
                            </div>
                          
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* refil product modal end */}
        </>
    );
};

export default TransactionHistory;
