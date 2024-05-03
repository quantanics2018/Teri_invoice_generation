// In getFunctions.js (or wherever you have your getdata function)
const userdbInstance = require('../instances/dbInstance');

// async function getUserData(req, res) {
//     const { adminid } = req.body;
//     console.log(adminid);
//     const userDeleteResult = await userdbInstance.userdb.query('select * from public."user" where adminid=$1 and positionid=$2;',
//         [adminid,'4']);
//     // return res.json({ message: "Successfully Data Fetched" , data : userDeleteResult.rows });
//     // return res.json({ message: "Successfully Data Fetched"});
//     res.json({ message: "Successfully Data Fetched", data: userDeleteResult.rows });
//     // try {
//     // } catch (error) {
//     //     console.error('Error executing database query:', error);
//     // }
// }


async function getUserData(req, res) {
    try {
        const { adminid, position } = req.body;
        console.log("adminid : ", adminid, "position : ", position);

        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [adminid]);
        console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        let belongsto;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [adminid]);
            belongsto = getBelongsto.rows[0].adminid
        } else {
            belongsto = adminid
        }

        console.log("belongsto : ", belongsto);

        const userDeleteResult = await userdbInstance.userdb.query('select * from public."user" where adminid=$1 and positionid=$2 and status=$3 order by rno DESC;', [belongsto, position, '1']);
        res.json({ message: "Successfully Data Fetched", data: userDeleteResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getStateData(req, res) {
    try {
        const userStateResult = await userdbInstance.userdb.query('SELECT statename FROM public.state;');
        res.json({ message: "Successfully Data Fetched", data: userStateResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getDistrictData(req, res) {
    try {
        const userdistrictResult = await userdbInstance.userdb.query('SELECT districtname FROM public.district;');
        res.json({ message: "Successfully Data Fetched", data: userdistrictResult.rows });
        
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getSignExistance(req, res) {
    const currentUser  = req.body.currentUser;
    console.log("currecntUser : ", currentUser);

    try {

        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [currentUser]);
        console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        let belongsto;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [currentUser]);
            belongsto = getBelongsto.rows[0].adminid
        } else {
            belongsto = currentUser
        }
        console.log("belongsto : ", belongsto);

        const userSignResult = await userdbInstance.userdb.query(`SELECT signature FROM public."user" where userid = $1;`,[belongsto]);
        console.log("userSignResult.rows :- ",userSignResult.rows);
        if (userSignResult.rows[0].signature == null) {
        return res.json({ message: "Signature Absent", status: false });
        }
        res.json({ message: "Signature Present", status: true });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function SenderDataInvoiceAddress(req, res) {
    const { senderid } = req.body;
    console.log("senderid : ", senderid);
    try {
        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [senderid]);
        console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        let SenderInvoiceId;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [senderid]);
            SenderInvoiceId = getBelongsto.rows[0].adminid
        } else {
            SenderInvoiceId = senderid
        }

        const SenderInvoiceAddressRes = await userdbInstance.userdb.query('select * from public."user" where userid=$1;', [SenderInvoiceId]);
        res.json({ message: "Successfully Data Fetched", data: SenderInvoiceAddressRes.rows, status: true });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}
// const signImages = path.join(__dirname, '../uploads/');
// app.use('/images', express.static(path.join(__dirname, '../uploads')));

async function GetSignature(req, res) {
    const { userid } = req.body;
    console.log("senderid - : ", userid);
    // res.sendFile(path.join(__dirname, 'uploads', 'Ad0045.jpg'));
    res.sendFile(path.join(__dirname, '../uploads', 'Ad0045.jpg'));
    // res.json({ message: "Successfully Sign Fetched", status: true });
}

async function ReciverDataInvoiceAddress(req, res) {
    try {
        const { reciverid } = req.body;
        console.log("reciverid : ", reciverid);
        const ReciverInvoiceAddressRes = await userdbInstance.userdb.query('select * from public."user" where organizationname=$1 order by rno;', [reciverid]);
        console.log("ReciverAddress Length : ", ReciverInvoiceAddressRes.rows.length);
        if (ReciverInvoiceAddressRes.rows.length == 1) {
            res.json({ message: "Successfully Data Fetched", data: ReciverInvoiceAddressRes.rows, status: true });
        } else {
            res.json({ message: "No Records Found!", status: false });
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}

async function getprofileInfo(req, res) {
    try {
        const { userid } = req.body;
        console.log(userid);
        // console.log(adminid,position);
        // const getprofileInfoResult = await userdbInstance.userdb.query('select * from public."user" where userid=$1;', [userid]);
        const getprofileInfoResult = await userdbInstance.userdb.query('select public."position".position,public."user".* from public."user" join public."position" on public."user".positionid=public."position".positionid where public."user".userid=$1;', [userid]);
        res.json({ message: "Successfully Data Fetched", data: getprofileInfoResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getProducts(req, res) {
    try {
        const { userid } = req.body;
        console.log(" userid : ", userid);

        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [userid]);
        console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        let belongsto;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [userid]);
            belongsto = getBelongsto.rows[0].adminid
        } else {
            belongsto = userid
        }
        // console.log("belongsto : ", belongsto);

        const getAllProductsResult = await userdbInstance.userdb.query(`SELECT rno, productid, quantity, priceperitem, last_updated_by, productname,status ,batchno, cgst, sgst
        FROM public.products where belongsto=$1 and status=$2 order by rno DESC;`, [belongsto, '1']);
        res.json({ message: "Successfully Data Fetched", data: getAllProductsResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getTransactionHistory(req, res) {
    try {
        const { userid } = req.body;
        console.log(" userid : ",userid);
        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [userid]);
        // console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        console.log("TEst Id position",res_positionId);
        let belongsto;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [userid]);
            belongsto = getBelongsto.rows[0].adminid
        } else {
            belongsto = userid
        }
        console.log("belongsto- senderid : ",belongsto);


        
        // const userTransactionResult = await userdbInstance.userdb.query(`select * from invoice where senderid = $1 or receiverid = $2 order by rno DESC;`, [userid,userid]);
        const userTransactionResult = await userdbInstance.userdb.query(`SELECT invoice.*, public."user".email
        FROM invoice
        JOIN public."user" ON public."user".userid = invoice.receiverid
        WHERE senderid = $1 OR receiverid = $2
        ORDER BY rno DESC;`, [belongsto, belongsto]);
        res.json({ status: true, message: "Successfully Data Fetched", data: userTransactionResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
async function getProductList(req, res) {
    const { senderID } = req.body.inputValues;

    try {
        console.log(" userid : ", senderID);
        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [senderID]);
        // console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        // console.log("res_positionId : ",res_positionId);
        let belongsto;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [senderID]);
            belongsto = getBelongsto.rows[0].adminid
        } else {
            belongsto = senderID
        }

        // productid,batchno,productname,priceperitem, cgst, sgst
        const getProductListResult = await userdbInstance.userdb.query(`SELECT * 
        FROM public.products where belongsto=$1 and status =$2 order by rno DESC;`, [belongsto, '1']);
        // console.log(getProductListResult.rows);
        res.json({ message: "Successfully Data Fetched", data: getProductListResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getUserList(req, res) {
    try {
        const { senderID } = req.body.inputValues;
        // console.log(" userid : ", senderID);

        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [senderID]);
        // console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        // console.log("res_positionId : ",res_positionId);
        let belongsto;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [senderID]);
            belongsto = getBelongsto.rows[0].adminid
        } else {
            belongsto = senderID
        }
        const getUserList = await userdbInstance.userdb.query(`SELECT organizationname
        FROM public."user" where adminid=$1 and status=$2 and (positionid = $3 or positionid = $4 )order by rno DESC;`, [belongsto, '1', 2, 3]);
        res.json({ message: "Successfully Data Fetched", data: getUserList.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getUserDataIndividual(req, res) {
    try {
        // const { adminid ,position} = req.body;
        const { id } = req.params;
        console.log(id);
        const UserDataIndividualResult = await userdbInstance.userdb.query('select * from public."user" where userid=$1', [id]);
        // console.log(UserDataIndividualResult.rows);

        const userAccessControl = await userdbInstance.userdb.query(`SELECT *
        FROM public.accesscontroll where userid=$1;`, [id]);
        console.log(userAccessControl.rows);

        res.json({ message: "Successfully Data Fetched", data: UserDataIndividualResult.rows[0], getuserAccessControl: userAccessControl.rows[0] });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getProductDataIndividual(req, res) {
    const { userid, productid, batchno } = req.body
    console.log("Get the product detail : ", userid, productid, batchno);
    try {
        // const { adminid ,position} = req.body;
        // const { id } = req.params;
        // console.log(id);

        const CheckForStaff = await userdbInstance.userdb.query(`select positionid from public."user" where userid=$1;`, [userid]);
        console.log(CheckForStaff.rows[0].positionid);
        const res_positionId = CheckForStaff.rows[0].positionid
        let belongsto;
        if (res_positionId == 4 || res_positionId == 5) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [userid]);
            belongsto = getBelongsto.rows[0].adminid
        } else {
            belongsto = userid
        }
        // console.log("belongsto : ", belongsto);

        const IndividualProductResult = await userdbInstance.userdb.query('select * from products where productid=$1 and belongsto =$2 and batchno=$3;', [productid, belongsto, batchno]);
        // console.log(IndividualProductResult.rows[0]);
        res.json({ message: "Successfully Data Fetched", data: IndividualProductResult.rows[0] });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// invoice generation data getting function
async function getInvoiceData(req,res){
    try {
        const InvoiceId = req.body.invoiceId;

        // invoice data and product name data
        const result = await userdbInstance.userdb.query(`SELECT invoice.*,invoiceitem.*,products.productname  FROM invoice
        JOIN invoiceitem ON invoice.invoiceid = invoiceitem.invoiceid JOIN products ON products.productid = invoiceitem.productid AND products.batchno = invoiceitem.batchno where invoice.invoiceid=$1;`,[InvoiceId]);

        console.log("sender id is");
        const sender_id = result.rows[0].senderid;
        const receiver_id = result.rows[0].receiverid;

        const sender_data = await userdbInstance.userdb.query('SELECT userid, email, phno, aadhar, pan, positionid, adminid, updatedby,status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode,organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode, signature FROM public."user"  WHERE userid=$1',[sender_id]);
        const receiver_data = await userdbInstance.userdb.query('SELECT userid, email, phno, aadhar, pan, positionid, adminid, updatedby,status, userprofile, pstreetname, pdistrictid, pstateid, ppostalcode,organizationname, gstnno, bussinesstype, fname, lname, upiid, bankname, bankaccno, passbookimg, accholdername, ifsccode, signature FROM public."user"  WHERE userid=$1',[receiver_id]);

        const output = {
            invoice_data:result.rows,
            sender_data:sender_data.rows,
            receiver_data:receiver_data.rows,
        };
        

        res.json({message:"successfully data fetched",data:output});

        
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// get product data 
async function getproduct_data(req,res){
    try{
        const product_data = await userdbInstance.userdb.query(`SELECT * FROM products where status='1' and belongsto=$1 and productid=$2 and quantity>0 ORDER BY rno ASC`,[req.body.admin_id,req.body.hsncode]);
        res.json({message:"success",data:product_data.rows});
    }
    catch(error){
        console.error("Error in transaction details page  get product server error");
        res.status(500).json({message:"Internal server"});
    }
}

// get order management module data 
async function getOrder_Management_Data(req,res){
    try {
        const order_data = await userdbInstance.userdb.query(`SELECT om.*,(select fname||' '||lname from public."user" where public."user".userid=om.receiverid) as fullname , (select productname from products where productid=om.hsncode and batchno=$1 and belongsto=om.receiverid )as productname FROM public.order_management as om where om.order_status=$2 and om.receiverid=$3`,[1,0,req.body.userid]);
        res.json({
            message:"Success",
            data:order_data.rows,
        
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error for getting order management data"});
    }
}


// get particular product count
async function getparticular_product(product_id,userid){
  
    try {
        console.log(product_id+" "+userid);
        const product_count = await userdbInstance.userdb.query(`SELECT quantity FROM products WHERE productid=$1 AND belongsto=$2 AND status=$3`,[product_id,userid,1]);
        console.log("db data");
        console.log(product_count.rows);
        
        
        return product_count.rows;
    } catch (error) {
        return "error";
    }
}


// get order item data getting function
async function getOrder_Item(req,res){
    try {
        const order_item = await userdbInstance.userdb.query(`SELECT * FROM order_item where order_id=$1`,[req.body.order_id]);
        res.json({
            message:'Success',
            data:order_item.rows,
        });
    } catch (error) {
        res.status(5000).json({message:"Internal server error in order item data getting error"});
    }
}



module.exports = { getUserData, getprofileInfo, getProducts, getTransactionHistory, getProductList, getUserList, getUserDataIndividual, getProductDataIndividual, SenderDataInvoiceAddress, GetSignature, ReciverDataInvoiceAddress, getStateData,getSignExistance,getDistrictData,getInvoiceData,getproduct_data,getOrder_Management_Data,getparticular_product,getOrder_Item};