import React from 'react';
import axios from 'axios';
import '../assets/style/App.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {Container,Typography,Snackbar,MenuItem,TextField} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../assets/style/App.css';
import { API_URL, SECRET_KEY } from '../config';
import { UserActionBtn, padding_top } from '../assets/style/cssInlineConfig';
import EditIcon from '@mui/icons-material/Edit';
import '../assets/style/Order_modal.css';
import MuiAlert from '@mui/material/Alert';


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


const Order_Management = (positionid) =>{
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    console.log("order management session");
    console.log(userInfo);
    let position_id = userInfo.positionid;
    let userid_getdata = (userInfo.positionid==="2"?userInfo.userid:userInfo.adminid);

    const [getorder_data,setorderdata] = useState([]);
    const buttonRef = useRef(null);
    const [selected_id,set_selected] = useState([]);
    const [child_order_data,setchild_data] = useState([]);
    const label_map = [
        {label:'Customer ID',fieldname:'sender_id'},
        {label:'Customer Name',fieldname:'fullname'},
        {label:'Product Name',fieldname:'productname'},
        {label:'HSN Code',fieldname:'hsncode'},
        {label:'CGST',fieldname:'cgst'},
        {label:'SGST',fieldname:'sgst'},
        {label:'Receiver UPI ID',fieldname:'upi_id'},
    ];

    const [submitted, setSubmitted] = useState(false);
    const [warning,setwarning] = useState(false);
    const [resAlert, setresAlert] = useState(null);
    const [payment_mode_selection,setpayment_mode] = useState('');

    useEffect(()=>{
     
        getOrderData();
    },[]);

    const getOrderData =() =>{
        console.log("Order Management data is :\t"+userid_getdata);
        axios.post(`${API_URL}getOrderData`, {userid:userid_getdata})
        .then(response => {
            console.log("OrderManagement data server data");
            console.log(response.data.data);
            setorderdata(response.data.data);

        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    };
    const select_order = async(order_id)=>{
        console.log("product list");
        console.log(getorder_data);
        setchild_data([]);
        const output_res = await axios.post(`${API_URL}get_order_item`,{order_id:order_id});
        console.log("order item data in server response");
        console.log(output_res.data.data);
        setchild_data(output_res.data.data);
       
        getorder_data.map((item,index)=>{
            if(item.order_id===order_id){
                set_selected(getorder_data[index]);
            }
        });
        
    }

    // submit order function 
    const submitOrder = async() =>{
        
        if ((payment_mode_selection==='online_payment')&&(selected_id.transaction_id==='' || selected_id.transaction_id===null)) {
            setresAlert("Enter Valid Transaction ID...");
            setSubmitted(true);
            setwarning(true);
        }else if(payment_mode_selection===''){
            setresAlert("Please Select Payment Mode...");
            setSubmitted(true);
            setwarning(true);
        }
        
        else if((selected_id.transaction_id!='' && selected_id.transaction_id!=null) || (payment_mode_selection==='payment_failure' && (selected_id.transaction_id==='' || selected_id.transaction_id===null))){
            const output_res = await axios.post(`${API_URL}Order_submition`, {order_data:selected_id,order_item:child_order_data,payment_status:payment_mode_selection});
            console.log('Order Submission');
            console.log(selected_id);
            console.log("output response server to client passing");
            console.log(output_res);
            if (output_res.data.status===true) {
                getOrderData();
                buttonRef.current.click();
                setresAlert("Successfully Accept Customer Order...");
                setSubmitted(true);
                setwarning(false);
                
            }
            
        }
        
    }

    const handleSnackbarClose = () => {
        setSubmitted(false);
    };

    const payment_mode = [
        {label:'Online Payment',value:'online_payment'},
        {label:'Payment Failure',value:'payment_failure'}
    ];

return(
    <>
      {/* Snack bar */}
        <Snackbar open={submitted} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
            <MuiAlert onClose={handleSnackbarClose} severity={warning?"warning":"success"} sx={{ width: '100%' }}>
                {resAlert}
            </MuiAlert>
        </Snackbar>
        {/* End  of snack bar */}
        <div className='bar'>
            <div className='status-bar'>
                <div className="device_mangement_main_content">
                    <div className="row_with_count_status">
                        <span className='module_tittle'>
                            Order Management
                        </span>
                    </div>
                    <div className='col-headings'>
                        <div className="col-head">Customer ID</div>
                        <div className="col-head">Customer Name</div>
                        <div className="col-head">Product</div>
                        {/* <div className="col-head">Batch No</div> */}
                        <div className="col-head col-headAction">Quantity</div>
                        <div className="col-head">Amount</div>
                        <div className="col-head">Payment Mode</div>
                        <div className='col-head'>Action</div>
                    </div>
                    <div className="scroll_div" style={padding_top}>
                        {console.log(getorder_data)}
                        {console.log("user data")}
                        {getorder_data.map((data, index) => (
                            <div className="datas skeleton-block">
                                <div className="col-head">{data.sender_id}</div>
                                <div className="col-head">{data.fullname}</div>
                                <div className="col-head">{data.productname}</div>
                                <div className="col-head">{data.quantity}</div>
                                <div className="col-head" title={formatAmountToIndianCurrency(parseFloat(data.grandtotal))}>{formatAmountToIndianCurrency(parseFloat(data.grandtotal))}</div>
                                <div className="col-head"> {data.payment_method}</div>
                                <div className="col-head"><EditIcon data-bs-target='#order_submition_modal'  data-bs-toggle='modal' onClick={(e)=>select_order(e.currentTarget.getAttribute('data_id'))}  data_id={data.order_id}/></div>
                            </div>
                        ))}
                        {getorder_data.length<=0?(<p className='text-secondary text-center font-weight-bold h6 mt-4'>No Records Found....</p>):''}
                    </div>
                </div>
            </div>
        </div>

        {/* edit transaction id modal start */}
        <div class="modal fade" id="order_submition_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
            <div class="modal-dialog modal-md">
                <div class="modal-content order_modal_responsive">
                    <div class="modal-header" style={{ padding: 0 }}>
                        <h5 class="modal-title" id="staticBackdropLabel">Order Acceptance</h5>
                        <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id="invoiceContent" class="modal-body pdf-height">
                        {console.log("selected id is:\t")}
                        {console.log(selected_id)}
                        <div className="row mt-4">
                            {label_map.map((item,index)=>(
                                <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                                    <span className='font-weight-bold'>{item.label} : <span>{item.fieldname==="cgst" || item.fieldname==="sgst"? (selected_id[item.fieldname]+' %'):selected_id[item.fieldname]}</span></span>
                                </div>
                            ))}

                            
                        </div>
                        <div className="row mt-4">
                            <div className="d-flex justify-content-start flex-row">
                                <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border border-gray'>Batch Number</div>
                                <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border border-gray'>Quantity</div>
                                <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border border-gray'>Rate</div>
                                <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border border-gray'>Total Amount</div>
                            </div>
                            {child_order_data.length>0 && child_order_data.map((item,index)=>(
                                <div className="d-flex flex-row justify-content-start">
                                    <div className="d-flex flex-column align-items-center justify-content-start w-25 border border-1 border-bottom border-gray">{item.batch_no}</div>
                                    <div className="d-flex flex-column align-items-center justify-content-start w-25 border-1 border-bottom border border-gray">{item.product_quantity}</div>
                                    <div className="d-flex flex-column align-items-center justify-content-start w-25 border-1 border-bottom border border-gray">{formatAmountToIndianCurrency(parseFloat(item.product_price))}</div>
                                    <div className='d-flex flex-column align-items-center justify-content-start w-25 border-1 border-bottom border border-gray'>{formatAmountToIndianCurrency(parseInt(item.product_quantity)*parseFloat(item.product_price))}</div> 
                                </div>
                            ))}
                        </div>

                        <div className="row mt-4">
                            <div className="col-lg-6 col-md-12col-sm-12 mt-4">
                                <span className='font-weight-bold'>Grand Total : <span>{formatAmountToIndianCurrency(parseFloat(selected_id['grandtotal']))}</span></span>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mt-4">

                                <TextField variant="outlined" label="Transaction ID" type="text" onChange={(e)=>set_selected((prevValues)=>({
                                    ...prevValues,
                                    transaction_id:e.target.value,
                                    last_updated_by:userInfo.userid,
                                }))} fullWidth/>

                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
                                <TextField  select label="Payment Status"  value={payment_mode_selection} onChange={(e)=>setpayment_mode(e.target.value)}  fullWidth  variant="outlined" >
                                    {payment_mode.map((item,index)=>
                                        <MenuItem value={item.value}>{item.label}</MenuItem>
                                    )}
                                </TextField>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12 d-flex flex-row justify-content-end align-items-center p-2">
                                <button className='btn border-2 border-secondary text-secondary rounded btn-md  w-40 mr-4' data-bs-dismiss="modal" aria-label="Close" ref={buttonRef}>Close</button>
                                <button className='btn border-2 border-success  rounded text-success btn-md w-40' onClick={submitOrder}>Submit</button>
                            </div>
                        </div>
                       
                        
                    </div>
                </div>
            </div>
        </div>
        {/* edit transaction id modal end */}
    </>
)
};

export default Order_Management;