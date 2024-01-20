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
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public."user"
        SET phno=$1, altphoneno=$2, aadhar=$3, pan=$4, name=$5, pstreetname=$6, pdistrictid=$7, pstateid=$8,ppostalcode=$9, cstreetname=$10, cdistrictid=$11, cstateid=$12, cpostalcode=$13
        WHERE userid=$14;`, [mobileNo, mobileNo, aadharNo, panNumber, fName, streetAddress, City, State, pCode, StreetAddress2, City2, State2, PostalCode2, userid]);
        if (userUpdateResult.rowCount === 1) {
            // The update was successful
            console.log("updated successfully");
            res.json({ message: "Successfully Updated" });
        } else {
            // No rows were updated, handle accordingly
            res.status(404).json({ message: "User not found" });
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
        quantity } = req.body.productdetial;
    // console.log(quantity);
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET quantity=$1, priceperitem=$2,productname=$3
        WHERE productid=$4;`, [quantity, priceperitem, productname, productid]);
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
    const {username , password} = req.body;
    console.log(password, username);
    try {
        const checkIsUsernameExist = await userdbInstance.userdb.query('select username from public.credentials where username=$1;', [username]);
        if (checkIsUsernameExist.rows != 0) {
            const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public."credentials"
            SET password=$1
            WHERE username=$2;`, [password, username]);
            if (userUpdateResult.rowCount === 1) {
                // The update was successful
                res.json({ resStatus: "Password Updated Successfully", qos: "success" });
            } else {
                // No rows were updated, handle accordingly
                res.status(404).json({ message: "Not Updated Properly" });
            }
        }
        else {
            console.log("Username doesn't exist");
            res.send({ message: `${username} Username doesn't exist` , status:'notExist'});
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
    const { productid, Quantity } = req.body;
    console.log(productid, Quantity);
    // try {
    //     const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
    //     SET status=$1
    //     WHERE productid=$2;`, [status, productid]);
    //     if (userUpdateResult.rowCount === 1) {
    //         res.json({ resStatus: status, qos: "success" });
    //     } else {
    //         res.status(404).json({ message: "User not found" });
    //     }
    // } catch (error) {
    //     console.error('Error executing database query:', error);
    //     res.status(500).json({ message: "Internal Server Error" });
    // }
}


module.exports = { updateUserDataIndividual, updateProductDataIndividual, updateStatusToRemove, updateProducts, updateUserPassword , productQuantity};