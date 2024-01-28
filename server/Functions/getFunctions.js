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
        const { adminid ,position} = req.body;
        // console.log(adminid,position);
        const userDeleteResult = await userdbInstance.userdb.query('select * from public."user" where adminid=$1 and positionid=$2 and status=$3 order by rno DESC;', [adminid, position,'1']);

        
        res.json({ message: "Successfully Data Fetched", data: userDeleteResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getprofileInfo(req, res) {
    try {
        const {userid} = req.body;
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
        const { userid} = req.body;
        console.log(" userid : ",userid);
        const getAllProductsResult = await userdbInstance.userdb.query(`SELECT rno, productid, quantity, priceperitem, "Lastupdatedby", productname,status ,batchno, cgst, sgst
        FROM public.products where belongsto=$1 order by rno DESC;`, [userid]);
        res.json({ message: "Successfully Data Fetched", data: getAllProductsResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getTransactionHistory(req, res) {
    try {
        const { userid} = req.body;
        // console.log(" userid : ",userid);
        const userTransactionResult = await userdbInstance.userdb.query(`select * from invoice where senderid = $1 or receiverid = $2 order by rno DESC;`, [userid,userid]);
        res.json({ message: "Successfully Data Fetched", data: userTransactionResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getProductList(req, res) {

    try {
        const {senderID} = req.body.inputValues;
        console.log(" userid : ",senderID);
        const getProductListResult = await userdbInstance.userdb.query(`SELECT productid
        FROM public.products where belongsto=$1 order by rno DESC;`, [senderID]);
        res.json({ message: "Successfully Data Fetched", data: getProductListResult.rows});
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getUserDataIndividual(req, res) {
    try {
        // const { adminid ,position} = req.body;
        const {id} = req.params;
        console.log(id);
        const UserDataIndividualResult = await userdbInstance.userdb.query('select * from public."user" where userid=$1', [id]);
        // console.log(UserDataIndividualResult.rows);

        const userAccessControl = await userdbInstance.userdb.query(`SELECT *
        FROM public.accesscontroll where userid=$1;`, [id]);
        console.log(userAccessControl.rows);

        res.json({ message: "Successfully Data Fetched", data: UserDataIndividualResult.rows[0] ,getuserAccessControl: userAccessControl.rows[0]});
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getProductDataIndividual(req, res) {
    try {
        // const { adminid ,position} = req.body;
        const { id } = req.params;
        // console.log(id);
        const IndividualProductResult = await userdbInstance.userdb.query('select * from products where productid=$1;', [id]);
        res.json({ message: "Successfully Data Fetched", data: IndividualProductResult.rows[0] });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {getUserData,getprofileInfo ,getProducts,getTransactionHistory, getProductList, getUserDataIndividual,getProductDataIndividual};