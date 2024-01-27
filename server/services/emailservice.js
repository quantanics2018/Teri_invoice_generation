const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
// console.log(crypto);

async function emailservice() {
    const to = 'nitheshwaran003@gmail.com';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'terionorganization@gmail.com',
            pass: 'imkq rydg xtla lvmx',
        },
    });

    const htmlContent = await fs.readFile(path.join(__dirname, '../MailContent/payslipbill.html'), 'utf-8');
    const mailOptions = {
        from: 'terionorganization@gmail.com',
        to: to,
        subject: 'Official mail from Terion Organization',
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error(error);
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

async function UpdatePasswordmailservice() {
    const to = 'nitheshwaran003@gmail.com';
    // const encryptedEmail = encryptEmail(to);
    const secretKey = 'edf6537e67f256578bbb90b2adb1617622d6cbe49702b832c99c6feb8cce817c';
    const encryptedEmail = encryptString(to, secretKey);
    const link = `http://localhost:3001/UpdatePassword?email=${encodeURIComponent(encryptedEmail)}`;
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
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send email');
    }
}

module.exports = { emailservice, UpdatePasswordmailservice };
