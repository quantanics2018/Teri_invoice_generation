import { useEffect, useState } from 'react';
import invoicePic from '../../assets/logo/InvoicePic.png';
// import QRCode from 'qrcode.react';
import Qr from '../../assets/logo/Qr.png'
import axios from 'axios';
import QrCode from '../../components/QrCode';
import ReactDOMServer from 'react-dom/server';
import { API_URL } from '../../config';
// import { html2pdf } from 'html2pdf.js';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceHead, detialAboutPayment, invoiceHead, invoiceImg, invoiceRow, invoicecontent, invoicepic, odd, even, paymentDetials, paymentQrSession, td, th, bussinessQuotes, listData, billTo, invoiceNo, table, tbody, tBorder, rawInput, tdv, tdvDate, textarea, billDetial, bankDetails, tdh, tBorderd, tandc, nowrap, taxInvoiceHead, invoiceDetial, df, gap, gap1, dfc, addressDetials, invoicedetail, rowInvoiceDetail, inputbox, row1Invoice, width50, reciverBill, pad, textwarp, mt, sb, padInPx, bussinessContent, table1, row } from '../../assets/style/mailInlineCss';
import { Button, TextField } from '@mui/material';
// import numberToWords from 'number-to-words';
import { gag } from '../InvoiceGenerator';
import { useNavigate } from 'react-router-dom';

import { SaveBtn } from '../../assets/style/cssInlineConfig';
import { CancelBtnComp } from '../../components/AddUserBtn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// import { df } from '../assets/style/mailInlineCss';
import { Typography } from '@mui/material';
// import '/home/quantanics/Desktop/teri/client/src/assets/style/main.css';
import '../../assets/style/main.css'
import React, { useRef } from 'react';
import { style } from '../../components/BasicModal';
import Loader from '../../components/Loader';
import LoadingButton from '@mui/lab/LoadingButton';
import { ToWords } from 'to-words';
// import htmlPdf from 'html-pdf';



function formatAmountToIndianCurrency (amount){
    console.log("amount is :\t"+amount);
    var formattedAmount;
    if(amount){
        var formattedAmount = amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }else{
        var formattedAmount = "";
    }

    return formattedAmount;
}

