const userdbInstance = require('../instances/dbInstance');

async function addUser(req, res) {
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
        PostalCode2 } = req.body.userDetials;
    const status = 1;
    const AccessControls = req.body.AccessControls;
    // console.log(AccessControls);
    // console.log(panNumber);

    try {
        await userdbInstance.userdb.query('BEGIN');
        // const ueserTable_old = await userdbInstance.userdb.query('INSERT INTO public."user" (userid,email, phno, altphoneno, aadhar, pan, name, positionid, adminid, pstreetname, pdistrictid, pstateid, ppostalcode,status) VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING userid',
        //     [userid, email, mobileNo, mobileNo, aadharNo, panNumber, fName, Positionid, adminid, streetAddress, City, State, pCode, status]);
        const ueserTable = await userdbInstance.userdb.query('INSERT INTO public."user" (userid,email, phno, aadhar, pan, positionid, adminid,status, pstreetname, pdistrictid, pstateid, ppostalcode , cstreetname, cdistrictid,cstateid, cpostalcode,organizationname, gstnno, bussinesstype, fname, lname, upiid,bankname, bankaccno,passbookimg) VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25) RETURNING userid',
            [userid, email, mobileNo, aadharNo, panNumber, Positionid, adminid, status, streetAddress, City, State, pCode, StreetAddress2, City2, State2, PostalCode2, OrganizationName, gstNumber, bussinessType, fName, lName, upiPaymentNo, accName, accNo, passbookImg]);

        // // console.log(ueserTable.rows[0].userid);
        // // const userid = ueserTable.rows[0].userid
        const credentialTable = await userdbInstance.userdb.query('INSERT INTO credentials (userid,username) VALUES ($1,$2)',
            [userid, email]);

        // // console.log(Positionid);
        // // manifacture
        // if (Positionid == 1) {
        //     distributor_ac = products_ac = Invoice_ac = staff_ac = '3';
        //     customer_ac = '0';
        // }
        // // distributer
        // else if (Positionid == 2) {
        //     distributor_ac = staff_ac = '0';
        //     products_ac = Invoice_ac = customer_ac = '3';
        // }
        // // customer
        // else if (Positionid == 3) {
        //     distributor_ac = products_ac = customer_ac = staff_ac = '0';
        //     Invoice_ac = '3';
        // }
        // // staff
        // else if (Positionid == 4) {
        //     customer_ac = staff_ac = '0';
        //     distributor_ac = '2';
        //     products_ac = Invoice_ac = '3';
        // }
        // Staff Controls
        if (AccessControls['Staff'] === 'No access') {
            staff_ac = 0;
        } else if (AccessControls['Staff'] === 'View') {
            staff_ac = 1;
        }
        else if (AccessControls['Staff'] === 'Edit') {
            staff_ac = 2;
        }
        else if (AccessControls['Staff'] === 'All') {
            staff_ac = 3;
        }
        // Distributor Controls
        if (AccessControls['Distributor'] === 'No access') {
            distributor_ac = 0;
        } else if (AccessControls['Distributor'] === 'View') {
            distributor_ac = 1;
        }
        else if (AccessControls['Distributor'] === 'Edit') {
            distributor_ac = 2;
        }
        else if (AccessControls['Distributor'] === 'All') {
            distributor_ac = 3;
        }
        // Customer Controls
        if (AccessControls['Customer'] === 'No access') {
            customer_ac = 0;
        } else if (AccessControls['Customer'] === 'View') {
            customer_ac = 1;
        }
        else if (AccessControls['Customer'] === 'Edit') {
            customer_ac = 2;
        }
        else if (AccessControls['Customer'] === 'All') {
            customer_ac = 3;
        }
        // Products Controls
        if (AccessControls['Products'] === 'No access') {
            products_ac = 0;
        } else if (AccessControls['Products'] === 'View') {
            products_ac = 1;
        }
        else if (AccessControls['Products'] === 'Edit') {
            products_ac = 2;
        }
        else if (AccessControls['Products'] === 'All') {
            products_ac = 3;
        }
        // Invoice Generator Controls
        if (AccessControls['Invoice Generator'] === 'No access') {
            InvoiceGenerator_ac = 0;
        } else if (AccessControls['Invoice Generator'] === 'View') {
            InvoiceGenerator_ac = 1;
        }
        else if (AccessControls['Invoice Generator'] === 'Edit') {
            InvoiceGenerator_ac = 2;
        }
        else if (AccessControls['Invoice Generator'] === 'All') {
            InvoiceGenerator_ac = 3;
        }
        // Invoice PaySlip Controls
        if (AccessControls['Invoice PaySlip'] === 'No access') {
            InvoicePaySlip_ac = 0;
        } else if (AccessControls['Invoice PaySlip'] === 'View') {
            InvoicePaySlip_ac = 1;
        }
        else if (AccessControls['Invoice PaySlip'] === 'Edit') {
            InvoicePaySlip_ac = 2;
        }
        else if (AccessControls['Invoice PaySlip'] === 'All') {
            InvoicePaySlip_ac = 3;
        }
        // console.log('test : ',staff_ac,Distributor_ac,Customer_ac,Products_ac,InvoiceGenerator_ac,InvoicePaySlip_ac);
        const access_controlTable = await userdbInstance.userdb.query('insert into accesscontroll (distributer,product,invoicegenerator,userid,customer,staff,invoicepayslip) values ($1,$2,$3,$4,$5,$6,$7)',
            [distributor_ac, products_ac, InvoiceGenerator_ac, userid, customer_ac, staff_ac, InvoicePaySlip_ac]);
        await userdbInstance.userdb.query('COMMIT');
        return res.json({ message: "Data inserted Successfully", status: true });
    } catch (error) {
        console.error('Error executing database query:', error);
        // throw error; 
        if (error.message.includes('unique constraint')) {
            // Assuming a unique constraint violation indicates a duplicate entry
            return res.json({ message: "User Already Exist", status: false });
        } else {
            // For other errors, you might return a generic message or the error details
            return 'Failed to add user: ' + error.message;
        }
    }
}
async function addInvoice(req, res) {
    const { UserId, senderID,Date } = req.body.invoice;
    const recivermail = UserId;
    const invoiceItem = req.body.invoiceitem;

    // console.log(invoiceItem);
    // console.log("recivermail : ", recivermail);
    // console.log("senderID", senderID);
    try {
        const checkIsUsernameExist = await userdbInstance.userdb.query('select email from public."user" where email=$1 and adminid=$2;', [recivermail,senderID]);
        console.log(checkIsUsernameExist.rows);
        if (checkIsUsernameExist.rows != 0) {
            await userdbInstance.userdb.query('BEGIN');

            const ForReciverId = await userdbInstance.userdb.query(
                `select userid from public."user" where email=$1`, [recivermail]
            );
            const reciverID = ForReciverId.rows[0].userid
            // console.log(reciverID);
            const InvoiceTableResult = await userdbInstance.userdb.query(
                `INSERT INTO public.invoice(
                    senderid,receiverid,status,date)
                VALUES ($1,$2,$3,$4) RETURNING invoiceid;`, [senderID, reciverID, 0,Date]
            );
            // console.log(InvoiceTableResult.rows[0].invoiceid);
            const invoiceid = InvoiceTableResult.rows[0].invoiceid;
            // console.log(invoiceid);
            for (const item of invoiceItem) {
                // console.log(item.id);

                const for_productid = await userdbInstance.userdb.query(
                    `select productid from public.products WHERE belongsto=$1 and productname=$2`, [senderID, item.productName]
                );
                // console.log(for_productid.rows[0].productid);
                const productIdByName = for_productid.rows[0].productid

                if (productIdByName) {
                    item.productid = productIdByName
                }
                const ReduceFromSenderTable = await userdbInstance.userdb.query(
                    `UPDATE products
                    SET quantity = quantity - $1
                    WHERE belongsto=$2 and productid = $3;`, [item.Quantity, senderID, item.productid]
                );

                const checkProductAlreadyExist = await userdbInstance.userdb.query(
                    `select productid from public.products WHERE belongsto=$1 and productid=$2`, [reciverID, item.productid]
                );
                // console.log(checkProductAlreadyExist.rows);
                if (checkProductAlreadyExist.rows.length > 0) {
                    // console.log("Yes");
                    const UpdateToRecieverTable = await userdbInstance.userdb.query(
                        `Update public.products SET quantity=quantity+$1 WHERE belongsto=$2 AND productid=$3;`, [item.Quantity, reciverID, item.productid]
                    );
                } else {
                    // console.log("No");
                    const AddToRecieverTable = await userdbInstance.userdb.query(
                        `INSERT INTO public.products(
                            productid, quantity,productname,belongsto, status)
                            VALUES ($1, $2, $3, $4,$5);`, [item.productid, item.Quantity, item.productName, reciverID, 0]
                    );
                }

                const InvoiceItemTableResult = await userdbInstance.userdb.query(
                    `INSERT INTO public.invoiceitem(
                    invoiceid,productid,quantity,discountperitem,cost)
                    VALUES ($1,$2,$3,$4,$5);`, [invoiceid, item.productid, item.Quantity,item.Discount,item.Total ]
                );
            }
            await userdbInstance.userdb.query('COMMIT');
            return res.json({ message: "Successfully Invoice Generated", status: true });
        } else {
            console.log("User ID doesn't exist");
            res.json({ message: "User ID doesn't exist" });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        return res.json({ message: 'Failed to add Invoice', status: false, error: error.message });
    }
}

async function addProduct(req, res) {
    // const { hsncode,quantity,priceperitem,userid } = req.body;
    const { hsncode, productname, quantity, priceperitem, batchno, CGST, SGCT } = req.body.productdetial;
    const { updator } = req.body;
    // console.log(hsncode, quantity, priceperitem, productname, updator);

    try {
        await userdbInstance.userdb.query('BEGIN');
        const insertProductResult = await userdbInstance.userdb.query(`INSERT INTO public.products(
            productid, quantity, priceperitem, "Lastupdatedby",productname,belongsto,status,batchno,cgst,sgst)
            VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10);`, [hsncode, quantity, priceperitem, updator, productname, updator, '1', batchno, CGST, SGCT]);
        await userdbInstance.userdb.query('COMMIT');
        if (insertProductResult.rowCount === 1) {
            res.json({ message: "Data inserted Successfully", status: true });
            // res.json({ message: "Successfully Updated" });
        } else {
            res.status(404).json({ message: "User not found", status: false });
        }

    } catch (error) {
        console.error('Error executing database query:', error);
        if (error.code === '23505') { // PostgreSQL error code for unique violation
            res.json({ message: "Unique constraint violation: Duplicate entry", status: false });
        } else {
            // Handle other types of errors
            res.status(500).json({ message: "Internal Server Error", status: false });
        }
    }
}

module.exports = { addUser, addInvoice, addProduct };