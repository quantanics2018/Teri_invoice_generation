const userdbInstance = require('../instances/dbInstance');
const { format } = require('date-fns');


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
    console.log(AccessOptions.D_Staff);
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
        // D_Staff Controls
        if (AccessOptions['D_Staff'] === 'No access') {
            D_Staff_uc = 0;
        } else if (AccessOptions['D_Staff'] === 'View') {
            D_Staff_uc = 1;
        }
        else if (AccessOptions['D_Staff'] === 'Edit') {
            D_Staff_uc = 2;
        }
        else if (AccessOptions['D_Staff'] === 'All') {
            D_Staff_uc = 3;
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
        SET  distributer=$1, product=$2, invoicegenerator=$3,customer=$4, staff=$5, invoicepayslip=$6 , d_staff=$7
        WHERE userid=$8;`, [Distributor_uc, Products_uc, InvoiceGenerator_uc, customer_uc, Staff_uc, InvoicePaySlip_uc, D_Staff_uc, userid]);
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
    console.log("Update the Apropriate Product : ", batchno,CGST,SGCT);

    try {

        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [updator]);
        console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        let belongsto;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [updator]);
            belongsto = getBelongsto.rows[0].adminid
        } else {
            belongsto = updator
        }
        // console.log("belongsto : ", belongsto);

        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET quantity=$1, priceperitem=$2,productname=$3,batchno=$4,cgst=$5,sgst=$6
        WHERE productid=$7 and belongsto=$8 and batchno=$9; `, [quantity, priceperitem, productname, batchno, CGST, SGCT, productid, belongsto,batchno]);
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
            WHERE invoiceid=$3;`, ['1', textVal, invoiceId]);
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
    const { invoiceId, belongsto } = req.body;
    // const {}  = req.body;
    console.log(belongsto);
    try {
        const senderStatusResult = await userdbInstance.userdb.query(`UPDATE public.invoice
            SET senderstatus=$1
            WHERE invoiceid=$2;`, ['1', invoiceId]);

        const getuserid = await userdbInstance.userdb.query(`SELECT userid from public."user" where email=$1;`, [belongsto]);
        // console.log(getuserid.rows[0].userid);
        const getuseridRes = getuserid.rows[0].userid;

        const updateProductStatus = await userdbInstance.userdb.query(`UPDATE public.products
        SET status=$1
        WHERE belongsto=$2;`, ['1', getuseridRes]);
        
        if (senderStatusResult.rowCount === 1) {
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
    const { hsncode,batchno, currentUserUserid, Quantity } = req.body;
    // console.log(hsncode,batchno, currentUserUserid, Quantity);
    try {
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public.products
        SET quantity=$1
        WHERE productid=$2 and belongsto=$3 and batchno=$4;`, [Quantity, hsncode, currentUserUserid,batchno]);
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



async function update_user_profile(req,res){
    const userid = req.body.userId;

    const {
        fname,
        lname,
        email,
        mobile,
        aadhar,
        pannumber,
        streetname,
        dname,
        sname,
        orgname,
        btype,
        pcode,

        bname,
        acno,
        ifsc_code,
        achname,
        upi_id,
        gstno,  


    } = req.body.userDetails;

    try{
        const userUpdateResult = await userdbInstance.userdb.query(`UPDATE public."user"
        SET email=$1, phno=$2, aadhar=$3, pan=$4, pstreetname=$5, pdistrictid=$6, pstateid=$7, ppostalcode=$8 , cstreetname=$9, cdistrictid=$10,cstateid=$11, cpostalcode=$12,organizationname=$13,  bussinesstype=$14, fname=$15, lname=$16  , gstnno=$17 , upiid=$18 , bankname=$19, bankaccno=$20 , accholdername=$21 , ifsccode=$22 WHERE userid=$23;`, [email,  mobile,  aadhar,  pannumber, streetname, dname, sname, pcode, streetname, dname, sname, pcode,orgname, btype,fname,lname,gstno,upi_id,bname,acno,achname,ifsc_code,userid]);
        
        if (userUpdateResult.rowCount === 1) {
            res.json({ message: "Successfully Updated", status: true });
            console.log("db updation is okay");
        } else {
            res.json({ message: "Oops! Something Went Wrong DB Updation side", status: false });
            
            console.log("404 error db error");
        }

    }
    catch(error){
        console.log("error message for user profile updation in db handling file");
        res.status(500).json({message:'profile updation query error'});
    }
}