const PDFInvoice = ({
    invoice_data
}) => {

    console.log("invoice data");
    console.log(invoice_data['invoice_data']);
    
   

    const navigate = useNavigate();
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const senderid = userInfo.userid;
    const [signSrc, setSignSrc] = useState('');
    // Handle submit
    const [Closemodel, setClosemodel] = useState(false);
    const [invoiceId, setInvoiceId] = useState('');
    const [TAXinvoiceIdstate, setTAXinvoiceIdstate] = useState('');
    const [loading, setLoading] = useState(false);
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
        marginTop: '-1rem',
    }
    const PVTname = {
        marginTop: '-1rem',
    }
    const AuthSign = {
        marginTop: '-1rem',
    }
    const toWords = new ToWords({ localeCode: 'en-IN', converterOptions: { currency: true } });
   
    const[cgst_total,setcgst] = useState(0);
    const[sgst_total,setsgst] = useState(0);
    const[total_amount,setTotalamount] = useState(0);
    useEffect(() => {
        let totalcgst = 0;
        let totalsgst = 0;
        let total_amount = 0;
        invoice_data['invoice_data'].map((item,index)=>{
            let tmp = (item.cost * item.cgst)/100;
            let tmp1 = (item.cost * item.sgst)/100;
            total_amount = total_amount+parseFloat(item.cost);
            
            totalcgst =totalcgst+tmp; 
            totalsgst = totalsgst+tmp1;

        });
        setcgst(totalcgst);
        setsgst(totalsgst);
        let value = String(parseFloat(parseFloat(total_amount) + parseFloat(totalcgst) + parseFloat(totalsgst)).toFixed(2)).split('.');
        let roundoff = 0;
        if (parseInt(value[1])<50) {
            roundoff = '-0.'+value[1];
        }else{
            roundoff = '0.'+parseInt(100-parseInt(value[1]));
        }
        console.log("total amount is :\t"+roundoff);
        setTotalamount(roundoff);


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
    },[signSrc]);

    const invoiceRef = useRef(null);
    // generate pdf function
    const generatePDF = async () => {
        try {
               
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                const canvas = await html2canvas(invoiceRef.current, {
                    scale: 2,
                    useCORS: true,
                    logging: true
                });
                const imageData = canvas.toDataURL('image/jpeg');
                const pdf = new jsPDF();
                pdf.addImage(imageData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
                pdf.save(`myinvoice.pdf`);
                setLoading(false);
            }
               
            catch (error) {
                console.log(error);
            }
        

    }

   
    return (
        <>
        <div className="fullPage">
            <div className="A4SheetSize" id="invoiceContent1" style={pad} ref={invoiceRef}>
                <div className="taxInvoiceHead" style={taxInvoiceHead} id="taxInvoiceHead">
                    <h2>TAX INVOICE</h2>
                </div>
                <br />

                <div className="billDetial" style={{ ...billDetial, ...dfc }}>
                    <div className="addressDetials" style={addressDetials}>
                        <div className="shipTo1" style={billTo}>
                            <div className="invoiceDetial1"
                                style={{ ...invoiceDetial, ...padInPx }}
                            >
                                <pre style={{ ...textwarp, padding: '3px' }}>
                                    <div className="organizationName" style={{ fontWeight: 900, fontSize: '20px' }}>
                                        {invoice_data['sender_data'][0].organizationname}
                                    </div>
                                    No : {invoice_data['sender_data'][0].pstreetname}<br />
                                    {invoice_data['sender_data'][0].pdistrictid} -
                                    {" " + invoice_data['sender_data'][0].ppostalcode}<br />
                                    Ph : {invoice_data['sender_data'][0].phno}<br />
                                    GSTIN/UIN : {invoice_data['sender_data'][0].gstnno}<br />
                                    State Name : {invoice_data['sender_data'][0].pstateid}<br />
                                    E-Mail : {invoice_data['sender_data'][0].email}<br />
                                </pre>
                            </div>

                            <div className="buyerDetail">
                                <div className="billToBody" style={padInPx}>
                                    <pre style={{ ...reciverBill, ...textwarp, padding: '3px' }}>
                                        Buyer:(Bill To) <br />
                                        {invoice_data['receiver_data'][0].organizationname} <br />
                                        {invoice_data['receiver_data'][0].pstreetname}<br />
                                        {invoice_data['receiver_data'][0].pdistrictid} -
                                        {" " + invoice_data['receiver_data'][0].ppostalcode}<br />
                                        Ph : {invoice_data['receiver_data'][0].phno}<br />
                                        GSTIN/UIN : {invoice_data['receiver_data'][0].gstnno}<br />
                                        State Name : {invoice_data['receiver_data'][0].pstateid}<br />
                                        E-Mail : {invoice_data['receiver_data'][0].email}<br />
                                    </pre>
                                </div>
                            </div>
                        </div>
                        <div className="invoicedetail" style={{ ...invoicedetail, padding: '3px' }}>
                            <div className="rowInvoiceDetail" style={{ ...rowInvoiceDetail, ...df }}>
                                <div className="row1Invoice" style={{ ...row1Invoice, ...width50, ...padInPx }}>
                                    
                                    <div> Invoice No. {invoice_data['invoice_data'][0].invoiceid}</div>
                                   
                                </div>
                                <div className="row2Invoice" style={{ ...width50, ...padInPx }}>
                                    Date : {invoice_data['invoice_data'][0].date}
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
                        <div style={rowStyle}>
                            <div className='invoice_table_header' style={{ width: '6%', padding: '3px' }}>S.No.</div>
                            <div className='invoice_table_header' style={{ width: '34%' }}>Description of Goods</div>
                            <div className='invoice_table_header' style={{ width: '13%' }}>HSN NO</div>
                            <div className='invoice_table_header' style={{ width: '10%' }}>Quantity</div>
                            <div className='invoice_table_header' style={{ width: '10%' }}>Rate</div>
                            <div className='invoice_table_header' style={{ width: '10%' }}>per</div>
                            <div className='invoice_table_header' style={{ width: '7%' }}>Disc. %</div>
                            <div className='invoice_table_header' style={{ width: '10%' }}>Amount</div>
                        </div>
                        {invoice_data['invoice_data'].map((item, index) =>
                            
                            <div style={rowStyle}>
                                <div className='invoice_table_header' style={{ width: '6%', padding: '3px' }}>{(index <= invoice_data['invoice_data'].length - 1) && index + 1}</div>
                                <div className='invoice_table_header' style={{ width: '34%' }}>
                                    {item.productname || ''}
                                    {console.log("index is :\t"+index)}
                                    {console.log("the lenght is:\t"+(parseInt(index+1)===(invoice_data['invoice_data'].length)))}
                                    {parseInt(index+1) === parseInt(invoice_data['invoice_data'].length) &&
                                        <div style={totalgstname}>
                                            <div className="invoiceRow1 even1">
                                                CGST
                                            </div>
                                            <div className="invoiceRow1 even1">
                                                SGST
                                            </div>
                                            <div className="invoiceRow1 even1">
                                                Round Off
                                            </div>
                                        </div>
                                    }
                                    {parseInt(index+1) === invoice_data['invoice_data'].length &&
                                        <div style={{ padding: '3px' }}>
                                            <b>Total</b>
                                        </div>
                                    }
                                </div>
                                <div className='invoice_table_header' style={{ width: '13%' }}>{item.productid}</div>
                                <div className='invoice_table_header' style={{ width: '10%' }}>
                                    {item.quantity || ''}
                                    {index === invoice_data['invoice_data'].length + 1 &&
                                        <div>
                                            <b>{item.quantity}</b>
                                        </div>
                                    }
                                </div>
                                <div className='invoice_table_header' style={{ width: '10%' }}>{formatAmountToIndianCurrency(item.priceperitem)}</div>
                                <div className='invoice_table_header' style={{ width: '10%' }}>{(index <= invoice_data['invoice_data'].length - 1) && ' '}</div>
                                <div className='invoice_table_header' style={{ width: '7%' }}>{item.discountperitem}</div>
                                <div className='invoice_table_header' style={{ width: '10%' }}>
                                    {((index !== invoice_data['invoice_data'].length + 1) && index !== invoice_data['invoice_data'].length) && (
                                       formatAmountToIndianCurrency(parseFloat(item.cost).toFixed(2))
                                    )}
                                    {parseInt(index+1) === parseInt(invoice_data['invoice_data'].length) &&

                                        <div style={totalgstname}>
                                            <div className="invoiceRow1 even1">
                                                <div className="totalVal1">{formatAmountToIndianCurrency(parseFloat(cgst_total).toFixed(2))}</div>
                                            </div>
                                            <div className="invoiceRow1 even1">
                                                <div className="totalVal1">{formatAmountToIndianCurrency(parseFloat(sgst_total).toFixed(2))}</div>
                                            </div>
                                            <div className="invoiceRow1 even1">
                                                <div className="totalVal1">{formatAmountToIndianCurrency(parseFloat(total_amount).toFixed(2))}</div>
                                            </div>
                                        </div>
                                    }
                                    {parseInt(index+1) === invoice_data['invoice_data'].length &&
                                        <div>
                                            <b>{formatAmountToIndianCurrency(Math.round(parseFloat(item.cost)+parseFloat(cgst_total)+parseFloat(sgst_total)))}</b>
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="numberinWord" style={{ ...numberinWord, padding: '3px' }}>
                        <div className="amountHeading" style={{ ...amountHeading, ...df }}>
                            <div className="changeablecontent">Amount Changeable (in words)</div>
                            <div className="oe"><b>E & O.E</b></div>
                        </div>
                        <div className="amountHeading"><b>{toWords.convert(parseInt(parseFloat(invoice_data['invoice_data'][0].cost)+parseFloat(sgst_total)+parseFloat(cgst_total)))}</b></div>
                    </div>
                    <div style={containerStyle}>
                        {/* Table heading row */}
                        <div style={rowStyle}>
                            <div style={{ ...cellStyle, borderRight: 'none', borderBottom: 'none', padding: '3px' }}>HSN/SAC</div>
                            <div style={{ ...cellStyle, borderRight: 'none', borderBottom: 'none' }}>Taxable Value</div>
                            <div style={{ ...cellStyle, borderRight: 'none', borderBottom: 'none' }}>
                                <div className="cgst" style={{ paddingBottom: '3px' }}>CGST</div>
                                <div className="subGst" style={{ ...subGst, ...df, borderBottom: 'none' }}>
                                    <div className="cgstRate" style={{ ...cgstRate, borderBottom: 'none', paddingBottom: '3px' }}>Rate</div>
                                    <div className="cgstAmount" style={{ ...cgstAmount, paddingBottom: '3px' }}>Amount</div>
                                </div>
                            </div>
                            <div style={{ ...cellStyle, borderRight: 'none', borderBottom: 'none' }}>
                                <div className="cgst" style={{ paddingBottom: '3px' }}>SGST/UTGST</div>
                                <div className="subGst" style={{ ...subGst, ...df }}>
                                    <div className="cgstRate" style={{ ...cgstRate, borderBottom: 'none', paddingBottom: '3px' }}>Rate</div>
                                    <div className="cgstAmount" style={{ ...cgstAmount, paddingBottom: '3px' }}>Amount</div>
                                </div>
                            </div>
                            <div style={{ ...cellStyle, borderBottom: 'none' }}>Total Tax Amount</div>
                        </div>
                        {invoice_data['invoice_data'].map((item, index) =>
                            <div style={{ ...rowStyle}} >
                                <div style={{ ...cellStyle, borderRight: 'none', borderBottom: parseInt(index) === invoice_data['invoice_data'].length? 'none' : '1px solid black',paddingTop: '8px' ,padding:'3px'}}>
                                    {item.productid}
                                    {parseInt(index+1) === invoice_data['invoice_data'].length &&
                                        <div style={{borderTop:'1px solid black'}}>
                                            <b >Total</b>
                                        </div>
                                    }
                                </div>
                                <div style={{ ...cellStyle, borderRight: 'none', borderBottom: parseInt(index) === invoice_data['invoice_data'].length? 'none' : '1px solid black' ,paddingTop:'7px'}}>
                                    {formatAmountToIndianCurrency(parseInt(item.cost))}
                                    {parseInt(index+1) === invoice_data['invoice_data'].length &&
                                        <div style={{borderTop:'1px solid black'}}>
                                            <b>{formatAmountToIndianCurrency(item.cost)}</b>
                                        </div>
                                    }
                                </div>
                                <div style={{ ...cellStyle, borderRight: 'none', borderBottom: parseInt(index) === invoice_data['invoice_data'].length? 'none' : '1px solid black'  }}>
                                    {parseInt(index) !== invoice_data['invoice_data'].length &&
                                        <div className="subGst" style={{ ...subGst, ...df }}>
                                            <div className="cgstRate" style={{ ...cgstRate, height: '30px', ...df, justifyContent: 'center', alignItems: 'center' }}>
                                                {parseInt(item.cgst) ? parseInt(item.cgst) + '%' : ''}
                                            </div>
                                            <div className="cgstAmount" style={cgstAmount}>{formatAmountToIndianCurrency(parseFloat(cgst_total).toFixed(2))}</div>
                                        </div>
                                    }
                                    {parseInt(index+1) === invoice_data['invoice_data'].length &&
                                        <div style={{borderTop:'1px solid black'}}>
                                            <b>{formatAmountToIndianCurrency(item.cost)}</b>
                                        </div>
                                    }
                                </div>
                                <div style={{ ...cellStyle, borderRight: 'none', borderBottom: parseInt(index) === invoice_data['invoice_data'].length? 'none' : '1px solid black' }}>
                                    {index !== invoice_data['invoice_data'].length &&
                                        <div className="subGst" style={{ ...subGst, ...df }}>
                                            <div className="cgstRate" style={{ ...cgstRate, height: '30px', ...df, justifyContent: 'center', alignItems: 'center' }}>
                                                {parseInt(item.sgst) ? parseInt(item.sgst) + '%' : ''}
                                            </div>
                                            <div className="cgstAmount" style={cgstAmount}>
                                                {formatAmountToIndianCurrency(parseFloat(sgst_total).toFixed(2))}
                                            </div>
                                        </div>
                                    }
                                    {parseInt(index+1) === invoice_data['invoice_data'].length &&
                                        <div style={{borderTop:'1px solid black'}}>
                                            <b>{formatAmountToIndianCurrency(item.cost)}</b>
                                        </div>
                                    }
                                </div>
                                <div style={{ ...cellStyle, borderBottom: parseInt(index) === invoice_data['invoice_data'].length? 'none' : '1px solid black',paddingTop:'7px'}}>
                                    {formatAmountToIndianCurrency(parseFloat(cgst_total+sgst_total).toFixed(2))}
                                    {parseInt(index+1) === invoice_data['invoice_data'].length &&
                                        <div style={{borderTop:'1px solid black'}}>
                                            <b>{formatAmountToIndianCurrency(Math.round(parseFloat((cgst_total) + (sgst_total)).toFixed(2)))}</b>
                                        </div>
                                    }

                                </div>
                            </div>
                        )}
                    </div>

                    <div className="numberinWord"
                        style={numberinWord}
                    >
                        <div className="amountHeading" style={df}>
                            <div className="changeablecontent">Taxable Amount (in words) : </div>
                            <div className="amountHeading"><b>{toWords.convert(parseInt(parseFloat(invoice_data['invoice_data'][0].cost)+parseFloat(sgst_total)+parseFloat(cgst_total)))}</b></div>
                        </div>
                    </div>



                    <div className="paymentDetials1" style={paymentDetials}>
                        <div className="bankDetails" style={{ ...df, ...bankDetails, ...padInPx }}>
                            <div className="invoiceName1" style={{ marginRight: '40%' }}>
                                <QrCode totalSum={invoice_data['invoice_data'][0].cost} upi={invoice_data['sender_data'][0].upiid} />
                            </div>
                            <div className="ditailwithfixedwidth" style={ditailwithfixedwidth}>
                                <div className="bankName"><b>Bank Details</b></div>
                                <div className="bankName">Bank Name : {invoice_data['sender_data'][0].bankname}</div>
                                <div className="bankName">Account Holder Name : {invoice_data['sender_data'][0].accholdername}</div>
                                <div className="bankName">BANK ACC NO : {invoice_data['sender_data'][0].bankaccno}</div>
                                <div className="bankName">IFSC CODE : {invoice_data['sender_data'][0].ifsccode}</div>
                                <div className="bankAccNo">UPI ID : {invoice_data['sender_data'][0].upiid}</div>
                            </div>
                        </div>

                        Company's PAN : <b>{invoice_data['sender_data'][0].pan}</b>
                        <div className="acc" style={{ ...df, ...sb }}>
                            <div className="dec">
                                <b>Declaration :</b> <br />
                                We declare that this invoice shows the actual price of the goods <br />
                                described and the all particulars are true and correct.
                            </div>

                            <div className="sign" style={{ ...pad, ...sign, ...dfc }}>
                                <div className="pvtName" style={PVTname}>For {invoice_data['sender_data'][0].organizationname}</div>
                                <img src={signSrc} 
                                style={{ ...Signature, maxHeight: '80px', maxWidth: '300px', width: '70%', height: '90%' }}
                                alt="Signature Required" 
                                // height={10} width={30} 
                                />
                                <div className="authSign" style={AuthSign}>Authorized Sign.</div>
                            </div>
                        </div>
                    </div>

                   
                    <div style={{ display: 'flex', justifyContent: 'center' }}>This is a Computer Genereated Invoice</div>
                </div>
            </div>
            <div className="actions" style={actions}>
                <CancelBtnComp dataBsDismiss="modal" loading={loading} />
                {loading ?(
                    <LoadingButton
                        endIcon={"hai"}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained">
                        <span>Processing</span>
                    </LoadingButton>
                ):(
                    <Button variant="outlined" style={loading ? { width: '100px' } : SaveBtn}  disabled={loading} onClick={generatePDF}>PDF</Button>
                )}

            </div>
            </div>
           
        </>
    )
}
export default PDFInvoice;


