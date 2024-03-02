import { useEffect, useState } from 'react';
import invoicePic from '../assets/logo/InvoicePic.png'
// import QRCode from 'qrcode.react';
import Qr from '../assets/logo/Qr.png'
import axios from 'axios';
import QrCode from './QrCode';
import ReactDOMServer from 'react-dom/server';
import { API_URL } from '../config';
// import { html2pdf } from 'html2pdf.js';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceHead, detialAboutPayment, invoiceHead, invoiceImg, invoiceRow, invoicecontent, invoicepic, odd,even, paymentDetials, paymentQrSession, td, th, bussinessQuotes, listData, billTo, invoiceNo } from '../assets/style/mailInlineCss';
import { TextField } from '@mui/material';
// import htmlPdf from 'html-pdf';

const Invoice = ({
    previewInvoiceprop,
    ReciverInvoiceProp,
    SenderInvoiceProp,
    totalSum,
    totalQuantity,
    inputValuesAboveRows,
    productList
}) => {
    // console.log("previewInvoiceprop : ", previewInvoiceprop[0]);
    // console.log("ReciverInvoiceProp : ", ReciverInvoiceProp);
    console.log("SenderInvoiceProp : ",SenderInvoiceProp);
    // console.log("totalSum : ",totalSum[0]);
    // console.log("totalQuantity : ",totalQuantity[0]);
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const senderid = userInfo.userid;
   

    const downloadPDF = () => {
        const { data } = previewInvoiceprop; // Assuming previewInvoiceprop contains the data object
        const pdf = new jsPDF();

        const tableContent = previewInvoiceprop.map((item, index) => {
            return `
              Invoice ${index + 1}
              Product Name: ${item.productName}
              Discount: ${item.Discount}
              Quantity: ${item.Quantity}
              Total: ${item.Total}
              Batch No: ${item.batchno}
              HSN Code: ${item.hsncode}
              ID: ${item.id}
            `;
        }).join('\n\n'); // Join each invoice content with two newlines
        pdf.text(tableContent, 10, 10);
        pdf.save("invoice.pdf");
    };
    const getcgst = (hsnno,batchno) =>{
        const getcgst = productList.filter((product) => product.productid === String(hsnno) && product.batchno === String(batchno)).map((product) => product.cgst)[0] || '';
        // console.log("getcgst : ", getcgst);
        return getcgst
    }
    const getsgst = (hsnno,batchno) =>{
        const getsgst = productList.filter((product) => product.productid === String(hsnno) && product.batchno === String(batchno)).map((product) => product.sgst)[0] || '';
        console.log("getcgst : ", getsgst);
        return getsgst
    }
    function formatTotal(total) {
        const formattedTotal = parseFloat(total).toFixed(2); // Ensure there are always two digits after the decimal point
        return formattedTotal;
    }
    return (
        <div className="InvoiceContainer">
            <div className="forScroll">
                <div className="A4SheetSize" id="invoice-content">
                    {/* <button onClick={downloadPdf}>Download PDF</button> */}
                    {/* <button onClick={() => downloadPDF(previewInvoiceprop)}>Download PDF</button> */}
                    <div className="invoiceconten"
                    // style={invoicecontent}
                    >
                        <div className="InvoiceHead1"
                            style={InvoiceHead}
                        // style={{background:'red'}}
                        >
                            <div className="invoiceDetial1"
                            //  style={invoiceDetial}
                            >
                                <pre>
                                    <h1>INVOICE</h1>
                                    {SenderInvoiceProp[0].fname}{SenderInvoiceProp[0].lname}<br />
                                    {SenderInvoiceProp[0].organizationname} , 
                                    {" "+SenderInvoiceProp[0].cstreetname}<br />
                                    {SenderInvoiceProp[0].cdistrictid}<br />
                                    {SenderInvoiceProp[0].cstateid}<br />
                                    {SenderInvoiceProp[0].cpostalcode}<br />
                                    {/* GSTIN 89898989898989 */}
                                </pre>
                            </div>
                            <div className="invoiceName1"
                            //  style={InvoiceHead}
                            >
                                <QrCode totalSum={totalSum} upi={SenderInvoiceProp[0].upiid}/>
                            </div>
                            <div className="invoiceImg1"
                             style={invoiceImg}
                            >
                                <img className='invoicepic1' style={invoicepic} src={invoicePic} alt="" />
                            </div>
                        </div>
                        <div className="billDetial">
                            {/* <div className="addressWithInvoice"> */}
                            <div className="addressDetials">
                                {/* <div className="billTo">
                                    <div className="billToTittle">
                                        Bill From:(Seller)
                                    </div>
                                    <div className="billToBody">
                                        <ul className='listData'>
                                            <pre>
                                                {SenderInvoiceProp[0].fname}{SenderInvoiceProp[0].lname}<br />
                                                {SenderInvoiceProp[0].organizationname}<br />
                                                {SenderInvoiceProp[0].cstreetname}<br />
                                                {SenderInvoiceProp[0].cdistrictid}<br />
                                                {SenderInvoiceProp[0].cstateid}<br />
                                                {SenderInvoiceProp[0].cpostalcode}<br />
                                            </pre>
                                        </ul>
                                    </div>
                                </div> */}
                                <div className="shipTo1" style={billTo}>
                                    <div className="billToTittle">
                                        Ship To:(Buyer)
                                    </div>
                                    <div className="billToBody">
                                        {/* {console.log(ReciverInvoiceProp[0])} */}
                                        <ul className='listData1' style={listData}>
                                            <pre>
                                                {ReciverInvoiceProp[0].fname}{ReciverInvoiceProp[0].lname}<br />
                                                {ReciverInvoiceProp[0].organizationname}<br />
                                                {ReciverInvoiceProp[0].cstreetname}<br />
                                                {ReciverInvoiceProp[0].cdistrictid}<br />
                                                {ReciverInvoiceProp[0].cstateid}<br />
                                                {ReciverInvoiceProp[0].cpostalcode}<br />
                                                {/* GSTIN 89898989898989 */}
                                            </pre>
                                        </ul>
                                    </div>
                                </div>
                                <div className="invoiceNo1" style={invoiceNo}>
                                    <div className="invoiceDate">
                                        Invoice Date : {inputValuesAboveRows.Date}<br />
                                    </div>
                                    <div className="invoiceMail">
                                        Buyer Mail : {ReciverInvoiceProp[0].email}<br />
                                    </div>
                                    <div className="invoiceMail">
                                        Buyer Phno : {ReciverInvoiceProp[0].phno}<br />
                                    </div>
                                    {/* Invoice Number : 4649845 <br /> */}
                                    {/* Invoice Date : 08-03-2021 */}
                                </div>
                            </div>

                            {/* </div> */}
                            <br />
                            <table border="1">
                                <thead className='invoiceHead1' style={invoiceHead}>
                                    <tr>
                                        <th className='th1' style={th}>S.No.</th>
                                        <th className='th1' style={th}>PRODUCT NAME</th>
                                        <th className='th1' style={th}>HSN NO.</th>
                                        <th className='th1' style={th}>QTY.</th>
                                        <th className='th1' style={th}>Discount</th>
                                        <th className='th1' style={th}>CGST</th>
                                        <th className='th1' style={th}>SGST</th>
                                        <th className='th1' style={th}>Total</th>
                                        {/* <th className='th'>AMOUNT</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewInvoiceprop.map((item, index) => (
                                        <tr key={index}>
                                            <td className='td1' style={td}>{index + 1}</td>
                                            <td className='td1' style={td}>{item.productName || ''}</td>
                                            <td className='td1' style={td}>{item.hsncode || ''}</td>
                                            <td className='td1' style={td}>{item.Quantity || ''}</td>
                                            <td className='td1' style={td}>{item.Discount || ''}</td>
                                            <td className='td1' style={td}>{getcgst(item.hsncode,item.batchno) || ''}</td>
                                            <td className='td1' style={td}>{getsgst(item.hsncode,item.batchno) || ''}</td>
                                            <td className='td1' style={td}>{formatTotal(item.Total) || ''}</td>
                                            {/* <td className='td'>{item.rate ? `Rs. ${item.rate.toFixed(2)}` : ''}</td>
                                            <td className='td'>{item.amount ? `Rs. ${item.amount.toFixed(2)}` : ''}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                            <div className="paymentDetials1" style={paymentDetials}>
                                <div className="paymentQrSession1" style={paymentQrSession}>
                                    <div className="makePaymetToTittle1">Discription of Goods
                                    </div>
                                </div>
                                <div className="detialAboutPayment1" style={detialAboutPayment}>
                                    <div className="alternating-rows-container1">
                                        <div className="invoiceRow1 odd1" style={{...invoiceRow, ...odd}}>TOTAL QUANTITY
                                            <div className="totalVal">{totalQuantity}</div>
                                            {/* <TextField
                                            id="standard-number"
                                            label="Number"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                        /> */}
                                        </div>
                                        <div className="invoiceRow1 even1" style={{...invoiceRow, ...even}}>TOTAL PRICE
                                            <div className="totalVal1">{totalSum}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="bankDetails">
                                <div className="bankName">Bank Name : {SenderInvoiceProp[0].bankname}</div>
                                <div className="bankAccNo">UPI ID : {SenderInvoiceProp[0].upiid}</div>
                                <div className="Ifsc">PAN Number : {SenderInvoiceProp[0].pan}</div>
                            </div>
                            <hr />
                            we declare that this invoice shows the actual price of the goods <br />
                            described and the all particulars are true and correct.
                            <hr />
                            <br />
                            <br />
                            Authorized Sign.
                            <br />
                            <br />
                            <br />
                            <div className="bussinessQuotes1" 
                            style={bussinessQuotes}
                            >
                                <h5 className='bussinessContent1'>THANK YOU ! WE APPRECIATE YOUR BUSINESS</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Invoice;


