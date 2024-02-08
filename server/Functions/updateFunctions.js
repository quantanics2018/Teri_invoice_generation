const userdbInstance = require('../instances/dbInstance');
async function updateUserDataIndividual(req, res) {
    const {
        userid,
        OrganizationName,
        bussinessType,
        gstNumber,
        panNumber,
        aadharNo,
        fName,
        lName,
        Positionid,
        email,
        mobileNo,
        adminid,
        upiPaymentNo,
        accName,
        accNo,
        passbookImg,

        pAddress,
        streetAddress,
        City,
        State,
        pCode,

        CommunicationAddress,
        StreetAddress2,
        City2,
        State2,
        PostalCode2
    } = req.body.inputValues;
    const AccessOptions = req.body.AccessOptions;
    // console.log(AccessOptions.Distributor);
    try {
        await userdbInstance.userdb.query('BEGIN');
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public."user"
        SET email=$1, phno=$2, aadhar=$3, pan=$4, pstreetname=$5, pdistrictid=$6, pstateid=$7, ppostalcode=$8 , cstreetname=$9, cdistrictid=$10,cstateid=$11, cpostalcode=$12,organizationname=$13, gstnno=$14, bussinesstype=$15, fname=$16, lname=$17, upiid=$18,bankname=$19, bankaccno=$20,passbookimg=$21 WHERE userid=$22;`, [email, mobileNo, aadharNo, panNumber, streetAddress, City, State, pCode, StreetAddress2, City2, State2, PostalCode2, OrganizationName, gstNumber, bussinessType, fName, lName, upiPaymentNo, accName, accNo, passbookImg, userid]);

        // Staff Controls
        if (AccessOptions['Staff'] === 'No access') {
            Staff_uc = 0;
        } else if (AccessOptions['Staff'] === 'View') {
            Staff_uc = 1;
        }
        else if (AccessOptions['Staff'] === 'Edit') {
            Staff_uc = 2;
        }
        else if (AccessOptions['Staff'] === 'All') {
            Staff_uc = 3;
        }
        // Distributor Controls
        if (AccessOptions['Distributor'] === 'No access') {
            Distributor_uc = 0;
        } else if (AccessOptions['Distributor'] === 'View') {
            Distributor_uc = 1;
        }
        else if (AccessOptions['Distributor'] === 'Edit') {
            Distributor_uc = 2;
        }
        else if (AccessOptions['Distributor'] === 'All') {
            Distributor_uc = 3;
        }
        // Customer Controls
        if (AccessOptions['Customer'] === 'No access') {
            customer_uc = 0;
        } else if (AccessOptions['Customer'] === 'View') {
            customer_uc = 1;
        }
        else if (AccessOptions['Customer'] === 'Edit') {
            customer_uc = 2;
        }
        else if (AccessOptions['Customer'] === 'All') {
            customer_uc = 3;
        }
        // Products Controls
        if (AccessOptions['Products'] === 'No access') {
            Products_uc = 0;
        } else if (AccessOptions['Products'] === 'View') {
            Products_uc = 1;
        }
        else if (AccessOptions['Products'] === 'Edit') {
            Products_uc = 2;
        }
        else if (AccessOptions['Products'] === 'All') {
            Products_uc = 3;
        }
        // Invoice Generator Controls
        if (AccessOptions['Invoice Generator'] === 'No access') {
            InvoiceGenerator_uc = 0;
        } else if (AccessOptions['Invoice Generator'] === 'View') {
            InvoiceGenerator_uc = 1;
        }
        else if (AccessOptions['Invoice Generator'] === 'Edit') {
            InvoiceGenerator_uc = 2;
        }
        else if (AccessOptions['Invoice Generator'] === 'All') {
            InvoiceGenerator_uc = 3;
        }
        // Invoice PaySlip Controls
        if (AccessOptions['Invoice PaySlip'] === 'No access') {
            InvoicePaySlip_uc = 0;
        } else if (AccessOptions['Invoice PaySlip'] === 'View') {
            InvoicePaySlip_uc = 1;
        }
        else if (AccessOptions['Invoice PaySlip'] === 'Edit') {
            InvoicePaySlip_uc = 2;
        }
        else if (AccessOptions['Invoice PaySlip'] === 'All') {
            InvoicePaySlip_uc = 3;
        }

        const UpdateAccessControll = await userdbInstance.userdb.query(`UPDATE public.accesscontroll
        SET  distributer=$1, product=$2, invoicegenerator=$3,customer=$4, staff=$5, invoicepayslip=$6
        WHERE userid=$7;`, [Distributor_uc, Products_uc, InvoiceGenerator_uc, customer_uc, Staff_uc, InvoicePaySlip_uc, userid]);
        await userdbInstance.userdb.query('COMMIT');

        if (userUpdateResult.rowCount === 1) {
            // The update was successful
            console.log("updated successfully");
            res.json({ message: "Successfully Updated", status: true });
        } else {
            // No rows were updated, handle accordingly
            res.status(404).json({ message: "User not found", status: false });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateProductDataIndividual(req, res) {
    // const {productid} = req.body;
    const { priceperitem,
        productid,
        productname,
        quantity,
        batchno,
        CGST,
        SGCT
    } = req.body.productdetial;
    const { updator } = req.body;
    // const batchnoInt = Number(batchno); 
    // console.log(batchno,CGST,SGCT);
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET quantity=$1, priceperitem=$2,productname=$3,batchno=$4,cgst=$5,sgst=$6
        WHERE productid=$7 and belongsto=$8; `, [quantity, priceperitem, productname, batchno, CGST, SGCT, productid, updator]);
        console.log("sucess", userUpdateResult);
        if (userUpdateResult.rowCount === 1) {
            // The update was successful
            res.json({ message: "Successfully Updated", status: true });
        } else {
            // No rows were updated, handle accordingly
            res.json({ message: "Oops! Something Went Wrong", status: false });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.json({ message: "Internal Server Error", status: false });
    }
}
async function updateStatusToRemove(req, res) {
    const { userid, status } = req.body;
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public."user"
        SET status=$1
        WHERE userid=$2;`, [status, userid]);
        if (userUpdateResult.rowCount === 1) {
            // The update was successful
            res.json({ resStatus: status, qos: "success" });
        } else {
            // No rows were updated, handle accordingly
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateUserPassword(req, res) {
    const { username, password } = req.body;
    console.log(password, username);
    try {
        const checkIsUsernameExist = await userdbInstance.userdb.query('select username from public.credentials where username=$1;', [username]);
        if (checkIsUsernameExist.rows != 0) {
            const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public."credentials"
            SET password=$1
            WHERE username=$2;`, [password, username]);
            if (userUpdateResult.rowCount === 1) {
                // The update was successful
                res.json({ message: "Password Updated Successfully", qos: "success" });
            } else {
                // No rows were updated, handle accordingly
                res.status(404).json({ message: "Not Updated Properly" });
            }
        }
        else {
            console.log("Username doesn't exist");
            res.send({ message: `${username} Username doesn't exist`, status: 'notExist' });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updatereciverStatus(req, res) {
    const { invoiceId, textVal } = req.body;
    // console.log(invoiceId, textVal);
    try {
        const reciverStatusResult = await userdbInstance.userdb.query(`UPDATE public.invoice
            SET reciverstatus=$1, transactionid=$2
            WHERE invoiceid=$3;`, ['1',textVal, invoiceId]);
        if (reciverStatusResult.rowCount === 1) {
            res.json({ message: "Status Updated Successfully", qos: "success" });
        } else {
            res.status(404).json({ message: "Not Updated Properly" });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function updatesenderStatus(req, res) {
    const { invoiceId} = req.body;
    // console.log(invoiceId);
    try {
        const reciverStatusResult = await userdbInstance.userdb.query(`UPDATE public.invoice
            SET senderstatus=$1
            WHERE invoiceid=$2;`, ['1',invoiceId]);
        if (reciverStatusResult.rowCount === 1) {
            res.json({ message: "Status Updated Successfully", qos: "success" });
        } else {
            res.status(404).json({ message: "Not Updated Properly" });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateProducts(req, res) {
    const { productid, batchno } = req.body.productDetial;
    const currentUser = req.body.currentUserId;
    const { productdetial, status } = req.body;
    console.log(status, currentUser);

    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET status=$1
        WHERE productid=$2 and  batchno=$3 and belongsto=$4;`, [status, productid, batchno, currentUser]);
        if (userUpdateResult.rowCount === 1) {
            res.json({ resStatus: status, qos: "success" });
        } else {
            console.log("sending response");
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function productQuantity(req, res) {
    const { productid, currentUserUserid, Quantity } = req.body;
    console.log(productid, currentUserUserid, Quantity);
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET quantity=$1
        WHERE productid=$2 and belongsto=$3;`, [Quantity, productid, currentUserUserid]);
        if (userUpdateResult.rowCount === 1) {
            res.json({ resStatus: "Updated successfully", qos: "success" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { updateUserDataIndividual, updateProductDataIndividual, updateStatusToRemove, updateProducts, updateUserPassword, updatereciverStatus,updatesenderStatus, productQuantity };