// order management module update order management table 
async function Order_submition(req,res){
  
    console.log("updation");
    console.log(req.body.order_data);
    let transaction_id = req.body.order_data.transaction_id;
    let last_updated_by = req.body.order_data.last_updated_by;
    let order_id = req.body.order_data.order_id;
    let sender_id = req.body.order_data.receiverid;
    let receiver_id = req.body.order_data.sender_id;
    let total_amount = req.body.order_data.total_amount;

    let quantity = req.body.order_data.quantity;
    let product_id = req.body.order_data.product_id;
    let batch_no = req.body.order_data.batch_no;
    let product_price = req.body.order_data.product_price;
    let cgst  = req.body.order_data.cgst;
    let sgst = req.body.order_data.sgst;
    try {
        

        const Order_submition_status = await userdbInstance.userdb.query(`UPDATE order_management SET order_status=$1, transaction_id=$2,last_updated_by=$3 WHERE order_id=$4`,[1,transaction_id,last_updated_by,order_id]);
        console.log("order management table updation");
        console.log(typeof Order_submition_status.rowCount);
        if (parseInt(Order_submition_status.rowCount)===1) {
            
            const sender_account_Details = await userdbInstance.userdb.query(`SELECT * FROM PUBLIC."user" WHERE userid=$1`,[sender_id]);
            console.log(sender_account_Details.rows);
            const currentDate = new Date(); 
            const current_date = format(currentDate, 'yyyy-MM-dd');

            // invoice table insertion
        
            await userdbInstance.userdb.query('BEGIN');


            const InvoiceTableResult = await userdbInstance.userdb.query(
                `INSERT INTO public.invoice(
                    senderid, receiverid, invoicedate,discount, total, lastupdatedby, senderstatus, date, reciverstatus, transactionid)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING invoiceid;`, [sender_id,receiver_id , current_date,0,total_amount,last_updated_by,1,current_date,1,transaction_id]
            );
            
            const invoiceid = InvoiceTableResult.rows[0].invoiceid;

            const ReduceFromSenderTable = await userdbInstance.userdb.query(
                `UPDATE products
                SET quantity = quantity - $1
                WHERE belongsto=$2 and productid = $3 and batchno = $4;`, [quantity,sender_id,product_id,batch_no]
            );
            
            const invoiceitem_insertion = await userdbInstance.userdb.query(`INSERT INTO public.invoiceitem(
                invoiceid, productid, quantity, cost, discountperitem, lastupdatedby, hsncode, batchno, priceperitem, cgst, sgst)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,[invoiceid , product_id , quantity , total_amount , 0 , last_updated_by , product_id , batch_no , product_price , cgst , sgst]);

            
            await userdbInstance.userdb.query('COMMIT');
          
            console.log(current_date);
            console.log("Updated successfully");
            res.json({message:"updation successfully",status:true,invoice_id:invoiceid});
        }else{
            res.status(7000).json({message:'DB error for Order management table updation issue if condition issue'});
        }
    } catch (error) {
        console.log("db error for order management table updation issue");
        res.status(6000).json({message:'DB error for Order management table updation issue'});
    }
}


module.exports = { updateUserDataIndividual, updateProductDataIndividual, updateStatusToRemove, updateProducts, updateUserPassword, updatereciverStatus, updatesenderStatus, productQuantity,update_user_profile ,Order_submition};