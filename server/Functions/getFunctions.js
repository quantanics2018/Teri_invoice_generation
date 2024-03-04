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

        console.log("belongsto : ",belongsto);

        const userDeleteResult = await userdbInstance.userdb.query('select * from public."user" where adminid=$1 and positionid=$2 and status=$3 order by rno DESC;', [belongsto, position, '1']);
        res.json({ message: "Successfully Data Fetched", data: userDeleteResult.rows });
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
        if ( res_positionId == 4 ||  res_positionId ==5 ) {
            const getBelongsto = await userdbInstance.userdb.query(`select adminid from public."user" where userid=$1;`, [senderid]);
            SenderInvoiceId = getBelongsto.rows[0].adminid
        }else{
            SenderInvoiceId = senderid
        }

        const SenderInvoiceAddressRes = await userdbInstance.userdb.query('select * from public."user" where userid=$1;', [SenderInvoiceId]);
        res.json({ message: "Successfully Data Fetched", data: SenderInvoiceAddressRes.rows, status: true });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}

async function ReciverDataInvoiceAddress(req, res) {
    try {
        const { reciverid } = req.body;
        console.log("reciverid : ", reciverid);
        const ReciverInvoiceAddressRes = await userdbInstance.userdb.query('select * from public."user" where organizationname=$1 order by rno;', [reciverid]);
        console.log("ReciverAddress Length : ",ReciverInvoiceAddressRes.rows.length);
        if (ReciverInvoiceAddressRes.rows.length==1) {
            res.json({ message: "Successfully Data Fetched", data: ReciverInvoiceAddressRes.rows, status: true });
        }else{
            res.json({message:"No Records Found!",status: false});
        }
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error", status: false });
    }
}

async function getprofileInfo(req, res) {
    try {
        const { userid } = req.body;
        // console.log(adminid,position);
        const getprofileInfoResult = await userdbInstance.userdb.query('select * from public."user" where userid=$1;', [userid]);
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

        const getAllProductsResult = await userdbInstance.userdb.query(`SELECT rno, productid, quantity, priceperitem, "Lastupdatedby", productname,status ,batchno, cgst, sgst
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
        // console.log(" userid : ",userid);
        // const userTransactionResult = await userdbInstance.userdb.query(`select * from invoice where senderid = $1 or receiverid = $2 order by rno DESC;`, [userid,userid]);
        const userTransactionResult = await userdbInstance.userdb.query(`SELECT invoice.*, public."user".email
        FROM invoice
        JOIN public."user" ON public."user".userid = invoice.receiverid
        WHERE senderid = $1 OR receiverid = $2
        ORDER BY rno DESC;`, [userid, userid]);
        res.json({ status: true, message: "Successfully Data Fetched", data: userTransactionResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
async function getProductList(req, res) {
    const { senderID } = req.body.inputValues;

    try {
        console.log(" userid : ",senderID);
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

        const getProductListResult = await userdbInstance.userdb.query(`SELECT productid,batchno,productname,priceperitem, cgst, sgst
        FROM public.products where belongsto=$1 and status =$2 order by rno DESC;`, [belongsto,'1']);
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
        FROM public."user" where adminid=$1 and status=$2 and (positionid = $3 or positionid = $4 )order by rno DESC;`, [belongsto,'1', 2, 3]);
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


module.exports = { getUserData, getprofileInfo, getProducts, getTransactionHistory, getProductList, getUserList, getUserDataIndividual, getProductDataIndividual, SenderDataInvoiceAddress, ReciverDataInvoiceAddress };