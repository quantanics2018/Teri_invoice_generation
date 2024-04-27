import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Snackbar,Pagination, Skeleton, TableCell, TextField ,FormControl,InputLabel,MenuItem,Select} from '@mui/material';
import Loader from '../components/Loader';
import { API_URL } from '../config';
import PDFInvoice from '../pages/common/PDFInvoice';
import QrCode from '../components/QrCode';
import MuiAlert from '@mui/material/Alert';
import { ToWords } from 'to-words';
import '../assets/style/Order_modal.css';

 // amount comma seperator function

 function formatAmountToIndianCurrency (amount){
    var formattedAmount;
    if(amount){
        var formattedAmount = amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }else{
        var formattedAmount = "";
    }
    return formattedAmount;
}


const TransactionHistory = () => {
    const [data, setData] = useState([])
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const [loading, setLoading] = useState(false);
    const [rawdata,setrawdata] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    const [warning,setwarning] = useState(false);
    const [resAlert, setresAlert] = useState(null);
    const [total_product_quantity,setTotalquantity] = useState('');
    const [product_list,setproduct_list]= useState([]);

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
        const invoice_data = await axios.post(`${API_URL}getinvoice_data`,{invoiceId:invoiceid});
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
        cgst_amount:'',
        sgst_amount:'',
    });

    const field_names = [
        
        {label:"CGST",fieldname:"cgst"},
        {label:"SGST",fieldname:"sgst"},
        {label:"Grant Total",fieldname:"total_price_amount"},
    ];

    const payment_drp = [
        {label:"Google Pay",fieldname:"gpay"},
        {label:"Phone Pay",fieldname:"phonepe"}
    ]
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // fetch products data in customer view thw page 
    // its temporary hide
    const fetch_drp_data = async() =>{
        const product_Data = await axios.post(`${API_URL}getproduct_data`,{admin_id:userInfo.adminid,hsncode:'220190'});
        console.log("part data in server ");
        console.log(product_Data.data.data);
        let total_quantity = 0;
        product_Data.data.data.map((item,index)=>{
            total_quantity = total_quantity + item.quantity;
        });
        setTotalquantity(total_quantity);
        console.log("total quantity is :\t"+total_quantity);
        set_drp_pname(product_Data.data.data);
    }
 

   
    // after select dropdown product in customer onchane event
    // temporaru hide
    const [checkbox_val,set_checkbox] = useState(false);
    const handlechange_value = async(event)=>{
       
        const productval = event.target.dataset.customAttribute;
        const productid = document.querySelector('#'+event.target.id);
        console.log(productid.checked);
        if (productid.checked===true) {
            set_checkbox(true);
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
        }else{
            set_checkbox(false);
        }

        
    }
    

    const calculate_gst = (total_amount,gst)=>{
        let gst_amount = (parseInt(total_amount)*parseInt(gst))/100;
        return gst_amount;
    }
    // onchange in quantity input
    const calculate_total = async (quantity)=>{
        // console.log("total quantity:\t"+quantity);
        let total_amount = 0;
       
       
        let date = new Date().toISOString().split('T')[0];
        // console.log("total quantity:\t"+cgst);
      
        var customer_need = quantity;
        const myarr = [];
      

        drp_pname.map((item,index)=>{
            console.log(item.quantity);
            customer_need = customer_need - item.quantity;
            console.log(customer_need);
            if (customer_need>0) {
                let buying_quantity = customer_need+item.quantity;
                let demo = {'product_id':item.productid,'batch_no':item.batchno,'product_price':item.priceperitem,'quantity':item.quantity,'index':index,'remaining':(item.quantity - buying_quantity),'cgst':item.cgst,'sgst':item.sgst};   
                total_amount = total_amount +(parseFloat(item.priceperitem)*parseFloat(item.quantity));
                myarr.push(demo);
                
            }else if(customer_need<=0){
                let buying_quantity = customer_need+item.quantity;
                if(buying_quantity>0){
                    let demo = {'product_id':item.productid,'batch_no':item.batchno,'product_price':item.priceperitem,'quantity':buying_quantity,'index':index,'remaining':(item.quantity - buying_quantity),'cgst':item.cgst,'sgst':item.sgst};
                    customer_need = 0;
                    total_amount = total_amount +(parseFloat(item.priceperitem)*parseFloat(buying_quantity))
                    myarr.push(demo);
                    return;
                }
                
            }
            // else if(customer_need<=0){
            //     let buying_quantity = customer_need+item.quantity;
            //     let demo = {'product_id':item.productid,'batch_no':item.batchno,'product_price':item.priceperitem,'quantity':buying_quantity,'index':index,'remaining':(item.quantity - buying_quantity)};
            //     customer_need = 0;
            //     myarr.push(demo);
            //     return;
            // }
        });
        var cgst_total_price = calculate_gst(parseFloat(total_amount),drp_pname[0].cgst);
        var sgst_total_price = calculate_gst(parseFloat(total_amount),parseFloat(drp_pname[0].sgst));
        total_amount = total_amount + cgst_total_price + sgst_total_price;
        setdrp_val((prevValues)=>({
            ...prevValues,
            no_of_product:quantity,
            total_price_amount:total_amount,
            invoice_date:date,
            receiverid:userInfo.adminid,
            positionid:userInfo.positionid,
            sender_id:userInfo.userid,
            cgst_amount:cgst_total_price,
            sgst_amount:sgst_total_price,
        }));

        console.log("after calculation of products");
        console.log(myarr);
        setproduct_list(myarr);

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
            console.log("order data submission");
            console.log(drp_val);
            console.log(product_list);
            const response = await axios.post(`${API_URL}Customer/order`,{order_data:drp_val,order_item:product_list});
            setresAlert(response.data.message);
            setSubmitted(true);
            setwarning(false);
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
                alert('Customer order submition successfully.....');
            }
        }
       
    }

    // error message alert box closing     
    const handleSnackbarClose = () => {
        setSubmitted(false);
    };
  

    const handlecondition = () => {
        
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
            cgst_amount:'',
            sgst_amount:'',
        }));
        set_checkbox(false);
        order_now_btn.current.click();        
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
                <span className='module_tittle'>{userInfo.positionid==="3"?('Order & History'):('Transactions Details')}</span>
            </div>
            <div className="container ">
                {userInfo.positionid==="3"&&(
                   
                    <button className='btn btn-md border text-white bg-primary rounded  mt-4'   onClick={handlecondition} >Order Now</button>
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
                                                    <td className='text-center ' style={{cursor:'pointer'}}  data-bs-target='#invoice_pdf_generator'  data-bs-toggle='modal' onClick={(e)=>downloadinvoice(e.target.textContent)} data_id=
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
                            {/* {console.log(Object.keys(rawdata).length)} */}
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
                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <input type="checkbox" name="" className='' id="pname_checkbox" checked={checkbox_val}  data-custom-attribute="220190"  style={{marginRight:'1rem'}}   onClick={(e)=>handlechange_value(e)}/> <span>TERiON iON SOLUTION REFILL </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex flex-column">
                                        <span>Availble Quantity</span>
                                        <span>{total_product_quantity}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-6 mb-4">
                                        <TextField id="outlined-basic" label="Quantity" name='quantity' variant="outlined" value={drp_val.no_of_product} onChange={(e)=>calculate_total(e.target.value)} fullWidth/>
                                    </div>
                                </div>
                                
                                <div className="row" >
                                    <div className="d-flex justify-content-start flex-row">
                                        <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border border-gray'>Batch Number</div>
                                        <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border border-gray'>Quantity</div>
                                        <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border border-gray'>Rate</div>
                                        <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border border-gray'>Total Amount</div>
                                    </div>
                                    
                                 
                                    {product_list.map((item,index)=>(
                                        (item.quantity>0 && (
                                            <div className="d-flex flex-row justify-content-start">
                                            <div className="d-flex flex-column align-items-center justify-content-start w-25 border border-1 border-bottom border-gray">{item.batch_no}</div>
                                            <div className="d-flex flex-column align-items-center justify-content-start w-25 border-1 border-bottom border border-gray">{item.quantity}</div>
                                            <div className="d-flex flex-column align-items-center justify-content-start w-25 border-1 border-bottom border border-gray">{formatAmountToIndianCurrency(parseFloat(item.product_price))}</div>
                                            <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border-bottom border border-gray'>{formatAmountToIndianCurrency(parseInt(item.quantity)*parseFloat(item.product_price))}</div> 
                                            </div>
                                        ))
                                       
                                    ))}
                                    
                                </div>

                                <div className="row mt-4" >
                                    {field_names.map((item,index)=>(
                                        <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-row mb-4">
                                            <span>{item.label} : <span>{item.fieldname==="cgst" || item.fieldname==="sgst"? (drp_val[item.fieldname]===''? '0%':drp_val[item.fieldname]+' %'):item.fieldname==="total_price_amount"? (formatAmountToIndianCurrency(drp_val[item.fieldname])):(drp_val[item.fieldname])}</span></span>
                                        </div>
                                    ))}
                                    <div className="col-lg-6 col-md-12 col-sm-12 mb-4 d-flex flex-row">
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
                                    
                                    {qr_data.display_qr==='none' && (
                                        <button className='btn btn-md border border-2 bg-danger text-white w-40' disabled={!checkbox_val} onClick={SubmitOrder}>Submit</button>        
                                    )}
                                    {qr_data.display_qr==='inline' && (
                                        <button  data-bs-dismiss="modal" aria-label="Close" className='btn btn-md border  bg-grey border-grey rounded text-black w-40' onClick={(e)=>setqr_data((prevValues)=>({
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
