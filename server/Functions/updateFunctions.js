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
        email,
        mobileNo,
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
    const hi = req.body.inputValues;
    const AccessOptions = req.body.AccessOptions;
    console.log(AccessOptions.Distributor);
    try {
        await userdbInstance.userdb.query('BEGIN');
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public."user"
        SET phno=$1, altphoneno=$2, aadhar=$3, pan=$4, name=$5, pstreetname=$6, pdistrictid=$7, pstateid=$8,ppostalcode=$9, cstreetname=$10, cdistrictid=$11, cstateid=$12, cpostalcode=$13
        WHERE userid=$14;`, [mobileNo, mobileNo, aadharNo, panNumber, fName, streetAddress, City, State, pCode, StreetAddress2, City2, State2, PostalCode2, userid]);

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
        quantity ,
        batchno,
        CGST,
        SGCT
    } = req.body.productdetial;
    // const batchnoInt = Number(batchno); 
    // console.log(batchno,CGST,SGCT);
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET quantity=$1, priceperitem=$2,productname=$3,batchno=$4,cgst=$5,sgst=$6
        WHERE productid=$7;`, [quantity, priceperitem, productname,batchno,CGST,SGCT,productid]);
        // console.log("sucess");
        if (userUpdateResult.rowCount === 1) {
            // The update was successful
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

async function updateProducts(req, res) {
    const { productid, status } = req.body;
    console.log(productid, status);
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET status=$1
        WHERE productid=$2;`, [status, productid]);
        if (userUpdateResult.rowCount === 1) {
            res.json({ resStatus: status, qos: "success" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function productQuantity(req, res) {
    const { productid,currentUserUserid, Quantity } = req.body;
    console.log(productid, currentUserUserid,Quantity);
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET quantity=$1
        WHERE productid=$2 and belongsto=$3;`, [Quantity, productid,currentUserUserid]);
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


module.exports = { updateUserDataIndividual, updateProductDataIndividual, updateStatusToRemove, updateProducts, updateUserPassword, productQuantity };