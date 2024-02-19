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
app.post('/add/:entity(user|products|invoice|feedback)', async (req, res) => {
    const entity = req.params.entity;
    if (entity === 'user') {
        try {
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

// Get Data From DB
app.post('/get/:entity(user|credentials|product|products|state|district|access_control|transactionHistory|productList|getUserList|profileInfo|SenderDataInvoiceAddress|ReciverDataInvoiceAddress)', async (req, res) => {
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
            const htmlString = req.body;
            console.log("hi");
            const generateQRResult = await sendInvoice(req, res, htmlString);
        } catch (error) {
            console.error('Error retrieving user details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
        cb(null, 'PassbookImg'+'userid' + path.extname(file.originalname)); // Set unique filename
    },
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));
// Example route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
    const  file = req.file;
    // console.log(file);
    const { filename } = req.file;
    res.json({ success: true, filename });
});

app.listen(4000, () => {
    console.log("server is running on port 4000");
});


























































// dont change
// POST endpoint to insert data
// app.post('/admin/insert', async (req, res) => {
//     try {
//         const {
//             MF_Id,
//             M_Email,
//             M_Phone_No,
//             M_Pan_Number,
//             M_Aadhar_Number,
//             M_Name,
//             M_Position,
//             M_Alternate_Phone_No,
//             M_User_Name,
//             M_Password,
//             M_Business_Type,
//             M_GST_Number,
//             M_Organization_Name,
//             M_Account_Name,
//             M_Account_Number,
//             M_Linked_Phone_no,
//             M_Pass_Img,
//             M_Upi_Id,
//             M_PR_Street_Address,
//             M_PR_City,
//             M_PR_State,
//             M_PR_PostalCode,
//             M_CD_Street_Address,
//             M_CD_City,
//             M_CD_State,
//             M_CD_PostalCode,
//             M_DS_Id,
//             M_Amount,
//             M_Updated_By
//         } = req.body; // Use req.body to get values from the request body
//         console.log("HII Hello", MF_Id, M_Email)
//         const result = await User_db_connection.query(`
//             INSERT INTO public.manufacturer(
//                 "MF_Id", "M_Email", "M_Phone_No", "M_Pan_Number", "M_Aadhar_Number",
//                 "M_Name", "M_Position", "M_Alternate_Phone_No", "M_User_Name",
//                 "M_Password", "M_Business_Type", "M_GST_Number", "M_Organization_Name",
//                 "M_Account_Name", "M_Account_Number", "M_Linked_Phone_no", "M_Pass_Img",
//                 "M_Upi_Id", "M_PR_Street_Address", "M_PR_City", "M_PR_State", "M_PR_PostalCode",
//                 "M_CD_Street_Address", "M_CD_City", "M_CD_State", "M_CD_PostalCode", "M_DS_Id",
//                 "M_Amount","M_Updated_By"
//             )
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)
//             RETURNING *;
//         `, [
//             MF_Id,
//             M_Email,
//             M_Phone_No,
//             M_Pan_Number,
//             M_Aadhar_Number,
//             M_Name,
//             M_Position,
//             M_Alternate_Phone_No,
//             M_User_Name,
//             M_Password,
//             M_Business_Type,
//             M_GST_Number,
//             M_Organization_Name,
//             M_Account_Name,
//             M_Account_Number,
//             M_Linked_Phone_no,
//             M_Pass_Img,
//             M_Upi_Id,
//             M_PR_Street_Address,
//             M_PR_City,
//             M_PR_State,
//             M_PR_PostalCode,
//             M_CD_Street_Address,
//             M_CD_City,
//             M_CD_State,
//             M_CD_PostalCode,
//             M_DS_Id,
//             M_Amount,
//             M_Updated_By
//         ]);

//         console.log(result.rows);
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });