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
import { InvoiceHead, detialAboutPayment, invoiceHead, invoiceImg, invoiceRow, invoicecontent, invoicepic, odd, even, paymentDetials, paymentQrSession, td, th, bussinessQuotes, listData, billTo, invoiceNo, table, tbody, tBorder, rawInput, tdv, tdvDate, textarea, billDetial, bankDetails, tdh, tBorderd, tandc, nowrap, taxInvoiceHead, invoiceDetial, df, gap, gap1, dfc, addressDetials, invoicedetail, rowInvoiceDetail, inputbox, row1Invoice, width50, reciverBill, pad, textwarp, mt, sb, padInPx, bussinessContent, table1, row } from '../assets/style/mailInlineCss';
import { Button, TextField } from '@mui/material';
import numberToWords from 'number-to-words';
import { gag } from '../pages/InvoiceGenerator';
import { useNavigate } from 'react-router-dom';

import { SaveBtn } from '../assets/style/cssInlineConfig';
import { CancelBtnComp } from './AddUserBtn';

// import '/home/quantanics/Desktop/teri/client/src/assets/style/main.css';
import '../assets/style/main.css'
import React, { useRef } from 'react';

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
    buyercompany,
    generateInvoice
}) => {
    console.log("DatagenerateInvoice", generateInvoice);
    // console.log("DataReciverInvoiceProp",ReciverInvoiceProp);
    // console.log("Datainvoiceid",invoiceid);
    const navigate = useNavigate();
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
        textAlign: 'center'
    };
    const totalgstname = {
        height: '100px',
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
        width: '40%'
    }
    const sign = {
        border: '1px solid',
        height: '100px',
        width: '400px',
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between'
    }
    const actions = {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        gap: '1rem'
    }
    const Signature = {
        // position:'absolute',
        marginTop: '-1rem',
        // marginLeft:'-3rem'
    }
    const PVTname = {
        marginTop: '-1rem',
    }
    const AuthSign = {
        marginTop: '-1rem',
        // marginLeft:'-3rem'
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
        return getcgst
    }
    const getsgst = (hsnno, batchno) => {
        const getsgst = productList.filter((product) => product.productid === String(hsnno) && product.batchno === String(batchno)).map((product) => product.sgst)[0] || '';
        return getsgst
    }


    const unitRate = (hsnno, batchno) => {
        const unitRate = productList.filter((product) => product.productid === String(hsnno) && product.batchno === String(batchno)).map((product) => product.priceperitem)[0] || '';
        // console.log("unitRate : ",unitRate);
        return unitRate;
    }



    function TaxableValue() {
        return previewInvoiceprop.reduce((acc, item) => {
            const unitPrice = parseFloat(unitRate(item.hsncode, item.batchno));
            const totalPrice = (unitPrice * parseInt(item.Quantity)) - ((unitPrice * parseInt(item.Quantity)) * parseInt(item.Discount) / 100);
            return acc + totalPrice;
        }, 0);
    }

    const TotalcgstPercent = () => {
        const total = previewInvoiceprop.reduce((acc, item) => {
            const Totalcgst = parseFloat(getcgst(item.hsncode, item.batchno));
            return acc + Totalcgst;
        }, 0);
        return total / previewInvoiceprop.length;
    }

    const TotalsgstPercent = () => {
        const total = previewInvoiceprop.reduce((acc, item) => {
            const Totalsgst = parseFloat(getsgst(item.hsncode, item.batchno));
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
    // console.log(Math.round(formatTotal(grandTotal())));
    const number = !isNaN(Math.round(formatTotal(grandTotal()))) ? Math.round(formatTotal(grandTotal())) : 0;
    const integerWords = numberToWords.toWords(number);

    // console.log(Math.round(formatTotal((TotalcgstValue()) + (TotalsgstValue()))));
    const number1 = !isNaN(Math.round(formatTotal((TotalcgstValue()) + (TotalsgstValue())))) ? Math.round(formatTotal((TotalcgstValue()) + (TotalsgstValue()))) : 0;
    const integerWords1 = numberToWords.toWords(number1);
    // consecimalPart = Math.round((number - integerPart) * 100);
    // const integerPart = Math.floor(number);
    // const decimalWords = numberToWords.toWords(decimalPart);
    function capitalizeIntegerWords(integerWords) {
        // Use regular expression to match word boundaries and convert the first character of each word to uppercase
        return integerWords.replace(/\b\w/g, firstChar => firstChar.toUpperCase());
    }


    // Handle submit
    const [invoiceId, setInvoiceId] = useState('');
    const [loading, setLoading] = useState(false);
    const totalSum = Math.round(formatTotal(grandTotal()))
    const handleSubmit = async () => {

        const hasEmptyValue = previewInvoiceprop.some(row =>
            Object.values(row).some(value => value === '' || value === null),
        );
        const hasEmptyReciverId = Object.values(inputValuesAboveRows).some(value => value === '' || value === null)
        if (hasEmptyReciverId) {
            alert("Reciver Details can't be Empty");
        } else {
            if (hasEmptyValue) {
                alert('Please fill in all fields in each row before submitting.');
            } else {
                try {
                    setLoading(true);
                    const response = await axios.post(`${API_URL}add/invoice`, { invoice: inputValuesAboveRows, invoiceitem: previewInvoiceprop, totalValues: totalSum });
                    if (response.data.status) {
                        console.log(response);
                        setInvoiceId(response.data.invoiceid);
                        await new Promise(resolve => setTimeout(resolve, 100));
                        // alert(response.data);
                        handleDownload1();
                        alert(response.data.message);
                    } else {
                        alert(response.data.message);
                    }
                    setLoading(false);
                    if (response.data.status) {
                        navigate('/TransactionHistory');
                    }
                } catch (error) {
                    console.error('Error sending data:', error);
                }
            }
        }
    }
    // const invoiceRef = useRef(null);
    // const handleDownload1 = async () => {
    //     console.log("Invoice ID ",invoiceId );
    //     try {
    //         const canvas = await html2canvas(invoiceRef.current, {
    //             scale: 2,
    //             useCORS: true,
    //             logging: true 
    //         });

    //         // Convert canvas to data URL
    //         const imageData = canvas.toDataURL('image/jpeg');

    //         // Generate PDF using jsPDF
    //         const pdf = new jsPDF();

    //         // Add image to PDF
    //         pdf.addImage(imageData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    //         const blobData = pdf.output('blob');
    //         const formData = new FormData();
    //         formData.append('file', blobData, 'Email.pdf');
    //         formData.append('companyname', buyercompany);
    //         // console.log(buyercompany);
    //         axios.post(`${API_URL}save-pdf-server`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //             .then(response => {
    //                 console.log('File saved successfully:', response.data);
    //                 setInvoiceId(response.data.invoiceid);
    //             })

    //     } catch (error) {
    //         console.error('Error:', error);

    //     }
    // };



    // Convert image to base64
    const imageToBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };


    const [signSrc, setSignSrc] = useState('');
    useEffect(() => {
        const statusApiAction = async () => {
            // console.log(userInfo.userid);
            try {
                const response = await axios.post(`${API_URL}get/signature`, {
                    userid: userInfo.userid
                });
                // console.log(response.data);
                // console.log(response.data.src);
                const blob = new Blob([response.data], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                // console.log(url);
                setSignSrc(`${API_URL}${response.data.src}`);
            } catch (error) {
                console.error('Error fetching signature:', error);
            }
        };

        statusApiAction();
    }, [signSrc]);

    const generatePDF = async () => {
        try {
            const response = await axios.post(`${API_URL}add/ProformaInvoice`, { invoice: inputValuesAboveRows, invoiceitem: previewInvoiceprop, totalValues: totalSum });
            console.log(response.data.status);
            if (response.data.status) {
                setInvoiceId(response.data.invoiceid);
                await new Promise(resolve => setTimeout(resolve, 1000));
                const canvas = await html2canvas(invoiceRef.current, {
                    scale: 2,
                    useCORS: true,
                    logging: true
                });
                const imageData = canvas.toDataURL('image/jpeg');
                const pdf = new jsPDF();
                pdf.addImage(imageData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

                // console.log("performa log : ",response.data.invoiceid);
                alert(response.data.message);
                // console.log("invoiceId -->: ", invoiceId);
                pdf.save(`${response.data.invoiceid}.pdf`);
                // navigate('/TransactionHistory');
            }
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }


    // const invoiceRef = useRef(null);
    // const handleDownload1 = async () => {
    //     try {

    //         const canvas = await html2canvas(invoiceRef.current, {
    //             scale: 2,
    //             useCORS: true,
    //             logging: true
    //         });

    //         // Convert canvas to data URL
    //         const imageData = canvas.toDataURL('image/jpeg');

    //         // Generate PDF using jsPDF
    //         const pdf = new jsPDF();

    //         // Add image to PDF
    //         pdf.addImage(imageData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    //         const blobData = pdf.output('blob');
    //         const formData = new FormData();
    //         formData.append('file', blobData, 'Email.pdf');
    //         formData.append('companyname', buyercompany);
    //         // console.log(buyercompany);
    //         axios.post(`${API_URL}save-pdf-server`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //             .then(response => {
    //                 console.log('File saved successfully:', response.data);

    //             })

    //     } catch (error) {
    //         console.error('Error:', error);

    //     }
    // };
    const invoiceRef = useRef(null);

    const handleDownload1 = () => {
        return new Promise(async (resolve, reject) => {
            try {
                
                setTimeout(() => {
                    resolve();
                }, 1500);
    
                const canvas = await html2canvas(invoiceRef.current, {
                    scale: 2,
                    useCORS: true,
                    logging: true
                });
    
                // Convert canvas to data URL
                const imageData = canvas.toDataURL('image/jpeg');
    
                // Generate PDF using jsPDF
                const pdf = new jsPDF();
    
                // Add image to PDF
                pdf.addImage(imageData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
                const blobData = pdf.output('blob');
                const formData = new FormData();
                formData.append('file', blobData, 'Email.pdf');
                formData.append('companyname', buyercompany);
                // console.log(buyercompany);
                axios.post(`${API_URL}save-pdf-server`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    console.log('File saved successfully:', response.data);
                });
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };
    

    return (
        <div className="fullPage">
            <div className="A4SheetSize" id="invoiceContent1" style={pad} ref={invoiceRef}>
                <div className="taxInvoiceHead" style={taxInvoiceHead} id="taxInvoiceHead">
                    {generateInvoice ?
                        <h4>TAX INVOICE </h4>
                        : <h4>
                            PROFORMA INVOICE
                        </h4>
                    }
                </div>
                <br />

                <div className="billDetial" style={{ ...billDetial, ...dfc }}>
                    <div className="addressDetials" style={addressDetials}>
                        <div className="shipTo1" style={billTo}>
                            <div className="invoiceDetial1"
                                style={{ ...invoiceDetial, ...padInPx }}
                            >
                                <pre style={{...textwarp,padding:'3px'}}>
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
                                    {/* <br /> */}
                                </pre>
                            </div>

                            <div className="buyerDetail"
                            >
                                <div className="billToBody"
                                    style={padInPx}
                                >
                                    <pre style={{ ...reciverBill, ...textwarp,padding:'3px'}}>
                                        Buyer:(Bill To) <br />
                                        {ReciverInvoiceProp[0].organizationname}<br />
                                        {ReciverInvoiceProp[0].cstreetname}<br />
                                        {ReciverInvoiceProp[0].cdistrictid} -
                                        {" " + ReciverInvoiceProp[0].cpostalcode}<br />
                                        Ph : {ReciverInvoiceProp[0].phno}<br />
                                        GSTIN/UIN : {ReciverInvoiceProp[0].gstnno}<br />
                                        State Name : {ReciverInvoiceProp[0].cstateid}<br />
                                        E-Mail : {ReciverInvoiceProp[0].email}<br />
                                    </pre>
                                </div>
                            </div>
                        </div>
                        <div className="invoicedetail" style={{...invoicedetail,padding:'3px'}}>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                                <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx }}>
                                    {/* Invoice No.<input value={invoiceId} type='text' style={{...rawInput, width: '170px', lineHeight: 'normal', verticalAlign: 'middle'}} /> */}
                                    Invoice No.{" " + invoiceId}
                                    {/* <div style={{ position: 'relative' }}>
                                    </div> */}
                                </div>
                                <div className="row2Invoice" style={{ ...width50, ...padInPx }}>
                                    Date : {inputValuesAboveRows.Date}
                                </div>
                            </div>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                                <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Delivery Note
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                                <div className="row2Invoice" style={{ ...width50, ...df, ...padInPx, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Terms of Payment
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                            </div>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                                <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Reference No. & Date
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                                <div className="row2Invoice" style={{ ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Other References
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                            </div>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                                <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Buyer's Order No.
                                    </div>
                                    <input type='text' style={rawInput} />

                                </div>
                                <div className="row2Invoice" style={{ ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Dated
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                            </div>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                                <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Dispatch Doc No.
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                                <div className="row2Invoice" style={{ ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Delivery Note Date
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                            </div>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                                <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Dispatch Through
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                                <div className="row2Invoice" style={{ ...width50, ...padInPx, ...df, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Destination
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                            </div>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                                <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx, ...dfc, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Bill of Lading/LR-RR No
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                                <div className="row2Invoice" style={{ ...width50, ...padInPx, ...dfc, ...gap1 }}>
                                    <div className="termofdelivery">
                                        Motor Vehicle No.
                                    </div>
                                    <input type='text' style={rawInput} />
                                </div>
                            </div>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...dfc, ...gap1 }}>
                                <div className="tandc">Terms of Delivery</div>
                                <div className="tandc"><textarea style={textarea}></textarea></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bodydiv">
                    <div style={containerStyle}>
                        {/* Table heading row */}
                        <div style={rowStyle}>
                            {/* <div className='invoice_table_header' style={{ width: '6%', }}>S.No.</div> */}
                            <div className='invoice_table_header' style={{ width: '6%',padding: '3px' }}>S.No.</div>
                            <div className='invoice_table_header' style={{ width: '34%' }}>Description of Goods</div>
                            <div className='invoice_table_header' style={{ width: '13%' }}>HSN NO</div>
                            <div className='invoice_table_header' style={{ width: '10%' }}>Quantity</div>
                            <div className='invoice_table_header' style={{ width: '10%' }}>Rate</div>
                            <div className='invoice_table_header' style={{ width: '10%' }}>per</div>
                            <div className='invoice_table_header' style={{ width: '7%' }}>Disc. %</div>
                            <div className='invoice_table_header' style={{ width: '10%' }}>Amount</div>
                        </div>
                        {/* Table data  */}
                        {[...previewInvoiceprop, {}, {}].map((item, index) =>
                            <div style={rowStyle}>
                                <div className='invoice_table_header' style={{ width: '6%' ,padding: '3px'}}>{(index <= previewInvoiceprop.length - 1) && index + 1}</div>
                                <div className='invoice_table_header' style={{ width: '34%' }}>
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
                                        <div style={{padding:'3px'}}>
                                            <b>Total</b>
                                        </div>
                                    }
                                </div>
                                <div className='invoice_table_header' style={{ width: '13%' }}>{item.hsncode || ''}</div>
                                {/* {parseInt(getcgst(item.hsncode, item.batchno)) + parseInt(getsgst(item.hsncode, item.batchno)) || ''} */}
                                <div className='invoice_table_header' style={{ width: '10%' }}>
                                    {item.Quantity || ''}
                                    {index === previewInvoiceprop.length + 1 &&
                                        <div>
                                            <b>{totalQuantity}</b>
                                        </div>
                                    }
                                </div>
                                <div className='invoice_table_header' style={{ width: '10%' }}>{unitRate(item.hsncode, item.batchno)}</div>
                                <div className='invoice_table_header' style={{ width: '10%' }}>{(index <= previewInvoiceprop.length - 1) && ' '}</div>
                                <div className='invoice_table_header' style={{ width: '7%' }}>{item.Discount || ''}</div>
                                <div className='invoice_table_header' style={{ width: '10%' }}>
                                    {/* {((parseFloat(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)) - ((parseFloat(unitRate(item.hsncode, item.batchno)) * parseFloat(item.Quantity)) * parseFloat(item.Discount) / 100)).toFixed(2) || ''} */}
                                    {((index !== previewInvoiceprop.length + 1) && index !== previewInvoiceprop.length) && (
                                        (
                                            (
                                                parseFloat(unitRate(item.hsncode, item.batchno)) * parseInt(item.Quantity)
                                            ) - (
                                                (parseFloat(unitRate(item.hsncode, item.batchno)) * parseFloat(item.Quantity)) * parseFloat(item.Discount) / 100
                                            )
                                        ).toFixed(2) || ''
                                    )}
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
                                            <b>{Math.round(formatTotal(grandTotal()))}</b>
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="numberinWord" style={{...numberinWord,padding:'3px'}}>
                        <div className="amountHeading" style={{ ...amountHeading, ...df}}>
                            <div className="changeablecontent">Amount Changeable (in words)</div>
                            <div className="oe"><b>E & O.E</b></div>
                        </div>
                        <div className="amountHeading"><b>{capitalizeIntegerWords(integerWords)} Only</b></div>
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
                                    {item.hsncode || ''}
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
                                    <div className="subGst" style={{ ...subGst, ...df}}>
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
                                            <b>{Math.round(formatTotal((TotalcgstValue()) + (TotalsgstValue())))}</b>
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
                            <div className="amountHeading"><b>{capitalizeIntegerWords(integerWords1)} Only</b></div>
                        </div>
                    </div>



                    <div className="paymentDetials1" style={paymentDetials}>
                        <div className="bankDetails" style={{ ...df, ...bankDetails, ...padInPx }}>
                            <div className="invoiceName1" style={{ marginRight: '40%' }}>
                                <QrCode totalSum={formatTotal(grandTotal())} upi={SenderInvoiceProp[0].upiid} />
                            </div>
                            <div className="ditailwithfixedwidth" style={ditailwithfixedwidth}>
                                <div className="bankName"><b>Bank Details</b></div>
                                <div className="bankName">Bank Name : {SenderInvoiceProp[0].bankname}</div>
                                <div className="bankName">Account Holder Name : {SenderInvoiceProp[0].accholdername}</div>
                                <div className="bankName">BANK ACC NO : {SenderInvoiceProp[0].bankaccno}</div>
                                <div className="bankName">IFSC CODE : {SenderInvoiceProp[0].ifsccode}</div>
                                <div className="bankAccNo">UPI ID : {SenderInvoiceProp[0].upiid}</div>
                            </div>

                        </div>

                        Company's PAN : <b>{SenderInvoiceProp[0].pan}</b>
                        <div className="acc" style={{ ...df, ...sb }}>
                            <div className="dec">
                                <b>Declaration :</b> <br />
                                We declare that this invoice shows the actual price of the goods <br />
                                described and the all particulars are true and correct.
                            </div>

                            <div className="sign" style={{ ...pad, ...sign, ...dfc }}>
                                <div className="pvtName" style={PVTname}>For {SenderInvoiceProp[0].organizationname}</div>
                                <img src={signSrc} style={Signature} alt="signature" height={10} width={300} />
                                <div className="authSign" style={AuthSign}>Authorized Sign.</div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="bussinessQuotes1"
                        style={bussinessQuotes}
                    > */}
                    {/* <div className='bussinessContent1' style={{ ...bussinessContent, ...pad }}>This is a Computer Genereated Invoice</div> */}
                    <div >This is a Computer Genereated Invoice</div>
                    {/* </div> */}
                </div>
            </div>
            <div className="actions" style={actions}>
                <CancelBtnComp dataBsDismiss="modal" />
                {generateInvoice ? (
                    <Button data-bs-dismiss="modal" variant="outlined" color="primary"
                        onClick={handleSubmit}
                    // onClick={handleDownload1}
                    >
                        Generate Invoice
                    </Button>
                ) : (
                    <Button variant="outlined" style={SaveBtn}
                        onClick={generatePDF}
                    >PDF</Button>
                )}

            </div>

            {/* {generateInvoice &
                <div class="modal-footer gap-4">
                    <CancelBtnComp dataBsDismiss="modal" />
                    <Button variant="outlined" style={SaveBtn} onClick={generatePDF}>PDF</Button>
                    <Button data-bs-dismiss="modal" variant="outlined" color="primary"
                        onClick={handleSubmit}
                    >
                        Generate Invoice
                    </Button>
                </div>
            } */}
        </div>
    )
}
export default Invoice;


