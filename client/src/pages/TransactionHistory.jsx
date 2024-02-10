import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import { Button, Pagination, TableCell, TextField } from '@mui/material';

const TransactionHistory = () => {
    const [data, setData] = useState([])
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${API_URL}get/transactionHistory`, {
                userid: userInfo.userid,
            });
            if (response.data.status) {
                console.log('Transaction History:', response.data.data);
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
    const SenderConformation = async (invoiceId, textVal, belongsto) => {
        // console.log("hai", invoiceId, textVal)
        if (textVal) {
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


    console.log(data);

    const formatDate = (timestamp) => {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var formattedDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
        return formattedDate;
    }


    return (
        <>
            <div className="row_with_count_status">
                <span className='module_tittle'>Transactions Detials</span>
            </div>
            <div className="container">
                <br /><br />
                <div className="row">
                    <div className="col-12 mb-3 mb-lg-5">
                        <div className="position-relative card table-nowrap table-card">
                            <div className="card-header align-items-center">
                                <h5 className="mb-0">Latest Transactions</h5>
                                <p className="mb-0 small bg-tint-warning text-warning">{data.filter(item => item.senderstatus === 0).length} Pending</p>
                            </div>
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="small text-uppercase bg-body text-muted text-center">
                                        <tr>
                                            <th>Invoice ID</th>
                                            <th>Transaction ID</th>
                                            <th>Date</th>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {data.map((item, index) => (
                                            <tr key={index} className="align-middle text-center">
                                                {console.log(item)}
                                                <td className='text-center'>{item.invoiceid}</td>
                                                {item.transactionid ? (<td className='text-center'>{item.transactionid}</td>) : (
                                                    <td className='text-center'>
                                                        <TextField variant="standard" disabled={userInfo.userid === item.senderid}
                                                            style={{ marginTop: '10px' }}
                                                            id="outlined-size-small"
                                                            size="small"
                                                            value={textFieldValues[index]}
                                                            onChange={(e) => handleTextFieldChange(currentPageIndex, index, e.target.value)}
                                                        />
                                                    </td>
                                                )}
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
                                                    {console.log("values :", textFieldValues[index], index)}
                                                    <Button color="secondary">
                                                        {(item.transactionid && userInfo.userid === item.senderid) ? '🟢' : (userInfo.userid === item.senderid && '🔴')}
                                                    </Button>
                                                    <Button color="secondary" disabled={item.senderstatus === 1} onClick={() => userInfo.userid === item.senderid ? SenderConformation(item.invoiceid, item.transactionid, item.email) : UpdateStatusFromReciver(item.invoiceid, textFieldValues[index])}>
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
                                    Recent Transation
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
        </>
    );
};

export default TransactionHistory;
