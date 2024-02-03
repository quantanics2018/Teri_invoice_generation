import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import { Button, TableCell, TextField } from '@mui/material';

const TransactionHistory = () => {
    const [data, setData] = useState([])
    // [
    //     { id: '#57473829', date: '13 Sep, 2024', client: 'Quantanics', amount: '$145', status: 'Completed' },
    //     { id: '#012458780', date: '19 Aug, 2024', client: 'Tech', amount: '$641.64', status: 'Pending' },
    //     { id: '#76444326', date: '03 April, 2024', client: 'Kalavasal', amount: '$12,457', status: 'Completed' },
    //     { id: '#12498745', date: '15 March, 2024', client: 'Madurai', amount: '$785', status: 'Completed' },
    //     { id: '#87444654', date: '23 Jan, 2024', client: 'Tamil Nadu', amount: '$199', status: 'Completed' },
    // ];
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(userInfo.userid);
                const response = await axios.post(`${API_URL}get/transactionHistory`, {
                    userid: userInfo.userid,
                });
                // Handle the response here, for example, set it to state or dispatch an action
                // console.log("test :",response.data.status);
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

        fetchData();

    }, [userInfo.userid]);
    console.log(data);
    return (
        <>
            {/* <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                rel="stylesheet"
            /> */}
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
                                <p className="mb-0 small bg-tint-warning text-warning">{data.filter(item => item.status === 0).length} Pending</p>
                            </div>
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="small text-uppercase bg-body text-muted text-center">
                                        <tr>
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
                                                {/* <td>{item.id}</td> */}
                                                <TextField variant="standard" />
                                                <td className='text-center'>{item.invoicedate}</td>
                                                <td className='text-center'>{item.email}</td>
                                                <td className='text-center'>
                                                    {item.amount}
                                                </td>
                                                <td className='text-center'>
                                                    <span className={`badge fs-6 fw-normal ${item.status === 1 ? 'bg-tint-success text-success' : 'bg-tint-warning text-warning'}`}>
                                                        {(item.status === 0) && 'Pending'}
                                                        {(item.status === 1) && 'Completed'}
                                                    </span>
                                                </td>
                                                <td className='text-center'>
                                                    {/* onClick={() => deleteRow(row.id)}  */}
                                                    <Button color="secondary">
                                                        ❌
                                                    </Button>
                                                    <Button color="secondary">
                                                        ✔
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer text-end">
                                <a href="#!" className="btn btn-gray">
                                    View All Transactions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionHistory;
