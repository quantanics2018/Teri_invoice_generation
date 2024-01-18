const userdbInstance = require('../instances/dbInstance');

async function deleteUser(req, res) {
    const { userid } = req.body;
    try {
        const userDeleteResult = await userdbInstance.userdb.query('DELETE FROM public."user" WHERE userid = $1;',
            [userid]);

        if (userDeleteResult.rowCount === 0) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        const credentialsDeleteResult = await userdbInstance.userdb.query('DELETE FROM public.credentials WHERE userid = $1;',
            [userid]);
        const access_controlDeleteResult = await userdbInstance.userdb.query('DELETE FROM public.accesscontroll WHERE userid = $1;',
            [userid]);
        return res.json({ message: "Data Deleted Successfully" });
    } catch (error) {
        console.error('Error executing database query:', error);

        if (error.message.includes('unique constraint')) {
            return res.status(404).json({ message: "User not found" });
        } else {
            return res.status(500).json({ message: 'Failed to delete user: ' + error.message });
        }
    }
}
async function deleteInvoice(req, res) {
    const { invoiceid } = req.body;
    try {
        await userdbInstance.userdb.query('BEGIN');
        const productDeleteResult = await userdbInstance.userdb.query('delete from public."invoice" where invoiceid is null or invoiceid = $1;',
            [invoiceid]);
        const productitemDeleteResult = await userdbInstance.userdb.query('delete from public."invoiceitem" where invoiceid is null or invoiceid = $1;',
            [invoiceid]);
        await userdbInstance.userdb.query('COMMIT');
        return res.json({ message: "Data Deleted Successfully" });
    } catch (error) {
        console.error('Error executing database query:', error);
        if (error.message.includes('unique constraint')) {
            return res.status(404).json({ message: "User not found" });
        } else {
            return res.status(500).json({ message: 'Failed to delete user: ' + error.message });
        }
    }
}

module.exports = { deleteUser, deleteInvoice };

