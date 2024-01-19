const userdbInstance = require('../instances/dbInstance');

async function addUser(req, res) {
    const {
        // userid,
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
        PostalCode2 } = req.body;
    const status = 1;
    // console.log(panNumber);

    try {
        await userdbInstance.userdb.query('BEGIN');
        const ueserTable = await userdbInstance.userdb.query('INSERT INTO public."user" (email, phno, altphoneno, aadhar, pan, name, positionid, adminid, pstreetname, pdistrictid, pstateid, ppostalcode,status) VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING userid',
            [email, mobileNo, mobileNo, aadharNo, panNumber, fName, Positionid, adminid, streetAddress, City, State, pCode, status]);

        console.log(ueserTable.rows[0].userid);
        const userid = ueserTable.rows[0].userid
        const credentialTable = await userdbInstance.userdb.query('INSERT INTO credentials (userid,username) VALUES ($1,$2)',
            [userid, email]);

        // console.log(Positionid);
        // manifacture
        if (Positionid == 1) {
            distributor_ac = products_ac = Invoice_ac = staff_ac = '3';
            customer_ac = '0';
        }
        // distributer
        else if (Positionid == 2) {
            distributor_ac = staff_ac = '0';
            products_ac = Invoice_ac = customer_ac = '3';
        }
        // customer
        else if (Positionid == 3) {
            distributor_ac = products_ac = customer_ac = staff_ac = '0';
            Invoice_ac = '3';
        }
        // staff
        else if (Positionid == 4) {
            customer_ac = staff_ac = '0';
            distributor_ac = '2';
            products_ac = Invoice_ac = '3';
        }
        const access_controlTable = await userdbInstance.userdb.query('insert into accesscontroll (distributer,product,invoice,userid,customer,staff) values ($1,$2,$3,$4,$5,$6)',
            [distributor_ac, products_ac, Invoice_ac, userid, customer_ac, staff_ac]);
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
    console.log(invoice);
    console.log(invoiceItem);
    console.log(invoice['ORDER NUMBER']);
    try {
        await userdbInstance.userdb.query('BEGIN');

        const InvoiceTableResult = await userdbInstance.userdb.query(
            `INSERT INTO public.invoice(
                invoiceid)
                VALUES ($1);`, [invoice['ORDER NUMBER']]
        );


        for (const item of invoiceItem) {
            console.log(item.id);

            const InvoiceItemTableResult = await userdbInstance.userdb.query(
                `INSERT INTO public.invoiceitem(
                    invoiceid,productid,quantity)
                    VALUES ($1,$2,$3);`, [invoice['ORDER NUMBER'], item.productid, item.Quantity]
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