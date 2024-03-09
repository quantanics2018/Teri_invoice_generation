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
import { InvoiceHead, detialAboutPayment, invoiceHead, invoiceImg, invoiceRow, invoicecontent, invoicepic, odd, even, paymentDetials, paymentQrSession, td, th, bussinessQuotes, listData, billTo, invoiceNo, table, tbody, tBorder, rawInput, tdv, tdvDate, textarea, billDetial, bankDetails, tdh, tBorderd, tandc, nowrap, taxInvoiceHead, invoiceDetial, df, gap, dfc, addressDetials, invoicedetail, rowInvoiceDetail, inputbox, row1Invoice, width50, reciverBill, pad, textwarp, mt, sb, padInPx, bussinessContent, table1, row } from '../assets/style/mailInlineCss';
import { TextField } from '@mui/material';
import numberToWords from 'number-to-words';
import { gag } from '../pages/InvoiceGenerator';
// import htmlPdf from 'html-pdf';


const Invoice = ({
    previewInvoiceprop,
    ReciverInvoiceProp,
    SenderInvoiceProp,
    // totalSum,
    totalQuantity,
    inputValuesAboveRows,
    productList, invoiceid,
    selectedIndex,
    generateInvoice
}) => {

    // console.log("previewInvoiceprop : ", previewInvoiceprop[0]);
    // console.log("ReciverInvoiceProp : ", ReciverInvoiceProp);
    // console.log("SenderInvoiceProp : ",SenderInvoiceProp);
    // console.log("totalSum : ",totalSum[0]);
    // console.log("totalQuantity : ",totalQuantity[0]);
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const senderid = userInfo.userid;

    // style
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const rowStyle = {
        display: 'flex',
    };

    const cellStyle = {
        flex: 1,
        border: '1px solid #000',
        // padding: '20px',
        textAlign: 'center',
    };
    const totalgstname = {
        height: '200px',
        marginTop: '20px'
    }
    const numberinWord = {
        borderLeft: '1px solid',
        borderRight: '1px solid',
    }
    const amountHeading = {
        justifyContent: 'space-between'
    }
    const subGst = {
        justifyContent: 'space-around',
        borderTop: '1px solid',
        alignItems: 'center',
    }
    const cgstRate = {
        flex: '1',
        borderRight: '1px solid #000',
    }
    const cgstAmount = {
        flex: '1',
    }
    const ditailwithfixedwidth = {
        width: '400px'
    }
    const sign = {
        border: '1px solid',
        height: '100px',
        width: '400px',
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between'
    }

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
            // console.log(acc);
            return acc + totalPrice;
        }, 0);
    }
    // const getTaxableValue = TaxableValue();
    // console.log(getTaxableValue);

    const TotalcgstPercent = () => {
        const total = previewInvoiceprop.reduce((acc, item) => {
            // console.log(item);
            const Totalcgst = parseInt(getcgst(item.hsncode, item.batchno));
            // console.log(acc);
            return acc + Totalcgst;
        }, 0);
        return total / previewInvoiceprop.length;
    }
    // console.log(Totalcgst());

    const TotalsgstPercent = () => {
        const total = previewInvoiceprop.reduce((acc, item) => {
            // console.log(item);
            const Totalsgst = parseInt(getsgst(item.hsncode, item.batchno));
            // console.log(acc);
            return acc + Totalsgst;
        }, 0);
        return total / previewInvoiceprop.length;
    }
    const TotalcgstValue = () => {
        return TaxableValue() * TotalcgstPercent() / 100;
    }
    const TotalsgstValue = () => {
        return TaxableValue() * TotalsgstPercent() / 100;
    }
    const grandTotal = () => {
        return TaxableValue() + TotalcgstValue() + TotalsgstValue();
    }
    function formatTotal(total) {
        const formattedTotal = parseFloat(total).toFixed(2); // Ensure there are always two digits after the decimal point
        return formattedTotal;
    }
    console.log(Math.round(formatTotal(grandTotal())));
    const number = !isNaN(Math.round(formatTotal(grandTotal()))) ? Math.round(formatTotal(grandTotal())) : 0;
    const integerWords = numberToWords.toWords(number);

    console.log(Math.round(formatTotal((TotalcgstValue()) + (TotalsgstValue()))));
    const number1 = !isNaN(Math.round(formatTotal((TotalcgstValue()) + (TotalsgstValue())))) ? Math.round(formatTotal((TotalcgstValue()) + (TotalsgstValue()))) : 0;
    const integerWords1 = numberToWords.toWords(number1);
    // consecimalPart = Math.round((number - integerPart) * 100);
    // const integerPart = Math.floor(number);
    // const decimalWords = numberToWords.toWords(decimalPart);
    function capitalizeIntegerWords(integerWords) {
        // Use regular expression to match word boundaries and convert the first character of each word to uppercase
        return integerWords.replace(/\b\w/g, firstChar => firstChar.toUpperCase());
    }
    return (
        <div className="A4SheetSize" id="invoice-content" style={pad}>
            <div className="taxInvoiceHead" style={taxInvoiceHead}>
                {generateInvoice ?
                    <h4>GENERATE INVOICE {invoiceid}</h4>
                    : <h4>
                        PERFORM INVOICE 
                        {/* {gag} */}
                    </h4>
                }
            </div>
            <br />
            {/* <div className="invoiceconten"  style={dfc}> */}
            <div className="InvoiceHead1"
                style={InvoiceHead}
            >

                <div className="invoiceImg1"
                    style={invoiceImg}
                >
                    <img className='invoicepic1'
                        style={invoicepic}
                        src={invoicePic} alt="" />
                </div>
                <div className="invoiceName1"
                >
                    <QrCode totalSum={formatTotal(grandTotal())} upi={SenderInvoiceProp[0].upiid} />
                </div>
            </div>

            <div className="billDetial" style={{ ...billDetial, ...dfc }}>
                <div className="addressDetials" style={addressDetials}>
                    <div className="shipTo1" style={billTo}>
                        <div className="invoiceDetial1"
                            style={{ ...invoiceDetial, ...padInPx }}
                        >
                            <pre style={textwarp}>
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
                                <br />
                            </pre>
                        </div>

                        <div className="buyerDetail"
                        >
                            <div className="billToBody"
                                style={padInPx}
                            >
                                <pre style={{ ...reciverBill, ...textwarp }}>
                                    Buyer:(Bill To) <br />
                                    {ReciverInvoiceProp[0].organizationname}<br />
                                    {ReciverInvoiceProp[0].cstreetname}<br />
                                    {ReciverInvoiceProp[0].cdistrictid} -
                                    {" " + ReciverInvoiceProp[0].cpostalcode}<br />
                                    Ph : {ReciverInvoiceProp[0].phno}<br />
                                    GSTIN/UIN : {ReciverInvoiceProp[0].gstnno}<br />
                                    State Name : {ReciverInvoiceProp[0].cstateid}<br />
                                    E-Mail : {ReciverInvoiceProp[0].email}<br /><br />
                                </pre>
                            </div>
                        </div>
                    </div>
                    <div className="invoicedetail" style={invoicedetail}>
                        <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                            <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx }}>
                                Invoice No.<input type='text' style={rawInput} />
                            </div>
                            <div className="row2Invoice" style={{ ...width50, ...padInPx }}>
                                Date : {inputValuesAboveRows.Date}
                            </div>
                        </div>
                        <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                            <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Delivery Note
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                            <div className="row2Invoice" style={{ ...width50, ...df, ...padInPx, ...gap }}>
                                <div className="termofdelivery">
                                    Terms of Payment
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                        </div>
                        <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                            <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Reference No. & Date
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                            <div className="row2Invoice" style={{ ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Other References
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                        </div>
                        <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                            <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Buyer's Order No.
                                </div>
                                <input type='text' style={rawInput} />

                            </div>
                            <div className="row2Invoice" style={{ ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Dated
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                        </div>
                        <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                            <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Dispatch Doc No.
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                            <div className="row2Invoice" style={{ ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Delivery Note Date
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                        </div>
                        <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                            <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Dispatch Through
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                            <div className="row2Invoice" style={{ ...width50, ...padInPx, ...df, ...gap }}>
                                <div className="termofdelivery">
                                    Destination
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                        </div>
                        <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                            <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...dfc, ...gap }}>
                                <div className="termofdelivery">
                                    Bill of Lading/LR-RR No
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                            <div className="row2Invoice" style={{ ...width50, ...padInPx, ...dfc, ...gap }}>
                                <div className="termofdelivery">
                                    Motor Vehicle No.
                                </div>
                                <input type='text' style={rawInput} />
                            </div>
                        </div>
                        <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...dfc, ...gap }}>
                            <div className="tandc">Terms of Delivery</div>
                            <div className="tandc"><textarea style={textarea}></textarea></div>
                        </div>
                    </div>
                </div>

                {/* <div border="1">
                        <div className='invoiceHead1' style={{...invoiceHead,...df}}>
                            <div className='th1' style={th}>S.No.</div>
                            <div className='th1' style={th}>DESCRIPTION OF GOODS</div>
                            <div className='th1' style={th}>HSN NO</div>
                            <div className='th1' style={th}>GST</div>
                            <div className='th1' style={th}>QTY.</div>
                            <div className='th1' style={th}>DISCOUNT</div>
                            <div className='th1' style={th}>UNIT RATE</div>
                            <div className='th1' style={th}>TOTAL</div>
                        </div>
                        <div>
                            {previewInvoiceprop.map((item, index) => (
                                <div key={index}>
                                    <div className='td1' style={td}>{index + 1}</div>
                                    <div className='td1' style={td}>{item.productName || ''}</div>
                                    <div className='td1' style={td}>{item.hsncode || ''}</div>
                                    <div className='td1' style={td}>{parseInt(getcgst(item.hsncode, item.batchno)) + parseInt(getsgst(item.hsncode, item.batchno)) || ''}</div>
                                    <div className='td1' style={td}>{item.Quantity || ''}</div>
                                    <div className='td1' style={td}>{item.Discount || ''}</div>
                                    <div className='td1' style={td}>{(parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100) || ''}</div>
                                    <div className='td1' style={td}>{unitRate(item.hsncode, item.batchno)}</div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                {/* <div className="paymentDetials1" style={paymentDetials}>
                        <div className="bankDetails" style={{ ...bankDetails, ...padInPx }}>
                            <div className="bankName"><b>Bank Details</b></div>
                            <div className="bankName">Bank Name : {SenderInvoiceProp[0].bankname}</div>
                            <div className="bankName">Account Holder Name : {SenderInvoiceProp[0].accholdername}</div>
                            <div className="bankName">BANK ACC NO : {SenderInvoiceProp[0].bankaccno}</div>
                            <div className="bankName">IFSC CODE : {SenderInvoiceProp[0].ifsccode}</div>
                            <div className="bankAccNo">UPI ID : {SenderInvoiceProp[0].upiid}</div>
                        </div>
                        <div className="detialAboutPayment1" style={detialAboutPayment}>
                            <div className="alternating-rows-container1"
                            >
                                <div className="invoiceRow1 odd1" style={{ ...invoiceRow, ...odd }}>Taxable Value
                                    <div className="totalVal">{TaxableValue()}</div>
                                </div>
                                <div className="invoiceRow1 even1" style={{ ...invoiceRow, ...even }}>CGST {formatTotal(TotalcgstPercent())} %
                                    <div className="totalVal1">{formatTotal(TotalcgstValue())}</div>
                                </div>
                                <div className="invoiceRow1" style={{ ...invoiceRow, ...odd }}>SGST {formatTotal(TotalsgstPercent())} %
                                    <div className="totalVal1">{formatTotal(TotalsgstValue())}</div>
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

                    <div className="acc" style={{ ...df, ...sb }}>
                        <div className="dec">
                            We declare that this invoice shows the actual price of the goods <br />
                            described and the all particulars are true and correct.
                        </div>
                        <div className="sign" style={{ ...mt, ...pad }}>Authorized Sign.</div>
                    </div>
                    <div className="bussinessQuotes1"
                        style={bussinessQuotes}
                    >
                        <div className='bussinessContent1' style={{ ...bussinessContent, ...pad }}>THANK YOU ! WE APPRECIATE YOUR BUSINESS</div>
                    </div> */}
            </div>
            {/* </div> */}
            <div className="bodydiv">

                {/* <div border="1" className="table" style={table1}>
                    <div className='invoiceHead1' style={{ ...invoiceHead, ...df }}>
                        <div className='th1' style={th}>S.No.</div>
                        <div className='th1' style={th}>DESCRIPTION OF GOODS</div>
                        <div className='th1' style={th}>HSN NO</div>
                        <div className='th1' style={th}>GST</div>
                        <div className='th1' style={th}>QTY.</div>
                        <div className='th1' style={th}>DISCOUNT</div>
                        <div className='th1' style={th}>UNIT RATE</div>
                        <div className='th1' style={th}>TOTAL</div>
                    </div>
                    <div style={dfc}>
                        {previewInvoiceprop.map((item, index) => (
                            <div key={index} style={{ ...df, ...row }}>
                                <div className='td1' style={td}>{index + 1}</div>
                                <div className='td1' style={td}>{item.productName || ''}</div>
                                <div className='td1' style={td}>{item.hsncode || ''}</div>
                                <div className='td1' style={td}>{parseInt(getcgst(item.hsncode, item.batchno)) + parseInt(getsgst(item.hsncode, item.batchno)) || ''}</div>
                                <div className='td1' style={td}>{item.Quantity || ''}</div>
                                <div className='td1' style={td}>{item.Discount || ''}</div>
                                <div className='td1' style={td}>{(parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100) || ''}</div>
                                <div className='td1' style={td}>{unitRate(item.hsncode, item.batchno)}</div>
                            </div>
                        ))}
                    </div>
                </div> */}
                <div style={containerStyle}>
                    {/* Table heading row */}
                    <div style={rowStyle}>
                        <div style={cellStyle}>S.No.</div>
                        <div style={cellStyle}>Description of Goods</div>
                        <div style={cellStyle}>HSN NO</div>
                        <div style={cellStyle}>Quantity</div>
                        <div style={cellStyle}>Rate</div>
                        <div style={cellStyle}>per</div>
                        <div style={cellStyle}>Disc. %</div>
                        <div style={cellStyle}>Amount</div>
                    </div>
                    {/* Table data  */}
                    {[...previewInvoiceprop, {}, {}].map((item, index) =>
                        <div style={rowStyle}>
                            <div style={cellStyle}>{(index <= previewInvoiceprop.length - 1) && index + 1}</div>
                            <div style={cellStyle}>
                                {item.productName || ''}
                                {index === previewInvoiceprop.length &&
                                    <div style={totalgstname}>
                                        <div className="invoiceRow1 even1">
                                            CGST
                                            {/* {formatTotal(TotalcgstPercent())} % */}
                                            {/* <div className="totalVal1">{formatTotal(TotalcgstValue())}</div> */}
                                        </div>
                                        <div className="invoiceRow1 even1">
                                            SGST
                                            {/* {formatTotal(TotalcgstPercent())} % */}
                                            {/* <div className="totalVal1">{formatTotal(TotalcgstValue())}</div> */}
                                        </div>
                                        <div className="invoiceRow1 even1">
                                            Round Off
                                            {/* {formatTotal(TotalcgstPercent())} % */}
                                            {/* <div className="totalVal1">{formatTotal(TotalcgstValue())}</div> */}
                                        </div>
                                    </div>
                                }
                                {index === previewInvoiceprop.length + 1 &&
                                    <div>
                                        <b>Total</b>
                                    </div>
                                }
                            </div>
                            <div style={cellStyle}>{item.hsncode || ''}</div>
                            {/* {parseInt(getcgst(item.hsncode, item.batchno)) + parseInt(getsgst(item.hsncode, item.batchno)) || ''} */}
                            <div style={cellStyle}>{item.Quantity || ''}</div>
                            <div style={cellStyle}>{(index <= previewInvoiceprop.length - 1) && 'Nos.'}</div>
                            <div style={cellStyle}>{unitRate(item.hsncode, item.batchno)}</div>
                            <div style={cellStyle}>{item.Discount || ''}</div>
                            <div style={cellStyle}>
                                {(parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100) || ''}
                                {index === previewInvoiceprop.length &&
                                    <div style={totalgstname}>
                                        <div className="invoiceRow1 even1">
                                            {/* CGST */}
                                            {/* {formatTotal(TotalcgstPercent())} % */}
                                            <div className="totalVal1">{formatTotal(TotalcgstValue())}</div>
                                        </div>
                                        <div className="invoiceRow1 even1">
                                            {/* SGST */}
                                            {/* {formatTotal(TotalcgstPercent())} % */}
                                            <div className="totalVal1">{formatTotal(TotalsgstValue())}</div>
                                        </div>
                                        <div className="invoiceRow1 even1">
                                            {/* Round Off */}
                                            {/* {formatTotal(TotalcgstPercent())} % */}
                                            <div className="totalVal1">{0}</div>
                                        </div>
                                    </div>
                                }
                                {index === previewInvoiceprop.length + 1 &&
                                    <div>
                                        <b>{formatTotal(grandTotal())}</b>
                                    </div>
                                }
                            </div>
                        </div>
                    )}
                </div>
                <div className="numberinWord" style={numberinWord}>
                    <div className="amountHeading" style={{ ...amountHeading, ...df }}>
                        <div className="changeablecontent">Amount Changeable (in words)</div>
                        <div className="oe"><b>E & O.E</b></div>
                    </div>
                    <div className="amountHeading"><b>{capitalizeIntegerWords(integerWords)}</b></div>
                </div>
                <div style={containerStyle}>
                    {/* Table heading row */}
                    <div style={rowStyle}>
                        <div style={cellStyle}>HSN/SAC</div>
                        <div style={cellStyle}>Taxable Value</div>
                        <div style={cellStyle}>
                            <div className="cgst">CGST</div>
                            <div className="subGst" style={{ ...subGst, ...df }}>
                                <div className="cgstRate" style={cgstRate}>Rate</div>
                                <div className="cgstAmount" style={cgstAmount}>Amount</div>
                            </div>
                        </div>
                        <div style={cellStyle}>
                            <div className="cgst">SGST/UTGST</div>
                            <div className="subGst" style={{ ...subGst, ...df }}>
                                <div className="cgstRate" style={cgstRate}>Rate</div>
                                <div className="cgstAmount" style={cgstAmount}>Amount</div>
                            </div>
                        </div>
                        <div style={cellStyle}>Total Tax Amount</div>
                    </div>
                    {[...previewInvoiceprop, {}].map((item, index) =>
                        <div style={rowStyle}>
                            <div style={cellStyle}>
                                {item.productName || ''}
                                {index === previewInvoiceprop.length &&
                                    <div>
                                        <b>Total</b>
                                    </div>
                                }
                            </div>
                            <div style={cellStyle}>
                                {/* {item.hsncode || ''} */}
                                {(parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100) || ''}
                                {index === previewInvoiceprop.length &&
                                    <div>
                                        <b>{TaxableValue()}</b>
                                    </div>
                                }
                            </div>
                            {/* {parseInt(getcgst(item.hsncode, item.batchno)) + parseInt(getsgst(item.hsncode, item.batchno)) || ''} */}
                            <div style={cellStyle}>
                                {/* {item.Quantity || ''} */}
                                <div className="subGst" style={{ ...subGst, ...df }}>
                                    <div className="cgstRate" style={cgstRate}>
                                        {parseInt(getcgst(item.hsncode, item.batchno)) ? parseInt(getcgst(item.hsncode, item.batchno)) + '%' : ''}
                                    </div>
                                    <div className="cgstAmount" style={cgstAmount}>{(parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100) ? formatTotal(((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100)) * ((getcgst(item.hsncode, item.batchno))) / 100) : ''}</div>
                                </div>
                                {index === previewInvoiceprop.length &&
                                    <div>
                                        <b>{formatTotal(TotalcgstValue())}</b>
                                    </div>
                                }
                            </div>
                            <div style={cellStyle}>
                                {/* {unitRate(item.hsncode, item.batchno)} */}
                                <div className="subGst" style={{ ...subGst, ...df }}>
                                    <div className="cgstRate" style={cgstRate}>
                                        {parseInt(getsgst(item.hsncode, item.batchno)) ? parseInt(getsgst(item.hsncode, item.batchno)) + '%' : ''}
                                    </div>
                                    <div className="cgstAmount" style={cgstAmount}>{(parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100) ? formatTotal(((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100)) * ((getsgst(item.hsncode, item.batchno))) / 100) : ''}</div>
                                    {index === previewInvoiceprop.length &&
                                        <div>
                                            <b>{formatTotal(TotalsgstValue())}</b>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div style={cellStyle}>
                                {/* {item.Discount || ''} */}
                                {(parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100) ? formatTotal((((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100)) * ((getcgst(item.hsncode, item.batchno))) / 100)
                                    + (((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseInt(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) * parseInt(item.Discount) / 100)) * ((getsgst(item.hsncode, item.batchno))) / 100))
                                    : ''}
                                {index === previewInvoiceprop.length &&
                                    <div>
                                        <b>{(TotalcgstValue()) + (TotalsgstValue())}</b>
                                    </div>}

                            </div>
                        </div>
                    )}
                </div>

                <div className="numberinWord"
                    style={numberinWord}
                >
                    <div className="amountHeading" style={df}>
                        <div className="changeablecontent">Taxable Amount (in words) : </div>
                        <div className="amountHeading"><b>{capitalizeIntegerWords(integerWords1)}</b></div>
                    </div>
                </div>



                <div className="paymentDetials1" style={paymentDetials}>
                    <div className="bankDetails" style={{ ...df, ...bankDetails, ...padInPx }}>
                        <div className="ditailwithfixedwidth" style={ditailwithfixedwidth}>
                            <div className="bankName"><b>Bank Details</b></div>
                            <div className="bankName">Bank Name : {SenderInvoiceProp[0].bankname}</div>
                            <div className="bankName">Account Holder Name : {SenderInvoiceProp[0].accholdername}</div>
                            <div className="bankName">BANK ACC NO : {SenderInvoiceProp[0].bankaccno}</div>
                            <div className="bankName">IFSC CODE : {SenderInvoiceProp[0].ifsccode}</div>
                            <div className="bankAccNo">UPI ID : {SenderInvoiceProp[0].upiid}</div>
                        </div>

                    </div>
                    {/* <div className="detialAboutPayment1" style={detialAboutPayment}>
                        <div className="alternating-rows-container1"
                        >
                            <div className="invoiceRow1 odd1" style={{ ...invoiceRow, ...odd }}>Taxable Value
                                <div className="totalVal">{TaxableValue()}</div>
                            </div>
                            <div className="invoiceRow1 even1" style={{ ...invoiceRow, ...even }}>CGST {formatTotal(TotalcgstPercent())} %
                                <div className="totalVal1">{formatTotal(TotalcgstValue())}</div>
                            </div>
                            <div className="invoiceRow1" style={{ ...invoiceRow, ...odd }}>SGST {formatTotal(TotalsgstPercent())} %
                                <div className="totalVal1">{formatTotal(TotalsgstValue())}</div>
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
                    </div> */}
                    Company's PAN : <b>{SenderInvoiceProp[0].pan}</b>
                    <div className="acc" style={{ ...df, ...sb }}>
                        <div className="dec">
                            <b>Declaration :</b> <br />
                            We declare that this invoice shows the actual price of the goods <br />
                            described and the all particulars are true and correct.
                        </div>
                        <div className="sign" style={{ ...pad, ...sign, ...dfc }}>
                            <div className="pvtName">VAIBAVSRI INDIA PRIVATE LIMITITED</div>
                            <div className="authSign">Authorized Sign.</div>
                        </div>
                    </div>
                </div>

                <div className="bussinessQuotes1"
                    style={bussinessQuotes}
                >
                    <div className='bussinessContent1' style={{ ...bussinessContent, ...pad }}>This is a Computer Genereated Invoice</div>
                </div>
            </div>
        </div>
    )
}
export default Invoice;


