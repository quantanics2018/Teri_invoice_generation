import invoicePic from '../assets/logo/InvoicePic.png'
// import QRCode from 'qrcode.react';
import Qr from '../assets/logo/Qr.png'

const Invoice = () => {
    const a = "hello";
    return (
        <div className="InvoiceContainer">
            <div className="forScroll">
                <div className="A4SheetSize">
                    <div className="invoicecontent">
                        <div className="InvoiceHead">
                            <div className="invoiceDetial">
                                <pre>
                                    Terion Distributor <br />
                                    Okhla Industrial Area,<br />
                                    New Delhi-110020 <br />
                                    GSTIN 89898989898989
                                </pre>
                            </div>
                            <div className="invoiceName">
                                <h1>INVOICE</h1>
                            </div>
                            <div className="invoiceImg">
                                <img className='invoicepic' src={invoicePic} alt="" />
                            </div>
                        </div>
                        <br />
                        <div className="billDetial">
                            <div className="billTo">
                                <div className="billToTittle">
                                    Bill To:
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
                            <div className="invoiceNo">
                                Invoice Number : 4649845 <br />
                                Invoice Date : 08-03-2021
                            </div>
                            <div className="shipTo">
                                <div className="billToTittle">
                                    Ship To:
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

                        
                        <br />
                        <table border="1">
                            <thead className='invoiceHead'>
                                <tr>
                                    <th className='th'>S.No.</th>
                                    <th className='th'>DESCRIPTION </th>
                                    <th className='th'>HSN NO. </th>
                                    <th className='th'>QTY. </th>
                                    <th className='th'>RATE </th>
                                    <th className='th'>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='td'>1</td>
                                    <td className='td'>ITEM NAME 2</td>
                                    <td className='td'>2541</td>
                                    <td className='td'>26</td>
                                    <td className='td'>Rs. 235.52</td>
                                    <td className='td'>Rs. 6,123.52</td>
                                </tr>
                                <tr>
                                    <td className='td'>2</td>
                                    <td className='td'></td>
                                    <td className='td'></td>
                                    <td className='td'></td>
                                    <td className='td'></td>
                                    <td className='td'></td>
                                </tr>
                                <tr>
                                    <td className='td'>3</td>
                                    <td className='td'></td>
                                    <td className='td'></td>
                                    <td className='td'></td>
                                    <td className='td'></td>
                                    <td className='td'></td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <div className="paymentDetials">
                            <div className="paymentQrSession">
                                <div className="makePaymetToTittle">Make Payment to <br />Terion Distributor</div>
                                <div className="makePaymetToQr d-flex">
                                    <img src={Qr} alt="QR Code" className='QrCode'/>
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
    )
}
export default Invoice;


