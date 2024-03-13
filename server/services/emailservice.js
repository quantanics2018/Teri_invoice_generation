const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const PDFDocument = require('pdfkit');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const { API_URL_CLIENT } = require('../serversideConfig');
const { generateQR } = require('./QrGeneration');
const userdbInstance = require('../instances/dbInstance');

async function generatePDF(htmlContent) {
    return new Promise((resolve, reject) => {
        const options = { format: 'Letter' };
        pdf.create(htmlContent, options).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
}

async function emailservice(req, res) {
    const mailcontent = req.body;
    console.log("html content: ", mailcontent.htmlString);
    console.log("mailcontent.email  : ", mailcontent.Buyer);
    const recivermail = await userdbInstance.userdb.query('select email from public."user" where organizationname=$1', [mailcontent.Buyer]);
    console.log("email to : ",recivermail.rows[0].email);
    const to = recivermail.rows[0].email;
    // const to = 'nitheshwaran003@gmail.com';
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, // or 465
        secure: false,
        service: 'gmail',
        auth: {
            user: 'terionorganization@gmail.com',
            pass: 'imkq rydg xtla lvmx',
        },
    });
    const htmlString = mailcontent.htmlString;
    const pdfFilePath = path.join(__dirname, 'GooglePay_QR.pdf');
    const pdfBuffer = await fs.readFile(pdfFilePath);
    // const qrCodeHtml = await generateQR();
    const mailOptions = {
        from: 'terionorganization@gmail.com',
        to: to,
        subject: 'Official mail from Terion Organization',
        // html: qrCodeHtml + htmlString,
        html: htmlString,
        attachments: [
            {
                filename: 'Scan and Pay.pdf',
                content: pdfBuffer,
                // encoding: 'base64',
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("sucess");
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        console.log("fail");
        res.json('Failed to send email');
        throw new Error('Failed to send email');
    }
}
async function UserAddedMailContent(req, res) {
    const { email } = req.body.userDetials
    console.log(email);
    // const to = 'nitheshwaran003@gmail.com';
    const to = email;
    const link = `${API_URL_CLIENT}`;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, // or 465
        secure: false,
        service: 'gmail',
        auth: {
            user: 'terionorganization@gmail.com',
            pass: 'imkq rydg xtla lvmx',
        },
    });
    const mailOptions = {
        from: 'terionorganization@gmail.com',
        to: to,
        subject: 'Official mail from Terion Organization',
        html: `<h1>You where added as one of the member of Terion <a href="${link}"> Click Here </a></h1>`,
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ status: true, message: 'Email sent successfully' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to send email' });
        console.error(error);
        console.log("fail");
        throw new Error('Failed to send email');
    }
}


function encryptString(plainText, secretKey) {
    const encrypted = CryptoJS.AES.encrypt(plainText, secretKey).toString();
    const base64Encoded = btoa(encrypted);
    return base64Encoded;
}

function decryptString(encryptedText, secretKey) {
    const decryptedData = CryptoJS.AES.decrypt(atob(decodeURIComponent(encryptedText)), secretKey);
    const decryptedText = decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

const encryptedText = 'VTJGc2RHVmtYMTlNb2g5ZmhyckxBbW5LOG5FTm9UQ01wUTRIUExkOGNFWjRmaTAxVW9hcU5QN0JzYmVic1A3WQ%3D%3D';
const secretKey = 'edf6537e67f256578bbb90b2adb1617622d6cbe49702b832c99c6feb8cce817c';

const decryptedText = decryptString(encryptedText, secretKey);
console.log('Decrypted Text:', decryptedText);

async function UpdatePasswordmailservice(req, res) {
    const { username } = req.body
    console.log(username);
    const to = username;
    // const to = 'nitheshwaran003@gmail.com';
    // const encryptedEmail = encryptEmail(to);
    const secretKey = 'edf6537e67f256578bbb90b2adb1617622d6cbe49702b832c99c6feb8cce817c';
    const encryptedEmail = encryptString(to, secretKey);
    const link = `${API_URL_CLIENT}UpdatePassword?email=${encodeURIComponent(encryptedEmail)}`;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'terionorganization@gmail.com',
            pass: 'imkq rydg xtla lvmx',
        },
    });

    const mailOptions = {
        from: 'terionorganization@gmail.com',
        to: to,
        // to: 'nitheshwaran003@gmail.com',
        subject: 'Official mail from Terion Organization',
        html: `Update Password<a href="${link}"> Click Here .. </a>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('mailed');
        res.json({ success: true, message: 'Check Your Mail for further Steps' });
    } catch (error) {
        console.error(error);
        res.json({ success: true, message: 'User Added Successfully ! But Failed to send email' });
        // throw new Error('Failed to send email');
    }
}
const sendInvoice = async (req, res) => {
    // const upiId = 'nitheshwaran003@okicici';
    // const htmlString = req.body
    await emailservice(req, res);
    // res.json({ success: true, message: 'send email' });
};
const UserAddedMail = async (req, res) => {
    // const {htmlString} = req.body
    await UserAddedMailContent(req, res);
};
module.exports = { emailservice, UpdatePasswordmailservice, sendInvoice, UserAddedMail };
