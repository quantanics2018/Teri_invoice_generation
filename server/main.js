const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');  // Require the 'fs' module to read files
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.text({ type: 'text/html' }));
app.use(express.json());
const addData = require('./Functions/insertFunctions');
const verifyData = require('./Functions/verifyFunction');
const deleteData = require('./Functions/deletefunctions');
const getData = require('./Functions/getFunctions');
const updateData = require('./Functions/updateFunctions');
// const { emailservice } = require('./services/emailservice');
const { UpdatePasswordmailservice } = require('./services/emailservice');
const { sendInvoice } = require('./services/emailservice');
const { generateQR } = require('./services/QrGeneration');
const multer = require('multer');
// var upload = multer({ dest: './uploads/' });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        console.log("print helo Inside : ");
        // const imageName = req.body.imageName;
        console.log("Inner : ", req.body);
        cb(null, 'PassbookImg' + 'userid' + path.extname(file.originalname)); // Set unique filename
    },
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));


app.post('/verify/:entity(user|credentials)', async (req, res) => {
    const entity = req.params.entity;
    if (entity === 'credentials') {
        let result = await verifyData.checkCredentials(req, res);
    }
    else {
        res.status(400).send('Invalid elements value');
    }

});

// add into DB
app.post('/add/:entity(user|products|invoice|feedback)', upload.single('image'), async (req, res) => {
    const entity = req.params.entity;
    if (entity === 'user') {
        try {
            // const passbookImg  = req.body.SignatureImage;
            // console.log(passbookImg);
            // res.json({ message: "Testing-1" });
            const addUser = await addData.addUser(req, res);
        } catch (error) {
            console.error('Error retrieving user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    if (entity === 'products') {
        try {
            const addUser = await addData.addProduct(req, res);
        } catch (error) {
            console.error('Error Adding products details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    if (entity === 'feedback') {
        try {
            const addUser = await addData.addfeedback(req, res);
        } catch (error) {
            console.error('Error Adding feedback details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    if (entity === 'invoice') {
        try {
            const addUser = await addData.addInvoice(req, res);
        } catch (error) {
            console.error('Error retrieving products details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
})
app.use('/images', express.static(path.join(__dirname, 'uploads')));
// Get Data From DB
app.post('/get/:entity(user|credentials|product|products|state|district|access_control|transactionHistory|productList|getUserList|profileInfo|SenderDataInvoiceAddress|ReciverDataInvoiceAddress|signature)', async (req, res) => {
    const entity = req.params.entity;
    const requestData = req.body;
    if (entity === 'user') {
        try {
            var userdata = await getData.getUserData(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    if (entity === 'SenderDataInvoiceAddress') {
        try {
            var userdata = await getData.SenderDataInvoiceAddress(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    if (entity === 'signature') {
        try {
            const { userid } = req.body;
            console.log("senderid - : ", userid);
            res.sendFile(path.join(__dirname, 'uploads', `${userid}.jpeg`));
            // var userdata = await getData.GetSignature(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    if (entity === 'ReciverDataInvoiceAddress') {
        try {
            var userdata = await getData.ReciverDataInvoiceAddress(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    if (entity === 'profileInfo') {
        try {
            var userdata = await getData.getprofileInfo(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    if (entity === 'product') {
        var userdata = await getData.getProductDataIndividual(req, res);
    }
    if (entity === 'products') {
        try {
            var userdata = await getData.getProducts(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    if (entity === 'transactionHistory') {
        try {
            var userdata = await getData.getTransactionHistory(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    if (entity === 'productList') {
        try {
            var userdata = await getData.getProductList(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    if (entity === 'getUserList') {
        try {
            var userdata = await getData.getUserList(req, res);
        }
        catch (error) {
            res.send("error");
            console.error("Error retrieving data");
        }
    }
    // else {
    //     res.status(400).send('Invalid elements value');
    // }
});

app.get('/get/:entity(user|product)/:id', async (req, res) => {
    const entity = req.params.entity;
    const { id } = req.params;
    if (entity === 'user') {
        var userdata = await getData.getUserDataIndividual(req, res);
    }
    // else if (entity === 'product') {
    //     var userdata = await getData.getProductDataIndividual(req, res);
    // }
    else {
        res.status(400).send('Invalid elements value');
    }
})



// Update Data from DB
app.put('/update/:entity(user|product|productremove|userremove|password|productQuantity|reciverStatus|senderStatus)', async (req, res) => {
    const entity = req.params.entity;
    if (entity === 'user') {
        var userdata = await updateData.updateUserDataIndividual(req, res);
    }
    else if (entity === 'product') {
        var userdata = await updateData.updateProductDataIndividual(req, res);
    }
    else if (entity === 'productremove') {
        var userdata = await updateData.updateProducts(req, res);
    }
    else if (entity === 'productQuantity') {
        var userdata = await updateData.productQuantity(req, res);
    }
    else if (entity === 'userremove') {
        var userdata = await updateData.updateStatusToRemove(req, res);
    }
    else if (entity === 'password') {
        var userdata = await updateData.updateUserPassword(req, res);
    }
    else if (entity === 'reciverStatus') {
        var userdata = await updateData.updatereciverStatus(req, res);
    }
    else if (entity === 'senderStatus') {
        var userdata = await updateData.updatesenderStatus(req, res);
    }
});

// Delete data
app.post('/delete/:entity(user|products)', async (req, res) => {
    const entity = req.params.entity;
    if (entity === 'user') {
        try {
            const deleteUser = await deleteData.deleteUser(req, res);
        } catch (error) {
            console.error('Error retrieving user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    if (entity === 'products') {
        try {
            const deleteUser = await deleteData.deleteInvoice(req, res);
        } catch (error) {
            console.error('Error retrieving user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
})

app.post('/send-email/:entity(updatePassword|generateQR|sendInvoice)', async (req, res) => {
    // emailservice
    const entity = req.params.entity;
    if (entity === 'updatePassword') {
        try {
            const deleteUser = await UpdatePasswordmailservice(req, res);
        } catch (error) {
            console.error('Error retrieving user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    if (entity === 'generateQR') {
        try {
            const generateQRResult = await generateQR(req, res);
        } catch (error) {
            console.error('Error retrieving user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    if (entity === 'sendInvoice') {
        try {
            // const htmlString = req.body;
            // console.log("test1");
            const generateQRResult = await sendInvoice(req, res);
        } catch (error) {
            console.error('Error retrieving user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});

// Example route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;
    const { imageName } = req.body;
    // console.log("outer : ",imageName);

    fs.rename(file.path, './uploads/' + (imageName + path.extname(file.originalname)), function (err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error renaming file' });
        }
        res.json({ success: true, message: `Photo Uploaded Successfully ${imageName}`, filename: imageName });
    });

    // res.json({ status: true, message: 'Photo Uploaded Successfully' });
    // res.json({ success: true, filename });
});

app.listen(4000, () => {
    console.log("server is running on port 4000");
});

