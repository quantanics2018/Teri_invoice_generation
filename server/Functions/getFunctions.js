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
async function getProducts(req, res) {
    try {
        const { userid} = req.body;
        // console.log(" userid : ",userid);
        const userDeleteResult = await userdbInstance.userdb.query(`SELECT rno, productid, quantity, priceperitem, "Lastupdatedby", productname,status
        FROM public.products where belongsto=$1 order by rno DESC;`, [userid]);
        res.json({ message: "Successfully Data Fetched", data: userDeleteResult.rows });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getTransactionHistory(req, res) {

    try {
        const { userid} = req.body;
        console.log(" userid : ",userid);
        // const userDeleteResult = await userdbInstance.userdb.query(`SELECT rno, productid, quantity, priceperitem, "Lastupdatedby", productname,status
        // FROM public.products where belongsto=$1 order by rno DESC;`, [userid]);
        res.json({ message: "Successfully Data Fetched", data: 'userDeleteResult.rows' });
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
        console.log(UserDataIndividualResult);
        res.json({ message: "Successfully Data Fetched", data: UserDataIndividualResult.rows[0] });
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
        const userDeleteResult = await userdbInstance.userdb.query('select * from products where productid=$1;', [id]);
        res.json({ message: "Successfully Data Fetched", data: userDeleteResult.rows[0] });
    } catch (error) {
        console.error('Error executing database query:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {getUserData ,getProducts,getTransactionHistory, getUserDataIndividual,getProductDataIndividual};