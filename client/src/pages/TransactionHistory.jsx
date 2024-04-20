import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Button, Pagination, Skeleton, TableCell, TextField } from '@mui/material';
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
                // console.log('Transaction History:', response.data.data);
                setLoading(false);
                setData(response.data.data);
                // console.log(response.data.data);
                // setInterval(() => {
                // }, 1000);
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Failed to Fetch Transaction History:', error.message);
        }
    };
    useEffect(() => {

        fetchData();

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
    // const indexOfFirstItem = Math.max(0, indexOfLastItem - rowsPerPage);
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
            // [pageIndex]: {
            //     ...prevState[pageIndex],
            //     [index]: value
            // }
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

    return (
        <>
            {/* {loading && <Loader />} */}
            <div className="row_with_count_status">
                <span className='module_tittle'>Transactions Details</span>
            </div>
            <div className="container ">
                
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
        </>
    );
};

export default TransactionHistory;
