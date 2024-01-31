import { useEffect, useState } from 'react';
import invoicePic from '../assets/logo/InvoicePic.png'
// import QRCode from 'qrcode.react';
import Qr from '../assets/logo/Qr.png'
import axios from 'axios';
import QrCode from './QrCode';
import ReactDOMServer from 'react-dom/server';
import { API_URL } from '../config';

const Invoice = ({ previewInvoiceprop }) => {
    console.log(previewInvoiceprop);
    console.log(previewInvoiceprop[0].productname);
    const sendDataToServer = async () => {
        try {
            const htmlString = ReactDOMServer.renderToString(
                <div className="InvoiceContainer">
                    <div className="forScroll">
                        <div className="A4SheetSize">
                            <div className="invoicecontent">
                                <div className="InvoiceHead">
                                    <div className="invoiceDetial">
                                        <pre>
                                            <h1>INVOICE</h1>
                                            Terion Distributor <br />
                                            Okhla Industrial Area,<br />
                                            New Delhi-110020 <br />
                                            GSTIN 89898989898989
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
                                                            xxxxx xxxxx xx
                                                        </li>
                                                        <li>
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
                                    <br />
                                    <table border="1">
                                        <thead className='invoiceHead'>
                                            <tr>
                                                <th className='th'>S.No.</th>
                                                <th className='th'>DESCRIPTION</th>
                                                <th className='th'>HSN NO.</th>
                                                <th className='th'>QTY.</th>
                                                <th className='th'>RATE</th>
                                                <th className='th'>AMOUNT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {previewInvoiceprop.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='td'>{index + 1}</td>
                                                    <td className='td'>{item.productid || ''}</td>
                                                    <td className='td'>{item.productname || ''}</td>
                                                    <td className='td'>{item.qty || ''}</td>
                                                    <td className='td'>{item.rate ? `Rs. ${item.rate.toFixed(2)}` : ''}</td>
                                                    <td className='td'>{item.amount ? `Rs. ${item.amount.toFixed(2)}` : ''}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <br />

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
            );

            const response = await axios.post(`${API_URL}send-email/sendInvoice`, htmlString, {
                headers: {
                    'Content-Type': 'text/html',
                },
            });

            if (response.status === 200) {
                console.log('Data sent successfully');
            } else {
                console.error('Failed to send data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    useEffect(() => {
        sendDataToServer()
    }, []);
    return (
        <div className="InvoiceContainer">
            <div className="forScroll">
                <div className="A4SheetSize">
                    <div className="invoicecontent">
                        <div className="InvoiceHead">
                            <div className="invoiceDetial">
                                <pre>
                                    <h1>INVOICE</h1>
                                    Terion Distributor <br />
                                    Okhla Industrial Area,<br />
                                    New Delhi-110020 <br />
                                    GSTIN 89898989898989
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
                                                    xxxxx xxxxx xx
                                                </li>
                                                <li>
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
                            <br />
                            <table border="1">
                                <thead className='invoiceHead'>
                                    <tr>
                                        <th className='th'>S.No.</th>
                                        <th className='th'>DESCRIPTION</th>
                                        <th className='th'>HSN NO.</th>
                                        <th className='th'>QTY.</th>
                                        <th className='th'>RATE</th>
                                        <th className='th'>AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewInvoiceprop.map((item, index) => (
                                        <tr key={index}>
                                            <td className='td'>{index + 1}</td>
                                            <td className='td'>{item.productid || ''}</td>
                                            <td className='td'>{item.productname || ''}</td>
                                            <td className='td'>{item.qty || ''}</td>
                                            <td className='td'>{item.rate ? `Rs. ${item.rate.toFixed(2)}` : ''}</td>
                                            <td className='td'>{item.amount ? `Rs. ${item.amount.toFixed(2)}` : ''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br />

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


