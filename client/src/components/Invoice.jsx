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
import { InvoiceHead, detialAboutPayment, invoiceHead, invoiceImg, invoiceRow, invoicecontent, invoicepic, odd, even, paymentDetials, paymentQrSession, td, th, bussinessQuotes, listData, billTo, invoiceNo, table, tbody, tBorder, rawInput, tdv, tdvDate, textarea, billDetial, bankDetails } from '../assets/style/mailInlineCss';
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
    // console.log("SenderInvoiceProp : ",SenderInvoiceProp);
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
    const getcgst = (hsnno, batchno) => {
        const getcgst = productList.filter((product) => product.productid === String(hsnno) && product.batchno === String(batchno)).map((product) => product.cgst)[0] || '';
        // console.log("getcgst : ", getcgst);
        return getcgst
    }
    const getsgst = (hsnno, batchno) => {
        const getsgst = productList.filter((product) => product.productid === String(hsnno) && product.batchno === String(batchno)).map((product) => product.sgst)[0] || '';
        // console.log("getcgst : ", getsgst);
        return getsgst
    }

    // console.log("productList :", productList);
    
    const unitRate = (hsnno, batchno) => {
        const unitRate = productList.filter((product) => product.productid === String(hsnno) && product.batchno === String(batchno)).map((product) => product.priceperitem)[0] || '';
        return unitRate;
    }

    

    function TaxableValue() {
        return previewInvoiceprop.reduce((acc, item) => {
            const unitPrice = parseInt(unitRate(item.hsncode, item.batchno));
            const totalPrice = (unitPrice * parseInt(item.Quantity)) - ((unitPrice * parseInt(item.Quantity)) * parseInt(item.Discount) / 100);
            console.log(acc);
            return acc + totalPrice;
        }, 0);
    }
    // const getTaxableValue = TaxableValue();
    // console.log(getTaxableValue);

    const TotalcgstPercent = () => {
        const total =  previewInvoiceprop.reduce((acc, item) => {
            console.log(item);
            const Totalcgst = parseInt(getcgst(item.hsncode, item.batchno));
            console.log(acc);
            return acc + Totalcgst;
        }, 0);
        return total / previewInvoiceprop.length;
    }
    // console.log(Totalcgst());

    const TotalsgstPercent = () => {
        const total =  previewInvoiceprop.reduce((acc, item) => {
            console.log(item);
            const Totalsgst = parseInt(getsgst(item.hsncode, item.batchno));
            console.log(acc);
            return acc + Totalsgst;
        }, 0);
        return total / previewInvoiceprop.length;
    }
    // console.log(Totalcgst());
    const TotalcgstValue = () =>{
        return TaxableValue() * TotalcgstPercent()/100;
    }
    const TotalsgstValue = () =>{
        return TaxableValue() * TotalsgstPercent()/100;
    }
    const grandTotal = () =>{
        return TaxableValue() + TotalcgstValue() + TotalsgstValue();
    }
    function formatTotal(total) {
        const formattedTotal = parseFloat(total).toFixed(2); // Ensure there are always two digits after the decimal point
        return formattedTotal;
    }
    return (
        
            
           
                <div className="A4SheetSize"  id="invoice-content" style={{height:'100%',width:'100%'}}>
                    <h4 className='text-center'>TAX INVOICE</h4>
                    {/* <button onClick={downloadPdf}>Download PDF</button> */}
                    {/* <button onClick={() => downloadPDF(previewInvoiceprop)}>Download PDF</button> */}
                    <div className="invoiceconten"
                    // style={invoicecontent}
                    >
                        <div className="InvoiceHead1"
                            style={InvoiceHead}
                        // style={{background:'red'}}
                        >
                            {/* <div className="invoiceDetial1">
                                <pre>
                                    <h4>INVOICE</h4>
                                    <div className="organizationName" style={{ fontWeight: 900, fontSize: '20px' }}>
                                        {SenderInvoiceProp[0].organizationname}
                                    </div>
                                    No : {SenderInvoiceProp[0].cstreetname}<br />
                                    {SenderInvoiceProp[0].cdistrictid} -
                                    {" " + SenderInvoiceProp[0].cpostalcode}<br />
                                    Ph : {SenderInvoiceProp[0].phno}<br />
                                    GSTIN/UIN : {SenderInvoiceProp[0].gstnno}<br />
                                    State Name : {SenderInvoiceProp[0].cstateid}<br />
                                    E-Mail : {SenderInvoiceProp[0].email}<br />
                                </pre>
                            </div> */}

                            <div className="invoiceImg1"
                                style={invoiceImg}
                            >
                                <img className='invoicepic1' style={invoicepic} src={invoicePic} alt="" />
                            </div>
                            <div className="invoiceName1"
                            >
                                <QrCode totalSum={totalSum} upi={SenderInvoiceProp[0].upiid} />
                            </div>
                        </div>
                        <div className="billDetial" style={billDetial}>
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
                                    <div className="invoiceDetial1"
                                    //  style={invoiceDetial}
                                    >
                                        <pre>
                                            {/* {SenderInvoiceProp[0].fname}{SenderInvoiceProp[0].lname}<br /> */}
                                            <div className="organizationName" style={{ fontWeight: 900, fontSize: '20px' }}>
                                                {SenderInvoiceProp[0].organizationname}
                                            </div>
                                            No : {SenderInvoiceProp[0].cstreetname}<br />
                                            {SenderInvoiceProp[0].cdistrictid} -
                                            {/* {SenderInvoiceProp[0].cstateid}<br /> */}
                                            {" " + SenderInvoiceProp[0].cpostalcode}<br />
                                            Ph : {SenderInvoiceProp[0].phno}<br />
                                            GSTIN/UIN : {SenderInvoiceProp[0].gstnno}<br />
                                            State Name : {SenderInvoiceProp[0].cstateid}<br />
                                            E-Mail : {SenderInvoiceProp[0].email}<br />
                                            {/* GSTIN 89898989898989 */}
                                        </pre>
                                    </div>

                                    <div className="billToTittle">
                                        Buyer:(Bill To)
                                    </div>
                                    <div className="billToBody">
                                        {/* {console.log(ReciverInvoiceProp[0])} */}
                                        <ul className='listData1' style={listData}>
                                            <pre>
                                                {/* {ReciverInvoiceProp[0].fname}{ReciverInvoiceProp[0].lname}<br /> */}
                                                {ReciverInvoiceProp[0].organizationname}<br />
                                                {ReciverInvoiceProp[0].cstreetname}<br />
                                                {ReciverInvoiceProp[0].cdistrictid} -
                                                {" " + ReciverInvoiceProp[0].cpostalcode}<br />
                                                Ph : {ReciverInvoiceProp[0].phno}<br />
                                                GSTIN/UIN : {ReciverInvoiceProp[0].gstnno}<br />
                                                State Name : {ReciverInvoiceProp[0].cstateid}<br />
                                                E-Mail : {ReciverInvoiceProp[0].email}<br />
                                                {/* GSTIN 89898989898989 */}
                                            </pre>
                                        </ul>
                                    </div>
                                </div>
                                <div className="invoiceNo1" style={invoiceNo}>
                                    <table className='table1' style={table}>
                                        <tbody style={tbody}>
                                            <tr style={tBorder}>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Invoice No.
                                                    </div>
                                                    <div className="tdv" style={tdv}><input type="text" style={rawInput} /></div>
                                                </td>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Dated
                                                    </div>
                                                    <div className="tdv" style={tdvDate}> {inputValuesAboveRows.Date}</div>
                                                </td>
                                            </tr>
                                            <tr style={tBorder}>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Delivery Note
                                                    </div>
                                                    <div className="tdv" style={tdv}><input type="text" style={rawInput} /></div>
                                                </td>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Mode/Terms of Payment
                                                    </div>
                                                    <div className="tdv" style={tdv}><input type="text" style={rawInput} /></div>
                                                </td>
                                            </tr>
                                            <tr style={tBorder}>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Reference No. & Date
                                                    </div>
                                                    <div className="tdv" style={tdv}><input type="text" style={rawInput} /></div>
                                                </td>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Other References
                                                    </div>
                                                    <div className="tdv" style={tdv}><input type="text" style={rawInput} /></div>
                                                </td>
                                            </tr>
                                            <tr style={tBorder}>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Buyer's Order No.
                                                    </div>
                                                    <div className="tdv" style={tdv}><input type="text" style={rawInput} /></div>
                                                </td>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Dated
                                                    </div>
                                                    <div className="tdv" style={tdv}>{inputValuesAboveRows.Date}</div>
                                                </td>
                                            </tr>
                                            <tr style={tBorder}>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Dispatch Doc No.
                                                    </div>
                                                    <div className="tdv" style={tdv}><input type="text" style={rawInput} /></div>
                                                </td>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Delivery Note Date
                                                    </div>
                                                    <div className="tdv" style={tdv}>{inputValuesAboveRows.Date}</div>
                                                </td>
                                            </tr>
                                            <tr style={tBorder}>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Dispatch through
                                                    </div>
                                                    <div className="tdv" style={tdv}>G-PAY</div>
                                                </td>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Destination
                                                    </div>
                                                    <div className="tdv" style={tdv}>{inputValuesAboveRows.Date}</div>
                                                </td>
                                            </tr>
                                            <tr style={tBorder}>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Bill of Landing/LR-RR No.
                                                    </div>
                                                    <div className="tdv" style={tdv}>VR</div>
                                                </td>
                                                <td style={tBorder}>
                                                    <div className="tdh">
                                                        Motor Vehicle No.
                                                    </div>
                                                    <div className="tdv" style={tdv}><input type="text" style={rawInput} /></div>
                                                </td>
                                            </tr>
                                            <tr style={tBorder}>Terms of Delivery : <textarea type="text" style={textarea} /></tr>
                                        </tbody>
                                    </table>
                                    {/* <div className="invoiceDate">
                                        Invoice Date : {inputValuesAboveRows.Date}<br />
                                    </div>
                                    <div className="invoiceMail">
                                        Ph : {ReciverInvoiceProp[0].phno}<br />
                                    </div>
                                    <div className="invoiceMail">
                                        E-Mail : {ReciverInvoiceProp[0].email}<br />
                                    </div> */}
                                </div>
                            </div>

                            {/* </div> */}
                            <br />
                            <table border="1">
                                <thead className='invoiceHead1' style={invoiceHead}>
                                    <tr>
                                        <th className='th1' style={th}>S.No.</th>
                                        <th className='th1' style={th}>DESCRIPTION OF GOODS</th>
                                        <th className='th1' style={th}>HSN NO.</th>
                                        <th className='th1' style={th}>GST</th>
                                        <th className='th1' style={th}>QTY.</th>
                                        <th className='th1' style={th}>Discount</th>
                                        <th className='th1' style={th}>UNIT RATE</th>
                                        <th className='th1' style={th}>TOTAL</th>
                                        {/* <th className='th'>AMOUNT</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewInvoiceprop.map((item, index) => (
                                        <tr key={index}>
                                            <td className='td1' style={td}>{index + 1}</td>
                                            <td className='td1' style={td}>{item.productName || ''}</td>
                                            <td className='td1' style={td}>{item.hsncode || ''}</td>
                                            <td className='td1' style={td}>{parseInt(getcgst(item.hsncode, item.batchno)) + parseInt(getsgst(item.hsncode, item.batchno)) || ''}</td>
                                            <td className='td1' style={td}>{item.Quantity || ''}</td>
                                            {/* <td className='td1' style={td}>discount</td> */}
                                            <td className='td1' style={td}>{item.Discount || ''}</td>
                                            <td className='td1' style={td}>{unitRate(item.hsncode, item.batchno)}</td>
                                            <td className='td1' style={td}>{(parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100) || ''}</td>
                                            {/* <td className='td1' style={td}>{formatTotal(item.Total) || ''}</td> */}
                                            {/* <td className='td'>{item.rate ? `Rs. ${item.rate.toFixed(2)}` : ''}</td>
                                            <td className='td'>{item.amount ? `Rs. ${item.amount.toFixed(2)}` : ''}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                            <div className="paymentDetials1" style={paymentDetials}>
                                <div className="bankDetails" style={bankDetails}>
                                    <div className="bankName">Bank Details</div>
                                    <div className="bankName">Bank Name : {SenderInvoiceProp[0].bankname}</div>
                                    <div className="bankName">BANK ACC NO : {SenderInvoiceProp[0].bankaccno}</div>
                                    <div className="bankAccNo">UPI ID : {SenderInvoiceProp[0].upiid}</div>
                                    {/* <div className="Ifsc">PAN Number : {SenderInvoiceProp[0].pan}</div> */}
                                </div>
                                <div className="detialAboutPayment1" style={detialAboutPayment}>
                                    <div className="alternating-rows-container1">
                                        <div className="invoiceRow1 odd1" style={{ ...invoiceRow, ...odd }}>Taxable Value
                                            <div className="totalVal">{TaxableValue()}</div>
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
                                        <div className="invoiceRow1 even1" style={{ ...invoiceRow, ...even }}>CGST {TotalcgstPercent()} %
                                            <div className="totalVal1">{TotalcgstValue()}</div>
                                        </div>
                                        <div className="invoiceRow1" style={{ ...invoiceRow, ...odd }}>SGST {TotalsgstPercent()} %
                                            <div className="totalVal1">{TotalsgstValue()}</div>
                                        </div>
                                        <div className="invoiceRow1 even1" style={{ ...invoiceRow, ...even }}>IGST%
                                            <div className="totalVal1">Nil</div>
                                        </div>
                                        <div className="invoiceRow1" style={{ ...invoiceRow, ...odd }}>Round Off
                                            <div className="totalVal1">0</div>
                                        </div>
                                        <div className="invoiceRow1 even1" style={{ ...invoiceRow, ...even }}>Grand Total (Rs.)
                                            <div className="totalVal1">{formatTotal(grandTotal())}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            {/* <div className="bankDetails">
                                <div className="bankName">Bank Name : {SenderInvoiceProp[0].bankname}</div>
                                <div className="bankName">BANK ACC NO : {SenderInvoiceProp[0].bankaccno}</div>
                                <div className="bankAccNo">UPI ID : {SenderInvoiceProp[0].upiid}</div>
                                <div className="Ifsc">PAN Number : {SenderInvoiceProp[0].pan}</div>
                            </div>
                            <hr /> */}
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
        
    )
}
export default Invoice;


