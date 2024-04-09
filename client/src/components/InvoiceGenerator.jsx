import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import axios from 'axios';
import Invoice from './Invoice'
import { API_URL } from '../config';
const InvoiceGenerator = () => {
  const [rows, setRows] = useState([
    {
      productname: '',
      distributerName: 0,
      address: '',
      quantity: 0,
      amount: 0,
    },
  ]);

  const addNewRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        productname: '',
        distributerName: 0,
        address: '',
        quantity: 0,
        amount: 0,
      },
    ]);
  };

  const deleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const updateRow = (index, field, value) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][field] = value;
      return updatedRows;
    });
  };
  const updateRow1 = (index, field, value) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][field] = value;
      return updatedRows;
    });
  };

  const overallSum = () => {
    const total = rows.reduce((acc, row) => acc + row.amount, 0);
    return total.toFixed(2);
  };

  const [invoiceData,setinvoicedata] = useState(<Invoice/>)
  const GenerateBill = async () => {
    try {
      const response = await axios.post(`${API_URL}send-email`, {
        data: invoiceData,
        to:'nitheshwaran003@gmail.com'
      });
  
      if (response.status === 200) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="row_with_count_status">
        <span className='module_tittle'>INVOICE Generator</span>
      </div>

      <div className="invoice-container">
        <div className="invoice-header">
          <div className="title-date">
            <h2 className="title">INVOICE</h2>
            <p className="date">01/12/20</p>
          </div>
          <div className="space"></div>
          <p className="invoice-number">#08 279</p>
        </div>
        <div className="invoice-body">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>DISTRIBUTER ID</th>
                <th>PRODUCT NAME</th>
                <th>ADDRESS</th>
                <th>QUANTITY</th>
                <th>AMOUNT</th>
                <th style={{ textAlign: 'center' }}>ACTION</th>
              </tr>
            </thead>

            <tbody id="table-body">
              {rows.map((row, index) => (
                <tr key={index} className="single-row">
                  <td>
                    <input
                      type="text"
                      placeholder="0"
                      name="unit"
                      className="unit-input"
                      value={row.distributerName}
                      onChange={(e) => updateRow(index, 'distributerName', e.target.value)}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      placeholder="Product name"
                      className="product-input"
                      value={row.productname}
                      onChange={(e) => updateRow(index, 'productname', e.target.value)}
                    />
                  </td>
                  
                  <td>
                    <input
                      type="text"
                      placeholder="2/497"
                      name="price"
                      className="price-input"
                      value={row.address}
                      onChange={(e) => updateRow(index, 'address', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="0"
                      name="amount"
                      className="amount-input"
                      value={row.quantity}
                      onChange={(e) => updateRow1(index, 'quantity', e.target.value)}

                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="0"
                      name="amount"
                      className="amount-input"
                      value={row.amount}
                      disabled
                    />
                  </td>
                  {/* <td>
                    <input
                      type="number"
                      placeholder="0"
                      name="amount"
                      className="amount-input"
                      value={row.amount}
                      disabled
                    />
                  </td> */}
                  <td style={{ textAlign: 'right' }}>
                    {/* <span
                      className="material-icons delete-icon"
                      onClick={() => deleteRow(index)}
                    >
                      delete_outline
                    </span> */}
                    <MdDelete className="delete-icon" size={24} color="red" onClick={() => deleteRow(index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-section">
            <label>Total:</label>
            <input
              type="text"
              placeholder="0.00"
              name="total"
              className="total-input"
              value={overallSum()}
              disabled
            />
          </div>
        </div>
        <div className="add-row-button">
          <a href="#" onClick={addNewRow}>
            {/* <span className="material-icons plus">add</span> Add Row */}
            <IoIosAdd className="add-icon" style={{
              fontSize: '40px',   
              color: 'white',       
              backgroundColor: '#ef3131', 
              borderRadius: '50%',  
              padding: '10px'       
            }} />
          </a>
        </div>
      </div>
      {/* <button onClick={GenerateBill}>Generate</button> */}
    </>
  );
};

export default InvoiceGenerator;
