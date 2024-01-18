const nodemailer = require('nodemailer');

async function emailservice(req, res) {
    const { username, to, data, subject } = req.body;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'terionorganization@gmail.com',
            pass: 'imkq rydg xtla lvmx',
        },
    });

    const mailOptions = {
        from: 'terionorganization@gmail.com',
        to: username,
        subject: 'Official mail from Terion Organization',
        html: "<a href='http://localhost:3001/'>Update Password</a>",
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send email' });
    }
}

module.exports = { emailservice };
