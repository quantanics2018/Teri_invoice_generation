const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const PDFDocument = require('pdfkit');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const { API_URL_CLIENT } = require('../serversideConfig');

// console.log(crypto);

// async function generatePDF() {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument();
//         doc.text('Hello, this is a PDF document!');
//         // doc.html('<div style="background-color:green">Hello, this is a PDF document! from html</div>');
//         const buffers = [];
//         doc.on('data', buffers.push.bind(buffers));
//         doc.on('end', () => {
//             const pdfBuffer = Buffer.concat(buffers);
//             resolve(pdfBuffer);
//         });
//         doc.end();
//     });
// }
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
// async function generatePDF(htmlContent) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
//     const pdfBuffer = await page.pdf({ format: 'A4' });
//     await browser.close();
//     return pdfBuffer;
// }


async function emailservice(req, res) {
    const mailcontent = req.body;
    console.log("html content: ", mailcontent.htmlString);
    console.log("mailcontent.email  : ", mailcontent.email);
    const to = 'nitheshwaran003@gmail.com';
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

    // // var htmlContent = await fs.readFile(path.join(__dirname, '../MailContent/payslipbill.html'), 'utf-8');
    // htmlString = htmlContent.toString();
    const htmlString = mailcontent.htmlString;

    // // const pdfBuffer = await generatePDF();

    const pdfFilePath = path.join(__dirname, 'document.pdf');
    const pdfBuffer = await fs.readFile(pdfFilePath);

    // const htmlContent = await fs.readFile(path.join(__dirname, '../MailContent/payslipbill.html'), 'utf-8');
    // const pdfBuffer = await generatePDF(htmlContent);

    const mailOptions = {
        from: 'terionorganization@gmail.com',
        to: to,
        subject: 'Official mail from Terion Organization',
        html: htmlString,
        attachments: [
            // {
            //     filename: 'payslipbill.html',
            //     content: htmlContent,
            //     encoding: 'utf-8',
            // },
            {
                filename: 'Invoice.pdf',
                content: pdfBuffer,
                // encoding: 'base64',
            },
        ],
    };

    try {
        console.log("try : ", htmlString);
        await transporter.sendMail(mailOptions);
        console.log("sucess");
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error(error);
        console.log("fail");
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
    // const to = username;
    const to = 'nitheshwaran003@gmail.com';
    // const encryptedEmail = encryptEmail(to);
    const secretKey = 'edf6537e67f256578bbb90b2adb1617622d6cbe49702b832c99c6feb8cce817c';
    const encryptedEmail = encryptString(to, secretKey);
    const link = `${API_URL_CLIENT}/UpdatePassword?email=${encodeURIComponent(encryptedEmail)}`;
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
        subject: 'Official mail from Terion Organization',
        html: `Update Password<a href="${link}"> Click Here .. </a>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('mailed');
        res.json({ success: true, message: 'Check Your Mail for further Steps' });
    } catch (error) {
        console.error(error);
        res.json({ success: true, message: 'Failed to send email' });
        // throw new Error('Failed to send email');
    }
}
const sendInvoice = async (req, res) => {
    // const upiId = 'nitheshwaran003@okicici';
    // const htmlString = req.body
    // console.log("test :", htmlString);
    // console.log("test :########################################");
    await emailservice(req, res);
    res.json({ success: true, message: 'send email' });
};
const UserAddedMail = async (req, res) => {
    // const {htmlString} = req.body
    await UserAddedMailContent(req, res);
    res.json({ success: false, message: 'Failed to send email' });
};
module.exports = { emailservice, UpdatePasswordmailservice, sendInvoice, UserAddedMail };
