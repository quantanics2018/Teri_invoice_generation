const userdbInstance = require('../instances/dbInstance');
const setPasswordMailing = require('../services/emailservice');

async function checkCredentials(req, res) {
  const { username, password } = req.body;
  try {
    const checkIsUsernameExist = await userdbInstance.userdb.query('select username from public.credentials where username=$1;', [username]);
    if (checkIsUsernameExist.rows != 0) {
      const checkIsPasswordEmpty = await userdbInstance.userdb.query('select password from public.credentials where username=$1;', [username]);
      if (checkIsPasswordEmpty.rows[0].password == null) {
        console.log("password is empty : ");
        return res.json({ success: false, password: null, message: 'Set the password' });
      } else {
        console.log(username);
        const GetTheUserStatus = await userdbInstance.userdb.query('select status from public."user" where email=$1;', [username]);
        // console.log(GetTheUserStatus.rows);
        // console.log(GetTheUserStatus.rows[0].status === 1);
        if (GetTheUserStatus.rows[0].status === '1') {
          const data = await userdbInstance.userdb.query(`SELECT 
                "user".userid,"user".email,"user".phno,"user".fname,"user".lname,
                (select position from position where positionid = "user".positionid),
                "user".userprofile, "user".status ,accesscontroll.distributer,accesscontroll.product,
                accesscontroll.invoicegenerator,accesscontroll.customer,accesscontroll.staff,accesscontroll.invoicepayslip
                FROM public.credentials
                JOIN public."user" ON credentials.userid = "user".userid
                JOIN public.accesscontroll on accesscontroll.userid = "user".userid
                WHERE credentials.username=$1 and credentials.password = $2;
                `, [username, password]);
          const rowCount = data.rows.length;
          console.log(rowCount);
          if (rowCount === 1) {
            const result = data.rows[0];
            console.log(result);
            console.log(username, password);
            res.json({ success: true, data: result });
          } else {
            res.json({ success: false, message: 'Invalid Password' });
          }
        }
        else {
          res.json({ success: false, message: 'Your Access Restricted' });
        }

      }
    }
    else {
      console.log("Email doesn't exist");
      res.send({ success: false,message: "Email doesn't exist" });
    }
  } catch (error) {
    console.error('Error executing database query:', error);
    throw error;
  }
}

module.exports = { checkCredentials };
