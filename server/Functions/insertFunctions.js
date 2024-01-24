const userdbInstance = require('../instances/dbInstance');

async function addUser(req, res) {
    const {
        userid,
        OrganizationName,
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
        const ueserTable = await userdbInstance.userdb.query('INSERT INTO public."user" (userid,email, phno, altphoneno, aadhar, pan, name, positionid, adminid, pstreetname, pdistrictid, pstateid, ppostalcode,status) VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING userid',
            [userid,email, mobileNo, mobileNo, aadharNo, panNumber, fName, Positionid, adminid, streetAddress, City, State, pCode, status]);

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
        }else if (AccessControls['Staff'] === 'View') {
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
        }else if (AccessControls['Distributor'] === 'View') {
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
        }else if (AccessControls['Customer'] === 'View') {
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
        }else if (AccessControls['Products'] === 'View') {
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
        }else if (AccessControls['Invoice Generator'] === 'View') {
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
        }else if (AccessControls['Invoice PaySlip'] === 'View') {
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
            [distributor_ac, products_ac, InvoiceGenerator_ac, userid, customer_ac, staff_ac,InvoicePaySlip_ac]);
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
    const invoice = req.body.invoice;
    const invoiceItem = req.body.invoiceitem;
    // console.log(invoice);
    // console.log(invoiceItem);
    // console.log(invoice['UserId']);
    try {
        await userdbInstance.userdb.query('BEGIN');

        const InvoiceTableResult = await userdbInstance.userdb.query(
            `INSERT INTO public.invoice(
                receiverid)
                VALUES ($1) RETURNING invoiceid;`, [invoice['UserId']]
        );

        console.log(InvoiceTableResult.rows[0].invoiceid);
        const invoiceid = InvoiceTableResult.rows[0].invoiceid;

        for (const item of invoiceItem) {
            // console.log(item.id);

            const InvoiceItemTableResult = await userdbInstance.userdb.query(
                `INSERT INTO public.invoiceitem(
                    invoiceid,productid,quantity)
                    VALUES ($1,$2,$3);`, [invoiceid, item.productid, item.Quantity]
            );

            // Do something with userTableResult if needed
        }

        await userdbInstance.userdb.query('COMMIT');
        return res.json({ message: "Successfully Invoice Added", status: true });
    } catch (error) {
        console.error('Error executing database query:', error);
        if (error.message.includes('unique constraint')) {
            return res.json({ message: "User Already Exists", status: false });
        } else {
            return res.json({ message: 'Failed to add Invoice', status: false, error: error.message });
        }
    }
}

async function addProduct(req, res) {
    // const { hsncode,quantity,priceperitem,userid } = req.body;
    const { hsncode, quantity, priceperitem, productname } = req.body.productdetial;
    const { updator } = req.body;
    // console.log(hsncode, quantity, priceperitem, productname, updator);

    try {
        await userdbInstance.userdb.query('BEGIN');
        const insertProductResult = await userdbInstance.userdb.query(`INSERT INTO public.products(
            productid, quantity, priceperitem, "Lastupdatedby",productname,belongsto,status)
            VALUES ($1, $2, $3, $4,$5,$6,$7);`, [hsncode, quantity, priceperitem, updator, productname, updator, '1']);
        await userdbInstance.userdb.query('COMMIT');
        if (insertProductResult.rowCount === 1) {
            res.json({ message: "Data inserted Successfully", status: true });
            // res.json({ message: "Successfully Updated" });
        } else {
            res.status(404).json({ message: "User not found" });
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