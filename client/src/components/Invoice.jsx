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
import { InvoiceHead, invoicecontent } from '../assets/style/mailInlineCss';
// import htmlPdf from 'html-pdf';

const Invoice = ({ previewInvoiceprop,
     ReciverInvoiceProp, 
     SenderInvoiceProp 
    }) => {
    console.log("SenderInvoiceProp : ",SenderInvoiceProp[0]);
    const userInfoString = sessionStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const senderid = userInfo.userid;
    // const reciverid = 'Ad001@gmail.com';
    // const [ReciverIdRes, setReciverIdRes] = useState([]);
    // const getReciverData = async () => {
    //     const getReciverDataRequest = await axios.post(`${API_URL}get/ReciverDataInvoiceAddress`, { reciverid: reciverid });
    //     console.log("getReciverDataRequest : ", getReciverDataRequest.data.data);
    //     const reciveridObj = getReciverDataRequest.data.data;
    //     console.log("reciveridObj : ", reciveridObj);
    //     setReciverIdRes(reciveridObj);
    // }

    // const sendDataToServer = async () => {
    //     try {
    //         const htmlString = ReactDOMServer.renderToString(
    //             <div className="InvoiceContainer">
    //                 Replace with Invoice in Return
    //             </div>
    //         );

    //         const response = await axios.post(`${API_URL}send-email/sendInvoice`, htmlString, {
    //             headers: {
    //                 'Content-Type': 'text/html',
    //             },
    //         });

    //         if (response.status === 200) {
    //             console.log('Mail sent successfully');
    //         } else {
    //             console.error('Failed to send data');
    //         }
    //     } catch (error) {
    //         console.error('Error sending data:', error);
    //     }
    // };


    // console.log("ReciverInvoiceProp : ",ReciverInvoiceProp);
    // const [senderIdRes,setsenderIdRes] = useState();
    // const [ReciverIdRes,setReciverIdRes] = useState();

    // const senderid = userInfo.userid;
    // const reciverid = ReciverInvoiceProp.UserId;
    // const getSenderData = async () => {
    //     const getSenderDataRequest = await axios.post(`${API_URL}get/SenderDataInvoiceAddress`, {senderid : senderid});
    //     const senderidObj = getSenderDataRequest.data.data;
    //     setsenderIdRes(senderidObj);
    // }
    // const getReciverData =  async () => {
    //     const getReciverDataRequest = await axios.post(`${API_URL}get/ReciverDataInvoiceAddress`, {reciverid:reciverid});
    //     const reciveridObj = getReciverDataRequest.data.data;
    //     setReciverIdRes(reciveridObj);
    // }
    // useEffect(() => {
    //     // sendDataToServer()
    //     // getSenderData();
    //     // getReciverData();
    // }, [senderid,reciverid]);
    // console.log(previewInvoiceprop[0].productName);

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
    return (
        <div className="InvoiceContainer">
            <div className="forScroll">
                <div className="A4SheetSize" id="invoice-content">
                    {/* <button onClick={downloadPdf}>Download PDF</button> */}
                    <button onClick={() => downloadPDF(previewInvoiceprop)}>Download PDF</button>
                    <div className="invoiceconten" 
                    // style={invoicecontent}
                    >
                        <div className="InvoiceHea" 
                        style={InvoiceHead}
                        // style={{background:'red'}}
                        >
                            <div className="invoiceDetial">
                                <pre>
                                    <h1>INVOICE</h1>
                                    Terion Distributor <br />
                                    {SenderInvoiceProp[0].fname}{SenderInvoiceProp[0].lname},<br />
                                    {SenderInvoiceProp[0].organizationname},<br />
                                    {SenderInvoiceProp[0].cstreetname},<br />
                                    {SenderInvoiceProp[0].cdistrictid},<br />
                                    {SenderInvoiceProp[0].cstateid},<br />
                                    {SenderInvoiceProp[0].cpostalcode}<br />
                                    {/* GSTIN 89898989898989 */}
                                </pre>
                            </div>
                            <div className="invoiceName">
                                <QrCode />
                            </div>
                            <div className="invoiceImg">
                                <img className='invoicepic' src={invoicePic} alt="" />
                            </div>
                        </div>
                        <div className="billDetial">
                            <div className="addressWithInvoice">
                                <div className="addressDetials">
                                    <div className="billTo">
                                        <div className="billToTittle">
                                            Bill To:(Seller)
                                        </div>
                                        <div className="billToBody">
                                            <ul className='listData'>
                                                <li>
                                                    Terion Customer code, name
                                                </li>
                                                <li>
                                                    TERION INFOTECHNOLOGIES LTD.
                                                </li>
                                                <li>
                                                    Plot No.-35, Sector - 67,
                                                </li>
                                                <li>
                                                    GSTIN : 27272727272727
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="shipTo">
                                        <div className="billToTittle">
                                            Ship To:(Buyer)
                                        </div>
                                        <div className="billToBody">
                                            <ul className='listData'>
                                                <li>
                                                    {ReciverInvoiceProp[0].email}
                                                </li>
                                                <li>
                                                    {ReciverInvoiceProp[0].fname} 
                                                    <br />
                                                    Sector-100, Noida, U.P.
                                                </li>
                                                <li>
                                                    Uttar Pradesh
                                                </li>
                                                <li>
                                                    Phone : 8888888888
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="invoiceNo">
                                    Invoice Number : 4649845 <br />
                                    Invoice Date : 08-03-2021
                                </div>
                            </div>
                            <br />
                            <table border="1">
                                <thead className='invoiceHead'>
                                    <tr>
                                        <th className='th'>S.No.</th>
                                        {/* <th className='th'>DESCRIPTION</th> */}
                                        <th className='th'>HSN NO.</th>
                                        <th className='th'>QTY.</th>
                                        <th className='th'>RATE</th>
                                        {/* <th className='th'>AMOUNT</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewInvoiceprop.map((item, index) => (
                                        <tr key={index}>
                                            <td className='td'>{index + 1}</td>
                                            {/* <td className='td'>{item.productid || ''}</td> */}
                                            <td className='td'>{item.hsncode || ''}</td>
                                            <td className='td'>{item.Quantity || ''}</td>
                                            <td className='td'>{item.Total || ''}</td>
                                            {/* <td className='td'>{item.rate ? `Rs. ${item.rate.toFixed(2)}` : ''}</td>
                                            <td className='td'>{item.amount ? `Rs. ${item.amount.toFixed(2)}` : ''}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />
                            <div className="paymentDetials">
                                <div className="paymentQrSession">
                                    <div className="makePaymetToTittle">Discription of Goods
                                    </div>
                                </div>
                                <div className="detialAboutPayment">
                                    <div className="alternating-rows-container">
                                        <div className="invoiceRow odd">TOTAL</div>
                                        <div className="invoiceRow even">DISCOUNT @</div>
                                        <div className="invoiceRow odd">TAXABLE AMOUNT</div>
                                        <div className="invoiceRow even">SGST RATE @ </div>
                                        <div className="invoiceRow odd">CGST RATE @</div>
                                        <div className="invoiceRow even">PAYABLE AMOUNT</div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            we declare that this invoice shows the actual price of the goods <br />
                            described and tht all particulars are true and correct.
                            <hr />
                            <br />
                            <br />
                            Authorized Sign.
                            <br />
                            <br />
                            <br />
                            <div className="bussinessQuotes">
                                <h5 className='bussinessContent'>THANK YOU ! WE APPRECIATE YOUR BUSINESS</h5>
                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}
export default Invoice;


