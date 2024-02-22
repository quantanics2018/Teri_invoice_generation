// const express = require('express');
const QRCode = require('qrcode');
// const app = express();
// const cors = require('cors');
// app.use(cors());
// const nodemailer = require('nodemailer');
// const { emailservice } = require('../services/emailservice');
// const { UpdatePasswordmailservice } = require('../services/emailservice');
// // Move the generateQR function outside the route handler
// async function add() {
//     const amount = '1.00';
//     const currency = 'INR';
//     const upiId = 'nitheshwaran003@okicici';
//     // return "helo";
//     try {
//         const razorpayLink = `upi://pay?pa=${upiId}&am=${amount}&cu=${currency}`;
//         const qrCodeImage = await QRCode.toDataURL(razorpayLink);

//         return `<img src="${qrCodeImage}" alt="Razorpay QR Code" />`;
//     } catch (err) {
//         console.error('Error generating QR code:', err);
//         throw new Error('Error generating QR code');
//     }
// }
const generateQR = async (req, res) => {
    const amount = '1.00';
    const currency = 'INR';
    const upiId = 'nitheshwaran003@okicici';
    console.log(upiId);
    try {
        const razorpayLink = `upi://pay?pa=${upiId}&am=${amount}&cu=${currency}`;
        const qrCodeImage = await QRCode.toDataURL(razorpayLink);
        res.send(qrCodeImage);
        // return `<img src="${qrCodeImage}" alt="Razorpay QR Code" />`;
        if (qrCodeImage) {
            return `<img src="${qrCodeImage}" alt="Razorpay QR Code" />`;
        } else {
            throw new Error('QR code image data URL is undefined');
        }
    } catch (err) {
        console.error('Error generating QR code:', err);
        throw new Error('Error generating QR code');
    }
};

// app.get('/generateQR', async (req, res) => {
//     try {
//         const qrCodeImage = await generateQR();
//         res.send(qrCodeImage);
//     } catch (err) {
//         console.error('Error:', err.message);
//         res.status(500).send('Error generating QR code');
//     }
// });

// app.get('/mail', async (req, res) => {
//     try {
//         const result = await emailservice();
//         res.json(result);
//     } catch (err) {
//         console.error('Error:', err.message);
//         res.status(500).send('Send mail error');
//     }
// });
// app.get('/mail-updatePassword', async (req, res) => {
//     try {
//         const result = await UpdatePasswordmailservice();
//         res.json(result);
//     } catch (err) {
//         console.error('Error:', err.message);
//         res.status(500).send('Send mail error');
//     }
// });

module.exports = { generateQR };