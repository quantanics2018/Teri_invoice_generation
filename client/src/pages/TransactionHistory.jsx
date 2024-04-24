import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Snackbar,Pagination, Skeleton, TableCell, TextField ,FormControl,InputLabel,MenuItem,Select} from '@mui/material';
import Loader from '../components/Loader';
import { API_URL } from '../config';
import PDFInvoice from '../pages/common/PDFInvoice';
import QrCode from '../components/QrCode';
import MuiAlert from '@mui/material/Alert';

import '../assets/style/Order_modal.css';


const TransactionHistory = () => {
    const [data, setData] = useState([])
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const [loading, setLoading] = useState(false);
    const [rawdata,setrawdata] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    const [warning,setwarning] = useState(false);
    const [resAlert, setresAlert] = useState(null);


    const after_complete_close = useRef(null);
    const order_now_btn = useRef(null);
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
                // console.log(invoiceId, textVal);
                const response = await axios.put(`${API_URL}update/reciverStatus`, {
                    invoiceId: invoiceId,
                    textVal: textVal
                });
                // console.log('Response from server:', response.data.qos);
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
                // console.log('Response from server:', response.data.qos);
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
        // console.log("clicked invoice id");
        // console.log(invoiceid);
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
        batch_no:'',
        invoice_date:'',
        receiverid:'',
        positionid:'',
        sender_id:'',
        payment_method:'',
    });

    const field_names = [
        {label:"Product Price",fieldname:"product_price"},
        {label:"CGST",fieldname:"cgst"},
        {label:"SGST",fieldname:"sgst"},
        {label:"Quantity",fieldname:"no_of_product"},
        {label:"Grant Total",fieldname:"total_price_amount"},
        {label:"Batch Number",fieldname:"batch_no"}
    ];

    const payment_drp = [
        {label:"Google Pay",fieldname:"gpay"},
        {label:"Phone Pay",fieldname:"phonepe"}
    ]
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const fetch_drp_data = async() =>{
        // console.log("product data");
        // console.log(userInfo.adminid);
        const product_Data = await axios.post(`${API_URL}getproduct_data`,{admin_id:userInfo.adminid});
        // console.log("product data is ");
        // console.log(product_Data.data.data);
        set_drp_pname(product_Data.data.data);
       
        
    }

   

    const handlechange_value = async(productval)=>{
        // console.log("selected product id");
        // console.log(productval);
        drp_pname.map((item,index)=>{
            if(productval===item.productid){
               setdrp_val((prevValues)=>({
                ...prevValues,
                cgst:item.cgst,
                product_id:productval,
                sgst:item.sgst,
                product_price:item.priceperitem,
                batch_no:item.batchno,
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
        // console.log("total quantity:\t"+quantity);
        let total_amount = drp_val.product_price*quantity;
        let cgst = calculate_gst(total_amount,drp_val.cgst);
        let sgst = calculate_gst(total_amount,drp_val.sgst);
        let total_price_amount = parseInt(total_amount)+parseInt(cgst)+parseInt(sgst);
        let date = new Date().toISOString().split('T')[0];
        // console.log("total quantity:\t"+cgst);
        setdrp_val((prevValues)=>({
            ...prevValues,
            no_of_product:quantity,
            total_price_amount:total_price_amount,
            invoice_date:date,
            receiverid:userInfo.adminid,
            positionid:userInfo.positionid,
            sender_id:userInfo.userid,
        }));

    }

    // console.log("screen width is:\t"+screenWidth);
    const [qr_data,setqr_data] = useState({
        upiid:'',
        total_amount:'',
        display_qr:'none',
    });
    // submit order now button
    const SubmitOrder = async()=>{
        if (drp_val.payment_method==='' && drp_val.no_of_product==='' && drp_val.product_id==='') {
            setresAlert("All Input Fields are Empty");
            setSubmitted(true);
            setwarning(true);
        }
        else if(drp_val.payment_method.trim()===''){
            setresAlert("Please select Payment method Field");
            setSubmitted(true);
            setwarning(true);
        }
        else if(drp_val.no_of_product.trim()==='' || !(/^[0-9]+$/.test(drp_val.no_of_product.trim()))){
            setresAlert("Please Enter Valid No of Product Field");
            setSubmitted(true);
            setwarning(true);
        }
        else if(drp_val.product_id.trim()===''){
            setresAlert("Please Select Valid Product Field");
            setSubmitted(true);
            setwarning(true);
        }
        else{
            const response = await axios.post(`${API_URL}Customer/order`,{order_data:drp_val});
            setresAlert(response.data.message);
            setSubmitted(true);
            setwarning(false);
            // console.log("the axios output is show in below");
            // console.log(response);
            if(response.data.status===true){
                 let payment_method = response.data.data.payment_method;
                 const encodedUpiId = encodeURIComponent(response.data.data.receiver_data.upiid);
                 let amount = response.data.data.total_amount;
                 if(screenWidth<=800){
                     if(payment_method==="gpay"){
                     
                         window.location.href = `upi://pay?pa=${encodedUpiId}&pn=MerchantName&mc=1234&tid=1234&tr=123456&tn=Purchase&am=${amount}&cu=INR`;
                     }
                     else if(payment_method==="phonepe"){
                         window.location.href = `phonepe://upi?pn=${encodedUpiId}&am=${amount}`;
                     }
                     after_complete_close.current.click();
                 }else if(screenWidth > 800){
                     setqr_data((prevValues)=>({
                         ...prevValues,
                         upiid:response.data.data.receiver_data.upiid,
                         total_amount:amount,
                         display_qr:'inline',
     
                     }));      
                 }
                setdrp_val({});
                console.log("after submition empty data");
                console.log(drp_val);
                alert('Customer order submition successfully.....');
            }
        }
       
    }

    // error message alert box closing     
    const handleSnackbarClose = () => {
        setSubmitted(false);
    };
  

    const handlecondition = () => {
        console.log("order now button click");
        
        setqr_data((prevValues)=>({
            ...prevValues,
            upiid:'',
            total_amount:'',
            display_qr:'none',
        }));

        setdrp_val(({
          
            product_id:'',
            product_price:'',
            cgst:'',
            sgst:'',
            no_of_product:'',
            total_price_amount:'',
            batch_no:'',
            invoice_date:'',
            receiverid:'',
            positionid:'',
            sender_id:'',
            payment_method:'',
        }));
        order_now_btn.current.click();
        console.log(drp_val);
        console.log(qr_data);
    }
   
   

    return (
        <>
            {/* Snack bar */}
            <Snackbar open={submitted} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
                <MuiAlert onClose={handleSnackbarClose} severity={warning?"warning":"success"} sx={{ width: '100%' }}>
                    {resAlert}
                </MuiAlert>
            </Snackbar>
            {/* End  of snack bar */}
            {/* {loading && <Loader />} */}
            <div className="row_with_count_status">
                <span className='module_tittle'>Transactions Details</span>
            </div>
            <div className="container ">
                {userInfo.positionid==="3"&&(
                    // <button className='btn btn-md border border-2 border-success rounded text-success mt-4'  data-bs-target='#order_selection_modal'  data-bs-toggle='modal' 
                    //     onclick={(e)=>{setqr_data((prevValues)=>({
                    //         ...prevValues,
                    //         upiid:'',
                    //         total_amount:'',
                    //         display_qr:'none',
                    //     }));
                    // }}>Order Now</button>
                    <button className='btn btn-md border border-2 border-success rounded text-success mt-4'   onClick={handlecondition} >Order Now</button>
                )}
                {/* hidden button modal calling */}
                    <button className='d-none' data-bs-target='#order_selection_modal' data-bs-toggle='modal' ref={order_now_btn}></button>
               
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
                    <div class="modal-content order_modal_responsive " >
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
                <div class="modal-dialog" role="document">
                    <div class="modal-content order_modal_responsive" >
                        <div class="modal-header" style={{ padding: 0 }}>
                            <h5 class="modal-title" id="staticBackdropLabel">Ordering Products</h5>
                            <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"   ref={after_complete_close}></button>
                        </div>
                        <div id="invoiceContent" class="modal-body pdf-height">
                            <div style={{display:qr_data.display_qr==='inline'?'none':'inline'}}>
                                <div className="row" >
                                    <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
                                        <TextField  select label="Products"  value={drp_val.product_id} onChange={(e) => handlechange_value(e.target.value)} fullWidth  variant="outlined" >
                                            {drp_pname.map((item,index)=>
                                                <MenuItem value={item.productid}>{item.productname}</MenuItem>
                                            )}
                                        </TextField>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-6 mb-4">
                                        <TextField id="outlined-basic" label="No of Product" name='no_of_product' variant="outlined" value={drp_val.no_of_product} onChange={(e)=>calculate_total(e.target.value)} fullWidth/>
                                    </div>
                                </div>

                                <div className="row " >
                                    {field_names.map((item,index)=>(
                                        <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-row mb-4">
                                            <span>{item.label} : <span>{drp_val[item.fieldname]}</span></span>
                                        </div>
                                    ))}
                                </div>

                                <div className="row" >
                                    <div className="col-lg-6 col-md-12 col-sm-12 mb-4 d-flex flex-row">
                                        {/* <Box sx={{direction:'row',alignItems:'center',justifyContent:'start',width:'100%'}}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Payment Method" name='product_name' onChange={(e)=>{setdrp_val((prevValues)=>({
                                                    ...prevValues,
                                                    payment_method:e.target.value,
                                                }))}} fullWidth>
                                                    {payment_drp.map((item,index)=>
                                                        <MenuItem value={item.fieldname}>{item.label}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Box> */}
                                        <TextField  select label="Payment Method"  value={drp_val.payment_method} onChange={(e)=>{setdrp_val((prevValues)=>({
                                            ...prevValues,
                                            payment_method:e.target.value,
                                            }))}}    fullWidth  variant="outlined" >
                                            {payment_drp.map((item,index)=>
                                                <MenuItem value={item.fieldname}>{item.label}</MenuItem>
                                            )}
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4" style={{display:qr_data.display_qr==='inline'?'inline':'none'}}>
                                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <QrCode totalSum={qr_data.total_amount} upi={qr_data.upiid} />
                                </Box>
                            </div>


                            <div className="row">
                                <div className="col-lg-12 d-flex flex-row justify-content-end align-items-center">
                                    {console.log(qr_data)}
                                    {qr_data.display_qr==='none' && (
                                        <button className='btn btn-md border border-2 border-primary text-primary' onClick={SubmitOrder}>Submit</button>        
                                    )}
                                    {qr_data.display_qr==='inline' && (
                                        <button  data-bs-dismiss="modal" aria-label="Close" className='btn btn-md border border-2 border-gray rounded text-gray' onClick={(e)=>setqr_data((prevValues)=>({
                                            ...prevValues,
                                            upiid:'',
                                            display_qr:'none',
                                            total_amount:'',
                                        }))}>Close</button>

                                    )}
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
